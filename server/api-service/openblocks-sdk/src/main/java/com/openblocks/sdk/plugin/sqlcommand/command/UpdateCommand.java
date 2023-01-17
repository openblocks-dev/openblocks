package com.openblocks.sdk.plugin.sqlcommand.command;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_UPDATE_COMMAND;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet.parseChangeSet;
import static com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.parseFilterSet;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;

@SuppressWarnings("DuplicatedCode")
public class UpdateCommand implements GuiSqlCommand {

    protected final String table;
    protected final ChangeSet changeSet;
    protected final FilterSet filterSet;
    protected final boolean allowMultiModify;
    private final String columnFrontDelimiter;
    private final String columnBackDelimiter;

    protected UpdateCommand(String table, ChangeSet changeSet,
            FilterSet filterSet, boolean allowMultiModify,
            String columnFrontDelimiter, String columnBackDelimiter) {
        this.table = table;
        this.changeSet = changeSet;
        this.filterSet = filterSet;
        this.allowMultiModify = allowMultiModify;
        this.columnFrontDelimiter = columnFrontDelimiter;
        this.columnBackDelimiter = columnBackDelimiter;
    }

    protected UpdateCommand(Map<String, Object> commandDetail, String columnFrontDelimiter, String columnBackDelimiter) {
        this(GuiSqlCommand.parseTable(commandDetail),
                parseChangeSet(commandDetail),
                parseFilterSet(commandDetail),
                GuiSqlCommand.parseAllowMultiModify(commandDetail),
                columnFrontDelimiter,
                columnBackDelimiter);
    }

    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {

        String renderedTable = renderMustacheString(table, requestMap);
        ChangeSetRow updateRow = changeSet.render(requestMap);
        if (updateRow.isEmpty()) {
            throw new PluginException(INVALID_UPDATE_COMMAND, "UPDATE_DATA_EMPTY");
        }

        StringBuilder sb = new StringBuilder();
        List<Object> bindParams = newArrayList();

        appendTable(renderedTable, sb);
        appendSet(updateRow, sb, bindParams);

        if (filterSet.isEmpty()) {
            return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
        }

        appendFilter(requestMap, sb, bindParams);
        appendLimit(sb);

        return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
    }

    protected void appendSet(ChangeSetRow updateRow, StringBuilder sb, List<Object> bindParams) {
        List<Object> setValueParams = updateRow.stream()
                .map(it -> it.psBindValue().getValue())
                .toList();
        bindParams.addAll(setValueParams);

        sb.append(" set ");
        updateRow.getColumns()
                .forEach(column -> sb.append(columnFrontDelimiter)
                        .append(column)
                        .append(columnBackDelimiter)
                        .append("=?,")
                );
        sb.deleteCharAt(sb.length() - 1);
    }

    protected void appendTable(String renderedTable, StringBuilder sb) {
        sb.append("update ").append(renderedTable);
    }

    protected void appendFilter(Map<String, Object> requestMap, StringBuilder sb, List<Object> bindParams) {
        GuiSqlCommandRenderResult render = filterSet.render(requestMap, columnFrontDelimiter, columnBackDelimiter);
        sb.append(render.sql());
        bindParams.addAll(render.bindParams());
    }

    protected void appendLimit(StringBuilder sb) {
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
        return changeSet.extractMustacheKeys();
    }
}
