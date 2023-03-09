package com.openblocks.plugin.oracle.gui;

import static com.openblocks.plugin.oracle.gui.GuiConstants.COLUMN_DELIMITER_FRONT;
import static com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.parseTable;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet.parseBulkRecords;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet.parsePrimaryKey;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.BulkUpdateCommand;

public class OracleBulkUpdateCommand extends BulkUpdateCommand {

    protected OracleBulkUpdateCommand(String table, BulkObjectChangeSet bulkObjectChangeSet, String primaryKey) {
        super(table, bulkObjectChangeSet, primaryKey, COLUMN_DELIMITER_FRONT);
    }

    public static OracleBulkUpdateCommand from(Map<String, Object> commandDetail) {
        String table = parseTable(commandDetail);
        String recordStr = parseBulkRecords(commandDetail);
        BulkObjectChangeSet bulkObjectChangeSet = new BulkObjectChangeSet(recordStr);
        return new OracleBulkUpdateCommand(table, bulkObjectChangeSet, parsePrimaryKey(commandDetail));
    }

}
