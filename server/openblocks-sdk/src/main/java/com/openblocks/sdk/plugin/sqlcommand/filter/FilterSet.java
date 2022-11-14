package com.openblocks.sdk.plugin.sqlcommand.filter;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.MustacheHelper.renderArrayValueForMysqlConcatenation;
import static com.openblocks.sdk.util.MustacheHelper.renderNonArrayValueForMysqlConcatenation;
import static java.util.Collections.emptyList;
import static org.apache.commons.lang3.StringUtils.substring;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;

import com.google.common.collect.ForwardingList;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet.FilterCondition;
import com.openblocks.sdk.util.MustacheHelper;
import com.openblocks.sdk.util.MustacheHelper.SqlConcatenationValueHolder;

public class FilterSet extends ForwardingList<FilterCondition> {

    private final ArrayList<FilterCondition> filters = newArrayList();

    public void addCondition(String column, String condition, Object value) {
        filters.add(new FilterCondition(column, condition, value));
    }

    @Override
    protected List<FilterCondition> delegate() {
        return filters;
    }

    public GuiSqlCommandRenderResult render(Map<String, Object> requestMap) {

        if (filters.isEmpty()) {
            return new GuiSqlCommandRenderResult("", emptyList());
        }
        StringBuilder sb = new StringBuilder(" where ");
        List<Object> bindParams = newArrayList();

        for (int i = 0; i < filters.size(); i++) {
            String column = filters.get(i).column();
            Object value = filters.get(i).value();
            String condition = filters.get(i).condition();

            Pair<String, String> pair = renderCondition(condition, value, requestMap);
            String sql = pair.getLeft();
            String bindValue = pair.getRight();
            sb.append(column).append(sql);
            if (bindValue != null) {
                bindParams.add(bindValue);
            }
            if (i != filters.size() - 1) {
                sb.append(" and ");
            }
        }

        return new GuiSqlCommandRenderResult(sb.toString(), bindParams);
    }

    private Pair<String, String> renderCondition(String condition, Object value, Map<String, Object> requestMap) {
        switch (condition) {
            case "=", "!=", ">", "<", "<=", ">=", "IS", "IS NOT" -> {
                SqlConcatenationValueHolder valueHolder = renderNonArrayValueForMysqlConcatenation(value, requestMap);
                if (valueHolder.needBindPreparedStatement()) {
                    return Pair.of(" " + condition + " ? ", valueHolder.strValue());
                }
                return Pair.of(" " + condition + " " + valueHolder.strValue(), null);
            }
            case "IN", "NOT IN" -> {
                List<?> listValue = renderArrayValueForMysqlConcatenation(value, requestMap);
                String jsonArray = toJson(listValue);
                return Pair.of(" " + condition + " (" + substring(jsonArray, 1, jsonArray.length() - 1) + ")", null);
            }
            default -> throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_FILTER_FIELD", condition);
        }
    }


    public record FilterCondition(String column, String condition, Object value) {
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
                throw new PluginException(INVALID_GUI_SETTINGS, "11104 " + o.getClass().getSimpleName());
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
                .map(filterCondition -> MustacheHelper.extractMustacheKeysWithCurlyBraces(filterCondition.condition()))
                .flatMap(Set::stream)
                .collect(Collectors.toSet());
    }
}
