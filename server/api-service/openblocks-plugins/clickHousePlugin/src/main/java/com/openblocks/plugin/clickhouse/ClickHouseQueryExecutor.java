package com.openblocks.plugin.clickhouse;

import static com.google.common.collect.Maps.newLinkedHashMap;
import static com.openblocks.sdk.exception.PluginCommonError.CONNECTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_GET_STRUCTURE_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.PREPARED_STATEMENT_BIND_PARAMETERS_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getIdenticalColumns;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.querySharedScheduler;
import static com.openblocks.sdk.plugin.common.sql.ResultSetParser.parseColumns;
import static com.openblocks.sdk.plugin.common.sql.ResultSetParser.parseRows;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.MustacheHelper.doPrepareStatement;
import static com.openblocks.sdk.util.MustacheHelper.extractMustacheKeysInOrder;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.openblocks.plugin.clickhouse.model.ClickHouseDatasourceConfig;
import com.openblocks.plugin.clickhouse.model.ClickHouseQueryConfig;
import com.openblocks.plugin.clickhouse.utils.ClickHouseStructureParser;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.exception.InvalidHikariDatasourceException;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.models.LocaleMessage;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.plugin.common.SqlQueryUtils;
import com.openblocks.sdk.plugin.common.sql.SqlBasedQueryExecutionContext;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Extension
public class ClickHouseQueryExecutor implements QueryExecutor<ClickHouseDatasourceConfig, HikariDataSource, SqlBasedQueryExecutionContext> {

    private final Supplier<Duration> getStructureTimeout;

    public ClickHouseQueryExecutor(ConfigCenter configCenter) {
        this.getStructureTimeout = configCenter.clickHousePlugin().ofInteger("getStructureTimeoutMillis", 8000)
                .then(Duration::ofMillis);
    }

    @Override
    public SqlBasedQueryExecutionContext buildQueryExecutionContext(ClickHouseDatasourceConfig datasourceConfig,
            Map<String, Object> queryConfigMap,
            Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {

        ClickHouseQueryConfig queryConfig = ClickHouseQueryConfig.from(queryConfigMap);

        String query = SqlQueryUtils.removeQueryComments(queryConfig.getSql().trim());
        if (StringUtils.isBlank(query)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "SQL_EMPTY");
        }

        if (!datasourceConfig.isEnableTurnOffPreparedStatement() && queryConfig.isDisablePreparedStatement()) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "CLICKHOUSE_PS_ERROR");
        }

        return SqlBasedQueryExecutionContext.builder()
                .query(query)
                .requestParams(requestParams)
                .disablePreparedStatement(datasourceConfig.isEnableTurnOffPreparedStatement() &&
                        queryConfig.isDisablePreparedStatement())
                .build();
    }

    @Override
    public Mono<QueryExecutionResult> executeQuery(HikariDataSource hikariDataSource, SqlBasedQueryExecutionContext queryExecutionContext) {

        String query = queryExecutionContext.getQuery();
        Map<String, Object> requestParams = queryExecutionContext.getRequestParams();
        boolean preparedStatement = !queryExecutionContext.isDisablePreparedStatement();

        return Mono.fromSupplier(() -> executeQuery0(hikariDataSource, query, requestParams, preparedStatement))
                .onErrorMap(e -> {
                    if (e instanceof PluginException) {
                        return e;
                    }
                    return new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
                })
                .subscribeOn(querySharedScheduler());
    }

    @Override
    public Mono<DatasourceStructure> getStructure(HikariDataSource hikariDataSource,
            ClickHouseDatasourceConfig connectionConfig) {

        return Mono.fromCallable(() -> {
                    Connection connection = getConnection(hikariDataSource);

                    Map<String, Table> tablesByName = new LinkedHashMap<>();
                    try (Statement statement = connection.createStatement()) {
                        ClickHouseStructureParser.parseTableAndColumns(tablesByName, statement);
                    } catch (SQLException throwable) {
                        throw new PluginException(DATASOURCE_GET_STRUCTURE_ERROR, "DATASOURCE_GET_STRUCTURE_ERROR",
                                throwable.getMessage());
                    } finally {
                        releaseResources(connection);
                    }

                    DatasourceStructure structure = new DatasourceStructure(new ArrayList<>(tablesByName.values()));
                    for (Table table : structure.getTables()) {
                        table.getKeys().sort(Comparator.naturalOrder());
                    }
                    return structure;
                })
                .timeout(getStructureTimeout.get())
                .subscribeOn(querySharedScheduler());
    }

    private QueryExecutionResult executeQuery0(HikariDataSource hikariDataSource, String query,
            Map<String, Object> requestParams,
            boolean isPreparedStatement) {

        List<String> mustacheKeysInOrder = extractMustacheKeysInOrder(query);

        Statement statement = null;
        ResultSet resultSet = null;
        PreparedStatement preparedQuery = null;
        boolean isResultSet;

        Connection connection = getConnection(hikariDataSource);
        try {
            if (isPreparedStatement) {
                var preparedSql = doPrepareStatement(query, mustacheKeysInOrder, requestParams);
                preparedQuery = connection.prepareStatement(preparedSql);
                bindPreparedStatementParams(preparedQuery,
                        mustacheKeysInOrder,
                        requestParams
                );

                isResultSet = preparedQuery.execute();
                resultSet = preparedQuery.getResultSet();
            } else {
                statement = connection.createStatement();
                isResultSet = statement.execute(renderMustacheString(query, requestParams), Statement.RETURN_GENERATED_KEYS);
                resultSet = statement.getResultSet();
            }

            return parseExecuteResult(isPreparedStatement, statement, resultSet, preparedQuery, isResultSet);

        } catch (SQLException e) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
        } finally {
            releaseResources(connection, statement, resultSet, preparedQuery);
        }
    }

    private QueryExecutionResult parseExecuteResult(boolean preparedStatement, Statement statement,
            ResultSet resultSet, PreparedStatement preparedQuery, boolean isResultSet) throws SQLException {

        if (isResultSet) {
            ResultSetMetaData metaData = resultSet.getMetaData();
            List<Map<String, Object>> dataRows = parseRows(resultSet);

            List<String> columnLabels = parseColumns(metaData);
            return QueryExecutionResult.success((dataRows), getHintMessages(columnLabels));
        }

        Object affectedRows = preparedStatement ? Math.max(preparedQuery.getUpdateCount(), 0) // might return -1
                                                : Math.max(statement.getUpdateCount(), 0);
        Map<String, Object> result = newLinkedHashMap();
        result.put("affectedRows", affectedRows);
        return QueryExecutionResult.success(result);
    }

    private List<LocaleMessage> getHintMessages(List<String> columnNames) {
        List<LocaleMessage> messages = new ArrayList<>();
        List<String> identicalColumns = getIdenticalColumns(columnNames);
        if (CollectionUtils.isNotEmpty(identicalColumns)) {
            messages.add(new LocaleMessage("DUPLICATE_COLUMN", String.join("/", identicalColumns)));
        }
        return messages;
    }

    private void bindPreparedStatementParams(PreparedStatement preparedStatement, List<String> mustacheKeysInOrder,
            Map<String, Object> requestParams) {

        try {
            for (int index = 0; index < mustacheKeysInOrder.size(); index++) {

                String mustacheKey = mustacheKeysInOrder.get(index);
                Object value = requestParams.get(mustacheKey);

                int bindIndex = index + 1;
                if (value == null) {
                    preparedStatement.setNull(bindIndex, Types.NULL);
                    continue;
                }
                if (value instanceof Integer intValue) {
                    preparedStatement.setInt(bindIndex, intValue);
                    continue;
                }
                if (value instanceof Long longValue) {
                    preparedStatement.setLong(bindIndex, longValue);
                    continue;
                }
                if (value instanceof Float || value instanceof Double) {
                    preparedStatement.setBigDecimal(bindIndex, new BigDecimal(String.valueOf(value)));
                    continue;
                }
                if (value instanceof Boolean boolValue) {
                    preparedStatement.setBoolean(bindIndex, boolValue);
                    continue;
                }
                if (value instanceof Map<?, ?> || value instanceof Collection<?>) {
                    preparedStatement.setString(bindIndex, toJson(value));
                    continue;
                }
                if (value instanceof String strValue) {
                    preparedStatement.setString(bindIndex, strValue);
                    continue;
                }
                throw new PluginException(PREPARED_STATEMENT_BIND_PARAMETERS_ERROR, "PS_BIND_ERROR",
                        mustacheKey, value.getClass().getSimpleName());
            }
        } catch (Exception e) {
            if (e instanceof PluginException pluginException) {
                throw pluginException;
            }
            throw new PluginException(PREPARED_STATEMENT_BIND_PARAMETERS_ERROR, "PREPARED_STATEMENT_BIND_PARAMETERS_ERROR", e.getMessage());
        }
    }

    private void releaseResources(AutoCloseable... autoCloseables) {
        for (AutoCloseable closeable : autoCloseables) {
            if (closeable != null) {
                try {
                    closeable.close();
                } catch (Exception e) {
                    log.error("close {} error", closeable.getClass().getSimpleName(), e);
                }
            }
        }
    }

    private Connection getConnection(HikariDataSource hikariDataSource) {
        Connection connection;
        try {
            if (hikariDataSource == null || hikariDataSource.isClosed() || !hikariDataSource.isRunning()) {
                throw new InvalidHikariDatasourceException();
            }
            connection = hikariDataSource.getConnection();
        } catch (SQLException e) {
            throw new PluginException(CONNECTION_ERROR, "CONNECTION_ERROR", e.getMessage());
        }
        return connection;
    }

}
