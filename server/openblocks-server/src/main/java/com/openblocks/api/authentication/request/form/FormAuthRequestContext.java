package com.openblocks.api.authentication.request.form;

import com.google.common.base.Preconditions;
import com.openblocks.api.authentication.request.AuthRequestContext;
import com.openblocks.sdk.constants.AuthSourceConstants;

import lombok.Getter;

@Getter
public class FormAuthRequestContext extends AuthRequestContext {

    /**
     * phone or email for now.
     */
    private final String loginId;
    private final String password;
    private final String source;

    public FormAuthRequestContext(String loginId, String password, String source) {
        Preconditions.checkArgument(source.equalsIgnoreCase(AuthSourceConstants.PHONE)
                || source.equalsIgnoreCase(AuthSourceConstants.EMAIL));
        this.loginId = loginId;
        this.password = password;
        this.source = source;
    }
}
