package com.openblocks.plugin.mysql;

import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

import java.time.Duration;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;
import org.springframework.beans.factory.annotation.Autowired;

import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.plugin.common.BlockingDatasourceConnector;
import com.openblocks.sdk.plugin.common.sql.HikariPerfWrapper;
import com.openblocks.sdk.plugin.mysql.MysqlDatasourceConfig;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Extension
public class MysqlConnector extends BlockingDatasourceConnector<HikariPerfWrapper, MysqlDatasourceConfig> {

    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final long LEAK_DETECTION_THRESHOLD_MS = Duration.ofSeconds(30).toMillis();
    private static final long MAX_LIFETIME_MS = TimeUnit.MINUTES.toMillis(30);
    private static final long KEEPALIVE_TIME_MS = TimeUnit.MINUTES.toMillis(3);
    private static final long CONNECTION_TIMEOUT_MS = TimeUnit.SECONDS.toMillis(5);
    private static final long VALIDATION_TIMEOUT_MS = TimeUnit.SECONDS.toMillis(3);
    private static final long INITIALIZATION_FAIL_TIMEOUT = TimeUnit.SECONDS.toMillis(4);
    private final Supplier<Long> connectionPoolIdleTimeoutMillis;
    private final Supplier<Integer> connectionPoolMaxPoolSize;

    public MysqlConnector(@Autowired ConfigCenter configCenter) {
        this.connectionPoolIdleTimeoutMillis = configCenter.mysqlPlugin().ofInteger("connectionPoolIdleTimeoutMinutes", 6)
                .then(Duration::ofMinutes)
                .then(Duration::toMillis);
        this.connectionPoolMaxPoolSize = configCenter.mysqlPlugin().ofInteger("connectionPoolMaxPoolSize", 50);
    }

    @Nonnull
    @Override
    protected HikariPerfWrapper blockingCreateConnection(MysqlDatasourceConfig connectionConfig) {
        try {
            Class.forName(JDBC_DRIVER);
        } catch (ClassNotFoundException e) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "LOAD_MYSQL_JDBC_ERROR");
        }

        return createHikariDataSource(connectionConfig);
    }

    private HikariPerfWrapper createHikariDataSource(MysqlDatasourceConfig datasourceConfig) {

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
        String url = "jdbc:mysql://" + host + ":" + port + "/" + (isNotBlank(database) ? database : "");
        config.setJdbcUrl(url);

        config.addDataSourceProperty("zeroDateTimeBehavior", "convertToNull");
        config.addDataSourceProperty("allowMultiQueries", "true");

        if (datasourceConfig.isUsingSsl()) {
            config.addDataSourceProperty("useSSL", "true");
            config.addDataSourceProperty("requireSSL", "true");
        } else {
            config.addDataSourceProperty("useSSL", "false");
            config.addDataSourceProperty("requireSSL", "false");
        }

        config.setReadOnly(datasourceConfig.isReadonly());

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

    @Nonnull
    @Override
    protected DatasourceTestResult blockingTestConnection(HikariPerfWrapper wrapper) {
        blockingDestroyConnection(wrapper);
        return DatasourceTestResult.testSuccess();
    }

    @Override
    protected void blockingDestroyConnection(HikariPerfWrapper wrapper) {
        if (wrapper != null) {
            ((HikariDataSource) wrapper.getHikariDataSource()).close();
        }
    }

    @Nonnull
    @Override
    public MysqlDatasourceConfig resolveConfig(Map<String, Object> configMap) {
        return MysqlDatasourceConfig.buildFrom(configMap);
    }

    @Override
    public Set<String> validateConfig(MysqlDatasourceConfig connectionConfig) {

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
