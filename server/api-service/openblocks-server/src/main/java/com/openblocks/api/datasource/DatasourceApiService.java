package com.openblocks.api.datasource;

import static com.openblocks.domain.permission.model.ResourceAction.MANAGE_DATASOURCES;
import static com.openblocks.domain.permission.model.ResourceAction.USE_DATASOURCES;
import static com.openblocks.sdk.exception.BizError.NOT_AUTHORIZED;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.permission.PermissionHelper;
import com.openblocks.api.permission.view.CommonPermissionView;
import com.openblocks.api.permission.view.PermissionItemView;
import com.openblocks.api.usermanagement.OrgDevChecker;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceStatus;
import com.openblocks.domain.datasource.service.DatasourceConnectionPool;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.constants.FieldName;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.exception.ServerException;
import com.openblocks.sdk.models.DatasourceTestResult;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class DatasourceApiService {

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private DatasourceService datasourceService;

    @Autowired
    private ResourcePermissionService resourcePermissionService;
    @Autowired
    private PermissionHelper permissionHelper;
    @Autowired
    private OrgDevChecker orgDevChecker;

    @Autowired
    private UserService userService;
    @Autowired
    private DatasourceConnectionPool datasourceConnectionPool;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private ApplicationService applicationService;

    public Mono<Datasource> create(Datasource datasource) {
        return sessionUserService.getVisitorId()
                .flatMap(userId -> orgMemberService.getOrgMember(datasource.getOrganizationId(), userId))
                .switchIfEmpty(deferredError(NOT_AUTHORIZED, "NOT_AUTHORIZED"))
                .delayUntil(orgMember -> orgDevChecker.checkCurrentOrgDev())
                .flatMap(orgMember -> datasourceService.create(datasource, orgMember.getUserId()));
    }

    public Flux<DatasourceView> listOrgDataSources(String orgId) {
        // get datasource
        Flux<Datasource> datasourceFlux = datasourceService.getByOrgId(orgId)
                .filter(datasource -> datasource.getDatasourceStatus() == DatasourceStatus.NORMAL)
                .cache();

        // get user-datasource permissions
        Mono<Map<String, ResourcePermission>> datasourceId2MaxPermissionMapMono = datasourceFlux
                .map(Datasource::getId)
                .collectList()
                .zipWith(sessionUserService.getVisitorId())
                .flatMap(tuple -> {
                    List<String> allDatasourceIds = tuple.getT1();
                    String visitorId = tuple.getT2();
                    return resourcePermissionService.getMaxMatchingPermission(visitorId, allDatasourceIds, USE_DATASOURCES);
                })
                .cache();

        // filter by user-datasource permissions
        datasourceFlux = datasourceFlux
                .filterWhen(datasource ->
                        datasourceId2MaxPermissionMapMono.map(map -> {
                            ResourcePermission maxPermission = map.get(datasource.getId());
                            return maxPermission != null && maxPermission.getResourceRole().canDo(USE_DATASOURCES);
                        }))
                .cache();

        // get datasource creator
        Mono<Map<String, User>> userMapMono = datasourceFlux.map(Datasource::getCreatedBy)
                .collectList()
                .flatMap(userIds -> userService.getByIds(userIds))
                .cache();

        // build view
        return datasourceFlux.flatMap(datasource ->
                Mono.zip(datasourceId2MaxPermissionMapMono, userMapMono)
                        .map(tuple -> {
                            Map<String, ResourcePermission> datasourceId2MaxPermissionMap = tuple.getT1();
                            Map<String, User> userMap = tuple.getT2();
                            User creator = userMap.get(datasource.getCreatedBy());
                            ResourcePermission maxPermission = datasourceId2MaxPermissionMap.get(datasource.getId());
                            boolean manage = maxPermission != null && maxPermission.getResourceRole().canDo(MANAGE_DATASOURCES);
                            return new DatasourceView(datasource, manage, creator == null ? null : creator.getName());
                        }));
    }

    public Flux<DatasourceView> listAppDataSources(String appId) {
        return applicationService.findById(appId)
                .flatMapMany(application -> listOrgDataSources(application.getOrganizationId()));
    }

    public Mono<Datasource> update(String datasourceId, Datasource updatedDatasource) {
        if (datasourceId == null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ID));
        }

        return checkCurrentUserManageDatasourcePermission(datasourceId)
                .then(datasourceService.update(datasourceId, updatedDatasource));
    }

    public Mono<Datasource> findByIdWithPermission(String datasourceId) {
        return checkCurrentUserManageDatasourcePermission(datasourceId)
                .then(datasourceService.getById(datasourceId));
    }

    public Mono<DatasourceTestResult> testDatasource(Datasource testDatasource) {
        return Mono.defer(() -> {
                    if (testDatasource.getId() != null) {
                        return checkCurrentUserManageDatasourcePermission(testDatasource.getId());
                    }
                    return Mono.empty();
                })
                .then(datasourceService.testDatasource(testDatasource));
    }

    public Mono<Boolean> delete(String datasourceId) {

        return checkCurrentUserManageDatasourcePermission(datasourceId)
                .then(datasourceService.delete(datasourceId));
    }

    public Object info(@Nullable String datasourceId) {
        return datasourceConnectionPool.info(datasourceId);
    }

    // ================================ PERMISSIONS ================================

    public Mono<CommonPermissionView> getPermissions(String datasourceId) {
        Mono<List<ResourcePermission>> allPermissionListMono = resourcePermissionService.getByDataSourceId(datasourceId).cache();
        Mono<List<PermissionItemView>> groupPermissionListMono = allPermissionListMono.flatMap(permissionHelper::getGroupPermissions);
        Mono<List<PermissionItemView>> userPermissionListMono = allPermissionListMono.flatMap(permissionHelper::getUserPermissions);

        return datasourceService.getById(datasourceId)
                .switchIfEmpty(Mono.error(new ServerException("data source not exist. {}", datasourceId)))
                .delayUntil(__ -> checkCurrentUserManageDatasourcePermission(datasourceId))
                .flatMap(datasource -> Mono.zip(groupPermissionListMono, userPermissionListMono, Mono.just(datasource.getCreatedBy()),
                        organizationService.getById(datasource.getOrganizationId())))
                .map(tuple -> {
                    List<PermissionItemView> groupPermissions = tuple.getT1();
                    List<PermissionItemView> userPermissions = tuple.getT2();
                    String creator = tuple.getT3();
                    Organization organization = tuple.getT4();
                    return CommonPermissionView.builder()
                            .groupPermissions(groupPermissions)
                            .userPermissions(userPermissions)
                            .creatorId(creator)
                            .orgName(organization.getName())
                            .build();
                });
    }

    public Mono<Boolean> grantPermission(String datasourceId, @Nullable Set<String> userIds, @Nullable Set<String> groupIds, ResourceRole role) {

        if (CollectionUtils.isEmpty(userIds) && CollectionUtils.isEmpty(groupIds)) {
            return Mono.just(true);
        }

        return checkCurrentUserManageDatasourcePermission(datasourceId)
                .then(checkRole(role))
                .then(datasourceService.getById(datasourceId))
                .switchIfEmpty(deferredError(BizError.DATASOURCE_NOT_FOUND, "DATASOURCE_NOT_FOUND", datasourceId))
                .then(resourcePermissionService.insertBatchPermission(ResourceType.DATASOURCE, datasourceId, userIds, groupIds, role))
                .thenReturn(true);
    }

    public Mono<Boolean> updatePermission(String permissionId, ResourceRole role) {
        return checkBeforePermissionDeleteOrUpdate(permissionId)
                .then(checkRole(role))
                .then(resourcePermissionService.updateRoleById(permissionId, role));
    }

    public Mono<Boolean> deletePermission(String permissionId) {
        return checkBeforePermissionDeleteOrUpdate(permissionId)
                .then(resourcePermissionService.removeById(permissionId));
    }

    private Mono<Void> checkRole(ResourceRole role) {
        if (MANAGE_DATASOURCES.getRole() == role || USE_DATASOURCES.getRole() == role) {
            return Mono.empty();
        }
        return Mono.error(new ServerException("error role for datasource. {}", role));
    }

    private Mono<Void> checkBeforePermissionDeleteOrUpdate(String permissionId) {
        return resourcePermissionService.getById(permissionId)
                .switchIfEmpty(Mono.error(new ServerException("permission not exist. {}", permissionId)))
                .delayUntil(resourcePermission -> {
                    if (resourcePermission.getResourceType() != ResourceType.DATASOURCE) {
                        return Mono.error(new ServerException("resource type should be datasource. {}", permissionId));
                    }
                    return Mono.empty();
                })
                .flatMap(resourcePermission -> checkCurrentUserManageDatasourcePermission(resourcePermission.getResourceId()));
    }

    /**
     * check if current user has the permission of managing the datasource.
     */
    private Mono<Void> checkCurrentUserManageDatasourcePermission(String datasourceId) {
        return sessionUserService.getVisitorId()
                .flatMap(visitorId -> resourcePermissionService.checkResourcePermissionWithError(visitorId, datasourceId, MANAGE_DATASOURCES));
    }
}
