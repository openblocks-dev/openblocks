package com.openblocks.sdk.plugin.sheet.changeset;


import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;
import static com.openblocks.sdk.plugin.sheet.changeset.SheetChangeSetRow.fromJsonNode;

import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.util.MustacheHelper;

public class SheetObjectChangeSet extends SheetChangeSet {
    private final String str;

    public SheetObjectChangeSet(String str) {
        this.str = str;
    }

    @Override
    public SheetChangeSetRow render(Map<String, Object> requestMap) {
        JsonNode jsonNode;
        try {
            jsonNode = MustacheHelper.renderMustacheJson(str, requestMap);
        } catch (Throwable e) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_INVALID_JSON_MAP_TYPE");
        }
        return fromJsonNode(jsonNode);
    }

}
