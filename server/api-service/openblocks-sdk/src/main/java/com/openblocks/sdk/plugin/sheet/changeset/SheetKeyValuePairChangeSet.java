package com.openblocks.sdk.plugin.sheet.changeset;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheJson;
import static java.util.Collections.emptyMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.util.JsonUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SheetKeyValuePairChangeSet extends SheetChangeSet {

    private Map<String, String> map = emptyMap();

    @SuppressWarnings("unchecked")
    public SheetKeyValuePairChangeSet(Object comp) {
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
                    String value = MapUtils.getString((Map<String, ?>) map, "value");
                    return Pair.of(column, value);
                })
                .collect(Collectors.toMap(Pair::getKey, Pair::getValue, (a, b) -> b));
    }

    @Override
    public SheetChangeSetRow render(Map<String, Object> requestMap) {
        List<SheetChangeSetItem> result = new ArrayList<>();
        for (String column : map.keySet()) {
            Object renderedValue = JsonUtils.jsonNodeToObject(renderMustacheJson(map.get(column), requestMap));
            result.add(new SheetChangeSetItem(column, renderedValue));
        }
        return new SheetChangeSetRow(result);
    }

}
