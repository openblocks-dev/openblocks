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

    protected DeleteCommand(String table, FilterSet filterSet, boolean allowMultiModify,
            String columnDelimiter) {
        this(table, filterSet, allowMultiModify, columnDelimiter, columnDelimiter);
    }

    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {

        String renderedTable = MustacheHelper.renderMustacheString(table, requestMap);

        StringBuilder sb = new StringBuilder();
        renderTable(renderedTable, sb);
        if (filterSet.isEmpty()) {
            renderLimit(sb);
            return new GuiSqlCommandRenderResult(sb.toString(), Collections.emptyList());
        }

        GuiSqlCommandRenderResult render = filterSet.render(requestMap, columnFrontDelimiter, columnBackDelimiter, isRenderWithRawSql(),
                escapeStrFunc());
        sb.append(render.sql());
        renderLimit(sb);
        return new GuiSqlCommandRenderResult(sb.toString(), render.bindParams());
    }

    protected void renderTable(String renderedTable, StringBuilder sb) {
        sb.append("delete from ").append(renderedTable);
    }

    protected void renderLimit(StringBuilder sb) {
        if (!allowMultiModify) {
            sb.append(" limit 1");
        }
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
