package com.openblocks.sdk.plugin.sqlcommand.command.mysql;

import static com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet.parseBulkRecords;
import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.MYSQL_COLUMN_DELIMITER;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.BulkInsertCommand;

public class MysqlBulkInsertCommand extends BulkInsertCommand {
    protected MysqlBulkInsertCommand(String table, BulkObjectChangeSet bulkObjectChangeSet) {
        super(table, bulkObjectChangeSet, MYSQL_COLUMN_DELIMITER, MYSQL_COLUMN_DELIMITER);
    }

    public static BulkInsertCommand from(Map<String, Object> commandDetail) {
        String table = GuiSqlCommand.parseTable(commandDetail);
        String recordStr = parseBulkRecords(commandDetail);
        BulkObjectChangeSet bulkObjectChangeSet = new BulkObjectChangeSet(recordStr);
        return new MysqlBulkInsertCommand(table, bulkObjectChangeSet);
    }
}
