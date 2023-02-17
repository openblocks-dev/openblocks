package com.openblocks.plugin.mssql.gui;

import static com.openblocks.plugin.mssql.gui.GuiConstants.MSSQL_COLUMN_DELIMITER_BACK;
import static com.openblocks.plugin.mssql.gui.GuiConstants.MSSQL_COLUMN_DELIMITER_FRONT;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.InsertCommand;

public class MssqlInsertCommand extends InsertCommand {

    private MssqlInsertCommand(Map<String, Object> commandDetail) {
        super(commandDetail, MSSQL_COLUMN_DELIMITER_FRONT, MSSQL_COLUMN_DELIMITER_BACK);
    }

    @VisibleForTesting
    protected MssqlInsertCommand(String table, ChangeSet changeSet) {
        super(table, changeSet, MSSQL_COLUMN_DELIMITER_FRONT, MSSQL_COLUMN_DELIMITER_BACK);
    }

    public static MssqlInsertCommand from(Map<String, Object> commandDetail) {
        return new MssqlInsertCommand(commandDetail);
    }


}
