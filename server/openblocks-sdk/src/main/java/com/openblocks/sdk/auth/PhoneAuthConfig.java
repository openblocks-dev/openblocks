package com.openblocks.sdk.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.openblocks.sdk.constants.AuthSourceConstants;

import lombok.Getter;

@Getter
public class PhoneAuthConfig extends AbstractAuthConfig {

    private final boolean enableLogin;

    @JsonCreator
    public PhoneAuthConfig(boolean enableLogin) {
        super(AuthSourceConstants.PHONE, AuthSourceConstants.PHONE);
        this.enableLogin = enableLogin;
    }

    @Override
    public boolean enableAuth() {
        return enableLogin;
    }

    @Override
    public AuthType getAuthType() {
        return AuthType.PHONE;
    }
}
