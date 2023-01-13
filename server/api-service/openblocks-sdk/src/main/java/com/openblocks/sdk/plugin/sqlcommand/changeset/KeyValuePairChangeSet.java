package com.openblocks.sdk.plugin.sqlcommand.changeset;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;
import static com.openblocks.sdk.util.MustacheHelper.renderNonArrayValueForMysqlConcatenation;
import static java.util.Collections.emptyMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.util.MustacheHelper;
import com.openblocks.sdk.util.MustacheHelper.SqlConcatenationValueHolder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class KeyValuePairChangeSet extends ChangeSet {

    private Map<String, Object> map = emptyMap();

    @SuppressWarnings("unchecked")
    public KeyValuePairChangeSet(Object comp) {
        if (!(comp instanceof List<?> list)) {
            return;
        }

        map = list.stream()
                .map(o -> {
                    if (!(o instanceof Map<?, ?> map)) {
                        throw new PluginException(INVALID_GUI_SETTINGS, "GUI_CHANGE_SET_TYPE_ERROR", o.getClass().getSimpleName());
                    }

                    String column = MapUtils.getString((Map<String, ?>) map, "column");
                    if (StringUtils.isBlank(column)) {
                        throw new PluginException(INVALID_GUI_SETTINGS, "GUI_CHANGE_SET_FIELD_EMPTY");
                    }

                    Object value = MapUtils.getObject((Map<String, ?>) map, "value");
                    return Pair.of(column, value);
                })
                .collect(Collectors.toMap(Pair::getKey, Pair::getValue, (a, b) -> b));
    }

    @Override
    public ChangeSetRow render(Map<String, Object> requestMap) {
        List<ChangeSetItem> result = new ArrayList<>();
        for (String column : map.keySet()) {
            Object value = map.get(column);
            SqlConcatenationValueHolder valueHolder = renderNonArrayValueForMysqlConcatenation(value, requestMap);
            result.add(new ChangeSetItem(column, valueHolder.strValue(), valueHolder.needBindPreparedStatement()));
        }

        return new ChangeSetRow(result);
    }

    @Override
    public Set<String> extractMustacheKeys() {
        return map.values().stream()
                .filter(o -> o instanceof String)
                .map(o -> MustacheHelper.extractMustacheKeysWithCurlyBraces((String) o))
                .flatMap(Set::stream)
                .collect(Collectors.toSet());
    }
}
