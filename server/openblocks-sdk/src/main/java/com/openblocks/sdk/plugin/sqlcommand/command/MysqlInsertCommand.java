package com.openblocks.sdk.plugin.sqlcommand.command;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_INSERT_COMMAND;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet.parseChangeSet;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetItem;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.util.MustacheHelper;

public class MysqlInsertCommand extends GuiSqlCommand {

    private final String table;
    private final ChangeSet changeSet;

    private MysqlInsertCommand(String table, ChangeSet changeSet) {
        this.table = table;
        this.changeSet = changeSet;
    }

    public static MysqlInsertCommand from(Map<String, Object> commandDetail) {
        String table = parseTable(commandDetail);
        ChangeSet changeSet = parseChangeSet(commandDetail);
        return new MysqlInsertCommand(table, changeSet);
    }

    @SuppressWarnings("DuplicatedCode")
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {
        String renderedTable = MustacheHelper.renderMustacheString(table, requestMap);
        ChangeSetRow insertRow = changeSet.render(requestMap);
        if (insertRow.isEmpty()) {
            throw new PluginException(INVALID_INSERT_COMMAND, "INSERT_DATA_EMPTY");
        }

        StringBuilder sb = new StringBuilder();
        List<Object> bindParams = newArrayList();

        sb.append("insert into ")
                .append(renderedTable)
                .append(" (");

        for (ChangeSetItem item : insertRow) {
            String column = item.column();
            sb.append("`").append(column).append("`").append(",");
        }
        sb.deleteCharAt(sb.length() - 1).append(") values (");

        for (ChangeSetItem item : insertRow) {
            String value = item.renderedStr();
            if (item.needPreparedStatement()) {
                sb.append("?,");
                bindParams.add(value);
            } else {
                sb.append(value).append(",");
            }
        }
        sb.deleteCharAt(sb.length() - 1).append(");");
        return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
    }

    @Override
    public boolean isInsertCommand() {
        return true;
    }

    @Override
    public Set<String> extractMustacheKeys() {
        return changeSet.extractMustacheKeys();
    }

}
