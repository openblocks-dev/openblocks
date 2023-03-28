package com.openblocks.sdk.plugin.sqlcommand.command.postgres;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_UPDATE_COMMAND;
import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.POSTGRES_COLUMN_DELIMITER;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;
import static com.openblocks.sdk.util.SqlGuiUtils.POSTGRES_SQL_STR_ESCAPE;

import java.util.List;
import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateCommand;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateOrDeleteSingleCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue.EscapeSql;

public class PostgresUpdateCommand extends UpdateCommand {

    private PostgresUpdateCommand(Map<String, Object> commandDetail) {
        super(commandDetail, POSTGRES_COLUMN_DELIMITER, POSTGRES_COLUMN_DELIMITER);
    }

    @VisibleForTesting
    protected PostgresUpdateCommand(String table, ChangeSet changeSet, FilterSet filterSet, boolean allowMultiModify) {
        super(table, changeSet, filterSet, allowMultiModify, POSTGRES_COLUMN_DELIMITER, POSTGRES_COLUMN_DELIMITER);
    }

    public static PostgresUpdateCommand from(Map<String, Object> commandDetail) {
        return new PostgresUpdateCommand(commandDetail);
    }

    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {
        if (allowMultiModify) {
            return super.render(requestMap);
        }

        String renderedTable = renderMustacheString(table, requestMap);
        ChangeSetRow updateRow = changeSet.render(requestMap);
        if (updateRow.isEmpty()) {
            throw new PluginException(INVALID_UPDATE_COMMAND, "UPDATE_DATA_EMPTY");
        }

        StringBuilder selectSql = new StringBuilder("select count(1) as count from " + renderedTable);
        List<Object> selectBindParams = newArrayList();
        appendFilter(requestMap, selectSql, selectBindParams);

        StringBuilder updateSql = new StringBuilder();
        List<Object> updateBindParams = newArrayList();
        appendTable(renderedTable, updateSql);
        appendSet(updateRow, updateSql, updateBindParams);
        if (filterSet.isEmpty()) {
            return new UpdateOrDeleteSingleCommandRenderResult(selectSql.toString(), selectBindParams, updateSql.toString(), updateBindParams);
        }

        appendFilter(requestMap, updateSql, updateBindParams);
        // there is no limit 1 here

        return new UpdateOrDeleteSingleCommandRenderResult(selectSql.toString(), selectBindParams, updateSql.toString(), updateBindParams);

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
