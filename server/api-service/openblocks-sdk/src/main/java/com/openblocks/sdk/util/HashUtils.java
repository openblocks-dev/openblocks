package com.openblocks.sdk.util;

import com.google.common.hash.Hashing;

public class HashUtils {

    @SuppressWarnings("UnstableApiUsage")
    public static String hash(byte[] content) {
        return Hashing.sha256().hashBytes(content).toString();
    }
}
