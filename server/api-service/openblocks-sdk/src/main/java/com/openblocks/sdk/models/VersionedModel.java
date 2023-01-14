package com.openblocks.sdk.models;

public interface VersionedModel {

    default String version() {
        return "0.0.1";
    }

}
