package com.openblocks.sdk.plugin.sqlcommand.command;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_INSERT_COMMAND;
import static com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet.parseChangeSet;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetItem;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSetRow;
import com.openblocks.sdk.util.MustacheHelper;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue;

public abstract class InsertCommand implements GuiSqlCommand {

    private final String table;
    private final ChangeSet changeSet;
    private final String columnFrontDelimiter;
    private final String columnBackDelimiter;

    protected InsertCommand(Map<String, Object> commandDetail, String columnDelimiter) {
        this(GuiSqlCommand.parseTable(commandDetail), parseChangeSet(commandDetail), columnDelimiter, columnDelimiter);
    }

    protected InsertCommand(Map<String, Object> commandDetail, String columnFrontDelimiter, String columnBackDelimiter) {
        this(GuiSqlCommand.parseTable(commandDetail), parseChangeSet(commandDetail), columnFrontDelimiter, columnBackDelimiter);
    }

    protected InsertCommand(String table, ChangeSet changeSet, String columnFrontDelimiter, String columnBackDelimiter) {
        this.table = table;
        this.changeSet = changeSet;
        this.columnFrontDelimiter = columnFrontDelimiter;
        this.columnBackDelimiter = columnBackDelimiter;
    }

    public GuiSqlCommandRenderResult render(Map<String, Object> requestParamMap) {
        String renderedTable = MustacheHelper.renderMustacheString(table, requestParamMap);
        ChangeSetRow insertRow = changeSet.render(requestParamMap);
        if (insertRow.isEmpty()) {
            throw new PluginException(INVALID_INSERT_COMMAND, "INSERT_DATA_EMPTY");
        }

        if (isRenderWithRawSql()) {
            return renderWithRawSql(renderedTable, insertRow);
        }
        return renderWithPreparedStatement(renderedTable, insertRow);
    }

    @Nonnull
    private GuiSqlCommandRenderResult renderWithRawSql(String table, ChangeSetRow insertRow) {
        return new GuiSqlCommandRenderResult(buildRawSql(table, insertRow), Collections.emptyList());
    }

    private String buildRawSql(String table, ChangeSetRow insertRow) {
        StringBuilder sb = new StringBuilder();
        sb.append("insert into ")
                .append(table)
                .append(" (");
        for (ChangeSetItem item : insertRow) {
            String column = item.column();
            sb.append(columnFrontDelimiter).append(column).append(columnBackDelimiter).append(",");
        }
        sb.deleteCharAt(sb.length() - 1).append(") values (");

        for (ChangeSetItem item : insertRow) {
            GuiSqlValue guiSqlValue = item.guiSqlValue();
            sb.append(guiSqlValue.getConcatSqlStr(escapeStrFunc())).append(",");
        }
        sb.deleteCharAt(sb.length() - 1).append(");");
        return sb.toString();
    }

    @Nonnull
    private GuiSqlCommandRenderResult renderWithPreparedStatement(String table, ChangeSetRow insertRow) {
        String sql = buildPsSql(table, insertRow);
        List<Object> bindParams = insertRow.stream()
                .map(item -> item.guiSqlValue().getValue())
                .toList();
        return new GuiSqlCommandRenderResult(sql, bindParams);
    }

    @Nonnull
    private String buildPsSql(String table, ChangeSetRow insertRow) {
        StringBuilder sb = new StringBuilder();
        sb.append("insert into ")
                .append(table)
                .append(" (");
        for (ChangeSetItem item : insertRow) {
            String column = item.column();
            sb.append(columnFrontDelimiter).append(column).append(columnBackDelimiter).append(",");
        }
        sb.deleteCharAt(sb.length() - 1).append(") values (");
        String repeatedQuestionMarks = StringUtils.repeat("?,", insertRow.size());
        sb.append(repeatedQuestionMarks);
        sb.deleteCharAt(sb.length() - 1).append(")");
        return sb.toString();
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
