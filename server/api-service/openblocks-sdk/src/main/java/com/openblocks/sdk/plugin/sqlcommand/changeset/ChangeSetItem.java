package com.openblocks.sdk.plugin.sqlcommand.changeset;

import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue;

public record ChangeSetItem(String column, GuiSqlValue guiSqlValue) {
}