package com.openblocks.sdk.plugin.sqlcommand.command.postgres;

import static com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet.parseBulkRecords;
import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.POSTGRES_COLUMN_DELIMITER;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.BulkInsertCommand;

public class PostgresBulkInsertCommand extends BulkInsertCommand {
    protected PostgresBulkInsertCommand(String table, BulkObjectChangeSet bulkObjectChangeSet) {
        super(table, bulkObjectChangeSet, POSTGRES_COLUMN_DELIMITER, POSTGRES_COLUMN_DELIMITER);
    }

    public static BulkInsertCommand from(Map<String, Object> commandDetail) {
        String table = GuiSqlCommand.parseTable(commandDetail);
        String recordStr = parseBulkRecords(commandDetail);
        BulkObjectChangeSet bulkObjectChangeSet = new BulkObjectChangeSet(recordStr);
        return new PostgresBulkInsertCommand(table, bulkObjectChangeSet);
    }
}
