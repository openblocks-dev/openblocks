package com.openblocks.sdk.plugin.sqlcommand.command.mysql;

import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.MYSQL_COLUMN_DELIMITER;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateCommand;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;

public class MysqlUpdateCommand extends UpdateCommand {

    private MysqlUpdateCommand(Map<String, Object> commandDetail) {
        super(commandDetail, MYSQL_COLUMN_DELIMITER, MYSQL_COLUMN_DELIMITER);
    }

    @VisibleForTesting
    protected MysqlUpdateCommand(String table, ChangeSet changeSet, FilterSet filterSet, boolean allowMultiModify) {
        super(table, changeSet, filterSet, allowMultiModify, MYSQL_COLUMN_DELIMITER, MYSQL_COLUMN_DELIMITER);
    }

    public static MysqlUpdateCommand from(Map<String, Object> commandDetail) {
        return new MysqlUpdateCommand(commandDetail);
    }
}
