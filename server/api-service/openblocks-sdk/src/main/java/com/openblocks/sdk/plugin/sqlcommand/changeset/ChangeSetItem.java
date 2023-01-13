package com.openblocks.sdk.plugin.sqlcommand.changeset;

public record ChangeSetItem(String column, String renderedStr, boolean needPreparedStatement) {
}