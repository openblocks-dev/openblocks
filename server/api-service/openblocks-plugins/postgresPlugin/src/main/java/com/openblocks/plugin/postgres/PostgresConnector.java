package com.openblocks.plugin.postgres;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static org.apache.commons.lang3.StringUtils.isEmpty;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

import java.time.Duration;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.openblocks.plugin.postgres.model.PostgresDatasourceConfig;
import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.plugin.common.BlockingDatasourceConnector;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import com.zaxxer.hikari.pool.HikariPool.PoolInitializationException;

@Extension
public class PostgresConnector extends BlockingDatasourceConnector<HikariDataSource, PostgresDatasourceConfig> {
    private final Conf<Integer> maxPoolSize;
    private final Conf<Long> idleTimeoutMs;

    private static final long LEAK_DETECTION_THRESHOLD_MS = Duration.ofSeconds(30).toMillis();
    private static final long MAX_LIFETIME_MS = TimeUnit.MINUTES.toMillis(30);
    private static final long KEEPALIVE_TIME_MS = TimeUnit.MINUTES.toMillis(3);
    private static final long CONNECTION_TIMEOUT_MS = TimeUnit.SECONDS.toMillis(5);
    private static final long VALIDATION_TIMEOUT_MS = TimeUnit.SECONDS.toMillis(3);
    private static final long INITIALIZATION_FAIL_TIMEOUT = TimeUnit.SECONDS.toMillis(4);

    public PostgresConnector(ConfigCenter configCenter) {
        maxPoolSize = configCenter.postgresPlugin().ofInteger("maxPoolSize", 100);
        idleTimeoutMs = configCenter.postgresPlugin().ofInteger("idleTimeoutMinutes", 5)
                .then(Duration::ofMinutes)
                .then(Duration::toMillis);
    }

    @Nonnull
    @Override
    public PostgresDatasourceConfig resolveConfig(Map<String, Object> configMap) {
        return PostgresDatasourceConfig.buildFrom(configMap);
    }

    @Nonnull
    @Override
    public HikariDataSource blockingCreateConnection(PostgresDatasourceConfig connectionConfig) {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "LOAD_PG_JDBC_ERROR");
        }

        return createHikariDataSource(connectionConfig);
    }

    private HikariDataSource createHikariDataSource(PostgresDatasourceConfig datasourceConfig) throws PluginException {

        HikariConfig config = new HikariConfig();
        config.setDriverClassName("org.postgresql.Driver");
        config.setMinimumIdle(1);
        config.setMaxLifetime(MAX_LIFETIME_MS);
        config.setKeepaliveTime(KEEPALIVE_TIME_MS);
        config.setIdleTimeout(idleTimeoutMs.get());
        config.setMaximumPoolSize(maxPoolSize.get());
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
        String url = "jdbc:postgresql://" + host + ":" + port + "/" + (isNotBlank(database) ? database : "");
        config.setJdbcUrl(url);

        if (datasourceConfig.isUsingSsl()) {
            config.addDataSourceProperty("ssl", "true");
            config.addDataSourceProperty("sslmode", "require");
        } else {
            config.addDataSourceProperty("ssl", "false");
            config.addDataSourceProperty("sslmode", "disable");
        }

        if (datasourceConfig.isReadonly()) {
            config.setReadOnly(true);
            config.addDataSourceProperty("readOnlyMode", "always");
        } else {
            config.setReadOnly(false);
        }

        // Now create the connection pool from the configuration
        HikariDataSource datasource;
        try {
            datasource = new HikariDataSource(config);
        } catch (PoolInitializationException e) {
            throw new PluginException(DATASOURCE_ARGUMENT_ERROR, "DATASOURCE_ARGUMENT_ERROR", e.getMessage());
        }

        return datasource;
    }

    @Override
    public void blockingDestroyConnection(HikariDataSource connection) {
        if (connection != null) {
            connection.close();
        }
    }

    @Override
    public Set<String> validateConfig(PostgresDatasourceConfig connectionConfig) {
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

        if (isEmpty(connectionConfig.getDatabase())) {
            invalids.add("DATABASE_NAME_EMPTY");
        }

        return invalids;
    }

    @Nonnull
    @Override
    public DatasourceTestResult blockingTestConnection(HikariDataSource hikariDataSource) {
        if (hikariDataSource != null) {
            hikariDataSource.close();
        }
        return DatasourceTestResult.testSuccess();
    }

}
