package com.openblocks.plugin.sql;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMapWithExpectedSize;
import static com.openblocks.sdk.exception.PluginCommonError.PREPARED_STATEMENT_BIND_PARAMETERS_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.util.ExceptionUtils.wrapException;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.MustacheHelper.doPrepareStatement;
import static com.openblocks.sdk.util.MustacheHelper.extractMustacheKeysInOrder;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;
import static java.util.Collections.emptyList;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.tuple.Pair;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.sql.ResultSetParser;
import com.openblocks.sdk.plugin.common.sql.SqlBasedQueryExecutionContext;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HikariSqlExecutor {

    private final boolean supportGenerateKeys;

    public HikariSqlExecutor(boolean supportGenerateKeys) {
        this.supportGenerateKeys = supportGenerateKeys;
    }

    public HikariSqlExecutor() {
        this(true);
    }

    @Nonnull
    public QueryExecutionResult execute(Connection connection, SqlBasedQueryExecutionContext context) {

        GuiSqlCommand guiSqlCommand = context.getGuiSqlCommand();
        boolean guiMode = guiSqlCommand != null;
        String query = context.getQuery();
        boolean isPreparedStatement = guiMode || !context.isDisablePreparedStatement();
        Map<String, Object> requestParams = new HashMap<>(context.getRequestParams());

        SqlExecutionInput sqlExecutionInput = getSqlExecutionInput(guiSqlCommand, query, isPreparedStatement, requestParams);
        Pair<Statement, Boolean> executionResult = getStatementAndExecute(connection, sqlExecutionInput);

        boolean isResultSet = executionResult.getRight();
        try (Statement statement = executionResult.getLeft()) {
            return parseExecuteResult(statement, isResultSet);
        } catch (SQLException e) {
            throw wrapException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e);
        }
    }

    private QueryExecutionResult parseExecuteResult(Statement statement, boolean isResultSet) throws SQLException {

        List<Object> result = newArrayList();
        int updateCount = statement.getUpdateCount();
        do {
            if (isResultSet) {
                try (ResultSet resultSet = statement.getResultSet()) {
                    List<Map<String, Object>> dataRows = ResultSetParser.parseRows(resultSet);
                    if (!isGeneratedKeysWithNullValue(dataRows)) {
                        result.add(dataRows);
                    }
                }
            } else {
                result.add(getAffectRowsAndGeneratedKeys(statement, updateCount));
            }

            isResultSet = statement.getMoreResults();
            updateCount = statement.getUpdateCount();
        } while (isResultSet || updateCount != -1);

        if (result.size() == 1) {
            return QueryExecutionResult.success(result.get(0));
        }

        return QueryExecutionResult.success(result);
    }

    private Map<String, Object> getAffectRowsAndGeneratedKeys(Statement statement, int updateCount) throws SQLException {
        Map<String, Object> result = newHashMapWithExpectedSize(2);
        result.put("affectedRows", updateCount);

        ResultSet generatedKeys = getGeneratedKeys(statement);
        if (generatedKeys == null) {
            return result;
        }

        try (generatedKeys) {
            List<Object> generatedIds = getGeneratedIds(generatedKeys);
            if (!generatedIds.isEmpty()) {
                result.put("generatedKeys", generatedIds);
            }
        }
        return result;
    }

    private static ResultSet getGeneratedKeys(Statement statement) {
        // Oracle will throw exception here in some cases, so we catch the exception here
        try {
            return statement.getGeneratedKeys();
        } catch (Exception e) {
            return null;
        }
    }

    private static boolean isGeneratedKeysWithNullValue(List<Map<String, Object>> dataRows) {
        if (dataRows.size() != 1) {
            return false;
        }
        Map<String, Object> map = dataRows.get(0);
        if (map.size() == 1) {
            return map.containsKey("GENERATED_KEYS");
        }
        return false;
    }

    private Pair<Statement, Boolean> getStatementAndExecute(Connection connection, SqlExecutionInput sqlExecutionInput) {
        try {
            if (sqlExecutionInput.preparedStatement()) {
                String sql = sqlExecutionInput.sql();
                List<Object> params = sqlExecutionInput.params();
                var statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                bindPreparedStatementParams(statement, params);
                var isResultSet = statement.execute();
                return Pair.of(statement, isResultSet);
            }

            var statement = connection.createStatement();
            boolean isResultSet;
            if (supportGenerateKeys) {
                isResultSet = statement.execute(sqlExecutionInput.sql(), Statement.RETURN_GENERATED_KEYS);
            } else {
                isResultSet = statement.execute(sqlExecutionInput.sql());
            }
            return Pair.of(statement, isResultSet);
        } catch (Exception e) {
            throw wrapException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e);
        }
    }

    private SqlExecutionInput getSqlExecutionInput(GuiSqlCommand guiSqlCommand, String query, boolean isPreparedStatement,
            Map<String, Object> requestParams) {
        if (isPreparedStatement) {
            return getPreparedStatementSqlInput(guiSqlCommand, query, requestParams);
        }
        String renderedSql = renderMustacheString(query, requestParams);
        return new SqlExecutionInput(false, renderedSql, emptyList());
    }

    private SqlExecutionInput getPreparedStatementSqlInput(GuiSqlCommand guiSqlCommand, String query, Map<String, Object> requestParams) {
        if (guiSqlCommand != null) {
            GuiSqlCommandRenderResult renderResult = guiSqlCommand.render(requestParams);
            return new SqlExecutionInput(true, renderResult.sql(), renderResult.bindParams());
        }

        List<String> mustacheKeysInOrder = extractMustacheKeysInOrder(query);
        var preparedSql = doPrepareStatement(query, mustacheKeysInOrder, requestParams);
        List<Object> bindParams = mustacheKeysInOrder.stream()
                .map(requestParams::get)
                .toList();
        return new SqlExecutionInput(true, preparedSql, bindParams);
    }

    private void bindPreparedStatementParams(PreparedStatement preparedQuery, List<Object> bindParams) {
        try {
            for (int index = 0; index < bindParams.size(); index++) {
                Object value = bindParams.get(index);
                bindParam(index + 1, value, preparedQuery, "");
            }
        } catch (Exception e) {
            throw wrapException(PREPARED_STATEMENT_BIND_PARAMETERS_ERROR, "PREPARED_STATEMENT_BIND_PARAMETERS_ERROR", e);
        }
    }

    private List<Object> getGeneratedIds(ResultSet generatedKeys) throws SQLException {
        if (generatedKeys == null) {
            return emptyList();
        }
        List<Object> array = newArrayList();
        while (generatedKeys.next()) {
            array.add(generatedKeys.getObject(1));
        }
        return array;
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
        throw new PluginException(PREPARED_STATEMENT_BIND_PARAMETERS_ERROR, "PS_BIND_ERROR", bindKeyName, value.getClass().getSimpleName());
    }

    private record SqlExecutionInput(boolean preparedStatement, String sql, List<Object> params) {

    }
}
