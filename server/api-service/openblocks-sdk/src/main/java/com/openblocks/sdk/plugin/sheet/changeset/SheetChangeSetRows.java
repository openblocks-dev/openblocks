package com.openblocks.sdk.plugin.sheet.changeset;


import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;

import java.util.Iterator;
import java.util.List;

import javax.annotation.Nonnull;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.google.common.collect.Streams;
import com.openblocks.sdk.exception.PluginException;

public record SheetChangeSetRows(List<SheetChangeSetRow> rows) implements Iterable<SheetChangeSetRow> {

    @SuppressWarnings("UnstableApiUsage")
    @Nonnull
    public static SheetChangeSetRows fromJsonNode(JsonNode node) {
        if (!(node instanceof ArrayNode arrayNode)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_JSON_ARRAY_FORMAT");
        }

        List<SheetChangeSetRow> changeSetRows = Streams.stream(arrayNode.iterator())
                .map(SheetChangeSetRow::fromJsonNode)
                .toList();
        return new SheetChangeSetRows(changeSetRows);
    }

    @Nonnull
    @Override
    public Iterator<SheetChangeSetRow> iterator() {
        return rows.iterator();
    }

    public boolean isEmpty() {
        return rows.isEmpty();
    }
}