package com.openblocks.sdk.models;

import java.util.function.Function;

public interface Encrypt {

    default void doEncrypt(Function<String, String> encryptFunc) {
    }

    default void doDecrypt(Function<String, String> decryptFunc) {
    }
}
