package com.openblocks.sdk.plugin.sqlcommand.command;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_UPSERT_COMMAND;
import static com.openblocks.sdk.plugin.common.constant.Constants.INSERT_CHANGE_SET_FORM_KEY;
import static com.openblocks.sdk.plugin.common.constant.Constants.UPDATE_CHANGE_SET_FORM_KEY;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet.parseChangeSet;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.common.collect.Sets;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetItem;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.util.MustacheHelper;

@SuppressWarnings("DuplicatedCode")
public class MysqlUpsertCommand extends GuiSqlCommand {

    private final String table;
    private final ChangeSet insertChangeSet;
    private final ChangeSet updateChangeSet;

    private MysqlUpsertCommand(String table, ChangeSet insertChangeSet, ChangeSet updateChangeSet) {
        this.table = table;
        this.insertChangeSet = insertChangeSet;
        this.updateChangeSet = updateChangeSet;
    }

    public static MysqlUpsertCommand from(Map<String, Object> commandDetail) {
        String table = parseTable(commandDetail);
        ChangeSet insertChangeSet = parseChangeSet(commandDetail, INSERT_CHANGE_SET_FORM_KEY);
        ChangeSet updateChangeSet = parseChangeSet(commandDetail, UPDATE_CHANGE_SET_FORM_KEY);
        return new MysqlUpsertCommand(table, insertChangeSet, updateChangeSet);
    }

    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {

        String renderedTable = MustacheHelper.renderMustacheString(table, requestMap);
        ChangeSetRow insertRow = insertChangeSet.render(requestMap);
        if (insertRow.isEmpty()) {
            throw new PluginException(INVALID_UPSERT_COMMAND, "UPSERT_DATA_EMPTY");
        }
        ChangeSetRow updateRow = updateChangeSet.render(requestMap);

        StringBuilder sb = new StringBuilder();
        List<Object> bindParams = newArrayList();

        boolean updateChangeEmpty = updateRow.isEmpty();
        if (updateChangeEmpty) {
            sb.append("insert ignore into ").append(renderedTable).append(" (");
        } else {
            sb.append("insert into ").append(renderedTable).append(" (");
        }

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
        sb.deleteCharAt(sb.length() - 1).append(")");

        if (updateChangeEmpty) {
            return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
        }

        sb.append(" on duplicate key update ");

        for (ChangeSetItem item : updateRow) {
            String column = item.column();
            String value = item.renderedStr();
            if (item.needPreparedStatement()) {
                sb.append(column).append("=?,");
                bindParams.add(value);
            } else {
                sb.append(column).append("=").append(value).append(",");
            }
        }
        sb.deleteCharAt(sb.length() - 1);

        return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
    }

    @Override
    public boolean isInsertCommand() {
        return true;
    }

    @Override
    public Set<String> extractMustacheKeys() {
        return Sets.union(insertChangeSet.extractMustacheKeys(), updateChangeSet.extractMustacheKeys());
    }
}
