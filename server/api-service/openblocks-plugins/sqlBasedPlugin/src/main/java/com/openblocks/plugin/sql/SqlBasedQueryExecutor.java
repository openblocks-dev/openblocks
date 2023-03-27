package com.openblocks.plugin.sql;

import static com.openblocks.sdk.exception.PluginCommonError.CONNECTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.util.ExceptionUtils.wrapException;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Maps;
import com.openblocks.sdk.exception.InvalidHikariDatasourceException;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.BlockingQueryExecutor;
import com.openblocks.sdk.plugin.common.SqlQueryUtils;
import com.openblocks.sdk.plugin.common.sql.HikariPerfWrapper;
import com.openblocks.sdk.plugin.common.sql.SqlBasedDatasourceConnectionConfig;
import com.openblocks.sdk.plugin.common.sql.SqlBasedQueryExecutionContext;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.openblocks.sdk.util.MustacheHelper;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class SqlBasedQueryExecutor extends BlockingQueryExecutor<SqlBasedDatasourceConnectionConfig,
        HikariPerfWrapper, SqlBasedQueryExecutionContext> {

    private final GeneralSqlExecutor generalSqlExecutor;

    protected SqlBasedQueryExecutor(GeneralSqlExecutor generalSqlExecutor) {
        this.generalSqlExecutor = generalSqlExecutor;
    }

    @Override
    public SqlBasedQueryExecutionContext buildQueryExecutionContext(SqlBasedDatasourceConnectionConfig datasourceConfig,
            Map<String, Object> queryConfig,
            Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {
        SqlQueryConfig sqlQueryConfig = SqlQueryConfig.from(queryConfig);

        if (sqlQueryConfig.isGuiMode()) {
            GuiSqlCommand sqlCommand = getGuiSqlCommand(sqlQueryConfig);
            return SqlBasedQueryExecutionContext.builder()
                    .guiSqlCommand(sqlCommand)
                    .requestParams(requestParams)
                    .build();
        }

        String query = SqlQueryUtils.removeQueryComments(sqlQueryConfig.getSql());
        if (StringUtils.isBlank(query)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "SQL_EMPTY");
        }

        return SqlBasedQueryExecutionContext.builder()
                .query(query)
                .requestParams(requestParams)
                .disablePreparedStatement(datasourceConfig.isEnableTurnOffPreparedStatement() &&
                        sqlQueryConfig.isDisablePreparedStatement())
                .build();
    }

    private GuiSqlCommand getGuiSqlCommand(SqlQueryConfig sqlQueryConfig) {
        String guiStatementType = sqlQueryConfig.getGuiStatementType();
        if (StringUtils.isBlank(guiStatementType)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "GUI_COMMAND_TYPE_EMPTY");
        }
        Map<String, Object> guiStatementDetail = sqlQueryConfig.getGuiStatementDetail();
        if (MapUtils.isEmpty(guiStatementDetail)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_GUI_PARAM");
        }

        return parseSqlCommand(guiStatementType, guiStatementDetail);
    }

    protected abstract GuiSqlCommand parseSqlCommand(String guiStatementType, Map<String, Object> detail);

    @Nonnull
    @Override
    protected QueryExecutionResult blockingExecuteQuery(HikariPerfWrapper hikariPerfWrapper, SqlBasedQueryExecutionContext context) {
        HikariDataSource dataSource = getHikariDataSource(hikariPerfWrapper);
        log.info("Hikari hashcode: {}, active: {}, idle: {}, wait: {}, total: {}", dataSource.hashCode()
                , dataSource.getHikariPoolMXBean().getActiveConnections(),
                dataSource.getHikariPoolMXBean().getIdleConnections(),
                dataSource.getHikariPoolMXBean().getThreadsAwaitingConnection(),
                dataSource.getHikariPoolMXBean().getTotalConnections()
        );

        try (Connection connection = getConnection(dataSource)) {
            return generalSqlExecutor.execute(connection, context);
        } catch (SQLException e) {
            throw wrapException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e);
        }
    }

    private HikariDataSource getHikariDataSource(HikariPerfWrapper hikariDataSource) {
        return (HikariDataSource) hikariDataSource.getHikariDataSource();
    }

    @Nonnull
    @Override
    public final DatasourceStructure blockingGetStructure(HikariPerfWrapper hikariPerfWrapper, SqlBasedDatasourceConnectionConfig connectionConfig) {
        HikariDataSource hikariDataSource = getHikariDataSource(hikariPerfWrapper);
        try (Connection connection = getConnection(hikariDataSource)) {
            return getDatabaseMetadata(connection, connectionConfig);
        } catch (SQLException e) {
            throw wrapException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e);
        }
    }

    protected abstract DatasourceStructure getDatabaseMetadata(Connection connection,
            SqlBasedDatasourceConnectionConfig connectionConfig);

    @Override
    public Map<String, Object> sanitizeQueryConfig(Map<String, Object> configMap) {
        SqlQueryConfig queryConfig = SqlQueryConfig.from(configMap);
        Map<String, Object> result = Maps.newHashMap();
        if (queryConfig.isGuiMode()) {
            GuiSqlCommand guiSqlCommand = getGuiSqlCommand(queryConfig);
            result.put("fields", guiSqlCommand.extractMustacheKeys());
            return result;
        }

        String sql = queryConfig.getSql();
        Set<String> mustacheKeys = MustacheHelper.extractMustacheKeysWithCurlyBraces(sql);
        result.put("fields", mustacheKeys);
        return result;
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