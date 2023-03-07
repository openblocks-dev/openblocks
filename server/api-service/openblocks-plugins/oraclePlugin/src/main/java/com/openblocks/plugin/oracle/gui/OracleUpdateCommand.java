package com.openblocks.plugin.oracle.gui;

import static com.openblocks.plugin.oracle.gui.GuiConstants.COLUMN_DELIMITER_FRONT;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.plugin.sqlcommand.changeset.ChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateCommand;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.RawFilterCondition;

public class OracleUpdateCommand extends UpdateCommand {

    private OracleUpdateCommand(Map<String, Object> commandDetail) {
        super(commandDetail, COLUMN_DELIMITER_FRONT, COLUMN_DELIMITER_FRONT);
    }

    @VisibleForTesting
    protected OracleUpdateCommand(String table, ChangeSet changeSet, FilterSet filterSet, boolean allowMultiModify) {
        super(table, changeSet, filterSet, allowMultiModify, COLUMN_DELIMITER_FRONT, COLUMN_DELIMITER_FRONT);
    }

    @Override
    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {
        if (!allowMultiModify) {
            filterSet.addCondition(new RawFilterCondition("rownum", "=", 1));
        }

        return super.render(requestMap);
    }

    @Override
    protected void appendLimit(StringBuilder sb) {
        // do nothing
    }

    public static OracleUpdateCommand from(Map<String, Object> commandDetail) {
        return new OracleUpdateCommand(commandDetail);
    }
}
