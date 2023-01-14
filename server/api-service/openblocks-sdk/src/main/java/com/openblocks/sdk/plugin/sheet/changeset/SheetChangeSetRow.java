package com.openblocks.sdk.plugin.sheet.changeset;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.util.JsonUtils;

public class SheetChangeSetRow implements Iterable<SheetChangeSetItem> {

    private final List<SheetChangeSetItem> items;
    private final Set<String> columns;
    private final Map<String, SheetChangeSetItem> columnToItem;

    public SheetChangeSetRow(List<SheetChangeSetItem> items) {
        this.items = items;
        columns = items.stream()
                .map(SheetChangeSetItem::column)
                .collect(Collectors.toUnmodifiableSet());
        columnToItem = items.stream()
                .collect(Collectors.toMap(SheetChangeSetItem::column, it -> it, (a, b) -> b));
    }

    @Nonnull
    public static SheetChangeSetRow fromJsonNode(JsonNode node) {
        if (!(node instanceof ObjectNode objectNode)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_JSON_MAP_TYPE");
        }
        List<SheetChangeSetItem> result = new ArrayList<>();
        Iterator<Entry<String, JsonNode>> iterator = objectNode.fields();
        while (iterator.hasNext()) {
            Entry<String, JsonNode> next = iterator.next();
            String column = next.getKey();
            JsonNode value = next.getValue();
            result.add(new SheetChangeSetItem(column, JsonUtils.jsonNodeToObject(value)));
        }
        return new SheetChangeSetRow(result);
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    @Nonnull
    @Override
    public Iterator<SheetChangeSetItem> iterator() {
        return items.iterator();
    }

    public Set<String> getColumns() {
        return columns;
    }

    public SheetChangeSetItem getItem(String column) {
        return columnToItem.get(column);
    }
}