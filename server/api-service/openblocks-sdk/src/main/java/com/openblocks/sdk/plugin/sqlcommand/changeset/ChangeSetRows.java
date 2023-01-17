package com.openblocks.sdk.plugin.sqlcommand.changeset;

import static com.google.common.collect.Sets.newHashSet;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import javax.annotation.Nonnull;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.google.common.collect.Streams;
import com.openblocks.sdk.exception.PluginException;

public record ChangeSetRows(List<ChangeSetRow> rows) implements Iterable<ChangeSetRow> {

    @SuppressWarnings("UnstableApiUsage")
    @Nonnull
    public static ChangeSetRows fromJsonNode(JsonNode node) {
        if (!(node instanceof ArrayNode arrayNode)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_JSON_ARRAY_FORMAT");
        }

        List<ChangeSetRow> changeSetRows = Streams.stream(arrayNode.iterator())
                .map(ChangeSetRow::new)
                .toList();
        return new ChangeSetRows(changeSetRows);
    }

    @Nonnull
    @Override
    public Iterator<ChangeSetRow> iterator() {
        return rows.iterator();
    }

    public boolean isEmpty() {
        return rows.isEmpty();
    }

    public Stream<ChangeSetRow> stream() {
        return StreamSupport.stream(spliterator(), false);
    }

    public boolean checkRowColumnAligned() {
        ChangeSetRow changeSetRow = rows.get(0);
        Set<String> columns = changeSetRow.getColumns();

        HashSet<String> columnSet = newHashSet(columns);

        for (ChangeSetRow row : this) {
            if (!match(columnSet, row.getColumns())) {
                return false;
            }
        }
        return true;
    }

    private boolean match(Set<String> columns, Set<String> otherColumns) {
        if (columns.size() != otherColumns.size()) {
            return false;
        }
        return columns.containsAll(otherColumns);
    }

    public int size() {
        return rows.size();
    }

    public Set<String> getColumns() {
        return rows.get(0).getColumns();
    }
}