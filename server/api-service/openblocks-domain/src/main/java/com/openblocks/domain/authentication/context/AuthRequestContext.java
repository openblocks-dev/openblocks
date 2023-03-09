package com.openblocks.domain.authentication.context;

import javax.annotation.Nullable;

import com.openblocks.sdk.auth.AbstractAuthConfig;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public abstract class AuthRequestContext {

    protected volatile AbstractAuthConfig authConfig;

    @Nullable
    private volatile String orgId;
}
