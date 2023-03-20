package com.openblocks.plugin.sql;

import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.plugin.common.BlockingDatasourceConnector;
import com.openblocks.sdk.plugin.common.sql.HikariPerfWrapper;
import com.openblocks.sdk.plugin.common.sql.SqlBasedDatasourceConnectionConfig;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public abstract class SqlBasedConnector<T extends SqlBasedDatasourceConnectionConfig> extends BlockingDatasourceConnector<HikariPerfWrapper, T> {

    private static final long LEAK_DETECTION_THRESHOLD_MS = TimeUnit.SECONDS.toMillis(30);
    private static final long MAX_LIFETIME_MS = TimeUnit.MINUTES.toMillis(30);
    private static final long KEEPALIVE_TIME_MS = TimeUnit.MINUTES.toMillis(3);
    private static final long CONNECTION_TIMEOUT_MS = TimeUnit.SECONDS.toMillis(5);
    private static final long VALIDATION_TIMEOUT_MS = TimeUnit.SECONDS.toMillis(3);
    private static final long INITIALIZATION_FAIL_TIMEOUT = TimeUnit.SECONDS.toMillis(4);
    private static final long CONNECTION_POOL_IDLE_TIMEOUT_MILLIS = TimeUnit.MINUTES.toMillis(5);
    private final int connectionPoolMaxPoolSize;

    protected SqlBasedConnector(int connectionPoolMaxPoolSize) {
        this.connectionPoolMaxPoolSize = connectionPoolMaxPoolSize;
    }

    @Nonnull
    @Override
    protected final HikariPerfWrapper blockingCreateConnection(T connectionConfig) {
        try {
            Class.forName(getJdbcDriver());
        } catch (ClassNotFoundException e) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "LOAD_SQL_JDBC_ERROR");
        }

        HikariConfig config = new HikariConfig();
        config.setDriverClassName(getJdbcDriver());
        config.setMinimumIdle(1);
        config.setMaxLifetime(MAX_LIFETIME_MS);
        config.setKeepaliveTime(KEEPALIVE_TIME_MS);
        config.setIdleTimeout(CONNECTION_POOL_IDLE_TIMEOUT_MILLIS);
        config.setMaximumPoolSize(connectionPoolMaxPoolSize);
        config.setLeakDetectionThreshold(LEAK_DETECTION_THRESHOLD_MS);
        config.setConnectionTimeout(CONNECTION_TIMEOUT_MS);
        config.setValidationTimeout(VALIDATION_TIMEOUT_MS);
        config.setInitializationFailTimeout(INITIALIZATION_FAIL_TIMEOUT);

        setUpConfigs(connectionConfig, config);

        connectionConfig.getExtParams()
                .forEach((key, value) -> {
                    if (StringUtils.isBlank(key) || value == null || StringUtils.isBlank(String.valueOf(value))) {
                        return;
                    }
                    config.addDataSourceProperty(key, value);
                });

        HikariDataSource hikariDataSource = new HikariDataSource(config);
        return HikariPerfWrapper.wrap(hikariDataSource,
                () -> hikariDataSource.getHikariPoolMXBean().getTotalConnections(),
                () -> hikariDataSource.getHikariPoolMXBean().getIdleConnections(),
                () -> hikariDataSource.getHikariPoolMXBean().getActiveConnections(),
                () -> hikariDataSource.getHikariPoolMXBean().getThreadsAwaitingConnection(),
                hikariDataSource::getDataSourceProperties,
                hikariDataSource::getHealthCheckProperties
        );
    }

    protected abstract String getJdbcDriver();

    protected abstract void setUpConfigs(T datasourceConfig, HikariConfig config);

    @Nonnull
    @Override
    protected final DatasourceTestResult blockingTestConnection(HikariPerfWrapper wrapper) {
        blockingDestroyConnection(wrapper);
        return DatasourceTestResult.testSuccess();
    }

    @Override
    protected final void blockingDestroyConnection(HikariPerfWrapper wrapper) {
        if (wrapper != null) {
            ((HikariDataSource) wrapper.getHikariDataSource()).close();
        }
    }

    @Override
    public Set<String> validateConfig(T connectionConfig) {

        Set<String> invalids = new HashSet<>();

        String host = connectionConfig.getHost();
        if (StringUtils.isBlank(host)) {
            invalids.add("HOST_EMPTY_PLZ_CHECK");
        }

        if (host.contains("/") || host.contains(":")) {
            invalids.add("HOST_WITH_COLON");
        }

        if (StringUtils.equalsIgnoreCase(host, "localhost") || StringUtils.equals(host, "127.0.0.1")) {
            invalids.add("INVALID_HOST");
        }

        if (StringUtils.isBlank(connectionConfig.getDatabase())) {
            invalids.add("DATABASE_NAME_EMPTY");
        }

        return invalids;
    }


}
