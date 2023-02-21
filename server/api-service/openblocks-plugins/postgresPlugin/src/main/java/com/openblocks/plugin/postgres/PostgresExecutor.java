package com.openblocks.plugin.postgres;

import static com.openblocks.plugin.postgres.utils.PostgresDataTypeUtils.parseObjectDataType;
import static com.openblocks.plugin.postgres.utils.PostgresDataTypeUtils.toPostgresqlPrimitiveTypeName;
import static com.openblocks.plugin.postgres.utils.PostgresResultParser.parseDatabaseStructure;
import static com.openblocks.sdk.exception.PluginCommonError.CONNECTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.PREPARED_STATEMENT_BIND_PARAMETERS_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getIdenticalColumns;
import static com.openblocks.sdk.util.JsonUtils.fromJsonList;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.MustacheHelper.doPrepareStatement;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.sql.Array;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.pf4j.Extension;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.openblocks.plugin.postgres.model.DataType;
import com.openblocks.plugin.postgres.model.PostgresDatasourceConfig;
import com.openblocks.plugin.postgres.model.PostgresQueryConfig;
import com.openblocks.plugin.postgres.utils.PostgresDataTypeUtils;
import com.openblocks.plugin.postgres.utils.PostgresResultParser;
import com.openblocks.sdk.exception.InvalidHikariDatasourceException;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.LocaleMessage;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.BlockingQueryExecutor;
import com.openblocks.sdk.plugin.common.SqlQueryUtils;
import com.openblocks.sdk.plugin.common.sql.ResultSetParser;
import com.openblocks.sdk.plugin.common.sql.SqlBasedQueryExecutionContext;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateOrDeleteSingleCommandResult;
import com.openblocks.sdk.plugin.sqlcommand.command.postgres.PostgresBulkInsertCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.postgres.PostgresBulkUpdateCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.postgres.PostgresDeleteCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.postgres.PostgresInsertCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.postgres.PostgresUpdateCommand;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.openblocks.sdk.util.MustacheHelper;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Extension
public class PostgresExecutor extends BlockingQueryExecutor<PostgresDatasourceConfig, HikariDataSource, SqlBasedQueryExecutionContext> {

    @Override
    public SqlBasedQueryExecutionContext buildQueryExecutionContext(PostgresDatasourceConfig datasourceConfig,
            Map<String, Object> queryConfig,
            Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {

        PostgresQueryConfig postgresQueryConfig = PostgresQueryConfig.from(queryConfig);
        if (postgresQueryConfig.isGuiMode()) {
            GuiSqlCommand sqlCommand = getGuiSqlCommand(postgresQueryConfig);
            return SqlBasedQueryExecutionContext.builder()
                    .guiSqlCommand(sqlCommand)
                    .requestParams(requestParams)
                    .build();
        }

        String query = SqlQueryUtils.removeQueryComments(postgresQueryConfig.getSql().trim());
        return SqlBasedQueryExecutionContext.builder()
                .query(query)
                .requestParams(requestParams)
                .disablePreparedStatement(datasourceConfig.isEnableTurnOffPreparedStatement() &&
                        postgresQueryConfig.isDisablePreparedStatement())
                .build();
    }

    @Nonnull
    @Override
    public QueryExecutionResult blockingExecuteQuery(HikariDataSource connection, SqlBasedQueryExecutionContext context) {

        String query = context.getQuery();
        GuiSqlCommand guiSqlCommand = context.getGuiSqlCommand();
        boolean isGuiMode = guiSqlCommand != null;
        Map<String, Object> requestParams = context.getRequestParams();
        if (StringUtils.isBlank(query) && !isGuiMode) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "SQL_EMPTY");
        }

        boolean isPreparedStatement = isGuiMode || !context.isDisablePreparedStatement();
        return executeCommon(connection, isPreparedStatement, requestParams, guiSqlCommand, query);
    }

    private QueryExecutionResult executeCommon(HikariDataSource hikariDataSource,
            boolean preparedStatement,
            Map<String, Object> requestParams,
            GuiSqlCommand guiSqlCommand, String rawQuery) {

        Connection connection = getConnectionFromConnectionPool(hikariDataSource);
        Statement statement = null;
        ResultSet resultSet = null;
        PreparedStatement preparedQuery = null;
        boolean isResultSet;

        try {
            if (!preparedStatement) {
                String updatedQuery = renderMustacheString(rawQuery, requestParams);
                statement = connection.createStatement();
                isResultSet = statement.execute(updatedQuery);
                resultSet = statement.getResultSet();
            } else {
                if (guiSqlCommand != null) {
                    GuiSqlCommandRenderResult renderResult = guiSqlCommand.render(requestParams);
                    if (renderResult instanceof UpdateOrDeleteSingleCommandResult updateOrDeleteSingleCommandResult) {
                        int count = getSelectCount(connection, updateOrDeleteSingleCommandResult);
                        if (count > 1) {
                            throw new PluginException(QUERY_EXECUTION_ERROR, "AFFECT_MORE_THAN_ONE_ROWS_FOR_SINGLE_COMMAND");
                        }
                    }
                    preparedQuery = connection.prepareStatement(renderResult.sql());
                    bindPreparedStatementForGuiMode(preparedQuery, renderResult.bindParams());
                } else {
                    List<String> mustacheValuesInOrder = MustacheHelper.extractMustacheKeysInOrder(rawQuery);
                    var updatedQuery = doPrepareStatement(rawQuery, mustacheValuesInOrder, requestParams);
                    List<DataType> explicitCastDataTypes = PostgresDataTypeUtils.extractExplicitCasting(updatedQuery);

                    preparedQuery = connection.prepareStatement(updatedQuery);
                    preparedQuery = bindParams(preparedQuery,
                            mustacheValuesInOrder,
                            requestParams,
                            connection,
                            explicitCastDataTypes);

                }
                isResultSet = preparedQuery.execute();
                resultSet = preparedQuery.getResultSet();
            }

            if (!isResultSet) {
                Object updateCount = preparedStatement ? ObjectUtils.defaultIfNull(preparedQuery.getUpdateCount(), 0)
                                                       : ObjectUtils.defaultIfNull(statement.getUpdateCount(), 0);
                return QueryExecutionResult.success(List.of(Map.of("affectedRows", updateCount)), Collections.emptyList());
            }

            Pair<List<Map<String, Object>>, List<String>> pair = parseResultSet(resultSet);
            List<Map<String, Object>> rowsList = pair.getLeft();
            List<String> columnsList = pair.getRight();
            return QueryExecutionResult.success(rowsList, populateHintMessages(columnsList));
        } catch (SQLException e) {
            log.error("PostgresPlugin execution error", e);
            throw new PluginException(QUERY_ARGUMENT_ERROR, "QUERY_ARGUMENT_ERROR", e.getMessage());
        } catch (IOException e) {
            // Since postgres json type field can only hold valid json data, this exception is not expected
            // to occur.
            log.error("PostgresPlugin execution error", e);
            throw new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
        } finally {
            releaseResources(connection, statement, resultSet, preparedQuery);
        }
    }

    private int getSelectCount(Connection connection, UpdateOrDeleteSingleCommandResult commandResult)
            throws SQLException, JsonProcessingException {
        String selectSql = commandResult.getSelectQuery();
        List<Object> selectBindParams = commandResult.getSelectBindParams();
        var selectQuery = connection.prepareStatement(selectSql);
        bindPreparedStatementForGuiMode(selectQuery, selectBindParams);
        selectQuery.execute();
        ResultSet selectCountResultSet = selectQuery.getResultSet();
        List<Map<String, Object>> selectCount = parseResultSet(selectCountResultSet).getLeft();
        if (selectCount.get(0).get("count") instanceof Number count) {
            return count.intValue();
        }
        throw new PluginException(QUERY_EXECUTION_ERROR, "FAIL_TO_GET_AFFECTED_ROW_COUNT");
    }

    private static Pair<List<Map<String, Object>>, List<String>> parseResultSet(ResultSet resultSet)
            throws SQLException, JsonProcessingException {

        List<Map<String, Object>> rowsList = new ArrayList<>();
        List<String> columnsList = new ArrayList<>();

        ResultSetMetaData metaData = resultSet.getMetaData();
        int colCount = metaData.getColumnCount();
        columnsList.addAll(ResultSetParser.parseColumns(metaData));

        while (resultSet.next()) {
            rowsList.add(PostgresResultParser.parseRowValue(resultSet, metaData, colCount));
        }

        return Pair.of(rowsList, columnsList);
    }

    private PreparedStatement bindParams(PreparedStatement preparedStatement, List<String> mustacheValuesInOrder,
            Map<String, Object> evaluatedParams, Connection connectionFromPool,
            List<DataType> explicitCastDataTypes) {

        if (mustacheValuesInOrder == null || mustacheValuesInOrder.isEmpty()) {
            return preparedStatement;
        }

        for (int i = 0; i < mustacheValuesInOrder.size(); i++) {
            String key = mustacheValuesInOrder.get(i);
            boolean containsKey = evaluatedParams.containsKey(key);
            if (!containsKey) {
                throw new PluginException(QUERY_EXECUTION_ERROR, "BOUND_VALUE_NOT_MATCH", key);
            }

            Object value = evaluatedParams.get(key);
            DataType targetType;
            boolean needCast;
            if (explicitCastDataTypes != null && explicitCastDataTypes.get(i) != null) {
                targetType = explicitCastDataTypes.get(i);
                needCast = parseObjectDataType(value) != targetType;
            } else {
                targetType = parseObjectDataType(value);
                needCast = false;
            }

            try {
                bindPreparedStatement(i + 1, value, preparedStatement, connectionFromPool, targetType, needCast);
            } catch (SQLException | IllegalArgumentException | IOException e) {
                throw new PluginException(QUERY_ARGUMENT_ERROR, "QUERY_ARGUMENT_ERROR",
                        "Param: {{" + key + "}} bind value: " + value + " failed, msg: " + e.getMessage());
            }
        }
        return preparedStatement;
    }

    private void bindPreparedStatementForGuiMode(PreparedStatement preparedQuery, List<Object> bindParams) {
        try {
            for (int index = 0; index < bindParams.size(); index++) {
                Object value = bindParams.get(index);
                bindParam(index + 1, value, preparedQuery, "");
            }
        } catch (Exception e) {
            if (e instanceof PluginException pluginException) {
                throw pluginException;
            }
            throw new PluginException(PREPARED_STATEMENT_BIND_PARAMETERS_ERROR, "PREPARED_STATEMENT_BIND_PARAMETERS_ERROR", e.getMessage());
        }
    }

    private void bindParam(int bindIndex, Object value, PreparedStatement preparedStatement, String bindKeyName) throws SQLException {
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
                StringUtils.isBlank(bindKeyName) ? String.valueOf(value) : bindKeyName,
                value.getClass().getSimpleName());
    }

    private void releaseResources(Connection connectionFromPool, Statement statement,
            ResultSet resultSet, PreparedStatement preparedQuery) {
        if (resultSet != null) {
            try {
                resultSet.close();
            } catch (SQLException e) {
                log.error("Execute Error closing Postgres ResultSet", e);
            }
        }

        if (statement != null) {
            try {
                statement.close();
            } catch (SQLException e) {
                log.error("Execute Error closing Postgres Statement", e);
            }
        }

        if (preparedQuery != null) {
            try {
                preparedQuery.close();
            } catch (SQLException e) {
                log.error("Execute Error closing Postgres Statement", e);
            }
        }

        if (connectionFromPool != null) {
            try {
                // Return the connetion back to the pool
                connectionFromPool.close();
            } catch (SQLException e) {
                log.info("Execute Error returning Postgres connection to pool", e);
            }
        }
    }

    private List<LocaleMessage> populateHintMessages(List<String> columnNames) {
        List<LocaleMessage> messages = new ArrayList<>();
        List<String> identicalColumns = getIdenticalColumns(columnNames);
        if (!CollectionUtils.isEmpty(identicalColumns)) {
            messages.add(new LocaleMessage("DUPLICATE_COLUMN", String.join("/", identicalColumns)));
        }
        return messages;
    }

    @Nonnull
    @Override
    public DatasourceStructure blockingGetStructure(HikariDataSource hikariDataSource,
            PostgresDatasourceConfig connectionConfig) {

        DatasourceStructure structure = new DatasourceStructure();
        Map<String, DatasourceStructure.Table> tablesByName = new LinkedHashMap<>();

        Connection connection = getConnectionFromConnectionPool(hikariDataSource);

        try (Statement statement = connection.createStatement()) {
            parseDatabaseStructure(tablesByName, statement);
        } catch (SQLException throwable) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", throwable.getMessage());
        } finally {
            releaseConnection(connection);
        }

        structure.setTables(new ArrayList<>(tablesByName.values()));
        for (DatasourceStructure.Table table : structure.getTables()) {
            table.getKeys().sort(Comparator.naturalOrder());
        }
        return structure;
    }

    private void releaseConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                log.info("Error returning Postgres connection to pool during get structure", e);
            }
        }
    }

    private static Connection getConnectionFromConnectionPool(HikariDataSource connectionPool) {

        if (connectionPool == null || connectionPool.isClosed() || !connectionPool.isRunning()) {
            throw new InvalidHikariDatasourceException();
        }

        try {
            return connectionPool.getConnection();
        } catch (SQLException e) {
            throw new PluginException(CONNECTION_ERROR, "CONNECTION_ERROR", e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    private static void bindPreparedStatement(int index, Object value, PreparedStatement preparedStatement,
            Connection connection, DataType targetDataType, boolean needCast)
            throws SQLException, UnsupportedEncodingException {

        switch (targetDataType) {
            case NULL -> preparedStatement.setNull(index, Types.NULL);
            case BINARY -> preparedStatement.setBinaryStream(index, IOUtils.toInputStream(String.valueOf(value), StandardCharsets.UTF_8));
            case BYTES -> preparedStatement.setBytes(index, String.valueOf(value).getBytes(StandardCharsets.UTF_8));
            case INTEGER -> {
                if (needCast) {
                    preparedStatement.setInt(index, Integer.parseInt(String.valueOf(value)));
                } else {
                    preparedStatement.setInt(index, (Integer) value);
                }
            }
            case LONG -> {
                if (needCast) {
                    preparedStatement.setLong(index, Long.parseLong(String.valueOf(value)));
                } else {
                    preparedStatement.setLong(index, (Long) value);
                }
            }
            case FLOAT, DOUBLE -> preparedStatement.setBigDecimal(index, new BigDecimal(String.valueOf(value)));
            case BOOLEAN -> {
                if (needCast) {
                    preparedStatement.setBoolean(index, Boolean.parseBoolean(String.valueOf(value)));
                } else {
                    preparedStatement.setBoolean(index, (Boolean) value);
                }
            }
            case DATE -> preparedStatement.setDate(index, Date.valueOf(String.valueOf(value)));
            case TIME -> preparedStatement.setTime(index, Time.valueOf(String.valueOf(value)));
            case TIMESTAMP -> preparedStatement.setTimestamp(index, Timestamp.valueOf(String.valueOf(value)));
            case ARRAY -> {
                Collection<Object> arrayListFromInput;
                if (needCast) {
                    arrayListFromInput = fromJsonList(toJson(value));
                } else {
                    arrayListFromInput = (Collection<Object>) value;
                }

                if (CollectionUtils.isEmpty(arrayListFromInput)) {
                    preparedStatement.setNull(index, Types.NULL);
                    return;
                }

                // Find the type of the entries in the list
                Object firstEntry = arrayListFromInput.iterator().next();
                DataType dataType = parseObjectDataType(firstEntry);
                String typeName = toPostgresqlPrimitiveTypeName(dataType);

                // Create the Sql Array and set it.
                Array inputArray = connection.createArrayOf(typeName, arrayListFromInput.toArray());
                preparedStatement.setArray(index, inputArray);
            }
            case JSON_OBJECT -> {
                if (value instanceof Map<?, ?> || value instanceof Collection<?>) {
                    preparedStatement.setString(index, toJson(value));
                } else {
                    preparedStatement.setString(index, String.valueOf(value));
                }
            }
            case STRING -> preparedStatement.setString(index, String.valueOf(value));
            default -> {
            }
        }
    }

    private GuiSqlCommand getGuiSqlCommand(PostgresQueryConfig queryConfig) {
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
            case "INSERT" -> PostgresInsertCommand.from(detail);
            case "UPDATE" -> PostgresUpdateCommand.from(detail);
            case "DELETE" -> PostgresDeleteCommand.from(detail);
            case "BULK_INSERT" -> PostgresBulkInsertCommand.from(detail);
            case "BULK_UPDATE" -> PostgresBulkUpdateCommand.from(detail);
            default -> throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_GUI_COMMAND_TYPE", guiStatementType);
        };
    }

}
