package com.openblocks.sdk.models;

import org.springframework.data.annotation.Transient;

public interface TokenBasedConnectionDetail extends Encrypt {

    @Transient
    boolean isStale();

}
