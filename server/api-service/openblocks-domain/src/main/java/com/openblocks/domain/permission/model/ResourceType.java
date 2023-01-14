package com.openblocks.domain.permission.model;

import static com.openblocks.domain.permission.config.PermissionConst.ID_SPLITTER;
import static com.openblocks.sdk.util.StreamUtils.collectMap;

import java.util.Arrays;
import java.util.Map;

public enum ResourceType {

    APPLICATION("app"),
    DATASOURCE("data"),
    FOLDER("folder");

    private final String abbr;

    private static final Map<String, ResourceType> MAP;

    static {
        MAP = collectMap(Arrays.stream(values()), it -> it.abbr);
    }

    ResourceType(String abbr) {
        this.abbr = abbr;
    }

    public String join(String resourceId) {
        return abbr + ID_SPLITTER + resourceId;
    }

    public static ResourceType from(String abbr) {
        return MAP.get(abbr);
    }

}
