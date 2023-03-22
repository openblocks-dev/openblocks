package com.openblocks.plugin.oracle;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_GET_STRUCTURE_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.plugin.common.sql.StructureParser.QUERY_STRUCTURE_SQL;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;

import org.pf4j.Extension;

import com.openblocks.plugin.oracle.gui.OracleBulkInsertCommand;
import com.openblocks.plugin.oracle.gui.OracleBulkUpdateCommand;
import com.openblocks.plugin.oracle.gui.OracleDeleteCommand;
import com.openblocks.plugin.oracle.gui.OracleInsertCommand;
import com.openblocks.plugin.oracle.gui.OracleUpdateCommand;
import com.openblocks.plugin.sql.GeneralSqlExecutor;
import com.openblocks.plugin.sql.SqlBasedQueryExecutor;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.plugin.common.sql.SqlBasedDatasourceConnectionConfig;
import com.openblocks.sdk.plugin.common.sql.StructureParser;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Extension
public class OracleQueryExecutor extends SqlBasedQueryExecutor {

    public OracleQueryExecutor() {
        super(new GeneralSqlExecutor());
    }

    @Nonnull
    @Override
    protected DatasourceStructure getDatabaseMetadata(Connection connection,
            SqlBasedDatasourceConnectionConfig connectionConfig) {
        try (Statement statement = connection.createStatement(); ResultSet resultSet = statement.executeQuery(QUERY_STRUCTURE_SQL)) {
            List<Table> tables = StructureParser.parseColumns(resultSet);
            return new DatasourceStructure(tables);
        } catch (SQLException throwable) {
            throw new PluginException(DATASOURCE_GET_STRUCTURE_ERROR, "DATASOURCE_GET_STRUCTURE_ERROR",
                    throwable.getMessage());
        }
    }

    @Override
    protected GuiSqlCommand parseSqlCommand(String guiStatementType, Map<String, Object> detail) {
        return switch (guiStatementType.toUpperCase()) {
            case "INSERT" -> OracleInsertCommand.from(detail);
            case "UPDATE" -> OracleUpdateCommand.from(detail);
            case "DELETE" -> OracleDeleteCommand.from(detail);
            case "BULK_INSERT" -> OracleBulkInsertCommand.from(detail);
            case "BULK_UPDATE" -> OracleBulkUpdateCommand.from(detail);
            default -> throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_GUI_COMMAND_TYPE", guiStatementType);
        };
    }

}
