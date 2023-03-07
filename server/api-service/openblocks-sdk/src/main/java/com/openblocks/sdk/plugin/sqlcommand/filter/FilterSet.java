package com.openblocks.sdk.plugin.sqlcommand.filter;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_IN_OPERATOR_SETTINGS;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static java.util.Collections.emptyList;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.ForwardingList;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.FilterCondition;
import com.openblocks.sdk.util.MustacheHelper;
import com.openblocks.sdk.util.SqlGuiUtils;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue.EscapeSql;

import lombok.Getter;

public class FilterSet extends ForwardingList<FilterCondition> {

    private final ArrayList<FilterCondition> filters = newArrayList();

    public void addCondition(String column, String condition, Object value) {
        filters.add(new FilterCondition(column, condition, value));
    }

    public void addCondition(FilterCondition condition) {
        filters.add(condition);
    }

    @Override
    protected List<FilterCondition> delegate() {
        return filters;
    }

    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap,
            String columnFrontDelimiter, String columnBackDelimiter, boolean renderWithRawSql, EscapeSql escapeSql) {

        if (filters.isEmpty()) {
            return new GuiSqlCommandRenderResult("", emptyList());
        }
        StringBuilder sb = new StringBuilder(" where ");
        List<Object> bindParams = newArrayList();

        for (int i = 0; i < filters.size(); i++) {
            FilterCondition filterCondition = filters.get(i);
            String column = filterCondition.getColumn();
            Object value = filterCondition.getValue();
            String condition = filterCondition.getCondition();

            RenderItem renderItem;
            if (filterCondition instanceof RawFilterCondition it) {
                renderItem = RenderItem.withRawSql(it.getColumn() + it.getCondition() + it.getValue());
            } else {
                renderItem = renderCondition(condition, value, requestMap, column,
                        columnFrontDelimiter, columnBackDelimiter, renderWithRawSql, escapeSql);
            }
            sb.append(renderItem.conditionSql());
            if (renderItem.needBind()) {
                bindParams.add(renderItem.bindValue());
            }
            if (i != filters.size() - 1) {
                sb.append(" and ");
            }
        }

        return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
    }

    private RenderItem renderCondition(String condition, Object value, Map<String, Object> requestMap, String column,
            String columnFrontDelimiter, String columnBackDelimiter, boolean renderWithRawSql, EscapeSql escapeSql) {
        String columnWithDelimiter = columnFrontDelimiter + column + columnBackDelimiter;

        switch (condition) {
            case "=", "!=", ">", "<", "<=", ">=" -> {
                GuiSqlValue guiSqlValue = SqlGuiUtils.renderPsBindValue(value, requestMap);
                if (renderWithRawSql) {
                    return RenderItem.withRawSql(columnWithDelimiter + " " + condition + " " + guiSqlValue.getConcatSqlStr(escapeSql));
                }
                return RenderItem.withPs(columnWithDelimiter + " " + condition + " ? ", guiSqlValue.getValue());
            }
            case "IS", "IS NOT" -> {
                GuiSqlValue guiSqlValue = SqlGuiUtils.renderPsBindValue(value, requestMap);
                if (guiSqlValue.getValue() == null || guiSqlValue.getValue() instanceof Boolean) {
                    return RenderItem.withRawSql(columnWithDelimiter + " " + condition + " " + guiSqlValue.getValue() + " ");
                }
                throw new PluginException(INVALID_IN_OPERATOR_SETTINGS, "INVALID_IS");
            }
            case "IN", "NOT IN" -> {
                GuiSqlValue guiSqlValue = SqlGuiUtils.renderPsBindValue(value, requestMap);
                if (!(guiSqlValue.getRawValue() instanceof List<?> list)) {
                    throw new PluginException(INVALID_IN_OPERATOR_SETTINGS, "INVALID_IN");
                }
                if (list.isEmpty()) {
                    return RenderItem.withRawSql("false");
                }

                return RenderItem.withRawSql(columnWithDelimiter + " " + condition + getCollectionStr(list));
            }
            default -> throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_FILTER_FIELD", condition);
        }
    }

    private static String getCollectionStr(List<?> list) {
        String result = list.stream()
                .map(obj -> {
                    if (obj instanceof String) {
                        return "'" + obj + "'";
                    }
                    if (obj instanceof Collection<?> || obj instanceof Map<?, ?>) {
                        return toJson(obj);
                    }
                    return String.valueOf(obj);
                })
                .collect(Collectors.joining(","));
        return " (" + result + ")";
    }

    private record RenderItem(String conditionSql, Object bindValue, boolean needBind) {

        public static RenderItem withPs(String conditionSql, Object bindValue) {
            return new RenderItem(conditionSql, bindValue, true);
        }

        public static RenderItem withRawSql(String conditionSql) {
            return new RenderItem(conditionSql, null, false);
        }
    }


    @Getter
    public static class FilterCondition {
        private final String column;
        private final String condition;
        private final Object value;

        public FilterCondition(String column, String condition, Object value) {
            this.column = column;
            this.condition = condition;
            this.value = value;
        }
    }

    public static class RawFilterCondition extends FilterCondition {
        public RawFilterCondition(String column, String condition, Object value) {
            super(column, condition, value);
        }
    }

    @SuppressWarnings("unchecked")
    public static FilterSet parseFilterSet(Map<String, Object> commandDetail) {
        Object filterBy = MapUtils.getObject(commandDetail, "filterBy", null);
        if (filterBy == null) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_FILTER_FIELD_EMPTY");
        }

        if (!(filterBy instanceof List<?> list)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_FILTER_FIELD", filterBy.getClass().getSimpleName());
        }

        FilterSet filterSet = new FilterSet();
        for (Object o : list) {
            if (!(o instanceof Map<?, ?>)) {
                throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_FILTER_FIELD", o.getClass().getSimpleName());
            }

            Map<String, Object> map = (Map<String, Object>) o;
            String column = MapUtils.getString(map, "column");
            String condition = MapUtils.getString(map, "condition");
            Object value = MapUtils.getObject(map, "value");

            if (StringUtils.isAnyBlank(column, condition)) {
                throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_FILTER_CONDITION");
            }

            filterSet.addCondition(column, condition.toUpperCase(), value);
        }
        return filterSet;
    }

    public Set<String> extractMustacheKeys() {
        return stream()
                .filter(it -> it.getValue() instanceof String)
                .map(filterCondition -> MustacheHelper.extractMustacheKeysWithCurlyBraces(String.valueOf(filterCondition.getValue())))
                .flatMap(Set::stream)
                .collect(Collectors.toSet());
    }
}
