package com.openblocks.sdk.plugin.sqlcommand.command;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;
import com.openblocks.sdk.util.MustacheHelper;

public class DeleteCommand implements GuiSqlCommand {

    protected final String table;
    protected final FilterSet filterSet;
    protected final boolean allowMultiModify;
    protected final String columnFrontDelimiter;
    protected final String columnBackDelimiter;

    protected DeleteCommand(String table, FilterSet filterSet, boolean allowMultiModify,
            String columnFrontDelimiter, String columnBackDelimiter) {
        this.table = table;
        this.filterSet = filterSet;
        this.allowMultiModify = allowMultiModify;
        this.columnFrontDelimiter = columnFrontDelimiter;
        this.columnBackDelimiter = columnBackDelimiter;
    }

    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {

        String renderedTable = MustacheHelper.renderMustacheString(table, requestMap);

        StringBuilder sb = new StringBuilder();
        sb.append("delete from ").append(renderedTable);
        if (filterSet.isEmpty()) {
            if (!allowMultiModify) {
                sb.append(" limit 1");
            }
            return new GuiSqlCommandRenderResult(sb.toString(), Collections.emptyList());
        }

        GuiSqlCommandRenderResult render = filterSet.render(requestMap, columnFrontDelimiter, columnBackDelimiter, isRenderWithRawSql(),
                escapeStrFunc());
        sb.append(render.sql());
        if (!allowMultiModify) {
            sb.append(" limit 1");
        }
        return new GuiSqlCommandRenderResult(sb.toString(), render.bindParams());
    }

    @Override
    public boolean isInsertCommand() {
        return false;
    }

    @Override
    public Set<String> extractMustacheKeys() {
        return filterSet.extractMustacheKeys();
    }
}
