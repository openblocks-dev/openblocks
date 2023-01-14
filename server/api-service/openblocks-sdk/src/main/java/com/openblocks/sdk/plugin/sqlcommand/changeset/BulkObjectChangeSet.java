package com.openblocks.sdk.plugin.sqlcommand.changeset;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;
import static com.openblocks.sdk.plugin.common.constant.Constants.RECORD_FORM_KEY;

import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.util.MustacheHelper;

public class BulkObjectChangeSet {
    private final String str;

    public BulkObjectChangeSet(String str) {
        this.str = str;
    }

    public ChangeSetRows render(Map<String, Object> requestMap) {

        JsonNode jsonNode;
        try {
            jsonNode = MustacheHelper.renderMustacheJson(str, requestMap);
        } catch (Throwable e) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_JSON_ARRAY_FORMAT");
        }

        return ChangeSetRows.fromJsonNode(jsonNode);
    }

    public static String parseBulkRecords(Map<String, Object> commandDetail) {
        Object o = commandDetail.get(RECORD_FORM_KEY);
        if (!(o instanceof String str)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_CHANGE_SET_EMPTY");
        }
        return str;
    }

    public Set<String> extractMustacheKeys() {
        return MustacheHelper.extractMustacheKeysWithCurlyBraces(str);
    }

}
