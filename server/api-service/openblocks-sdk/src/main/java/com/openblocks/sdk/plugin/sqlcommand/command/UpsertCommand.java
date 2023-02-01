package com.openblocks.sdk.plugin.sqlcommand.command;

import java.util.List;
import java.util.Set;

import com.google.common.collect.Sets;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetItem;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;

public abstract class UpsertCommand implements GuiSqlCommand {

    protected final String table;
    protected final ChangeSet insertChangeSet;
    protected final ChangeSet updateChangeSet;
    protected final FilterSet filterSet;
    protected final String columnFrontDelimiter;
    protected final String columnBackDelimiter;

    protected UpsertCommand(String table, ChangeSet insertChangeSet,
            ChangeSet updateChangeSet,
            FilterSet filterSet,
            String columnFrontDelimiter,
            String columnBackDelimiter) {
        this.table = table;
        this.insertChangeSet = insertChangeSet;
        this.updateChangeSet = updateChangeSet;
        this.filterSet = filterSet;
        this.columnFrontDelimiter = columnFrontDelimiter;
        this.columnBackDelimiter = columnBackDelimiter;
    }

    protected void appendUpdateValues(ChangeSetRow updateRow, StringBuilder sb, List<Object> bindParams) {
        for (ChangeSetItem item : updateRow) {
            String column = item.column();
            sb.append(columnFrontDelimiter)
                    .append(column)
                    .append(columnBackDelimiter)
                    .append("=?,");
            bindParams.add(item.guiSqlValue().getValue());
        }
        sb.deleteCharAt(sb.length() - 1);
    }

    protected void appendUpsertKeyword(StringBuilder sb) {
        sb.append(" on duplicate key update ");
    }

    protected void appendInsertValues(ChangeSetRow insertRow, StringBuilder sb, List<Object> bindParams) {
        sb.append(" (");
        for (String column : insertRow.getColumns()) {
            sb.append(columnFrontDelimiter)
                    .append(column)
                    .append(columnBackDelimiter)
                    .append(",");
        }
        sb.deleteCharAt(sb.length() - 1).append(") values (");
        for (ChangeSetItem item : insertRow) {
            Object value = item.guiSqlValue().getValue();
            sb.append("?,");
            bindParams.add(value);
        }
        sb.deleteCharAt(sb.length() - 1).append(")");
    }

    protected void appendTable(String renderedTable, StringBuilder sb, boolean updateChangeEmpty) {
        if (updateChangeEmpty) {
            sb.append("insert ignore into ").append(renderedTable);
        } else {
            sb.append("insert into ").append(renderedTable);
        }
    }

    @Override
    public boolean isInsertCommand() {
        return true;
    }

    @Override
    public Set<String> extractMustacheKeys() {
        return Sets.union(filterSet.extractMustacheKeys(),
                Sets.union(insertChangeSet.extractMustacheKeys(), updateChangeSet.extractMustacheKeys()));
    }
}
