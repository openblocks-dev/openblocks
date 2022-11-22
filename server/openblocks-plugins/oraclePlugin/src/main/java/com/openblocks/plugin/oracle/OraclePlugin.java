package com.openblocks.plugin.oracle;

import static com.google.common.collect.Maps.newLinkedHashMap;
import static com.openblocks.sdk.exception.PluginCommonError.CONNECTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_TEST_GENERIC_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.models.QueryExecutionResult.error;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.querySharedScheduler;
import static com.openblocks.sdk.plugin.common.sql.ResultSetParser.parseRows;
import static com.openblocks.sdk.plugin.common.sql.StructureParser.QUERY_STRUCTURE_SQL;
import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;
import static java.util.concurrent.TimeUnit.MINUTES;
import static java.util.concurrent.TimeUnit.SECONDS;
import static org.apache.commons.lang3.StringUtils.isAllBlank;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Duration;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;
import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;

import com.openblocks.plugin.oracle.model.OracleDatasourceConfig;
import com.openblocks.plugin.oracle.model.OracleQueryExecutionContext;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.config.dynamic.ConfigInstanceHelper;
import com.openblocks.sdk.exception.InvalidHikariDatasourceException;
import com.openblocks.sdk.exception.PluginCommonError;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.DatasourceQueryEngine;
import com.openblocks.sdk.plugin.common.sql.StructureParser;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

public class OraclePlugin extends Plugin {

    public OraclePlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Slf4j
    @Extension
    public static class OracleEngine implements DatasourceQueryEngine<OracleDatasourceConfig, HikariDataSource, OracleQueryExecutionContext> {

        private static final String JDBC_DRIVER = "oracle.jdbc.OracleDriver";

        static {
            try {
                Class.forName(JDBC_DRIVER);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            }
        }

        private final ConfigInstanceHelper oracleConfig;

        public OracleEngine(ConfigCenter configCenter) {
            oracleConfig = new ConfigInstanceHelper(configCenter.oraclePlugin());
        }

        @Override
        public Mono<HikariDataSource> createConnection(OracleDatasourceConfig connectionConfig) {
            return Mono.just(createDatasource(connectionConfig))
                    .timeout(Duration.ofSeconds(5))
                    .onErrorMap(throwable -> new PluginException(DATASOURCE_TEST_GENERIC_ERROR, "DATASOURCE_TEST_GENERIC_ERROR"))
                    .subscribeOn(querySharedScheduler());
        }

        private HikariDataSource createDatasource(OracleDatasourceConfig oracleDatasourceConfig) {
            HikariConfig config = new HikariConfig();
            config.setDriverClassName(JDBC_DRIVER);
            //username & password
            if (StringUtils.isNotBlank(oracleDatasourceConfig.getUsername())) {
                config.setUsername(oracleDatasourceConfig.getUsername());
            }
            if (StringUtils.isNotBlank(oracleDatasourceConfig.getPassword())) {
                config.setPassword(oracleDatasourceConfig.getPassword());
            }
            config.setJdbcUrl(oracleDatasourceConfig.getJdbcUrl());
            //
            config.setConnectionTimeout(oracleConfig.ofLong("connectionTimeout", SECONDS.toMillis(5)));
            config.setIdleTimeout(oracleConfig.ofLong("idleTimeout", MINUTES.toMillis(10)));
            config.setMaximumPoolSize(oracleConfig.ofInteger("maxPoolSize", 50));
            config.setMinimumIdle(oracleConfig.ofInteger("minPoolSize", 5));
            return new HikariDataSource(config);
        }

        @Override
        public Mono<Void> destroyConnection(HikariDataSource hikariDataSource) {
            return Mono.<Void> fromRunnable(() -> {
                        if (hikariDataSource != null) {
                            hikariDataSource.close();
                        }
                    })
                    .subscribeOn(querySharedScheduler());
        }

        @Override
        public Mono<DatasourceStructure> getStructure(HikariDataSource hikariDataSource) {
            return Mono.fromSupplier(() -> getStructure0(hikariDataSource))
                    .subscribeOn(querySharedScheduler());
        }

        private DatasourceStructure getStructure0(HikariDataSource hikariDataSource) {
            try (Connection connection = getConnection(hikariDataSource);
                    Statement statement = connection.createStatement();
                    ResultSet resultSet = statement.executeQuery(QUERY_STRUCTURE_SQL)) {
                List<Table> tables = StructureParser.parseColumns(resultSet);
                return new DatasourceStructure(tables);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

        @Override
        public Mono<DatasourceTestResult> testConnection(OracleDatasourceConfig connectionConfig) {
            return doCreateConnection(connectionConfig)
                    .delayUntil(this::destroyConnection)
                    .then(Mono.fromSupplier(DatasourceTestResult::testSuccess))
                    .onErrorResume(throwable -> Mono.just(DatasourceTestResult.testFail(throwable)))
                    .subscribeOn(querySharedScheduler());
        }

        @Nonnull
        @Override
        public OracleDatasourceConfig resolveConfig(Map<String, Object> configMap) {
            OracleDatasourceConfig oracleDatasourceConfig = fromJson(toJson(configMap), OracleDatasourceConfig.class);
            if (oracleDatasourceConfig == null) {
                throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "INVALID_ORACLE_CONFIG");
            }
            return oracleDatasourceConfig;
        }

        @Override
        public Set<String> validateConfig(OracleDatasourceConfig connectionConfig) {

            Set<String> validates = new HashSet<>();
            if (isBlank(connectionConfig.getJdbcUrl())
                    && (isBlank(connectionConfig.getHost()) || connectionConfig.getPort() == null
                    || isAllBlank(connectionConfig.getSid(), connectionConfig.getServiceName()))) {
                validates.add("INVALID_JDBC_URL_CONFIG");
            }
            return validates;
        }

        @Override
        public OracleQueryExecutionContext buildQueryExecutionContext(OracleDatasourceConfig datasourceConfig, Map<String, Object> queryConfig,
                Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {
            return OracleQueryExecutionContext.builder()
                    .query(MapUtils.getString(queryConfig, "sql"))
                    .requestParams(requestParams)
                    .build();
        }

        @Override
        public Mono<QueryExecutionResult> executeQuery(HikariDataSource hikariDataSource, OracleQueryExecutionContext context) {
            return Mono.fromSupplier(() -> executeQuery0(hikariDataSource, context))
                    .onErrorResume(throwable -> Mono.just(error(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", throwable.getMessage())))
                    .subscribeOn(querySharedScheduler());
        }

        private QueryExecutionResult executeQuery0(HikariDataSource hikariDataSource, OracleQueryExecutionContext context) {

            String query = context.getQuery();
            Map<String, Object> requestParams = context.getRequestParams();

            query = renderMustacheString(query, requestParams);
            try (Connection connection = getConnection(hikariDataSource);
                    Statement statement = connection.createStatement()) {
                boolean isResultSet = statement.execute(query, Statement.RETURN_GENERATED_KEYS);
                try (ResultSet resultSet = statement.getResultSet()) {
                    return parseExecuteResult(statement, resultSet, isResultSet);
                }
            } catch (SQLException e) {
                throw new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
            }
        }

        private Connection getConnection(HikariDataSource hikariDataSource) {
            if (hikariDataSource == null || hikariDataSource.isClosed() || !hikariDataSource.isRunning()) {
                throw new InvalidHikariDatasourceException();
            }
            try {
                // borrow connection
                return hikariDataSource.getConnection();
            } catch (SQLException e) {
                throw new PluginException(CONNECTION_ERROR, "CONNECTION_ERROR", e.getMessage());
            }
        }

        private QueryExecutionResult parseExecuteResult(
                Statement statement, ResultSet resultSet, boolean isResultSet) throws SQLException {

            if (isResultSet) {
                List<Map<String, Object>> rows = parseRows(resultSet);
                return QueryExecutionResult.success((rows));
            }

            Object affectedRows = Math.max(statement.getUpdateCount(), 0);
            Map<String, Object> result = newLinkedHashMap();
            result.put("affectedRows", affectedRows);

            return QueryExecutionResult.success(result);
        }
    }
}
