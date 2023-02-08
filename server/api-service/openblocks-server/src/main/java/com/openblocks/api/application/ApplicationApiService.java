package com.openblocks.api.application;

import static com.openblocks.domain.application.model.ApplicationStatus.NORMAL;
import static com.openblocks.domain.permission.model.ResourceAction.EDIT_APPLICATIONS;
import static com.openblocks.domain.permission.model.ResourceAction.MANAGE_APPLICATIONS;
import static com.openblocks.domain.permission.model.ResourceAction.PUBLISH_APPLICATIONS;
import static com.openblocks.domain.permission.model.ResourceAction.READ_APPLICATIONS;
import static com.openblocks.domain.permission.model.ResourceAction.USE_DATASOURCES;
import static com.openblocks.sdk.exception.BizError.ILLEGAL_APPLICATION_PERMISSION_ID;
import static com.openblocks.sdk.exception.BizError.INVALID_PARAMETER;
import static com.openblocks.sdk.exception.BizError.NOT_AUTHORIZED;
import static com.openblocks.sdk.exception.BizError.NO_PERMISSION_TO_REQUEST_APP;
import static com.openblocks.sdk.exception.BizError.USER_NOT_SIGNED_IN;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.SetUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.openblocks.api.application.ApplicationController.CreateApplicationRequest;
import com.openblocks.api.application.view.ApplicationInfoView;
import com.openblocks.api.application.view.ApplicationPermissionView;
import com.openblocks.api.application.view.ApplicationView;
import com.openblocks.api.bizthreshold.AbstractBizThresholdChecker;
import com.openblocks.api.home.FolderApiService;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.home.UserHomeApiService;
import com.openblocks.api.permission.PermissionHelper;
import com.openblocks.api.permission.view.PermissionItemView;
import com.openblocks.api.usermanagement.OrgDevChecker;
import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.model.ApplicationType;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.interaction.UserApplicationInteractionService;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.model.ResourceHolder;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.permission.solution.SuggestAppAdminSolution;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.domain.solutions.TemplateSolution;
import com.openblocks.domain.template.model.Template;
import com.openblocks.domain.template.service.TemplateService;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.infra.util.TupleUtils;
import com.openblocks.sdk.constants.Authentication;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.util.ExceptionUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ApplicationApiService {

    private static final String LIBRARY_QUERY_DATASOURCE_TYPE = "libraryQuery";
    private static final String JS_DATASOURCE_TYPE = "js";
    private static final String VIEW_DATASOURCE_TYPE = "view";

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private UserService userService;

    @Autowired
    private AbstractBizThresholdChecker bizThresholdChecker;

    @Autowired
    private TemplateSolution templateSolution;

    @Autowired
    private SuggestAppAdminSolution suggestAppAdminSolution;

    @Autowired
    private OrgDevChecker orgDevChecker;
    @Autowired
    private FolderApiService folderApiService;
    @Autowired
    private UserHomeApiService userHomeApiService;
    @Autowired
    private UserApplicationInteractionService userApplicationInteractionService;
    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;
    @Autowired
    private CompoundApplicationDslFilter compoundApplicationDslFilter;
    @Autowired
    private TemplateService templateService;
    @Autowired
    private PermissionHelper permissionHelper;
    @Autowired
    private DatasourceService datasourceService;

    public Mono<ApplicationView> create(CreateApplicationRequest createApplicationRequest) {

        Application application = new Application(createApplicationRequest.organizationId(),
                createApplicationRequest.name(),
                createApplicationRequest.applicationType(),
                NORMAL,
                createApplicationRequest.publishedApplicationDSL(),
                false, createApplicationRequest.editingApplicationDSL());

        if (StringUtils.isBlank(application.getOrganizationId())) {
            return deferredError(INVALID_PARAMETER, "ORG_ID_EMPTY");
        }

        if (StringUtils.isBlank(application.getName())) {
            return deferredError(INVALID_PARAMETER, "APP_NAME_EMPTY");
        }

        return sessionUserService.getVisitorId()
                .flatMap(userId -> orgMemberService.getOrgMember(application.getOrganizationId(), userId))
                .switchIfEmpty(deferredError(NOT_AUTHORIZED, "NOT_AUTHORIZED"))
                .delayUntil(orgMember -> orgDevChecker.checkCurrentOrgDev())
                .delayUntil(bizThresholdChecker::checkMaxOrgApplicationCount)
                .delayUntil(orgMember -> {
                    String folderId = createApplicationRequest.folderId();
                    if (StringUtils.isBlank(folderId)) {
                        return Mono.empty();
                    }
                    return folderApiService.checkFolderExist(folderId)
                            .flatMap(folder -> folderApiService.checkFolderCurrentOrg(folder, orgMember.getOrgId()));
                })
                .flatMap(org -> applicationService.create(application, org.getUserId()))
                .delayUntil(created -> autoGrantPermissionsByFolderDefault(created.getId(), createApplicationRequest.folderId()))
                .delayUntil(created -> folderApiService.move(created.getId(),
                        createApplicationRequest.folderId()))
                .map(applicationCreated -> ApplicationView.builder()
                        .applicationInfoView(buildView(applicationCreated, "", createApplicationRequest.folderId()))
                        .applicationDSL(applicationCreated.getEditingApplicationDSL())
                        .build());
    }

    private Mono<Void> autoGrantPermissionsByFolderDefault(String applicationId, @Nullable String folderId) {
        if (StringUtils.isBlank(folderId)) {
            return Mono.empty();
        }
        return folderApiService.getPermissions(folderId)
                .flatMapIterable(ApplicationPermissionView::getPermissions)
                .groupBy(PermissionItemView::getRole)
                .flatMap(sameRolePermissionItemViewFlux -> {
                    String role = sameRolePermissionItemViewFlux.key();
                    Flux<PermissionItemView> permissionItemViewFlux = sameRolePermissionItemViewFlux.cache();

                    Mono<List<String>> userIdsMono = permissionItemViewFlux
                            .filter(permissionItemView -> permissionItemView.getType() == ResourceHolder.USER)
                            .map(PermissionItemView::getId)
                            .collectList();

                    Mono<List<String>> groupIdsMono = permissionItemViewFlux
                            .filter(permissionItemView -> permissionItemView.getType() == ResourceHolder.GROUP)
                            .map(PermissionItemView::getId)
                            .collectList();

                    return Mono.zip(userIdsMono, groupIdsMono)
                            .flatMap(tuple -> {
                                List<String> userIds = tuple.getT1();
                                List<String> groupIds = tuple.getT2();
                                return resourcePermissionService.insertBatchPermission(ResourceType.APPLICATION, applicationId,
                                        new HashSet<>(userIds), new HashSet<>(groupIds),
                                        ResourceRole.fromValue(role));
                            });
                })
                .then();
    }

    public Flux<ApplicationInfoView> getRecycledApplications() {
        return userHomeApiService.getAllAuthorisedApplications4CurrentOrgMember(null, ApplicationStatus.RECYCLED, false);
    }

    private Mono<Void> checkCurrentUserApplicationPermission(String applicationId, ResourceAction action) {
        return sessionUserService.getVisitorId()
                .flatMap(userId -> resourcePermissionService.checkResourcePermissionWithError(userId, applicationId, action));
    }

    public Mono<ApplicationView> delete(String applicationId) {
        return checkApplicationStatus(applicationId, ApplicationStatus.RECYCLED)
                .then(updateApplicationStatus(applicationId, ApplicationStatus.DELETED))
                .then(applicationService.findById(applicationId))
                .map(application -> ApplicationView.builder()
                        .applicationInfoView(buildView(application))
                        .applicationDSL(application.getEditingApplicationDSL())
                        .build());
    }

    public Mono<Boolean> recycle(String applicationId) {
        return checkApplicationStatus(applicationId, NORMAL)
                .then(updateApplicationStatus(applicationId, ApplicationStatus.RECYCLED));
    }

    public Mono<Boolean> restore(String applicationId) {
        return checkApplicationStatus(applicationId, ApplicationStatus.RECYCLED)
                .then(updateApplicationStatus(applicationId, NORMAL));
    }

    private Mono<Void> checkApplicationStatus(String applicationId, ApplicationStatus expected) {
        return applicationService.findByIdWithoutDsl(applicationId)
                .flatMap(application -> checkApplicationStatus(application, expected));
    }

    private Mono<Void> checkApplicationStatus(Application application, ApplicationStatus expected) {
        if (expected == application.getApplicationStatus()) {
            return Mono.empty();
        }
        return Mono.error(new BizException(BizError.UNSUPPORTED_OPERATION, "BAD_REQUEST"));
    }

    private Mono<Boolean> updateApplicationStatus(String applicationId, ApplicationStatus applicationStatus) {
        return checkCurrentUserApplicationPermission(applicationId, MANAGE_APPLICATIONS)
                .then(Mono.defer(() -> {
                    Application application = Application.builder()
                            .applicationStatus(applicationStatus)
                            .build();
                    return applicationService.updateById(applicationId, application);
                }));
    }

    public Mono<ApplicationView> getEditingApplication(String applicationId) {
        return checkPermissionWithReadableErrorMsg(applicationId, EDIT_APPLICATIONS)
                .zipWhen(permission -> applicationService.findById(applicationId)
                        .delayUntil(application -> checkApplicationStatus(application, NORMAL)))
                .zipWhen(tuple -> applicationService.getAllDependentModulesFromApplication(tuple.getT2(), false), TupleUtils::merge)
                .zipWhen(tuple -> organizationService.getOrgCommonSettings(tuple.getT2().getOrganizationId()), TupleUtils::merge)
                .map(tuple -> {
                    ResourcePermission permission = tuple.getT1();
                    Application application = tuple.getT2();
                    List<Application> dependentModules = tuple.getT3();
                    Map<String, Object> commonSettings = tuple.getT4();
                    Map<String, Map<String, Object>> dependentModuleDsl = dependentModules.stream()
                            .collect(Collectors.toMap(Application::getId, Application::getLiveApplicationDsl, (a, b) -> b));
                    return ApplicationView.builder()
                            .applicationInfoView(buildView(application, permission.getResourceRole().getValue()))
                            .applicationDSL(application.getEditingApplicationDSL())
                            .moduleDSL(dependentModuleDsl)
                            .orgCommonSettings(commonSettings)
                            .build();
                });
    }

    public Mono<ApplicationView> getPublishedApplication(String applicationId) {
        return checkPermissionWithReadableErrorMsg(applicationId, READ_APPLICATIONS)
                .zipWhen(permission -> applicationService.findById(applicationId)
                        .delayUntil(application -> checkApplicationStatus(application, NORMAL)))
                .zipWhen(tuple -> applicationService.getAllDependentModulesFromApplication(tuple.getT2(), true), TupleUtils::merge)
                .zipWhen(tuple -> organizationService.getOrgCommonSettings(tuple.getT2().getOrganizationId()), TupleUtils::merge)
                .zipWith(getTemplateIdFromApplicationId(applicationId), TupleUtils::merge)
                .map(tuple -> {
                    ResourcePermission permission = tuple.getT1();
                    Application application = tuple.getT2();
                    List<Application> dependentModules = tuple.getT3();
                    Map<String, Object> commonSettings = tuple.getT4();
                    String templateId = tuple.getT5();
                    Map<String, Map<String, Object>> dependentModuleDsl = dependentModules.stream()
                            .collect(Collectors.toMap(Application::getId, app -> sanitizeDsl(app.getLiveApplicationDsl()), (a, b) -> b));
                    return ApplicationView.builder()
                            .applicationInfoView(buildView(application, permission.getResourceRole().getValue()))
                            .applicationDSL(sanitizeDsl(application.getLiveApplicationDsl()))
                            .moduleDSL(dependentModuleDsl)
                            .orgCommonSettings(commonSettings)
                            .templateId(templateId)
                            .build();
                })
                .delayUntil(applicationView -> {
                    if (applicationView.getApplicationInfoView().getApplicationType() == ApplicationType.COMPOUND_APPLICATION.getValue()) {
                        return compoundApplicationDslFilter.removeSubAppsFromCompoundDsl(applicationView.getApplicationDSL());
                    }
                    return Mono.empty();
                });
    }

    private Mono<String> getTemplateIdFromApplicationId(String applicationId) {
        return templateService.getByApplicationId(applicationId)
                .map(Template::getId)
                .defaultIfEmpty("")
                .onErrorResume(e -> {
                    log.error("get template from applicationId error", e);
                    return Mono.just("");
                });
    }

    public Mono<Void> updateUserApplicationLastViewTime(String applicationId) {
        return sessionUserService.getVisitorId()
                .filter(Authentication::isNotAnonymousUser)
                .flatMap(visitorId -> userApplicationInteractionService.upsert(visitorId, applicationId, Instant.now()))
                .onErrorResume(throwable -> {
                    log.error("updateUserApplicationLastViewTime error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<ApplicationView> update(String applicationId, Application application) {
        return checkApplicationStatus(applicationId, NORMAL)
                .then(sessionUserService.getVisitorId())
                .flatMap(userId -> resourcePermissionService.checkAndReturnMaxPermission(userId,
                        applicationId, EDIT_APPLICATIONS))
                .delayUntil(__ -> checkDatasourcePermissions(application))
                .flatMap(permission -> doUpdateApplication(applicationId, application)
                        .map(applicationUpdated -> ApplicationView.builder()
                                .applicationInfoView(buildView(applicationUpdated, permission.getResourceRole().getValue()))
                                .applicationDSL(applicationUpdated.getEditingApplicationDSL())
                                .build()));
    }

    private Mono<Application> doUpdateApplication(String applicationId, Application application) {
        Application applicationUpdate = Application.builder()
                .editingApplicationDSL(application.getEditingApplicationDSL())
                .name(application.getName())
                .build();
        return applicationService.updateById(applicationId, applicationUpdate)
                .then(applicationService.findById(applicationId));
    }

    public Mono<ApplicationView> publish(String applicationId) {
        return checkApplicationStatus(applicationId, NORMAL)
                .then(sessionUserService.getVisitorId())
                .flatMap(userId -> resourcePermissionService.checkAndReturnMaxPermission(userId,
                        applicationId, PUBLISH_APPLICATIONS))
                .flatMap(permission -> applicationService.publish(applicationId)
                        .map(applicationUpdated -> ApplicationView.builder()
                                .applicationInfoView(buildView(applicationUpdated, permission.getResourceRole().getValue()))
                                .applicationDSL(applicationUpdated.getLiveApplicationDsl())
                                .build()));
    }

    public Mono<Boolean> grantPermission(String applicationId,
            Set<String> userIds,
            Set<String> groupIds, ResourceRole role) {
        if (userIds.isEmpty() && groupIds.isEmpty()) {
            return Mono.just(true);
        }

        return checkCurrentUserApplicationPermission(applicationId, MANAGE_APPLICATIONS)
                .then(applicationService.findByIdWithoutDsl(applicationId))
                .delayUntil(application -> checkApplicationStatus(application, NORMAL))
                .switchIfEmpty(deferredError(BizError.APPLICATION_NOT_FOUND, "APPLICATION_NOT_FOUND", applicationId))
                .then(resourcePermissionService.insertBatchPermission(ResourceType.APPLICATION, applicationId,
                        userIds, groupIds, role))
                .thenReturn(true);
    }

    public Mono<Boolean> updatePermission(String applicationId, String permissionId, ResourceRole role) {
        return checkCurrentUserApplicationPermission(applicationId, MANAGE_APPLICATIONS)
                .then(checkApplicationStatus(applicationId, NORMAL))
                .then(resourcePermissionService.getById(permissionId))
                .filter(permission -> StringUtils.equals(permission.getResourceId(), applicationId))
                .switchIfEmpty(deferredError(ILLEGAL_APPLICATION_PERMISSION_ID, "ILLEGAL_APPLICATION_PERMISSION_ID"))
                .then(resourcePermissionService.updateRoleById(permissionId, role));

    }

    public Mono<Boolean> removePermission(String applicationId, String permissionId) {
        return checkCurrentUserApplicationPermission(applicationId, MANAGE_APPLICATIONS)
                .then(checkApplicationStatus(applicationId, NORMAL))
                .then(resourcePermissionService.getById(permissionId))
                .filter(permission -> StringUtils.equals(permission.getResourceId(), applicationId))
                .switchIfEmpty(deferredError(ILLEGAL_APPLICATION_PERMISSION_ID, "ILLEGAL_APPLICATION_PERMISSION_ID"))
                .then(resourcePermissionService.removeById(permissionId));
    }

    public Mono<ApplicationPermissionView> getApplicationPermissions(String applicationId) {

        Mono<List<ResourcePermission>> applicationPermissions = resourcePermissionService.getByApplicationId(applicationId).cache();

        Mono<List<PermissionItemView>> groupPermissionPairsMono = applicationPermissions
                .flatMap(permissionHelper::getGroupPermissions);

        Mono<List<PermissionItemView>> userPermissionPairsMono = applicationPermissions
                .flatMap(permissionHelper::getUserPermissions);

        return checkCurrentUserApplicationPermission(applicationId, READ_APPLICATIONS)
                .then(applicationService.findByIdWithoutDsl(applicationId))
                .delayUntil(application -> checkApplicationStatus(application, NORMAL))
                .flatMap(application -> {
                    String creatorId = application.getCreatedBy();
                    String orgId = application.getOrganizationId();

                    Mono<Organization> orgMono = organizationService.getById(orgId);
                    return Mono.zip(groupPermissionPairsMono, userPermissionPairsMono, orgMono)
                            .map(tuple -> {
                                List<PermissionItemView> groupPermissionPairs = tuple.getT1();
                                List<PermissionItemView> userPermissionPairs = tuple.getT2();
                                Organization organization = tuple.getT3();
                                return ApplicationPermissionView.builder()
                                        .groupPermissions(groupPermissionPairs)
                                        .userPermissions(userPermissionPairs)
                                        .creatorId(creatorId)
                                        .orgName(organization.getName())
                                        .publicToAll(application.isPublicToAll())
                                        .build();
                            });
                });
    }

    public Mono<ApplicationView> createFromTemplate(String templateId) {
        return sessionUserService.getVisitorOrgMemberCache()
                .delayUntil(orgMember -> orgDevChecker.checkCurrentOrgDev())
                .delayUntil(bizThresholdChecker::checkMaxOrgApplicationCount)
                .flatMap(orgMember -> templateSolution.createFromTemplate(templateId, orgMember.getOrgId(), orgMember.getUserId())
                        .map(applicationCreated -> ApplicationView.builder()
                                .applicationInfoView(buildView(applicationCreated))
                                .applicationDSL(applicationCreated.getEditingApplicationDSL())
                                .build()));
    }

    @Nonnull
    public Mono<ResourcePermission> checkPermissionWithReadableErrorMsg(String applicationId, ResourceAction action) {
        return sessionUserService.getVisitorId()
                .flatMap(visitorId -> resourcePermissionService.checkUserPermissionStatusOnResource(visitorId, applicationId, action))
                .flatMap(permissionStatus -> {
                    if (!permissionStatus.hasPermission()) {
                        if (permissionStatus.failByAnonymousUser()) {
                            return ofError(USER_NOT_SIGNED_IN, "USER_NOT_SIGNED_IN");
                        }

                        if (permissionStatus.failByNotInOrg()) {
                            return ofError(NO_PERMISSION_TO_REQUEST_APP, "INSUFFICIENT_PERMISSION");
                        }

                        return suggestAppAdminSolution.getSuggestAppAdminNames(applicationId)
                                .flatMap(names -> {
                                    String messageKey = action == EDIT_APPLICATIONS ? "NO_PERMISSION_TO_EDIT" : "NO_PERMISSION_TO_VIEW";
                                    return ofError(NO_PERMISSION_TO_REQUEST_APP, messageKey, names);
                                });
                    }
                    return Mono.just(permissionStatus.getPermission());
                });
    }

    private ApplicationInfoView buildView(Application application, String role) {
        return buildView(application, role, null);
    }

    private ApplicationInfoView buildView(Application application, String role, @Nullable String folderId) {
        return ApplicationInfoView.builder()
                .applicationId(application.getId())
                .orgId(application.getOrganizationId())
                .name(application.getName())
                .createBy(application.getCreatedBy())
                .createAt(application.getCreatedAt().toEpochMilli())
                .role(role)
                .applicationType(application.getApplicationType())
                .applicationStatus(application.getApplicationStatus())
                .folderId(folderId)
                .publicToAll(application.isPublicToAll())
                .build();
    }

    private ApplicationInfoView buildView(Application application) {
        return buildView(application, "");
    }

    public Mono<Boolean> setApplicationPublicToAll(String applicationId, boolean publicToAll) {
        return checkCurrentUserApplicationPermission(applicationId, ResourceAction.SET_APPLICATIONS_PUBLIC)
                .then(checkApplicationStatus(applicationId, NORMAL))
                .then(applicationService.setApplicationPublicToAll(applicationId, publicToAll));
    }

    private Map<String, Object> sanitizeDsl(Map<String, Object> applicationDsl) {
        if (applicationDsl.get("queries") instanceof List<?> queries) {
            List<Map<String, Object>> list = queries.stream().map(this::doSanitizeQuery).toList();
            applicationDsl.put("queries", list);
            return applicationDsl;
        }
        return applicationDsl;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> doSanitizeQuery(Object query) {
        if (!(query instanceof Map)) {
            return Maps.newHashMap();
        }
        Map<String, Object> queryMap = (Map<String, Object>) query;
        Object compType = ((Map<?, ?>) query).get("compType");
        if (!(compType instanceof String datasourceType)) {
            return queryMap;
        }
        if (LIBRARY_QUERY_DATASOURCE_TYPE.equalsIgnoreCase(datasourceType) ||
                JS_DATASOURCE_TYPE.equalsIgnoreCase(datasourceType) ||
                VIEW_DATASOURCE_TYPE.equalsIgnoreCase(datasourceType)) {
            return queryMap;
        }
        QueryExecutor<?, Object, ?> queryExecutor;
        try {
            queryExecutor = datasourceMetaInfoService.getQueryExecutor(datasourceType);
        } catch (Exception e) {
            return queryMap;
        }
        Object comp = queryMap.get("comp");
        if (!(comp instanceof Map<?, ?> queryConfig)) {
            return queryMap;
        }
        Map<String, Object> sanitizedQueryConfig;
        try {
            sanitizedQueryConfig = queryExecutor.sanitizeQueryConfig((Map<String, Object>) queryConfig);
        } catch (Exception e) {
            return queryMap;
        }
        queryMap.put("comp", sanitizedQueryConfig);
        if (isDesensitizedQueryConfig(sanitizedQueryConfig)) {
            queryMap.put("compType", "view");
        }
        return queryMap;
    }

    private boolean isDesensitizedQueryConfig(Map<String, Object> queryConfig) {
        return queryConfig.size() == 1 && queryConfig.containsKey("fields");
    }

    private Mono<Void> checkDatasourcePermissions(Application application) {
        return Mono.defer(() -> {
            Set<String> datasourceIds = SetUtils.emptyIfNull(application.getEditingQueries())
                    .stream()
                    .map(applicationQuery -> applicationQuery.getBaseQuery().getDatasourceId())
                    .filter(StringUtils::isNotBlank)
                    .filter(Datasource::isNotSystemStaticId)
                    .collect(Collectors.toSet());
            if (CollectionUtils.isEmpty(datasourceIds)) {
                return Mono.empty();
            }

            String organizationId = application.getOrganizationId();
            return sessionUserService.getVisitorId()
                    .flatMap(userId -> resourcePermissionService.getMaxMatchingPermission(userId, datasourceIds, USE_DATASOURCES))
                    .zipWith(datasourceService.retainNoneExistAndNonCurrentOrgDatasourceIds(datasourceIds, organizationId).collectList())
                    .flatMap(tuple -> {
                        Set<String> hasPermissionDatasourceIds = tuple.getT1().keySet();
                        List<String> noneExistDatasourceIds = tuple.getT2();

                        if (Sets.union(hasPermissionDatasourceIds, new HashSet<>(noneExistDatasourceIds)).containsAll(datasourceIds)) {
                            return Mono.empty();
                        }
                        return ExceptionUtils.ofError(BizError.NOT_AUTHORIZED, "APPLICATION_EDIT_ERROR_LACK_OF_DATASOURCE_PERMISSIONS");
                    });
        });
    }
}
