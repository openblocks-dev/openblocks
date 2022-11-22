package com.openblocks.sdk.auth;

import static com.openblocks.sdk.constants.AuthSourceConstants.EMAIL;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

@Getter
public class EmailAuthConfig extends AbstractAuthConfig {
    private final boolean enableLogin;
    private final boolean enableRegister;

    @JsonCreator
    public EmailAuthConfig(boolean enableLogin, boolean enableRegister) {
        super(EMAIL, EMAIL);
        this.enableLogin = enableLogin;
        this.enableRegister = enableRegister;
    }

    @Override
    public boolean enableAuth() {
        return enableLogin;
    }

    @Override
    public String getAuthType() {
        return AuthTypeConstants.FORM;
    }
}
