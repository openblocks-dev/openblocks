package com.openblocks.plugin.mssql;

import static com.openblocks.plugin.mssql.util.MssqlStructureParser.parseTableAndColumns;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_GET_STRUCTURE_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.pf4j.Extension;

import com.openblocks.plugin.mssql.gui.MssqlBulkInsertCommand;
import com.openblocks.plugin.mssql.gui.MssqlBulkUpdateCommand;
import com.openblocks.plugin.mssql.gui.MssqlDeleteCommand;
import com.openblocks.plugin.mssql.gui.MssqlInsertCommand;
import com.openblocks.plugin.mssql.gui.MssqlUpdateCommand;
import com.openblocks.plugin.mssql.util.MssqlResultParser;
import com.openblocks.plugin.sql.GeneralSqlExecutor;
import com.openblocks.plugin.sql.SqlBasedQueryExecutor;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.plugin.common.sql.SqlBasedDatasourceConnectionConfig;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Extension
public class MssqlQueryExecutor extends SqlBasedQueryExecutor {


    protected MssqlQueryExecutor() {
        super(new GeneralSqlExecutor() {
            @Override
            protected List<Map<String, Object>> parseDataRows(ResultSet resultSet) throws SQLException {
                ResultSetMetaData metaData = resultSet.getMetaData();
                int columnCount = metaData.getColumnCount();
                List<Map<String, Object>> result = new ArrayList<>();
                while (resultSet.next()) {
                    Map<String, Object> row = MssqlResultParser.parseRowValue(resultSet, metaData, columnCount);
                    result.add(row);
                }
                return result;
            }
        });
    }

    @Override
    protected DatasourceStructure getDatabaseMetadata(Connection connection, SqlBasedDatasourceConnectionConfig connectionConfig) {
        Map<String, Table> tablesByName = new LinkedHashMap<>();
        try (Statement statement = connection.createStatement()) {
            parseTableAndColumns(tablesByName, statement);
        } catch (SQLException throwable) {
            throw new PluginException(DATASOURCE_GET_STRUCTURE_ERROR, "DATASOURCE_GET_STRUCTURE_ERROR", throwable.getMessage());
        }

        DatasourceStructure structure = new DatasourceStructure(new ArrayList<>(tablesByName.values()));
        for (Table table : structure.getTables()) {
            table.getKeys().sort(Comparator.naturalOrder());
        }
        return structure;
    }

    @Override
    protected GuiSqlCommand parseSqlCommand(String guiStatementType, Map<String, Object> detail) {
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
