package com.openblocks.domain.organization.model;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public enum MemberRole {

    MEMBER("member"),
    ADMIN("admin");

    private static final Map<String, MemberRole> VALUE_MAP;

    static {
        VALUE_MAP = Arrays.stream(values())
                .collect(Collectors.toMap(MemberRole::getValue, it -> it));
    }

    private final String value;

    MemberRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static MemberRole fromValue(String str) {
        return VALUE_MAP.getOrDefault(str, MEMBER);
    }

    public static boolean isAdmin(String str) {
        return ADMIN == fromValue(str);
    }

}
