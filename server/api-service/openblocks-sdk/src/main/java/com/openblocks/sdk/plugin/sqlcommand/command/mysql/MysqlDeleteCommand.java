package com.openblocks.sdk.plugin.sqlcommand.command.mysql;

import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.MYSQL_COLUMN_DELIMITER;
import static com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.parseFilterSet;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.DeleteCommand;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;

public class MysqlDeleteCommand extends DeleteCommand {

    protected MysqlDeleteCommand(String table, FilterSet filterSet, boolean allowMultiModify) {
        super(table, filterSet, allowMultiModify, MYSQL_COLUMN_DELIMITER, MYSQL_COLUMN_DELIMITER);
    }

    public static DeleteCommand from(Map<String, Object> commandDetail) {
        String table = GuiSqlCommand.parseTable(commandDetail);
        FilterSet filterSet = parseFilterSet(commandDetail);
        boolean allowMultiModify = GuiSqlCommand.parseAllowMultiModify(commandDetail);
        return new MysqlDeleteCommand(table, filterSet, allowMultiModify);
    }

}
