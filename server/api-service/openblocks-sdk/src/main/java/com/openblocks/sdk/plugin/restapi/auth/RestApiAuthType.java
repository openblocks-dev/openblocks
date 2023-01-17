package com.openblocks.sdk.plugin.restapi.auth;

public enum RestApiAuthType {

    NO_AUTH,
    BASIC_AUTH,
    DIGEST_AUTH,
    BEARER_TOKEN_AUTH,
    OAUTH2,
    OAUTH2_INHERIT_FROM_LOGIN,
}
