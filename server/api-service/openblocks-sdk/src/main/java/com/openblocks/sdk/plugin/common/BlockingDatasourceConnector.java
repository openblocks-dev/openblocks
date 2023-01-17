package com.openblocks.sdk.plugin.common;

import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.querySharedScheduler;

import javax.annotation.Nonnull;

import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.models.DatasourceTestResult;

import reactor.core.publisher.Mono;

public abstract class BlockingDatasourceConnector<Connection, ConnectionConfig extends DatasourceConnectionConfig>
        implements DatasourceConnector<Connection, ConnectionConfig> {

    @Override
    public final Mono<Connection> createConnection(ConnectionConfig connectionConfig) {
        return Mono.fromSupplier(() -> blockingCreateConnection(connectionConfig))
                .subscribeOn(querySharedScheduler());
    }

    @Override
    public final Mono<DatasourceTestResult> testConnection(ConnectionConfig connectionConfig) {
        return Mono.fromSupplier(() -> blockingTestConnection(blockingCreateConnection(connectionConfig)))
                .subscribeOn(querySharedScheduler());
    }

    @Override
    public final Mono<Void> destroyConnection(Connection connection) {
        return Mono.fromRunnable(() -> blockingDestroyConnection(connection))
                .subscribeOn(querySharedScheduler())
                .then();
    }

    @Nonnull
    protected abstract DatasourceTestResult blockingTestConnection(Connection connection);

    protected abstract void blockingDestroyConnection(Connection connection);

    @Nonnull
    protected abstract Connection blockingCreateConnection(ConnectionConfig connectionConfig);
}
