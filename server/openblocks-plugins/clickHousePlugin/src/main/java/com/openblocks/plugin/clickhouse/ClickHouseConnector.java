package com.openblocks.plugin.clickhouse;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_TIMEOUT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.querySharedScheduler;

import java.time.Duration;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.function.Supplier;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.openblocks.plugin.clickhouse.model.ClickHouseDatasourceConfig;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.plugin.common.DatasourceConnector;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import com.zaxxer.hikari.pool.HikariPool.PoolInitializationException;

import reactor.core.publisher.Mono;

@Extension
public class ClickHouseConnector implements DatasourceConnector<HikariDataSource, ClickHouseDatasourceConfig> {

    private static final String JDBC_DRIVER = "com.clickhouse.jdbc.ClickHouseDriver";
    private static final long LEAK_DETECTION_THRESHOLD_MS = Duration.ofSeconds(30).toMillis();
    private static final long MAX_LIFETIME_MS = TimeUnit.HOURS.toMillis(2);
    private static final long KEEPALIVE_TIME_MS = TimeUnit.MINUTES.toMillis(3);
    private static final int CONNECTION_TIMEOUT_MS = 250;
    private static final long VALIDATION_TIMEOUT_MS = TimeUnit.SECONDS.toMillis(3);
    private static final long INITIALIZATION_FAIL_TIMEOUT = TimeUnit.SECONDS.toMillis(4);
    private final Supplier<Duration> createConnectionTimeout;
    private final Supplier<Long> connectionPoolIdleTimeoutMillis;
    private final Supplier<Integer> connectionPoolMaxPoolSize;

    static {
        try {
            Class.forName(JDBC_DRIVER);
        } catch (ClassNotFoundException e) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "FAIL_TO_LOAD_CLICKHOUSE_JDBC");
        }
    }

    public ClickHouseConnector(ConfigCenter configCenter) {
        this.createConnectionTimeout = configCenter.clickHousePlugin().ofInteger("createConnectionTimeout", 5000)
                .then(Duration::ofMillis);
        this.connectionPoolMaxPoolSize = configCenter.clickHousePlugin().ofInteger("connectionPoolMaxPoolSize", 50);
        this.connectionPoolIdleTimeoutMillis = configCenter.clickHousePlugin().ofInteger("connectionPoolIdleTimeoutMinutes", 6)
                .then(Duration::ofMinutes)
                .then(Duration::toMillis);
    }

    @Nonnull
    @Override
    public ClickHouseDatasourceConfig resolveConfig(Map<String, Object> configMap) {
        return ClickHouseDatasourceConfig.buildFrom(configMap);
    }

    @Override
    public Set<String> validateConfig(ClickHouseDatasourceConfig connectionConfig) {

        Set<String> invalids = new HashSet<>();

        String host = connectionConfig.getHost();
        if (StringUtils.isBlank(host)) {
            invalids.add("HOST_EMPTY");
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


    @Override
    public Mono<HikariDataSource> createConnection(ClickHouseDatasourceConfig connectionConfig) {

        return Mono.fromSupplier(() -> createHikariDataSource(connectionConfig))
                .timeout(createConnectionTimeout.get())
                .onErrorMap(TimeoutException.class, error -> new PluginException(DATASOURCE_TIMEOUT_ERROR, "DATASOURCE_TIMEOUT_ERROR"))
                .onErrorResume(exception -> {
                    if (exception instanceof PluginException) {
                        return Mono.error(exception);
                    }
                    return Mono.error(new PluginException(DATASOURCE_ARGUMENT_ERROR, "DATASOURCE_ARGUMENT_ERROR", exception.getMessage()));
                })
                .subscribeOn(querySharedScheduler());
    }

    private HikariDataSource createHikariDataSource(ClickHouseDatasourceConfig datasourceConfig) throws PluginException {

        HikariConfig config = new HikariConfig();
        config.setDriverClassName(JDBC_DRIVER);
        config.setMinimumIdle(1);
        config.setMaxLifetime(MAX_LIFETIME_MS);
        config.setKeepaliveTime(KEEPALIVE_TIME_MS);
        config.setIdleTimeout(connectionPoolIdleTimeoutMillis.get());
        config.setMaximumPoolSize(connectionPoolMaxPoolSize.get());
        config.setLeakDetectionThreshold(LEAK_DETECTION_THRESHOLD_MS);
        config.setConnectionTimeout(CONNECTION_TIMEOUT_MS);
        config.setValidationTimeout(VALIDATION_TIMEOUT_MS);
        config.setInitializationFailTimeout(INITIALIZATION_FAIL_TIMEOUT);

        // Set authentication properties
        String username = datasourceConfig.getUsername();
        if (StringUtils.isNotEmpty(username)) {
            config.setUsername(username);
        }
        String password = datasourceConfig.getPassword();
        if (StringUtils.isNotEmpty(password)) {
            config.setPassword(password);
        }

        String host = datasourceConfig.getHost();
        long port = datasourceConfig.getPort();
        String database = datasourceConfig.getDatabase();
        String scheme = datasourceConfig.isUsingSsl() ? "https://" : "http://";
        String url = "jdbc:clickhouse:" + scheme + host + ":" + port + "/" + database;
        config.setJdbcUrl(url);

        config.addDataSourceProperty("characterEncoding", "UTF-8");
        config.addDataSourceProperty("useUnicode", "true");

        config.setReadOnly(datasourceConfig.isReadonly());

        HikariDataSource datasource;
        try {
            datasource = new HikariDataSource(config);
        } catch (PoolInitializationException e) {
            throw new PluginException(DATASOURCE_ARGUMENT_ERROR, "DATASOURCE_ARGUMENT_ERROR", e.getMessage());
        }

        return datasource;
    }

    @Override
    public Mono<Void> destroyConnection(HikariDataSource hikariDataSource) {
        return Mono.fromRunnable(() -> {
                    if (hikariDataSource != null) {
                        hikariDataSource.close();
                    }
                })
                .subscribeOn(querySharedScheduler())
                .then();
    }

    @Override
    public Mono<DatasourceTestResult> testConnection(ClickHouseDatasourceConfig connectionConfig) {
        return doCreateConnection(connectionConfig)
                .map(hikariDataSource -> {
                    if (hikariDataSource != null) {
                        hikariDataSource.close();
                    }

                    return DatasourceTestResult.testSuccess();
                })
                .onErrorResume(error -> Mono.just(DatasourceTestResult.testFail(error)))
                .subscribeOn(querySharedScheduler());
    }

}
