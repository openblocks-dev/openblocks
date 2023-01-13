package com.openblocks.sdk.plugin.sqlcommand.command;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_INSERT_COMMAND;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet.parseBulkRecords;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetItem;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRows;
import com.openblocks.sdk.util.MustacheHelper;

public class MysqlBulkInsertCommand extends GuiSqlCommand {

    private final String table;
    private final BulkObjectChangeSet bulkObjectChangeSet;

    private MysqlBulkInsertCommand(String table, BulkObjectChangeSet bulkObjectChangeSet) {
        this.table = table;
        this.bulkObjectChangeSet = bulkObjectChangeSet;
    }

    public static MysqlBulkInsertCommand from(Map<String, Object> commandDetail) {
        String table = parseTable(commandDetail);
        String recordStr = parseBulkRecords(commandDetail);
        BulkObjectChangeSet bulkObjectChangeSet = new BulkObjectChangeSet(recordStr);
        return new MysqlBulkInsertCommand(table, bulkObjectChangeSet);
    }

    @SuppressWarnings("DuplicatedCode")
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {
        String renderedTable = MustacheHelper.renderMustacheString(table, requestMap);
        ChangeSetRows insertRows = bulkObjectChangeSet.render(requestMap);
        if (insertRows.isEmpty()) {
            throw new PluginException(INVALID_INSERT_COMMAND, "INSERT_DATA_EMPTY");
        }
        if (!insertRows.checkRowColumnAligned()) {
            throw new PluginException(INVALID_INSERT_COMMAND, "INVALID_INSERT_DATA");
        }

        StringBuilder sb = new StringBuilder();
        List<Object> bindParams = newArrayList();

        sb.append("insert into ")
                .append(renderedTable)
                .append(" (");

        Set<String> columns = insertRows.getColumns();
        for (String column : columns) {
            sb.append("`").append(column).append("`").append(",");
        }

        sb.deleteCharAt(sb.length() - 1).append(") values ");

        for (ChangeSetRow row : insertRows) {
            sb.append("(");
            for (String column : columns) {
                ChangeSetItem item = row.getItem(column);
                if (item.needPreparedStatement()) {
                    sb.append("?,");
                    bindParams.add(item.renderedStr());
                } else {
                    sb.append(item.renderedStr()).append(",");
                }
            }
            sb.deleteCharAt(sb.length() - 1).append("),");
        }
        sb.deleteCharAt(sb.length() - 1).append(";");

        return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
    }

    @Override
    public boolean isInsertCommand() {
        return true;
    }

    @Override
    public Set<String> extractMustacheKeys() {
        return bulkObjectChangeSet.extractMustacheKeys();
    }
}
