package com.openblocks.sdk.plugin.sqlcommand.command.postgres;

import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.POSTGRES_COLUMN_DELIMITER;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.InsertCommand;

public class PostgresInsertCommand extends InsertCommand {

    private PostgresInsertCommand(Map<String, Object> commandDetail) {
        super(commandDetail, POSTGRES_COLUMN_DELIMITER);
    }

    @VisibleForTesting
    protected PostgresInsertCommand(String table, ChangeSet changeSet) {
        super(table, changeSet, POSTGRES_COLUMN_DELIMITER, POSTGRES_COLUMN_DELIMITER);
    }

    public static PostgresInsertCommand from(Map<String, Object> commandDetail) {
        return new PostgresInsertCommand(commandDetail);
    }


}
