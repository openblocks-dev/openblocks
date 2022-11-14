package com.openblocks.sdk.plugin.sqlcommand.command;

import static com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.parseFilterSet;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;
import com.openblocks.sdk.util.MustacheHelper;

public class MysqlDeleteCommand extends GuiSqlCommand {

    private final String table;
    private final FilterSet filterSet;
    private final boolean allowMultiModify;

    private MysqlDeleteCommand(String table, FilterSet filterSet, boolean allowMultiModify) {
        this.table = table;
        this.filterSet = filterSet;
        this.allowMultiModify = allowMultiModify;
    }

    public static MysqlDeleteCommand from(Map<String, Object> commandDetail) {
        String table = parseTable(commandDetail);

        FilterSet filterSet = parseFilterSet(commandDetail);
        boolean allowMultiModify = parseAllowMultiModify(commandDetail);

        return new MysqlDeleteCommand(table, filterSet, allowMultiModify);
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

        GuiSqlCommandRenderResult render = filterSet.render(requestMap);
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
