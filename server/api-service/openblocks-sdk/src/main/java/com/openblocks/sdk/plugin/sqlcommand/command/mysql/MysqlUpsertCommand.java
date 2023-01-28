package com.openblocks.sdk.plugin.sqlcommand.command.mysql;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_UPSERT_COMMAND;
import static com.openblocks.sdk.plugin.common.constant.Constants.INSERT_CHANGE_SET_FORM_KEY;
import static com.openblocks.sdk.plugin.common.constant.Constants.UPDATE_CHANGE_SET_FORM_KEY;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet.parseChangeSet;
import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.MYSQL_COLUMN_DELIMITER;

import java.util.List;
import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.plugin.sqlcommand.command.UpsertCommand;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;
import com.openblocks.sdk.util.MustacheHelper;

public class MysqlUpsertCommand extends UpsertCommand {

    @VisibleForTesting
    protected MysqlUpsertCommand(String table, ChangeSet insertChangeSet, ChangeSet updateChangeSet) {
        super(table, insertChangeSet, updateChangeSet, new FilterSet(), MYSQL_COLUMN_DELIMITER, MYSQL_COLUMN_DELIMITER);
    }

    protected MysqlUpsertCommand(Map<String, Object> commandDetail) {
        super(GuiSqlCommand.parseTable(commandDetail),
                parseChangeSet(commandDetail, INSERT_CHANGE_SET_FORM_KEY),
                parseChangeSet(commandDetail, UPDATE_CHANGE_SET_FORM_KEY),
                new FilterSet(),
                MYSQL_COLUMN_DELIMITER, MYSQL_COLUMN_DELIMITER
        );
    }

    public static MysqlUpsertCommand from(Map<String, Object> commandDetail) {
        return new MysqlUpsertCommand(commandDetail);
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
        appendTable(renderedTable, sb, updateChangeEmpty);
        appendInsertValues(insertRow, sb, bindParams);

        if (updateChangeEmpty) {
            return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
        }

        appendUpsertKeyword(sb);
        appendUpdateValues(updateRow, sb, bindParams);

        return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
    }
}
