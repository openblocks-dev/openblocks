package com.openblocks.sdk.plugin.sqlcommand.changeset;

import com.openblocks.sdk.util.SqlGuiUtils.PsBindValue;

public record ChangeSetItem(String column, PsBindValue psBindValue) {
}