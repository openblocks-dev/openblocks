package com.openblocks.sdk.plugin.sqlcommand.changeset;

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
import com.openblocks.sdk.util.MustacheHelper.SqlConcatenationValueHolder;

public class ChangeSetRow implements Iterable<ChangeSetItem> {

    private final List<ChangeSetItem> items;
    private final Set<String> columns;
    private final Map<String, ChangeSetItem> columnToItem;

    public ChangeSetRow(List<ChangeSetItem> items) {
        this.items = items;
        columns = items.stream()
                .map(ChangeSetItem::column)
                .collect(Collectors.toUnmodifiableSet());
        columnToItem = items.stream()
                .collect(Collectors.toMap(ChangeSetItem::column, it -> it, (a, b) -> b));
    }

    @Nonnull
    public static ChangeSetRow fromJsonNode(JsonNode node) {
        if (!(node instanceof ObjectNode objectNode)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_JSON_MAP_TYPE");
        }

        List<ChangeSetItem> result = new ArrayList<>();
        Iterator<Entry<String, JsonNode>> iterator = objectNode.fields();
        while (iterator.hasNext()) {
            Entry<String, JsonNode> next = iterator.next();
            String column = next.getKey();
            JsonNode value = next.getValue();
            SqlConcatenationValueHolder valueHolder = SqlConcatenationValueHolder.fromJsonNode(value);
            result.add(new ChangeSetItem(column, valueHolder.strValue(), valueHolder.needBindPreparedStatement()));
        }
        return new ChangeSetRow(result);
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    @Nonnull
    @Override
    public Iterator<ChangeSetItem> iterator() {
        return items.iterator();
    }

    public Set<String> getColumns() {
        return columns;
    }

    public ChangeSetItem getItem(String column) {
        return columnToItem.get(column);
    }
}