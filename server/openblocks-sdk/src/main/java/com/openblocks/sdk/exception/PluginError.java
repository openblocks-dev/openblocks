package com.openblocks.sdk.exception;

public interface PluginError {

    String name();

    default boolean logVerbose() {
        return false;
    }
}
