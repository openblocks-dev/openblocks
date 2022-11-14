package com.openblocks.sdk.plugin.restapi.auth;

import com.fasterxml.jackson.annotation.JsonCreator;

public class NoneAuthConfig extends AuthConfig {

    @JsonCreator
    public NoneAuthConfig(RestApiAuthType type) {
        super(type);
    }
}
