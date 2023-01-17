package com.openblocks.plugin;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;

import org.pf4j.Extension;

import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.plugin.common.DatasourceConnector;
import com.openblocks.sdk.plugin.openblocksapi.OpenblocksApiDatasourceConfig;

import reactor.core.publisher.Mono;

@Extension
public class OpenblocksApiConnector implements DatasourceConnector<Object, OpenblocksApiDatasourceConfig> {

    private static final Object CONNECTION_OBJECT = new Object();

    @Override
    public Mono<Object> createConnection(OpenblocksApiDatasourceConfig connectionConfig) {
        return Mono.just(CONNECTION_OBJECT);
    }

    @Override
    public Mono<Void> destroyConnection(Object o) {
        return Mono.empty();
    }

    @Override
    public Mono<DatasourceTestResult> testConnection(OpenblocksApiDatasourceConfig connectionConfig) {
        return Mono.just(DatasourceTestResult.testSuccess());
    }

    @Nonnull
    @Override
    public OpenblocksApiDatasourceConfig resolveConfig(Map<String, Object> configMap) {
        return OpenblocksApiDatasourceConfig.INSTANCE;
    }

    @Override
    public Set<String> validateConfig(OpenblocksApiDatasourceConfig connectionConfig) {
        return Collections.emptySet();
    }

}
