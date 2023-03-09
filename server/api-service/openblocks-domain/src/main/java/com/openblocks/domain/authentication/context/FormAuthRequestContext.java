package com.openblocks.domain.authentication.context;

import lombok.Getter;

@Getter
public class FormAuthRequestContext extends AuthRequestContext {

    /**
     * phone or email for now.
     */
    private final String loginId;
    private final String password;
    private final boolean register;

    public FormAuthRequestContext(String loginId, String password, boolean register) {
        this.loginId = loginId;
        this.password = password;
        this.register = register;
    }
}
