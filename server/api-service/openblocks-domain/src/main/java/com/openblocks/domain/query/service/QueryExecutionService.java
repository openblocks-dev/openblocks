package com.openblocks.domain.query.service;

import static com.openblocks.sdk.exception.BizError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_TIMEOUT;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceConnectionHolder;
import com.openblocks.domain.datasource.service.DatasourceConnectionPool;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.domain.query.util.QueryTimeoutUtils;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.query.QueryExecutionContext;
import com.openblocks.sdk.query.QueryVisitorContext;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class QueryExecutionService {

    @Autowired
    private DatasourceConnectionPool datasourceConnectionPool;

    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;

    public Mono<QueryExecutionResult> executeQuery(Datasource datasource, Map<String, Object> queryConfig, Map<String, Object> requestParams,
            String timeoutStr, QueryVisitorContext queryVisitorContext) {
        var queryExecutor = datasourceMetaInfoService.getQueryExecutor(datasource.getType());

        Mono<QueryExecutionContext> queryContext = Mono.fromSupplier(() -> queryExecutor.doBuildQueryExecutionContext(datasource.getDetailConfig(),
                queryConfig, requestParams, queryVisitorContext));
        int timeoutMs = QueryTimeoutUtils.parseQueryTimeoutMs(timeoutStr, requestParams);

        return queryContext.zipWhen(context -> datasourceConnectionPool.getOrCreateConnection(datasource))
                .flatMap(tuple -> {
                    QueryExecutionContext queryExecutionRequest = tuple.getT1();
                    DatasourceConnectionHolder connectionHolder = tuple.getT2();
                    return queryExecutor.doExecuteQuery(connectionHolder.connection(), queryExecutionRequest)
                            .doOnError(connectionHolder::onQueryError);
                })
                .timeout(Duration.ofMillis(timeoutMs))
                .onErrorMap(TimeoutException.class, e -> new PluginException(QUERY_EXECUTION_TIMEOUT, "PLUGIN_EXECUTION_TIMEOUT", timeoutMs))
                .onErrorResume(PluginException.class, pluginException -> Mono.just(QueryExecutionResult.error(pluginException)))
                .onErrorMap(exception -> {
                    if (exception instanceof BizException) {
                        return exception;
                    }
                    log.error("query exception", exception);
                    return ofException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", exception.getMessage());
                });
    }

}
