package com.openblocks.sdk.plugin.sqlcommand.command.mssql;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.InsertCommand;

public class MssqlInsertCommand extends InsertCommand {

    private static final String MSSQL_COLUMN_DELIMITER_FRONT = "[";
    private static final String MSSQL_COLUMN_DELIMITER_BACK = "]";

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
