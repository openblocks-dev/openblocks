package com.openblocks.domain.user.constant;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public enum UserStatusType {

    HAS_SHOW_NEW_USER_GUIDANCE("newUserGuidance"),
    NON_DEV_POP_UP_FOR_OLD_USERS("olderUserNonDevPopup"),
    ;

    private static final Map<String, UserStatusType> VALUE_MAP;

    static {
        VALUE_MAP = Arrays.stream(values())
                .collect(Collectors.toMap(UserStatusType::getValue, it -> it));
    }

    private final String value;

    UserStatusType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static UserStatusType fromValue(String input) {
        return VALUE_MAP.get(input);
    }
}
