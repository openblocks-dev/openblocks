package com.openblocks.sdk.models;

import java.util.Map;

import org.springframework.data.annotation.Transient;

public interface TokenBasedConnectionDetail extends Encrypt {

    @Transient
    boolean isStale();

    Map<String, Object> toMap();
}
