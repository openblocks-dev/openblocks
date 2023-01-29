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
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue.EscapeSql;

public interface GuiSqlCommand {

    GuiSqlCommandRenderResult render(Map<String, Object> requestMap);

    class GuiSqlCommandRenderResult {

        private final String sql;
        private final List<Object> bindParams;

        public GuiSqlCommandRenderResult(String sql, List<Object> bindParams) {
            this.sql = sql;
            this.bindParams = bindParams;
        }

        public String sql() {
            return sql;
        }

        public List<Object> bindParams() {
            return bindParams;
        }
    }

    static String parseTable(Map<String, Object> commandDetail) {
        String table = MapUtils.getString(commandDetail, TABLE_KEY, null);
        if (StringUtils.isBlank(table)) {
            throw new PluginException(INVALID_GUI_SETTINGS, "GUI_FIELD_EMPTY");
        }
        return table;
    }

    static boolean parseAllowMultiModify(Map<String, Object> commandDetail) {
        return MapUtils.getBoolean(commandDetail, ALLOW_MULTI_MODIFY_KEY, false);
    }

    boolean isInsertCommand();

    Set<String> extractMustacheKeys();

    default boolean isRenderWithRawSql() {
        return false;
    }

    default EscapeSql escapeStrFunc() {
        return s -> {
            throw new UnsupportedOperationException("This func should be implemented by each SQL dialect if needed");
        };
    }
}
