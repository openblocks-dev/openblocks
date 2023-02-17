package com.openblocks.plugin.mssql.gui;

import static com.openblocks.plugin.mssql.gui.GuiConstants.MSSQL_COLUMN_DELIMITER_BACK;
import static com.openblocks.plugin.mssql.gui.GuiConstants.MSSQL_COLUMN_DELIMITER_FRONT;
import static com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.parseTable;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet.parseBulkRecords;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet.parsePrimaryKey;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.BulkUpdateCommand;

public class MssqlBulkUpdateCommand extends BulkUpdateCommand {

    protected MssqlBulkUpdateCommand(String table, BulkObjectChangeSet bulkObjectChangeSet, String primaryKey) {
        super(table, bulkObjectChangeSet, primaryKey, MSSQL_COLUMN_DELIMITER_FRONT, MSSQL_COLUMN_DELIMITER_BACK);
    }

    public static MssqlBulkUpdateCommand from(Map<String, Object> commandDetail) {
        String table = parseTable(commandDetail);
        String recordStr = parseBulkRecords(commandDetail);
        BulkObjectChangeSet bulkObjectChangeSet = new BulkObjectChangeSet(recordStr);
        return new MssqlBulkUpdateCommand(table, bulkObjectChangeSet, parsePrimaryKey(commandDetail));
    }

}
