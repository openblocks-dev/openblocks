package com.openblocks.sdk.plugin.sqlcommand;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_GUI_SETTINGS;
import static com.openblocks.sdk.plugin.common.constant.Constants.ALLOW_MULTI_MODIFY_KEY;
import static com.openblocks.sdk.plugin.common.constant.Constants.TABLE_KEY;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

import com.openblocks.sdk.exception.PluginException;

public abstract class GuiSqlCommand {

    public abstract GuiSqlCommandRenderResult render(Map<String, Object> requestMap);

    public record GuiSqlCommandRenderResult(String sql, List<Object> bindParams) {
    }

    public static String parseTable(Map<String, Object> commandDetail) {
        String table = MapUtils.getString(commandDetail, TABLE_KEY, null);
        if (StringUtils.isBlank(table)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_FIELD_EMPTY");
        }
        return table;
    }

    public static boolean parseAllowMultiModify(Map<String, Object> commandDetail) {
        return MapUtils.getBoolean(commandDetail, ALLOW_MULTI_MODIFY_KEY, false);
    }

    public abstract boolean isInsertCommand();

    public abstract Set<String> extractMustacheKeys();
}
