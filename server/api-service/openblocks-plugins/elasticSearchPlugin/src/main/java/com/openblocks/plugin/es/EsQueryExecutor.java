package com.openblocks.plugin.es;

import static com.openblocks.plugin.es.EsError.ES_EXECUTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.TimeoutException;
import java.util.stream.Stream;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Request;
import org.pf4j.Extension;

import com.google.common.base.Joiner;
import com.openblocks.plugin.es.model.EsConnection;
import com.openblocks.plugin.es.model.EsDatasourceConfig;
import com.openblocks.plugin.es.model.EsQueryConfig;
import com.openblocks.plugin.es.model.EsQueryExecutionContext;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.openblocks.sdk.util.JsonUtils;
import com.openblocks.sdk.util.MustacheHelper;
import com.openblocks.sdk.util.Preconditions;

import reactor.core.publisher.Mono;

@Extension
public class EsQueryExecutor implements QueryExecutor<EsDatasourceConfig, EsConnection, EsQueryExecutionContext> {

    private static final Joiner JOINER = Joiner.on("/").skipNulls();

    @Override
    public EsQueryExecutionContext buildQueryExecutionContext(EsDatasourceConfig datasourceConfig, Map<String, Object> queryConfig,
            Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {
        EsQueryConfig esQueryConfig = JsonUtils.fromJson(JsonUtils.toJson(queryConfig), EsQueryConfig.class);

        // preconditions
        Preconditions.check(Objects.nonNull(esQueryConfig), QUERY_ARGUMENT_ERROR, "INVALID_ES_QUERY_CONFIG");

        // render
        String prefix = StringUtils.isBlank(esQueryConfig.getPrefix()) ? "" : MustacheHelper.renderMustacheString(esQueryConfig.getPrefix(),
                requestParams);
        String suffix = StringUtils.isBlank(esQueryConfig.getSuffix()) ? "" : MustacheHelper.renderMustacheString(esQueryConfig.getSuffix(),
                requestParams);
        String path = StringUtils.isBlank(esQueryConfig.getPath()) ? "" : MustacheHelper.renderMustacheString(esQueryConfig.getPath(),
                requestParams);
        String dsl = StringUtils.isBlank(esQueryConfig.getDsl()) ? "" : MustacheHelper.renderMustacheJsonString(esQueryConfig.getDsl(),
                requestParams);

        // remove extra "/"
        String wholePath = prefix.trim() + "/" + path.trim() + "/" + suffix.trim();
        List<String> splits = Stream.of(wholePath.split("/")).filter(StringUtils::isNotBlank).toList();
        wholePath = JOINER.join(splits);

        return EsQueryExecutionContext.builder()
                .httpMethod(esQueryConfig.getHttpMethod())
                .path(wholePath)
                .dsl(dsl)
                .build();
    }

    /**
     * non-blocked
     */
    @Override
    public Mono<QueryExecutionResult> executeQuery(EsConnection esConnection, EsQueryExecutionContext context) {
        // build request
        Request request = new Request(context.getHttpMethod().name(), "/" + context.getPath());
        if (StringUtils.isNotBlank(context.getDsl())) {
            request.setJsonEntity(context.getDsl());
        }
        return esConnection.reactorRestClientAdaptor()
                .request(request)
                .map(response -> {
                    try {
                        Map<String, Object> map = JsonUtils.fromJsonMap(EntityUtils.toString(response.getEntity()));
                        return QueryExecutionResult.success(map);
                    } catch (IOException e) {
                        return QueryExecutionResult.error(ES_EXECUTION_ERROR, "ES_EXECUTION_ERROR", e.getMessage());
                    }
                })
                .onErrorResume(throwable -> {
                    if (throwable instanceof TimeoutException) {
                        return Mono.just(QueryExecutionResult.error(QUERY_EXECUTION_ERROR, "EXECUTION_TIMEOUT"));
                    }
                    return Mono.just(QueryExecutionResult.error(ES_EXECUTION_ERROR, "ES_QUERY_ERROR", throwable.getMessage()));
                });
    }
}
