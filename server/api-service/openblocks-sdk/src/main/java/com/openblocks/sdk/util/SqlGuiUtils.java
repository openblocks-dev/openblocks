package com.openblocks.sdk.util;

import static com.openblocks.sdk.util.JsonUtils.jsonNodeToObject;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.Collection;
import java.util.Map;

import javax.annotation.Nonnull;

import com.fasterxml.jackson.databind.JsonNode;

public final class SqlGuiUtils {

    private SqlGuiUtils() {
    }

    @Nonnull
    public static PsBindValue renderPsBindValue(Object obj, Map<String, ?> paramMap) {
        if (obj == null) {
            return PsBindValue.from(null);
        }

        if (obj instanceof String str) {
            if (isBlank(str)) {
                return PsBindValue.from(str);
            }

            JsonNode jsonNode = MustacheHelper.renderMustacheJson(str, paramMap);
            return PsBindValue.from(jsonNodeToObject(jsonNode));
        }

        return PsBindValue.from(obj);

    }


    public static class PsBindValue {
        private final Object rawValue;

        public PsBindValue(Object rawValue) {
            this.rawValue = rawValue;
        }

        public static PsBindValue from(Object o) {
            return new PsBindValue(o);
        }

        public static PsBindValue fromJsonNode(JsonNode jsonNode) {
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
    }
}
