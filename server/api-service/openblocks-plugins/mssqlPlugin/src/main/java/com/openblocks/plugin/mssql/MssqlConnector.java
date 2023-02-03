package com.openblocks.plugin.mssql;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_TIMEOUT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.querySharedScheduler;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

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

import com.openblocks.plugin.mssql.model.MssqlDatasourceConfig;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.plugin.common.DatasourceConnector;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import com.zaxxer.hikari.pool.HikariPool.PoolInitializationException;

import reactor.core.publisher.Mono;

@Extension
public class MssqlConnector implements DatasourceConnector<HikariDataSource, MssqlDatasourceConfig> {
    private static final String JDBC_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    private static final long LEAK_DETECTION_THRESHOLD_MS = Duration.ofSeconds(30).toMillis();
    private final Supplier<Duration> createConnectionTimeout;
    private final Supplier<Long> connectionPoolIdleTimeoutMillis;
    private final Supplier<Integer> connectionPoolMaxPoolSize;

    public MssqlConnector(ConfigCenter configCenter) {
        this.createConnectionTimeout = configCenter.mysqlPlugin().ofInteger("createConnectionTimeout", 5000)
                .then(Duration::ofMillis);
        this.connectionPoolMaxPoolSize = configCenter.mysqlPlugin().ofInteger("connectionPoolMaxPoolSize", 50);
        this.connectionPoolIdleTimeoutMillis = configCenter.mysqlPlugin().ofInteger("connectionPoolIdleTimeoutMinutes", 6)
                .then(Duration::ofMinutes)
                .then(Duration::toMillis);
    }

    @Nonnull
    @Override
    public MssqlDatasourceConfig resolveConfig(Map<String, Object> configMap) {
        return MssqlDatasourceConfig.buildFrom(configMap);
    }

    @Override
    public Set<String> validateConfig(MssqlDatasourceConfig connectionConfig) {

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
    public Mono<HikariDataSource> createConnection(MssqlDatasourceConfig connectionConfig) {
        try {
            Class.forName(JDBC_DRIVER);
        } catch (ClassNotFoundException e) {
            return Mono.error(new PluginException(QUERY_EXECUTION_ERROR, "LOAD_SQLSERVER_JDBC_ERROR"));
        }

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

    private HikariDataSource createHikariDataSource(MssqlDatasourceConfig datasourceConfig) throws PluginException {

        HikariConfig config = new HikariConfig();
        config.setDriverClassName(JDBC_DRIVER);
        config.setMinimumIdle(1);
        config.setMaxLifetime(TimeUnit.HOURS.toMillis(2));
        config.setKeepaliveTime(TimeUnit.MINUTES.toMillis(3));
        config.setIdleTimeout(connectionPoolIdleTimeoutMillis.get());
        config.setMaximumPoolSize(connectionPoolMaxPoolSize.get());
        config.setLeakDetectionThreshold(LEAK_DETECTION_THRESHOLD_MS);
        config.setConnectionTimeout(250);
        config.setValidationTimeout(TimeUnit.SECONDS.toMillis(3));
        config.setInitializationFailTimeout(TimeUnit.SECONDS.toMillis(4));

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

        StringBuilder urlBuilder = new StringBuilder();
        urlBuilder.append("jdbc:sqlserver://");

        // SQL Server supports instanceName like this: jdbc:sqlserver://INNOWAVE-99\SQLEXPRESS01;databaseName=EDS
        // And when host contains instanceName, port should be ignored, see https://stackoverflow.com/a/40830281/2139436
        if (host.contains("\\")) {
            urlBuilder.append(host)
                    .append(";");
        } else {
            urlBuilder.append(host)
                    .append(":")
                    .append(port)
                    .append(";");
        }


        if (isNotBlank(database)) {
            urlBuilder.append("database=")
                    .append(database)
                    .append(";");
        }

        if (isNotBlank(username)) {
            urlBuilder.append("user=")
                    .append(username)
                    .append(";");
        }

        if (isNotBlank(password)) {
            urlBuilder.append("password=")
                    .append(password)
                    .append(";");
        }

        urlBuilder.append("encrypt=")
                .append(datasourceConfig.isUsingSsl())
                .append(";");

        config.setJdbcUrl(urlBuilder.toString());
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
    public Mono<DatasourceTestResult> testConnection(MssqlDatasourceConfig connectionConfig) {
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
