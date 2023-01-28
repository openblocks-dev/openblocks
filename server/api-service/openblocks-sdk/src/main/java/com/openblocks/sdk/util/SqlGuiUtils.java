package com.openblocks.sdk.util;

import static com.openblocks.sdk.util.JsonUtils.jsonNodeToObject;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.Collection;
import java.util.Map;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.RandomStringUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue.EscapeSql;

public final class SqlGuiUtils {

    public static final EscapeSql POSTGRES_SQL_STR_ESCAPE = s -> {
        String randomTag = RandomStringUtils.randomAlphabetic(7);
        return "$" + randomTag + "$" + s + "$" + randomTag + "$";
    };

    private SqlGuiUtils() {
    }

    @Nonnull
    public static GuiSqlValue renderPsBindValue(Object obj, Map<String, ?> paramMap) {
        if (obj == null) {
            return GuiSqlValue.from(null);
        }

        if (obj instanceof String str) {
            if (isBlank(str)) {
                return GuiSqlValue.from(str);
            }

            JsonNode jsonNode = MustacheHelper.renderMustacheJson(str, paramMap);
            return GuiSqlValue.from(jsonNodeToObject(jsonNode));
        }

        return GuiSqlValue.from(obj);

    }


    public static class GuiSqlValue {
        private final Object rawValue;

        public GuiSqlValue(Object rawValue) {
            this.rawValue = rawValue;
        }

        public static GuiSqlValue from(Object o) {
            return new GuiSqlValue(o);
        }

        public static GuiSqlValue fromJsonNode(JsonNode jsonNode) {
            if (jsonNode == null) {
                return from(null);
            }
            return from(jsonNodeToObject(jsonNode));
        }

        public Object getValue() {
            if (rawValue == null) {
                return null;
            }
            if (rawValue instanceof Collection<?> || rawValue instanceof Map<?, ?> || rawValue.getClass().isArray()) {
                return toJson(rawValue);
            }
            return rawValue;
        }

        /**
         * used for in/not in operator
         */
        public Object getRawValue() {
            return rawValue;
        }

        public String getConcatSqlStr(EscapeSql escapeFunc) {

            if (rawValue == null || rawValue instanceof Boolean || rawValue instanceof Number) {
                return String.valueOf(rawValue);
            }

            if (rawValue instanceof String strValue) {
                return escapeFunc.escape(strValue);
            }

            if (rawValue instanceof Map<?, ?> || rawValue instanceof Collection<?>) {
                return escapeFunc.escape(toJson(rawValue));
            }

            return String.valueOf(rawValue);

        }

        public interface EscapeSql {

            String escape(String stringValue);
        }
    }
}
