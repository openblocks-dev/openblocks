package com.openblocks.plugin.mssql.gui;

import static com.openblocks.plugin.mssql.gui.GuiConstants.MSSQL_COLUMN_DELIMITER_BACK;
import static com.openblocks.plugin.mssql.gui.GuiConstants.MSSQL_COLUMN_DELIMITER_FRONT;
import static com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.parseFilterSet;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.DeleteCommand;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;

public class MssqlDeleteCommand extends DeleteCommand {

    protected MssqlDeleteCommand(String table, FilterSet filterSet, boolean allowMultiModify) {
        super(table, filterSet, allowMultiModify, MSSQL_COLUMN_DELIMITER_FRONT, MSSQL_COLUMN_DELIMITER_BACK);
    }

    public static DeleteCommand from(Map<String, Object> commandDetail) {
        String table = GuiSqlCommand.parseTable(commandDetail);
        FilterSet filterSet = parseFilterSet(commandDetail);
        boolean allowMultiModify = GuiSqlCommand.parseAllowMultiModify(commandDetail);
        return new MssqlDeleteCommand(table, filterSet, allowMultiModify);
    }

    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {
        return super.render(requestMap);
    }

    @Override
    protected void renderTable(String renderedTable, StringBuilder sb) {
        sb.append("delete ");
        if (!allowMultiModify) {
            sb.append("top (1) ");
        }
        sb.append("from ").append(renderedTable);
    }

    @Override
    protected void renderLimit(StringBuilder sb) {
        // do nothing
    }
}
