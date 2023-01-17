package com.openblocks.plugin.mysql;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newLinkedHashMap;
import static com.openblocks.plugin.mysql.utils.MysqlStructureParser.parseTableAndColumns;
import static com.openblocks.plugin.mysql.utils.MysqlStructureParser.parseTableKeys;
import static com.openblocks.sdk.exception.PluginCommonError.CONNECTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_GET_STRUCTURE_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.PREPARED_STATEMENT_BIND_PARAMETERS_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getIdenticalColumns;
import static com.openblocks.sdk.plugin.common.SqlQueryUtils.isInsertQuery;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.MustacheHelper.doPrepareStatement;
import static com.openblocks.sdk.util.MustacheHelper.extractMustacheKeysInOrder;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;
import static java.util.Collections.emptyList;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.google.common.collect.Maps;
import com.openblocks.plugin.mysql.model.MysqlQueryConfig;
import com.openblocks.plugin.mysql.utils.MysqlResultParser;
import com.openblocks.sdk.exception.InvalidHikariDatasourceException;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.models.LocaleMessage;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.BlockingQueryExecutor;
import com.openblocks.sdk.plugin.common.SqlQueryUtils;
import com.openblocks.sdk.plugin.common.sql.HikariPerfWrapper;
import com.openblocks.sdk.plugin.common.sql.ResultSetParser;
import com.openblocks.sdk.plugin.common.sql.SqlBasedQueryExecutionContext;
import com.openblocks.sdk.plugin.mysql.MysqlDatasourceConfig;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.command.mysql.MysqlBulkInsertCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.mysql.MysqlBulkUpdateCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.mysql.MysqlDeleteCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.mysql.MysqlInsertCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.mysql.MysqlUpdateCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.mysql.MysqlUpsertCommand;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.openblocks.sdk.util.MustacheHelper;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Extension
public class MysqlQueryExecutor extends BlockingQueryExecutor<MysqlDatasourceConfig, HikariPerfWrapper, SqlBasedQueryExecutionContext> {

    @Override
    public SqlBasedQueryExecutionContext buildQueryExecutionContext(MysqlDatasourceConfig datasourceConfig, Map<String, Object> queryConfig,
            Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {
        MysqlQueryConfig mysqlQueryConfig = MysqlQueryConfig.from(queryConfig);

        if (mysqlQueryConfig.isGuiMode()) {
            GuiSqlCommand sqlCommand = getGuiSqlCommand(mysqlQueryConfig);
            return SqlBasedQueryExecutionContext.builder()
                    .guiSqlCommand(sqlCommand)
                    .requestParams(requestParams)
                    .build();

        }

        String query = SqlQueryUtils.removeQueryComments(mysqlQueryConfig.getSql().trim());
        if (StringUtils.isBlank(query)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "SQL_EMPTY");
        }

        return SqlBasedQueryExecutionContext.builder()
                .query(query)
                .requestParams(requestParams)
                .disablePreparedStatement(datasourceConfig.isEnableTurnOffPreparedStatement() &&
                        mysqlQueryConfig.isDisablePreparedStatement())
                .build();
    }

    private GuiSqlCommand getGuiSqlCommand(MysqlQueryConfig mysqlQueryConfig) {
        String guiStatementType = mysqlQueryConfig.getGuiStatementType();
        if (StringUtils.isBlank(guiStatementType)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "GUI_COMMAND_TYPE_EMPTY");
        }
        Map<String, Object> guiStatementDetail = mysqlQueryConfig.getGuiStatementDetail();
        if (MapUtils.isEmpty(guiStatementDetail)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_GUI_PARAM");
        }

        return parseSqlCommand(guiStatementType, guiStatementDetail);
    }

    private GuiSqlCommand parseSqlCommand(String guiStatementType, Map<String, Object> detail) {
        return switch (guiStatementType.toUpperCase()) {
            case "INSERT" -> MysqlInsertCommand.from(detail);
            case "UPDATE" -> MysqlUpdateCommand.from(detail);
            case "UPSERT" -> MysqlUpsertCommand.from(detail);
            case "DELETE" -> MysqlDeleteCommand.from(detail);
            case "BULK_INSERT" -> MysqlBulkInsertCommand.from(detail);
            case "BULK_UPDATE" -> MysqlBulkUpdateCommand.from(detail);
            default -> throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_GUI_COMMAND_TYPE", guiStatementType);
        };
    }

    @Nonnull
    @Override
    protected QueryExecutionResult blockingExecuteQuery(HikariPerfWrapper hikariDataSource, SqlBasedQueryExecutionContext context) {
        HikariDataSource dataSource = getHikariDataSource(hikariDataSource);

        GuiSqlCommand guiSqlCommand = context.getGuiSqlCommand();
        boolean guiMode = guiSqlCommand != null;
        String query = context.getQuery();
        boolean isPreparedStatement = guiMode || !context.isDisablePreparedStatement();
        Map<String, Object> requestParams = context.getRequestParams();

        Statement statement = null;
        ResultSet resultSet = null;
        PreparedStatement preparedQuery = null;
        ResultSet generatedKeys = null;
        boolean isResultSet;

        Connection connection = getConnection(dataSource);

        try {
            if (guiMode) {
                GuiSqlCommandRenderResult renderResult = guiSqlCommand.render(requestParams);
                String sql = renderResult.sql();
                List<Object> bindParams = renderResult.bindParams();
                boolean isInsertQuery = guiSqlCommand.isInsertCommand();

                preparedQuery = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                bindPreparedStatementForGuiMode(preparedQuery, bindParams);

                isResultSet = preparedQuery.execute();
                resultSet = preparedQuery.getResultSet();
                if (isInsertQuery) {
                    generatedKeys = preparedQuery.getGeneratedKeys();
                }
            } else {
                List<String> mustacheKeysInOrder = extractMustacheKeysInOrder(query);
                boolean isInsertQuery = isInsertQuery(query);

                if (isPreparedStatement) {
                    var preparedSql = doPrepareStatement(query, mustacheKeysInOrder, requestParams);
                    preparedQuery = connection.prepareStatement(preparedSql, Statement.RETURN_GENERATED_KEYS);
                    bindPreparedStatementParamsWithMustacheKeyValues(preparedQuery,
                            mustacheKeysInOrder,
                            requestParams
                    );

                    isResultSet = preparedQuery.execute();
                    resultSet = preparedQuery.getResultSet();
                    if (isInsertQuery) {
                        generatedKeys = preparedQuery.getGeneratedKeys();
                    }
                } else {
                    statement = connection.createStatement();
                    isResultSet = statement.execute(renderMustacheString(query, requestParams), Statement.RETURN_GENERATED_KEYS);
                    resultSet = statement.getResultSet();
                    if (isInsertQuery) {
                        generatedKeys = statement.getGeneratedKeys();
                    }
                }
            }

            return parseExecuteResult(isPreparedStatement, statement, resultSet, preparedQuery, generatedKeys, isResultSet);

        } catch (SQLException e) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
        } finally {
            releaseResources(connection, statement, resultSet, preparedQuery, generatedKeys);
        }
    }

    private HikariDataSource getHikariDataSource(HikariPerfWrapper hikariDataSource) {
        return (HikariDataSource) hikariDataSource.getHikariDataSource();
    }

    @Nonnull
    @Override
    public DatasourceStructure blockingGetStructure(HikariPerfWrapper hikariPerfWrapper) {

        Map<String, Table> tablesByName = new LinkedHashMap<>();
        try (Connection connection = getConnection(getHikariDataSource(hikariPerfWrapper));
                Statement statement = connection.createStatement()) {
            parseTableAndColumns(tablesByName, statement);
            parseTableKeys(tablesByName, statement);
        } catch (SQLException throwable) {
            throw new PluginException(DATASOURCE_GET_STRUCTURE_ERROR, "DATASOURCE_GET_STRUCTURE_ERROR",
                    throwable.getMessage());
        }

        DatasourceStructure structure = new DatasourceStructure(new ArrayList<>(tablesByName.values()));
        for (Table table : structure.getTables()) {
            table.getKeys().sort(Comparator.naturalOrder());
        }
        return structure;

    }

    @Override
    public Map<String, Object> sanitizeQueryConfig(Map<String, Object> queryConfig) {
        MysqlQueryConfig mysqlQueryConfig = MysqlQueryConfig.from(queryConfig);
        HashMap<String, Object> desensitizedQueryConfig = Maps.newHashMap();
        if (mysqlQueryConfig.isGuiMode()) {
            GuiSqlCommand guiSqlCommand = getGuiSqlCommand(mysqlQueryConfig);
            desensitizedQueryConfig.put("fields", guiSqlCommand.extractMustacheKeys());
        } else {
            String sql = mysqlQueryConfig.getSql();
            Set<String> mustacheKeys = MustacheHelper.extractMustacheKeysWithCurlyBraces(sql);
            desensitizedQueryConfig.put("fields", mustacheKeys);
        }
        return desensitizedQueryConfig;
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

    private QueryExecutionResult parseExecuteResult(boolean preparedStatement, Statement statement,
            ResultSet resultSet, PreparedStatement preparedQuery, ResultSet generatedKeys, boolean isResultSet) throws SQLException {

        if (isResultSet) {
            ResultSetMetaData metaData = resultSet.getMetaData();
            int colCount = metaData.getColumnCount();
            List<Map<String, Object>> dataRows = parseDataRows(resultSet, metaData, colCount);

            List<String> columnLabels = ResultSetParser.parseColumns(metaData);
            return QueryExecutionResult.success((dataRows), populateHintMessages(columnLabels));
        }

        Object affectedRows = preparedStatement ? Math.max(preparedQuery.getUpdateCount(), 0) // might return -1
                                                : Math.max(statement.getUpdateCount(), 0);
        Map<String, Object> result = newLinkedHashMap();
        result.put("affectedRows", affectedRows);

        List<Long> generatedIds = getGeneratedIds(generatedKeys);
        if (!generatedIds.isEmpty()) {
            result.put("generatedKeys", generatedIds);
        }

        return QueryExecutionResult.success(result);
    }

    private List<Map<String, Object>> parseDataRows(ResultSet resultSet, ResultSetMetaData metaData, int colCount) throws SQLException {
        List<Map<String, Object>> result = new ArrayList<>();
        while (resultSet.next()) {
            Map<String, Object> row = MysqlResultParser.parseRowValue(resultSet, metaData, colCount);
            result.add(row);
        }
        return result;
    }

    private List<Long> getGeneratedIds(ResultSet generatedKeys) throws SQLException {
        if (generatedKeys == null) {
            return emptyList();
        }
        List<Long> array = newArrayList();
        while (generatedKeys.next()) {
            array.add(generatedKeys.getLong(1));
        }
        return array;
    }

    private List<LocaleMessage> populateHintMessages(List<String> columnNames) {
        List<LocaleMessage> messages = new ArrayList<>();
        List<String> identicalColumns = getIdenticalColumns(columnNames);
        if (!org.springframework.util.CollectionUtils.isEmpty(identicalColumns)) {
            messages.add(new LocaleMessage("DUPLICATE_COLUMN", String.join("/", identicalColumns)));
        }
        return messages;
    }

    private void bindPreparedStatementParamsWithMustacheKeyValues(PreparedStatement preparedStatement, List<String> mustacheKeysInOrder,
            Map<String, Object> requestParams) {

        try {
            for (int index = 0; index < mustacheKeysInOrder.size(); index++) {

                String mustacheKey = mustacheKeysInOrder.get(index);
                Object value = requestParams.get(mustacheKey);

                bindParam(index + 1, value, preparedStatement, mustacheKey);
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
                bindKeyName, value.getClass().getSimpleName());
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

}
