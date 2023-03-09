package com.openblocks.plugin.oracle.gui;

import static com.openblocks.plugin.oracle.gui.GuiConstants.COLUMN_DELIMITER_FRONT;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet.parseBulkRecords;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.BulkInsertCommand;

public class OracleBulkInsertCommand extends BulkInsertCommand {
    protected OracleBulkInsertCommand(String table, BulkObjectChangeSet bulkObjectChangeSet) {
        super(table, bulkObjectChangeSet, COLUMN_DELIMITER_FRONT);
    }

    public static BulkInsertCommand from(Map<String, Object> commandDetail) {
        String table = GuiSqlCommand.parseTable(commandDetail);
        String recordStr = parseBulkRecords(commandDetail);
        BulkObjectChangeSet bulkObjectChangeSet = new BulkObjectChangeSet(recordStr);
        return new OracleBulkInsertCommand(table, bulkObjectChangeSet);
    }
}
