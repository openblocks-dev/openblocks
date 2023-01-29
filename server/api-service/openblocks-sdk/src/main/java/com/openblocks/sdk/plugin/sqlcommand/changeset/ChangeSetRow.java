package com.openblocks.sdk.plugin.sqlcommand.changeset;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import javax.annotation.Nonnull;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.Streams;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue;

@SuppressWarnings("UnstableApiUsage")
public class ChangeSetRow implements Iterable<ChangeSetItem> {
    private final Map<String, ChangeSetItem> columnToItem;

    public ChangeSetRow(List<ChangeSetItem> items) {
        columnToItem = items.stream()
                .collect(Collectors.toMap(ChangeSetItem::column, it -> it, (a, b) -> b, LinkedHashMap::new));
    }

    public ChangeSetRow(JsonNode node) {
        this(parseChangeSetItems(node));
    }

    @Nonnull
    private static List<ChangeSetItem> parseChangeSetItems(JsonNode node) {
        if (!(node instanceof ObjectNode objectNode)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_JSON_MAP_TYPE");
        }

        return Streams.stream(objectNode.fields())
                .map(next -> {
                    String column = next.getKey();
                    JsonNode value = next.getValue();
                    return new ChangeSetItem(column, GuiSqlValue.fromJsonNode(value));
                })
                .toList();
    }

    public boolean isEmpty() {
        return columnToItem.isEmpty();
    }

    public Stream<ChangeSetItem> stream() {
        return StreamSupport.stream(spliterator(), false);
    }

    public int size() {
        return columnToItem.size();
    }

    @Nonnull
    @Override
    public Iterator<ChangeSetItem> iterator() {
        return columnToItem.values().iterator();
    }


    public Set<String> getColumns() {
        return columnToItem.keySet();
    }

    public ChangeSetItem getItem(String column) {
        return columnToItem.get(column);
    }
}