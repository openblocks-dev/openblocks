package com.openblocks.sdk.plugin.sqlcommand.command.postgres;

import static com.openblocks.sdk.plugin.sqlcommand.command.GuiConstants.POSTGRES_COLUMN_DELIMITER;
import static com.openblocks.sdk.util.SqlGuiUtils.POSTGRES_SQL_STR_ESCAPE;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.InsertCommand;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue.EscapeSql;

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


    @Override
    public boolean isRenderWithRawSql() {
        return true;
    }

    @Override
    public EscapeSql escapeStrFunc() {
        return POSTGRES_SQL_STR_ESCAPE;
    }
}
