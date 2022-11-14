package com.openblocks.api.query;

import static com.openblocks.domain.permission.model.ResourceAction.READ_APPLICATIONS;
import static com.openblocks.sdk.exception.BizError.DATASOURCE_AND_APP_ORG_NOT_MATCH;
import static com.openblocks.sdk.exception.BizError.INVALID_PARAMETER;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Nullable;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.query.view.QueryExecutionRequest;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.query.model.ApplicationQuery;
import com.openblocks.domain.query.model.BaseQuery;
import com.openblocks.domain.query.model.LibraryQueryCombineId;
import com.openblocks.domain.query.model.LibraryQueryRecord;
import com.openblocks.domain.query.service.LibraryQueryRecordService;
import com.openblocks.domain.query.service.LibraryQueryService;
import com.openblocks.domain.query.service.QueryExecutionService;
import com.openblocks.infra.util.TupleUtils;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.openblocks.sdk.util.ExceptionUtils;

import reactor.core.publisher.Mono;
import reactor.core.publisher.Timed;

@Service
public class ApplicationQueryApiService {

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private LibraryQueryService libraryQueryService;

    @Autowired
    private LibraryQueryRecordService libraryQueryRecordService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    @Autowired
    private DatasourceService datasourceService;

    @Autowired
    private QueryExecutionService queryExecutionService;
    @Autowired
    private BusinessEventPublisher businessEventPublisher;

    @Value("${server.port}")
    private int port;

    public Mono<QueryExecutionResult> executeApplicationQuery(ServerWebExchange exchange, QueryExecutionRequest queryExecutionRequest) {
        if (StringUtils.isBlank(queryExecutionRequest.getQueryId())) {
            return ExceptionUtils.ofError(INVALID_PARAMETER, "INVALID_QUERY_ID");
        }
        String applicationId = queryExecutionRequest.getApplicationId();
        if (StringUtils.isBlank(applicationId)) {
            return ExceptionUtils.ofError(INVALID_PARAMETER, "INVALID_APP_ID");
        }
        boolean viewMode = queryExecutionRequest.isViewMode();
        MultiValueMap<String, HttpCookie> cookies = exchange.getRequest().getCookies();
        String queryId = queryExecutionRequest.getQueryId();
        Mono<Application> applicationMono = applicationService.findById(applicationId).cache();
        Mono<ApplicationQuery> applicationQueryMono = applicationMono
                .map(application -> application.getQueryByViewModeAndQueryId(viewMode, queryId))
                .cache();
        Mono<BaseQuery> baseQueryMono = applicationQueryMono.flatMap(this::getBaseQuery).cache();
        Mono<Datasource> datasourceMono = baseQueryMono.flatMap(query -> datasourceService.getById(query.getDatasourceId())
                        .switchIfEmpty(deferredError(BizError.DATASOURCE_NOT_FOUND, "DATASOURCE_NOT_FOUND", query.getDatasourceId()))
                )
                .cache();
        return sessionUserService.getVisitorId()
                .zipWith(checkApplicationPathAndReturnRootApplicationId(queryExecutionRequest.getPath(), applicationId,
                        queryExecutionRequest.isViewMode()))
                .flatMap(tuple -> {
                    String userId = tuple.getT1();
                    String rootApplicationId = tuple.getT2();
                    return resourcePermissionService.checkResourcePermissionWithError(userId, rootApplicationId, READ_APPLICATIONS)
                            .thenReturn(userId);
                })
                .zipWhen(__ -> Mono.zip(applicationMono, applicationQueryMono, baseQueryMono, datasourceMono), TupleUtils::merge)
                .flatMap(tuple -> {
                    String userId = tuple.getT1();
                    Application application = tuple.getT2();
                    BaseQuery baseQuery = tuple.getT4();
                    Datasource datasource = tuple.getT5();
                    if (!datasource.getOrganizationId().equals(application.getOrganizationId())) {
                        return ofError(DATASOURCE_AND_APP_ORG_NOT_MATCH, "DATASOURCE_AND_APP_ORG_NOT_MATCH");
                    }
                    QueryVisitorContext queryVisitorContext =
                            new QueryVisitorContext(userId, application.getOrganizationId(), port, cookies, Mono.empty());
                    return queryExecutionService.executeQuery(datasource, baseQuery.getQueryConfig(), queryExecutionRequest.paramMap(),
                                    baseQuery.getTimeoutStr(), queryVisitorContext
                            )
                            .timed()
                            .map(Timed::get);
                });
    }


    private Mono<String> checkApplicationPathAndReturnRootApplicationId(String[] path, String applicationId, boolean viewMode) {
        String rootApplicationId = getRootApplicationIdFromPath(path);
        if (StringUtils.isBlank(rootApplicationId)) {
            return Mono.just(applicationId);
        }
        Mono<List<Application>> allDependentModules =
                applicationService.getAllDependentModulesFromApplicationId(rootApplicationId, viewMode);
        return allDependentModules
                .map(modules -> modules.stream().map(Application::getId).collect(Collectors.toSet()))
                .flatMap(modules -> {
                    if (!modules.contains(applicationId)) {
                        return ofError(INVALID_PARAMETER, "INVALID_PARAMETER");
                    }
                    return Mono.just(rootApplicationId);
                });
    }

    @Nullable
    private static String getRootApplicationIdFromPath(String[] path) {
        if (ArrayUtils.isEmpty(path)) {
            return null;
        }
        return path[0];
    }

    private Mono<BaseQuery> getBaseQuery(ApplicationQuery applicationQuery) {
        if (applicationQuery.isUsingLibraryQuery()) {
            return getBaseQueryFromLibraryQuery(applicationQuery);
        }
        return Mono.just(applicationQuery.getBaseQuery());
    }

    private Mono<BaseQuery> getBaseQueryFromLibraryQuery(ApplicationQuery query) {
        LibraryQueryCombineId libraryQueryCombineId = query.getLibraryRecordQueryId();
        if (libraryQueryCombineId.isUsingLatestRecord()) {
            return libraryQueryService.getLatestBaseQueryByLibraryQueryId(libraryQueryCombineId.libraryQueryId());
        }
        return libraryQueryRecordService.getById(libraryQueryCombineId.libraryQueryRecordId())
                .map(LibraryQueryRecord::getQuery);
    }
}
