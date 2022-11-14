package com.openblocks.sdk.plugin.sqlcommand.command;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_UPDATE_COMMAND;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet.parseChangeSet;
import static com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.parseFilterSet;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetItem;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;
import com.openblocks.sdk.util.MustacheHelper;

@SuppressWarnings("DuplicatedCode")
public class MysqlUpdateCommand extends GuiSqlCommand {

    private final String table;
    private final ChangeSet changeSet;

    private final FilterSet filterSet;
    private final boolean allowMultiModify;

    private MysqlUpdateCommand(String table, ChangeSet changeSet, FilterSet filterSet, boolean allowMultiModify) {
        this.table = table;
        this.changeSet = changeSet;
        this.filterSet = filterSet;
        this.allowMultiModify = allowMultiModify;
    }

    public static MysqlUpdateCommand from(Map<String, Object> commandDetail) {
        String table = parseTable(commandDetail);
        ChangeSet changeSet = parseChangeSet(commandDetail);
        FilterSet filterSet = parseFilterSet(commandDetail);

        boolean allowMultiModify = parseAllowMultiModify(commandDetail);
        return new MysqlUpdateCommand(table, changeSet, filterSet, allowMultiModify);
    }


    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {

        String renderedTable = MustacheHelper.renderMustacheString(table, requestMap);
        ChangeSetRow updateRow = changeSet.render(requestMap);
        if (updateRow.isEmpty()) {
            throw new PluginException(INVALID_UPDATE_COMMAND, "UPDATE_DATA_EMPTY");
        }

        StringBuilder sb = new StringBuilder();
        List<Object> bindParams = newArrayList();

        sb.append("update ").append(renderedTable).append(" set ");

        for (ChangeSetItem item : updateRow) {
            String column = item.column();
            String value = item.renderedStr();
            if (item.needPreparedStatement()) {
                sb.append(column).append("=").append("?,");
                bindParams.add(item.renderedStr());
            } else {
                sb.append(column).append("=").append(value).append(",");
            }
        }
        sb.deleteCharAt(sb.length() - 1);

        if (filterSet.isEmpty()) {
            return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
        }

        GuiSqlCommandRenderResult render = filterSet.render(requestMap);
        sb.append(render.sql());
        bindParams.addAll(render.bindParams());
        if (!allowMultiModify) {
            sb.append(" limit 1");
        }
        return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
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
