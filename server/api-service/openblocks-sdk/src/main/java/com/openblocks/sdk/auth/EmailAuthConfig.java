package com.openblocks.sdk.auth;

import static com.openblocks.sdk.auth.constants.AuthTypeConstants.FORM;
import static com.openblocks.sdk.constants.AuthSourceConstants.EMAIL;

import javax.annotation.Nullable;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

@Getter
public class EmailAuthConfig extends AbstractAuthConfig {

    @JsonCreator
    public EmailAuthConfig(@Nullable String id, boolean enable, boolean enableRegister) {
        super(id, EMAIL, EMAIL, enable, enableRegister, FORM);
    }
}
