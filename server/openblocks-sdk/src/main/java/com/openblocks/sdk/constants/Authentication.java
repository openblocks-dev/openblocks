package com.openblocks.sdk.constants;

public class Authentication {

    public static String ANONYMOUS_USER = "anonymous";
    public static String ANONYMOUS_USER_ID = "anonymousId";

    public static boolean isAnonymousUser(String userId) {
        return ANONYMOUS_USER_ID.equals(userId);
    }

    public static boolean isNotAnonymousUser(String userId) {
        return !isAnonymousUser(userId);
    }
}
