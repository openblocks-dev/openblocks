package com.openblocks.plugin.mssql;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.plugin.mssql.util.MssqlStructureParser.parseTableAndColumns;
import static com.openblocks.sdk.exception.PluginCommonError.CONNECTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_GET_STRUCTURE_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.PREPARED_STATEMENT_BIND_PARAMETERS_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.querySharedScheduler;
import static com.openblocks.sdk.util.ExceptionUtils.wrapException;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.MustacheHelper.doPrepareStatement;
import static com.openblocks.sdk.util.MustacheHelper.extractMustacheKeysInOrder;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;
import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

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

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.openblocks.plugin.mssql.gui.MssqlBulkInsertCommand;
import com.openblocks.plugin.mssql.gui.MssqlBulkUpdateCommand;
import com.openblocks.plugin.mssql.gui.MssqlDeleteCommand;
import com.openblocks.plugin.mssql.gui.MssqlInsertCommand;
import com.openblocks.plugin.mssql.gui.MssqlUpdateCommand;
import com.openblocks.plugin.mssql.model.MssqlDatasourceConfig;
import com.openblocks.plugin.mssql.model.MssqlQueryConfig;
import com.openblocks.plugin.mssql.util.MssqlResultParser;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.exception.InvalidHikariDatasourceException;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.plugin.common.SqlQueryUtils;
import com.openblocks.sdk.plugin.common.sql.SqlBasedQueryExecutionContext;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Extension
public class MssqlQueryExecutor implements QueryExecutor<MssqlDatasourceConfig, HikariDataSource, SqlBasedQueryExecutionContext> {

    private final Supplier<Duration> getStructureTimeout;

    public MssqlQueryExecutor(ConfigCenter configCenter) {
        this.getStructureTimeout = configCenter.mysqlPlugin().ofInteger("getStructureTimeoutMillis", 8000)
                .then(Duration::ofMillis);
    }

    @Override
    public SqlBasedQueryExecutionContext buildQueryExecutionContext(MssqlDatasourceConfig datasourceConfig,
            Map<String, Object> queryConfig,
            Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {
        MssqlQueryConfig mssqlQueryConfig = MssqlQueryConfig.from(queryConfig);

        if (mssqlQueryConfig.isGuiMode()) {
            GuiSqlCommand sqlCommand = getGuiSqlCommand(mssqlQueryConfig);
            return SqlBasedQueryExecutionContext.builder()
                    .guiSqlCommand(sqlCommand)
                    .requestParams(requestParams)
                    .build();
        }

        String query = SqlQueryUtils.removeQueryComments(mssqlQueryConfig.getSql().trim());
        return SqlBasedQueryExecutionContext.builder()
                .query(query)
                .requestParams(requestParams)
                .disablePreparedStatement(datasourceConfig.isEnableTurnOffPreparedStatement() &&
                        mssqlQueryConfig.isDisablePreparedStatement())
                .build();
    }

    @Override
    public Mono<QueryExecutionResult> executeQuery(HikariDataSource hikariDataSource, SqlBasedQueryExecutionContext context) {

        String query = context.getQuery();
        GuiSqlCommand guiSqlCommand = context.getGuiSqlCommand();
        boolean isGuiMode = guiSqlCommand != null;
        Map<String, Object> requestParams = context.getRequestParams();
        if (StringUtils.isBlank(query) && !isGuiMode) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "SQL_EMPTY");
        }

        boolean isPreparedStatement = isGuiMode || !context.isDisablePreparedStatement();

        return Mono.fromSupplier(() -> executeQuery0(hikariDataSource, query, requestParams, guiSqlCommand, isPreparedStatement))
                .onErrorMap(e -> {
                    if (e instanceof PluginException) {
                        return e;
                    }
                    return new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
                })
                .subscribeOn(querySharedScheduler());
    }

    @Override
    public Mono<DatasourceStructure> getStructure(HikariDataSource hikariDataSource) {
        return Mono.fromCallable(() -> {
                    Connection connection = getConnection(hikariDataSource);

                    Map<String, Table> tablesByName = new LinkedHashMap<>();
                    try (Statement statement = connection.createStatement()) {
                        parseTableAndColumns(tablesByName, statement);
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

    private QueryExecutionResult executeQuery0(HikariDataSource hikariDataSource, String query, Map<String, Object> requestParams,
            GuiSqlCommand guiSqlCommand, boolean isPreparedStatement) {

        Statement statement = null;
        PreparedStatement preparedQuery = null;
        boolean isResultSet;
        ResultSet generatedKeys = null;
        Connection connection = getConnection(hikariDataSource);

        try {
            if (guiSqlCommand != null) {
                GuiSqlCommandRenderResult renderResult = guiSqlCommand.render(requestParams);
                String sql = renderResult.sql();
                List<Object> bindParams = renderResult.bindParams();
                boolean isInsertQuery = guiSqlCommand.isInsertCommand();
                preparedQuery = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                bindPreparedStatementForGuiMode(preparedQuery, bindParams);

                isResultSet = preparedQuery.execute();
                if (isInsertQuery) {
                    generatedKeys = preparedQuery.getGeneratedKeys();
                }
            } else {
                if (isPreparedStatement) {
                    List<String> mustacheKeysInOrder = extractMustacheKeysInOrder(query);
                    String preparedSql = doPrepareStatement(query, mustacheKeysInOrder, requestParams);

                    preparedQuery = connection.prepareStatement(preparedSql, Statement.RETURN_GENERATED_KEYS);
                    bindPreparedStatementParams(preparedQuery, mustacheKeysInOrder, requestParams);

                    isResultSet = preparedQuery.execute();
                } else {
                    statement = connection.createStatement();
                    isResultSet = statement.execute(renderMustacheString(query, requestParams), Statement.RETURN_GENERATED_KEYS);
                }
            }

            return parseExecuteResult(firstNonNull(preparedQuery, statement), isResultSet);

        } catch (SQLException e) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
        } finally {
            // Note:When a Statement object is closed, its current ResultSet object, if one exists, is also closed.
            // https://docs.oracle.com/javase/6/docs/api/java/sql/Statement.html
            releaseResources(connection, statement, generatedKeys, preparedQuery);
        }
    }

    private void bindPreparedStatementForGuiMode(PreparedStatement preparedQuery, List<Object> bindParams) {
        try {
            for (int index = 0; index < bindParams.size(); index++) {
                Object value = bindParams.get(index);
                bindParam(index + 1, value, preparedQuery, "");
            }
        } catch (Exception e) {
            throw wrapException(PREPARED_STATEMENT_BIND_PARAMETERS_ERROR, "PREPARED_STATEMENT_BIND_PARAMETERS_ERROR", e);
        }
    }

    private QueryExecutionResult parseExecuteResult(Statement statement, boolean isResultSet)
            throws SQLException {

        List<Object> result = newArrayList();
        int updateCount = statement.getUpdateCount();
        do {
            if (isResultSet) {
                ResultSet rs = statement.getResultSet();
                ResultSetMetaData metaData = rs.getMetaData();
                int colCount = metaData.getColumnCount();
                List<Map<String, Object>> dataRows = parseDataRows(rs, metaData, colCount);
                if (!containsNullGeneratedKeys(dataRows)) {
                    result.add(dataRows);
                }
            } else {
                Object affectedRows = Math.max(updateCount, 0);
                result.add(Map.of("affectedRows", affectedRows));
            }

            isResultSet = statement.getMoreResults();
            updateCount = statement.getUpdateCount();
        } while (isResultSet || updateCount != -1);

        if (result.size() == 1) {
            return QueryExecutionResult.success(result.get(0));
        }

        return QueryExecutionResult.success(result);
    }

    private static boolean containsNullGeneratedKeys(List<Map<String, Object>> dataRows) {
        if (dataRows.size() != 1) {
            return false;
        }
        Map<String, Object> map = dataRows.get(0);
        if (map.size() == 1) {
            return map.containsKey("GENERATED_KEYS");
        }
        return false;
    }

    private List<Map<String, Object>> parseDataRows(ResultSet resultSet, ResultSetMetaData metaData, int colCount) throws SQLException {
        List<Map<String, Object>> result = new ArrayList<>();
        while (resultSet.next()) {
            Map<String, Object> row = MssqlResultParser.parseRowValue(resultSet, metaData, colCount);
            result.add(row);
        }
        return result;
    }

    private void bindPreparedStatementParams(PreparedStatement preparedStatement, List<String> mustacheKeysInOrder,
            Map<String, Object> requestParams) {

        try {
            for (int index = 0; index < mustacheKeysInOrder.size(); index++) {
                String mustacheKey = mustacheKeysInOrder.get(index);
                Object value = requestParams.get(mustacheKey);
                int bindIndex = index + 1;
                bindParam(bindIndex, value, preparedStatement, mustacheKey);
            }
        } catch (Exception e) {
            if (e instanceof PluginException pluginException) {
                throw pluginException;
            }
            throw new PluginException(PREPARED_STATEMENT_BIND_PARAMETERS_ERROR, "PS_BIND_ERROR", e.getMessage());
        }
    }

    private static void bindParam(int bindIndex, Object value, PreparedStatement preparedStatement, String mustacheKey) throws SQLException {
        if (value == null) {
            preparedStatement.setNull(bindIndex, Types.NULL);
            return;
        }
        if (value instanceof Integer intValue) {
            preparedStatement.setInt(bindIndex, intValue);
            return;
        }
        if (value instanceof Long longValue) {
            preparedStatement.setLong(bindIndex, longValue);
            return;
        }
        if (value instanceof Float || value instanceof Double) {
            preparedStatement.setBigDecimal(bindIndex, new BigDecimal(String.valueOf(value)));
            return;
        }
        if (value instanceof Boolean boolValue) {
            preparedStatement.setBoolean(bindIndex, boolValue);
            return;
        }
        if (value instanceof Map<?, ?> || value instanceof Collection<?>) {
            preparedStatement.setString(bindIndex, toJson(value));
            return;
        }
        if (value instanceof String strValue) {
            preparedStatement.setString(bindIndex, strValue);
            return;
        }
        throw new PluginException(PREPARED_STATEMENT_BIND_PARAMETERS_ERROR, "PS_BIND_ERROR",
                StringUtils.isBlank(mustacheKey) ? String.valueOf(value) : mustacheKey,
                value.getClass().getSimpleName());
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
        try {
            if (hikariDataSource == null || hikariDataSource.isClosed() || !hikariDataSource.isRunning()) {
                throw new InvalidHikariDatasourceException();
            }
            return hikariDataSource.getConnection();
        } catch (SQLException e) {
            throw new PluginException(CONNECTION_ERROR, "CONNECTION_ERROR", e.getMessage());
        }
    }

    private GuiSqlCommand getGuiSqlCommand(MssqlQueryConfig queryConfig) {
        String guiStatementType = queryConfig.getGuiStatementType();
        if (StringUtils.isBlank(guiStatementType)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "GUI_COMMAND_TYPE_EMPTY");
        }
        Map<String, Object> guiStatementDetail = queryConfig.getGuiStatementDetail();
        if (MapUtils.isEmpty(guiStatementDetail)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_GUI_PARAM");
        }

        return parseSqlCommand(guiStatementType, guiStatementDetail);
    }

    private GuiSqlCommand parseSqlCommand(String guiStatementType, Map<String, Object> detail) {
        return switch (guiStatementType.toUpperCase()) {
            case "INSERT" -> MssqlInsertCommand.from(detail);
            case "UPDATE" -> MssqlUpdateCommand.from(detail);
            case "DELETE" -> MssqlDeleteCommand.from(detail);
            case "BULK_INSERT" -> MssqlBulkInsertCommand.from(detail);
            case "BULK_UPDATE" -> MssqlBulkUpdateCommand.from(detail);
            default -> throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_GUI_COMMAND_TYPE", guiStatementType);
        };
    }
}
