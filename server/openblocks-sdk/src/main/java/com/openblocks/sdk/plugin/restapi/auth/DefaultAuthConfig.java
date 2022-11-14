package com.openblocks.sdk.plugin.restapi.auth;

import com.fasterxml.jackson.annotation.JsonCreator;

public class DefaultAuthConfig extends AuthConfig {

    @JsonCreator
    protected DefaultAuthConfig(RestApiAuthType type) {
        super(type);
    }
}
