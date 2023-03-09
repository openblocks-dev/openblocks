package com.openblocks.api.authentication.request.oauth2;

import com.openblocks.domain.authentication.context.AuthRequestContext;

import lombok.Getter;

@Getter
public final class OAuth2RequestContext extends AuthRequestContext {
    private final String code;
    private final String redirectUrl;

    public OAuth2RequestContext(String code, String redirectUrl) {
        this.code = code;
        this.redirectUrl = redirectUrl;
    }
}
