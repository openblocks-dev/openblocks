package com.openblocks.domain.group.util;

import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.ImmutableMap;
import com.openblocks.sdk.util.LocaleUtils;

public class SystemGroups {
    public static String ALL_USER = "all";
    public static String DEV = "dev";
    private static final Map<String, String> SYSTEM_GROUP_NAME_MAP = ImmutableMap.of(
            ALL_USER, "SYSTEM_GROUP_ALL_USER",
            DEV, "SYSTEM_GROUP_DEV"
    );

    public static String getName(String type, Locale locale) {
        String key = SYSTEM_GROUP_NAME_MAP.get(type);
        if (StringUtils.isBlank(key)) {
            return null;
        }
        return LocaleUtils.getMessage(locale, key);
    }
}
