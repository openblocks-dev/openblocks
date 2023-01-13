package com.openblocks.domain.permission.model;

import static com.openblocks.domain.permission.config.PermissionConst.ID_SPLITTER;

import java.util.Arrays;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;

public enum ResourceHolder {
    USER("u"),
    GROUP("g"),
    ;

    private final String abbr;

    ResourceHolder(String abbr) {
        this.abbr = abbr;
    }

    public String join(String id) {
        return abbr + ID_SPLITTER + id;
    }

    @Nullable
    public static ResourceHolder from(String abbr) {
        return Arrays.stream(values())
                .filter(it -> StringUtils.equalsIgnoreCase(it.abbr, abbr))
                .findFirst()
                .orElse(null);
    }
}
