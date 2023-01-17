package com.openblocks.sdk.plugin.sqlcommand.changeset;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;
import static com.openblocks.sdk.plugin.common.constant.Constants.CHANGE_SET_FORM_KEY;
import static com.openblocks.sdk.plugin.common.constant.Constants.CHANGE_SET_TYPE_KEY_VALUE_PAIRS;
import static com.openblocks.sdk.plugin.common.constant.Constants.CHANGE_SET_TYPE_OBJECT;
import static com.openblocks.sdk.plugin.common.constant.Constants.COMP_KEY;
import static com.openblocks.sdk.plugin.common.constant.Constants.COMP_TYPE_KEY;

import java.util.Map;
import java.util.Set;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

import com.openblocks.sdk.exception.PluginException;

public abstract class ChangeSet {

    public static ChangeSet parseChangeSet(Map<String, Object> commandDetail) {
        return parseChangeSet(commandDetail, CHANGE_SET_FORM_KEY);
    }

    @SuppressWarnings("unchecked")
    public static ChangeSet parseChangeSet(Map<String, Object> commandDetail, String keyName) {
        Object o = commandDetail.get(keyName);
        if (!(o instanceof Map<?, ?>)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_OPERATION_DATA_EMPTY");
        }
        Map<String, Object> changeSet = (Map<String, Object>) o;
        if (MapUtils.isEmpty(changeSet)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_OPERATION_DATA_EMPTY");
        }

        String changeSetType = MapUtils.getString(changeSet, COMP_TYPE_KEY, "").toUpperCase();
        if (StringUtils.isBlank(changeSetType)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_OPERATION_DATA_TYPE_ERROR");
        }

        Object data = MapUtils.getObject(changeSet, COMP_KEY);

        if (changeSetType.equals(CHANGE_SET_TYPE_KEY_VALUE_PAIRS)) {
            return new KeyValuePairChangeSet(data);
        }

        if (changeSetType.equals(CHANGE_SET_TYPE_OBJECT)) {
            if (!(data instanceof String)) {
                throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_PARAM", data.getClass().getSimpleName());
            }
            return new ObjectChangeSet((String) data);
        }

        throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_DATA_TYPE", changeSetType);
    }

    public abstract ChangeSetRow render(Map<String, Object> requestMap);

    public abstract Set<String> extractMustacheKeys();
}
