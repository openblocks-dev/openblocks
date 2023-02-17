package com.openblocks.plugin.mssql.gui;

import static com.openblocks.plugin.mssql.gui.GuiConstants.MSSQL_COLUMN_DELIMITER_BACK;
import static com.openblocks.plugin.mssql.gui.GuiConstants.MSSQL_COLUMN_DELIMITER_FRONT;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateCommand;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;

public class MssqlUpdateCommand extends UpdateCommand {

    private MssqlUpdateCommand(Map<String, Object> commandDetail) {
        super(commandDetail, MSSQL_COLUMN_DELIMITER_FRONT, MSSQL_COLUMN_DELIMITER_BACK);
    }

    @VisibleForTesting
    protected MssqlUpdateCommand(String table, ChangeSet changeSet, FilterSet filterSet, boolean allowMultiModify) {
        super(table, changeSet, filterSet, allowMultiModify, MSSQL_COLUMN_DELIMITER_FRONT, MSSQL_COLUMN_DELIMITER_BACK);
    }

    @Override
    protected void appendTable(String renderedTable, StringBuilder sb) {
        sb.append("update ");
        if (!allowMultiModify) {
            sb.append(" top (1) ");
        }
        sb.append(renderedTable);
    }

    @Override
    protected void appendLimit(StringBuilder sb) {
        // do nothing
    }

    public static MssqlUpdateCommand from(Map<String, Object> commandDetail) {
        return new MssqlUpdateCommand(commandDetail);
    }
}
