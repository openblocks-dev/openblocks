package com.openblocks.api.datasource;

import static com.openblocks.api.util.ViewBuilder.multiBuild;
import static com.openblocks.domain.permission.model.ResourceAction.MANAGE_DATASOURCES;
import static com.openblocks.sdk.exception.BizError.NOT_AUTHORIZED;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;

import java.util.List;
import java.util.Set;

import javax.annotation.Nullable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.usermanagement.OrgDevChecker;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceStatus;
import com.openblocks.domain.datasource.service.DatasourceConnectionPool;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.constants.FieldName;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.models.DatasourceTestResult;

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
    private OrgDevChecker orgDevChecker;

    @Autowired
    private UserService userService;
    @Autowired
    private DatasourceConnectionPool datasourceConnectionPool;


    public Mono<Datasource> create(Datasource datasource) {
        return sessionUserService.getVisitorId()
                .flatMap(userId -> orgMemberService.getOrgMember(datasource.getOrganizationId(), userId))
                .switchIfEmpty(deferredError(NOT_AUTHORIZED, "NOT_AUTHORIZED"))
                .delayUntil(orgMember -> orgDevChecker.checkCurrentOrgDev())
                .flatMap(orgMember -> datasourceService.create(datasource, orgMember.getUserId()));
    }

    @SuppressWarnings("ConstantConditions")
    public Mono<List<DatasourceView>> listOrgDataSources(String orgId) {
        Mono<String> userIdMono = sessionUserService.getVisitorId();
        Mono<OrgMember> orgMemberMono = userIdMono.flatMap(userId -> orgMemberService.getOrgMember(orgId, userId));
        Mono<List<Datasource>> datasourceMono = datasourceService.getByOrgId(orgId)
                .map(list -> list.stream()
                        .filter(datasource -> datasource.getDatasourceStatus() == DatasourceStatus.NORMAL)
                        .toList())
                .cache();
        Mono<List<String>> managedDatasourceIdListMono = Mono.zip(userIdMono, datasourceMono)
                .flatMap(tuple2 -> {
                    String userId = tuple2.getT1();
                    List<Datasource> datasourceList = tuple2.getT2();
                    List<String> dataSourceIdList = datasourceList.stream().map(Datasource::getId).toList();

                    return resourcePermissionService.filterResourceWithPermission(userId,
                            dataSourceIdList,
                            MANAGE_DATASOURCES);
                });

        Mono<List<DatasourceView>> datasourceViewListMono = Mono.zip(
                        managedDatasourceIdListMono,
                        datasourceMono)
                .flatMap(tuple -> {
                    List<String> managedDatasourceIdList = tuple.getT1();
                    List<Datasource> datasourceList = tuple.getT2();
                    return Mono.just(datasourceList
                            .stream()
                            .map(datasource -> new DatasourceView(datasource,
                                    managedDatasourceIdList.contains(datasource.getId())))
                            .toList());
                });

        datasourceViewListMono = injectCreatorName(datasourceViewListMono);
        return orgMemberMono.switchIfEmpty(deferredError(NOT_AUTHORIZED, "NOT_AUTHORIZED"))
                .then(datasourceViewListMono);
    }

    @SuppressWarnings("ConstantConditions")
    public Mono<List<DatasourceView>> listAppDataSources(String appId) {
        Mono<String> userIdMono = sessionUserService.getVisitorId();
        Mono<List<Datasource>> datasourceMono = datasourceService.getByAppId(appId)
                .map(list -> list.stream()
                        .filter(datasource -> datasource.getDatasourceStatus() == DatasourceStatus.NORMAL)
                        .toList())
                .cache();
        Mono<List<String>> managedDatasourceIdListMono = Mono.zip(datasourceMono, userIdMono)
                .flatMap(tuple2 -> {
                    List<Datasource> datasourceList = tuple2.getT1();
                    String userId = tuple2.getT2();
                    List<String> dataSourceIdList = datasourceList.stream().map(Datasource::getId).toList();
                    return resourcePermissionService.filterResourceWithPermission(userId, dataSourceIdList, MANAGE_DATASOURCES);
                });


        Mono<List<DatasourceView>> datasourceViewListMono = userIdMono
                .flatMap(userId -> resourcePermissionService.checkResourcePermissionWithError(userId, appId, ResourceAction.EDIT_APPLICATIONS))
                .then(Mono.zip(managedDatasourceIdListMono, datasourceMono)
                        .flatMap(tuple -> {
                            List<String> managedDatasourceIdList = tuple.getT1();
                            List<Datasource> datasourceList = tuple.getT2();
                            return Mono.just(datasourceList
                                    .stream()
                                    .map(datasource -> new DatasourceView(datasource,
                                            managedDatasourceIdList.contains(datasource.getId())))
                                    .toList());
                        }));
        return injectCreatorName(datasourceViewListMono);
    }

    private Mono<List<DatasourceView>> injectCreatorName(Mono<List<DatasourceView>> datasourceViewListMono) {
        return datasourceViewListMono.flatMap(datasourceViews -> multiBuild(datasourceViews,
                datasourceView -> datasourceView.datasource().getCreatedBy(),
                userService::getByIds,
                (view, user) -> new DatasourceView(view.datasource(), view.edit(), user.getName())));
    }

    public Mono<Boolean> grantPermission(String datasourceId,
            Set<String> userIds,
            Set<String> groupIds, ResourceRole role) {
        if (userIds.isEmpty() && groupIds.isEmpty()) {
            return Mono.just(true);
        }

        return sessionUserService.getVisitorId()
                .delayUntil(visitorId -> resourcePermissionService.checkResourcePermissionWithError(visitorId, datasourceId, MANAGE_DATASOURCES))
                .flatMap(visitorId -> datasourceService.getById(datasourceId)
                        .switchIfEmpty(deferredError(BizError.NOT_AUTHORIZED, "NOT_AUTHORIZED"))
                        .then(resourcePermissionService.insertBatchPermission(ResourceType.DATASOURCE, datasourceId,
                                userIds, groupIds, role))
                        .thenReturn(true));
    }

    public Mono<Datasource> update(String datasourceId, Datasource updatedDatasource) {
        if (datasourceId == null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ID));
        }

        return sessionUserService.getVisitorId()
                .flatMap(visitorId -> resourcePermissionService.checkResourcePermissionWithError(visitorId, datasourceId, MANAGE_DATASOURCES))
                .then(datasourceService.update(datasourceId, updatedDatasource));
    }

    public Mono<Datasource> findByIdWithPermission(String datasourceId) {
        return sessionUserService.getVisitorId()
                .delayUntil(visitorId -> resourcePermissionService.checkResourcePermissionWithError(visitorId, datasourceId, MANAGE_DATASOURCES))
                .flatMap(visitorId -> datasourceService.getById(datasourceId));
    }

    public Mono<DatasourceTestResult> testDatasource(Datasource testDatasource) {
        return sessionUserService.getVisitorId()
                .delayUntil(visitorId -> {
                    if (testDatasource.getId() != null) {
                        return resourcePermissionService.checkResourcePermissionWithError(visitorId, testDatasource.getId(), MANAGE_DATASOURCES);
                    }
                    return Mono.empty();
                })
                .then(datasourceService.testDatasource(testDatasource));
    }

    public Mono<Boolean> delete(String datasourceId) {

        return sessionUserService.getVisitorId()
                .delayUntil(visitorId -> resourcePermissionService.checkResourcePermissionWithError(visitorId, datasourceId, MANAGE_DATASOURCES))
                .flatMap(visitorId -> datasourceService.delete(datasourceId));

    }

    public Object info(@Nullable String datasourceId) {
        return datasourceConnectionPool.info(datasourceId);
    }
}
