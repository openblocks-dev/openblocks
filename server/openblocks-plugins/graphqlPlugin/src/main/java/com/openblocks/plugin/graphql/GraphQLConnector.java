package com.openblocks.plugin.graphql;

import static java.util.Collections.emptySet;

import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;

import org.pf4j.Extension;

import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.plugin.common.DatasourceConnector;
import com.openblocks.sdk.plugin.graphql.GraphQLDatasourceConfig;

import reactor.core.publisher.Mono;

@Extension
public class GraphQLConnector implements DatasourceConnector<Object, GraphQLDatasourceConfig> {
    @Nonnull
    @Override
    public GraphQLDatasourceConfig resolveConfig(Map<String, Object> configMap) {
        return GraphQLDatasourceConfig.buildFrom(configMap);
    }

    @Override
    public Set<String> validateConfig(GraphQLDatasourceConfig config) {
        return emptySet();
    }

    @Override
    public Mono<DatasourceTestResult> testConnection(GraphQLDatasourceConfig config) {
        return Mono.just(DatasourceTestResult.testSuccess());
    }

    @Override
    public Mono<Object> createConnection(GraphQLDatasourceConfig connectionConfig) {
        return Mono.just(new Object());
    }

    @Override
    public Mono<Void> destroyConnection(Object o) {
        return Mono.empty();
    }
}
