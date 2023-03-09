package com.openblocks.api.query;

import static com.openblocks.domain.organization.model.OrgMember.NOT_EXIST;
import static com.openblocks.sdk.exception.BizError.LIBRARY_QUERY_AND_ORG_NOT_MATCH;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static org.apache.commons.lang3.StringUtils.firstNonBlank;

import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.query.view.LibraryQueryAggregateView;
import com.openblocks.api.query.view.LibraryQueryPublishRequest;
import com.openblocks.api.query.view.LibraryQueryRecordMetaView;
import com.openblocks.api.query.view.LibraryQueryRequestFromJs;
import com.openblocks.api.query.view.LibraryQueryView;
import com.openblocks.api.query.view.QueryExecutionRequest;
import com.openblocks.api.query.view.UpsertLibraryQueryRequest;
import com.openblocks.api.usermanagement.OrgDevChecker;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.api.util.ViewBuilder;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.query.model.BaseQuery;
import com.openblocks.domain.query.model.LibraryQuery;
import com.openblocks.domain.query.model.LibraryQueryCombineId;
import com.openblocks.domain.query.model.LibraryQueryRecord;
import com.openblocks.domain.query.service.LibraryQueryRecordService;
import com.openblocks.domain.query.service.LibraryQueryService;
import com.openblocks.domain.query.service.QueryExecutionService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.PluginCommonError;
import com.openblocks.sdk.models.Property;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.query.QueryVisitorContext;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Timed;

@Service
public class LibraryQueryApiService {

    @Autowired
    private LibraryQueryService libraryQueryService;

    @Autowired
    private LibraryQueryRecordService libraryQueryRecordService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrgDevChecker orgDevChecker;

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private QueryExecutionService queryExecutionService;

    @Autowired
    private DatasourceService datasourceService;

    @Autowired
    private BusinessEventPublisher businessEventPublisher;

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    @Autowired
    private CommonConfig commonConfig;

    @Value("${server.port}")
    private int port;

    public Mono<List<LibraryQueryView>> listLibraryQueries() {
        return orgDevChecker.checkCurrentOrgDev()
                .then(sessionUserService.getVisitorOrgMemberCache())
                .flatMapMany(orgMember -> getByOrgIdWithDatasourcePermissions(orgMember.getOrgId()))
                .collectList()
                .flatMap(libraryQueries -> ViewBuilder.multiBuild(libraryQueries,
                        LibraryQuery::getCreatedBy,
                        userService::getByIds,
                        LibraryQueryView::from));
    }

    private Flux<LibraryQuery> getByOrgIdWithDatasourcePermissions(String orgId) {
        Flux<LibraryQuery> libraryQueryFlux = libraryQueryService.getByOrganizationId(orgId)
                .cache();

        Mono<List<String>> datasourceIdListMono = libraryQueryFlux.map(libraryQuery -> libraryQuery.getQuery().getDatasourceId())
                .filter(StringUtils::isNotBlank)
                .collectList()
                .cache();

        Mono<HashSet<String>> datasourceIdSetWithPermissionsOrNoneExists = datasourceIdListMono
                .zipWith(sessionUserService.getVisitorId())
                .flatMapMany(tuple -> {
                    List<String> datasourceIds = tuple.getT1();
                    String userId = tuple.getT2();
                    return resourcePermissionService.filterResourceWithPermission(userId, datasourceIds, ResourceAction.USE_DATASOURCES);
                })
                .concatWith(datasourceIdListMono.flatMapMany(
                        datasourceIds -> datasourceService.retainNoneExistAndNonCurrentOrgDatasourceIds(datasourceIds, orgId)))
                .collectList()
                .map(HashSet::new)
                .cache();

        return libraryQueryFlux
                .filterWhen(libraryQuery -> datasourceIdSetWithPermissionsOrNoneExists.map(
                        set -> set.contains(libraryQuery.getQuery().getDatasourceId())));
    }

    public Mono<LibraryQueryView> create(LibraryQuery libraryQuery) {
        return checkLibraryQueryManagementPermission(libraryQuery)
                .then(libraryQueryService.insert(libraryQuery))
                .zipWhen(lb -> userService.findById(lb.getCreatedBy()))
                .map(tuple -> LibraryQueryView.from(tuple.getT1(), tuple.getT2()));
    }

    public Mono<Boolean> update(String libraryQueryId, UpsertLibraryQueryRequest upsertLibraryQueryRequest) {
        LibraryQuery updateLibraryQuery = LibraryQuery.builder()
                .name(upsertLibraryQueryRequest.getName())
                .libraryQueryDSL(upsertLibraryQueryRequest.getLibraryQueryDSL())
                .build();
        return checkLibraryQueryManagementPermission(libraryQueryId)
                .then(libraryQueryService.update(libraryQueryId, updateLibraryQuery));
    }

    public Mono<Void> delete(String libraryQueryId) {
        return checkLibraryQueryManagementPermission(libraryQueryId)
                .then(libraryQueryService.delete(libraryQueryId))
                .then(libraryQueryRecordService.deleteAllLibraryQueryTagByLibraryQueryId(libraryQueryId))
                .then();
    }

    public Mono<LibraryQueryRecordMetaView> publish(String libraryQueryId, LibraryQueryPublishRequest libraryQueryPublishRequest) {
        return checkLibraryQueryManagementPermission(libraryQueryId)
                .then(libraryQueryService.getById(libraryQueryId))
                .map(libraryQuery -> LibraryQueryRecord.builder()
                        .tag(libraryQueryPublishRequest.tag())
                        .commitMessage(libraryQueryPublishRequest.commitMessage())
                        .libraryQueryId(libraryQuery.getId())
                        .libraryQueryDSL(libraryQuery.getLibraryQueryDSL())
                        .build())
                .flatMap(libraryQueryRecordService::insert)
                .zipWhen(libraryQueryRecord -> userService.findById(libraryQueryRecord.getCreatedBy()))
                .map(tuple -> LibraryQueryRecordMetaView.from(tuple.getT1(), tuple.getT2()));
    }

    @SuppressWarnings("ConstantConditions")
    public Mono<List<LibraryQueryAggregateView>> dropDownList() {
        Mono<List<LibraryQuery>> libraryQueryListMono = sessionUserService.getVisitorOrgMemberCache()
                .flatMapMany(orgMember -> getByOrgIdWithDatasourcePermissions(orgMember.getOrgId()))
                .collectList()
                .cache();

        Mono<Map<String, List<LibraryQueryRecord>>> recordMapMono = libraryQueryListMono
                .map(libraryQueryList -> libraryQueryList.stream().map(LibraryQuery::getId).toList())
                .flatMap(libraryQueryRecordService::getByLibraryQueryIdIn);
        Mono<Map<String, User>> userMapMono = libraryQueryListMono
                .map(libraryQueryList -> libraryQueryList.stream().map(LibraryQuery::getCreatedBy).toList())
                .flatMap(userService::getByIds);

        return Mono.zip(libraryQueryListMono, recordMapMono, userMapMono)
                .map(tuple -> {
                    List<LibraryQuery> libraryQueryList = tuple.getT1();
                    Map<String, List<LibraryQueryRecord>> recordMap = tuple.getT2();
                    Map<String, User> userMap = tuple.getT3();
                    return libraryQueryList.stream()
                            .map(libraryQuery -> {
                                if (CollectionUtils.isEmpty(recordMap.get(libraryQuery.getId()))) {
                                    User user = userMap.get(libraryQuery.getCreatedBy());
                                    return LibraryQueryAggregateView.from(libraryQuery, user);
                                }
                                List<LibraryQueryRecord> recordList = recordMap.get(libraryQuery.getId());
                                User user = userMap.get(libraryQuery.getCreatedBy());
                                return LibraryQueryAggregateView.from(libraryQuery, user, recordList);
                            }).toList();
                });
    }

    private Mono<Void> checkLibraryQueryManagementPermission(LibraryQuery libraryQuery) {
        return orgDevChecker.checkCurrentOrgDev()
                .then(sessionUserService.getVisitorOrgMemberCache())
                .flatMap(orgMember -> {
                    if (!orgMember.getOrgId().equals(libraryQuery.getOrganizationId())) {
                        return ofError(LIBRARY_QUERY_AND_ORG_NOT_MATCH, "LIBRARY_QUERY_AND_ORG_NOT_MATCH");
                    }
                    return Mono.empty();
                });
    }

    Mono<Void> checkLibraryQueryManagementPermission(String libraryId) {
        return orgDevChecker.checkCurrentOrgDev()
                .then(sessionUserService.getVisitorOrgMemberCache())
                .zipWith(libraryQueryService.getById(libraryId))
                .flatMap(tuple2 -> {
                    OrgMember orgMember = tuple2.getT1();
                    LibraryQuery libraryQuery = tuple2.getT2();
                    if (!orgMember.getOrgId().equals(libraryQuery.getOrganizationId())) {
                        return ofError(LIBRARY_QUERY_AND_ORG_NOT_MATCH, "LIBRARY_QUERY_AND_ORG_NOT_MATCH");
                    }
                    return Mono.empty();
                });
    }

    Mono<Void> checkLibraryQueryViewPermission(String libraryId) {
        return sessionUserService.getVisitorOrgMemberCache()
                .zipWith(libraryQueryService.getById(libraryId))
                .flatMap(tuple2 -> {
                    OrgMember orgMember = tuple2.getT1();
                    LibraryQuery libraryQuery = tuple2.getT2();
                    if (!orgMember.getOrgId().equals(libraryQuery.getOrganizationId())) {
                        return ofError(LIBRARY_QUERY_AND_ORG_NOT_MATCH, "LIBRARY_QUERY_AND_ORG_NOT_MATCH");
                    }
                    return Mono.empty();
                });
    }

    public Mono<QueryExecutionResult> executeLibraryQueryFromJs(ServerWebExchange exchange, LibraryQueryRequestFromJs request) {

        Mono<BaseQuery> baseQueryMono = getQueryBaseFromQueryName(request.getLibraryQueryName(), request.getLibraryQueryRecordId()).cache();

        Mono<Datasource> datasourceMono = baseQueryMono.flatMap(query -> datasourceService.getById(query.getDatasourceId())
                        .switchIfEmpty(deferredError(BizError.DATASOURCE_NOT_FOUND, "DATASOURCE_NOT_FOUND", query.getDatasourceId())))
                .cache();

        Mono<OrgMember> visitorOrgMemberCache = sessionUserService.getVisitorOrgMemberCache()
                .onErrorReturn(NOT_EXIST);
        return Mono.zip(visitorOrgMemberCache, baseQueryMono, datasourceMono)
                .flatMap(tuple -> {
                    OrgMember orgMember = tuple.getT1();
                    String orgId = orgMember.getOrgId();
                    String userId = orgMember.getUserId();
                    BaseQuery baseQuery = tuple.getT2();
                    Datasource datasource = tuple.getT3();
                    Mono<List<Property>> paramsAndHeadersInheritFromLogin = orgMember.isInvalid()
                                                                            ? Mono.empty() : getParamsAndHeadersInheritFromLogin(userId, orgId);

                    QueryVisitorContext queryVisitorContext = new QueryVisitorContext(userId, orgId, port,
                            exchange.getRequest().getCookies(),
                            paramsAndHeadersInheritFromLogin,
                            commonConfig.getDisallowedHosts());

                    Map<String, Object> queryConfig = baseQuery.getQueryConfig();
                    String timeoutStr = firstNonBlank(baseQuery.getTimeoutStr(), "5s");

                    return queryExecutionService.executeQuery(datasource, queryConfig, request.paramMap(), timeoutStr,
                                    queryVisitorContext)
                            .onErrorResume(throwable -> Mono.just(QueryExecutionResult.error(PluginCommonError.QUERY_EXECUTION_ERROR,
                                    "QUERY_EXECUTION_ERROR", throwable.getMessage())));
                });
    }

    private Mono<BaseQuery> getQueryBaseFromQueryName(String libraryQueryName, String libraryQueryRecordId) {
        return libraryQueryService.getByName(libraryQueryName)
                .map(libraryQuery -> new LibraryQueryCombineId(libraryQuery.getId(), libraryQueryRecordId))
                .flatMap(this::getBaseQuery);
    }

    public Mono<QueryExecutionResult> executeLibraryQuery(ServerWebExchange exchange, QueryExecutionRequest queryExecutionRequest) {

        MultiValueMap<String, HttpCookie> cookies = exchange.getRequest().getCookies();
        Mono<BaseQuery> baseQueryMono = libraryQueryService.getEditingBaseQueryByLibraryQueryId(
                queryExecutionRequest.getLibraryQueryCombineId().libraryQueryId()).cache();
        Mono<Datasource> datasourceMono = baseQueryMono.flatMap(query -> datasourceService.getById(query.getDatasourceId())
                .switchIfEmpty(deferredError(BizError.DATASOURCE_NOT_FOUND, "DATASOURCE_NOT_FOUND", query.getDatasourceId()))).cache();

        return orgDevChecker.checkCurrentOrgDev()
                .then(Mono.zip(sessionUserService.getVisitorOrgMemberCache(),
                        baseQueryMono, datasourceMono))
                .flatMap(tuple -> {
                    OrgMember orgMember = tuple.getT1();
                    String orgId = orgMember.getOrgId();
                    String userId = orgMember.getUserId();
                    BaseQuery baseQuery = tuple.getT2();
                    Datasource datasource = tuple.getT3();
                    Mono<List<Property>> paramsAndHeadersInheritFromLogin =
                            getParamsAndHeadersInheritFromLogin(userId, orgId);
                    QueryVisitorContext queryVisitorContext = new QueryVisitorContext(userId, orgId, port, cookies, paramsAndHeadersInheritFromLogin,
                            commonConfig.getDisallowedHosts());
                    Map<String, Object> queryConfig = baseQuery.getQueryConfig();
                    String timeoutStr = baseQuery.getTimeoutStr();
                    return queryExecutionService.executeQuery(datasource, queryConfig, queryExecutionRequest.paramMap(), timeoutStr,
                                    queryVisitorContext
                            )
                            .timed()
                            .doOnNext(timed -> onNextOrError(queryExecutionRequest, queryVisitorContext, baseQuery, datasource,
                                    timed.elapsed().toMillis(), true))
                            .doOnError(throwable -> onNextOrError(queryExecutionRequest, queryVisitorContext, baseQuery, datasource, 0, false))
                            .map(Timed::get);
                });
    }

    private Mono<BaseQuery> getBaseQuery(LibraryQueryCombineId libraryQueryCombineId) {
        if (libraryQueryCombineId.isUsingEditingRecord()) {
            return libraryQueryService.getById(libraryQueryCombineId.libraryQueryId())
                    .map(LibraryQuery::getQuery);
        }
        if (libraryQueryCombineId.isUsingLiveRecord()) {
            return libraryQueryService.getLiveBaseQueryByLibraryQueryId(libraryQueryCombineId.libraryQueryId());
        }
        return libraryQueryRecordService.getById(libraryQueryCombineId.libraryQueryRecordId())
                .map(LibraryQueryRecord::getQuery);
    }

    protected Mono<List<Property>> getParamsAndHeadersInheritFromLogin(String userId, String orgId) {
        return Mono.empty();
    }

    protected void onNextOrError(QueryExecutionRequest queryExecutionRequest, QueryVisitorContext queryVisitorContext, BaseQuery baseQuery,
            Datasource datasource, long executeTime, boolean success) {
        // do nothing
    }
}
