package com.openblocks.sdk.util;

import java.util.UUID;

public class IDUtils {

    public static String generate() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
