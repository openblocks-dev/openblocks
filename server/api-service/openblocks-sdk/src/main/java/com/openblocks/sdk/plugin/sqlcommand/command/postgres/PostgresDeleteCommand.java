package com.openblocks.sdk.plugin.sqlcommand.command.postgres;

import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.POSTGRES_COLUMN_DELIMITER;
import static com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.parseFilterSet;
import static com.openblocks.sdk.util.SqlGuiUtils.POSTGRES_SQL_STR_ESCAPE;
import static java.util.Collections.emptyList;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.DeleteCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateOrDeleteSingleCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;
import com.openblocks.sdk.util.MustacheHelper;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue.EscapeSql;

public class PostgresDeleteCommand extends DeleteCommand {

    protected PostgresDeleteCommand(String table, FilterSet filterSet, boolean allowMultiModify) {
        super(table, filterSet, allowMultiModify, POSTGRES_COLUMN_DELIMITER, POSTGRES_COLUMN_DELIMITER);
    }

    public static DeleteCommand from(Map<String, Object> commandDetail) {
        String table = GuiSqlCommand.parseTable(commandDetail);
        FilterSet filterSet = parseFilterSet(commandDetail);
        boolean allowMultiModify = GuiSqlCommand.parseAllowMultiModify(commandDetail);
        return new PostgresDeleteCommand(table, filterSet, allowMultiModify);
    }

    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {
        String renderedTable = MustacheHelper.renderMustacheString(table, requestMap);

        StringBuilder deleteSql = new StringBuilder();
        deleteSql.append("delete from ").append(renderedTable);
        if (filterSet.isEmpty()) {
            if (!allowMultiModify) {
                return new UpdateOrDeleteSingleCommandRenderResult("select count(1) as count from " + table, emptyList(),
                        deleteSql.toString(), emptyList());
            }
            return new GuiSqlCommandRenderResult(deleteSql.toString(), emptyList());
        }

        GuiSqlCommandRenderResult filterRender = filterSet.render(requestMap, columnFrontDelimiter, columnBackDelimiter, isRenderWithRawSql(),
                escapeStrFunc());
        deleteSql.append(filterRender.sql());

        String selectSql = "select count(1) as count from " + renderedTable + filterRender.sql();

        if (!allowMultiModify) {
            return new UpdateOrDeleteSingleCommandRenderResult(selectSql, filterRender.bindParams(),
                    deleteSql.toString(), filterRender.bindParams());
        }
        return new GuiSqlCommandRenderResult(deleteSql.toString(), filterRender.bindParams());
    }

    @Override
    public boolean isRenderWithRawSql() {
        return true;
    }

    @Override
    public EscapeSql escapeStrFunc() {
        return POSTGRES_SQL_STR_ESCAPE;
    }
}
