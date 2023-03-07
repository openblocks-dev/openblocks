package com.openblocks.plugin.oracle.gui;

import static com.openblocks.plugin.oracle.gui.GuiConstants.COLUMN_DELIMITER_FRONT;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.InsertCommand;

public class OracleInsertCommand extends InsertCommand {

    private OracleInsertCommand(Map<String, Object> commandDetail) {
        super(commandDetail, COLUMN_DELIMITER_FRONT);
    }

    @VisibleForTesting
    protected OracleInsertCommand(String table, ChangeSet changeSet) {
        super(table, changeSet, COLUMN_DELIMITER_FRONT, COLUMN_DELIMITER_FRONT);
    }

    public static OracleInsertCommand from(Map<String, Object> commandDetail) {
        return new OracleInsertCommand(commandDetail);
    }


}
