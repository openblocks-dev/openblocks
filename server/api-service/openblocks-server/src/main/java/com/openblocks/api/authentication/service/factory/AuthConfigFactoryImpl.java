package com.openblocks.api.authentication.service.factory;

import static com.openblocks.sdk.constants.AuthSourceConstants.GITHUB;
import static com.openblocks.sdk.constants.AuthSourceConstants.GITHUB_NAME;
import static com.openblocks.sdk.constants.AuthSourceConstants.GOOGLE;
import static com.openblocks.sdk.constants.AuthSourceConstants.GOOGLE_NAME;
import static java.util.Objects.requireNonNull;

import java.util.Set;

import org.apache.commons.collections4.MapUtils;
import org.springframework.stereotype.Component;

import com.openblocks.api.authentication.dto.AuthConfigRequest;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.auth.EmailAuthConfig;
import com.openblocks.sdk.auth.Oauth2SimpleAuthConfig;
import com.openblocks.sdk.auth.constants.AuthTypeConstants;

@Component
public class AuthConfigFactoryImpl implements AuthConfigFactory {

    @Override
    public AbstractAuthConfig build(AuthConfigRequest authConfigRequest, boolean enable) {
        return switch (authConfigRequest.getAuthType()) {
            case AuthTypeConstants.FORM -> buildEmailAuthConfig(authConfigRequest, enable);
            case AuthTypeConstants.GITHUB -> buildOauth2SimpleAuthConfig(GITHUB, GITHUB_NAME, authConfigRequest, enable);
            case AuthTypeConstants.GOOGLE -> buildOauth2SimpleAuthConfig(GOOGLE, GOOGLE_NAME, authConfigRequest, enable);
            default -> throw new UnsupportedOperationException(authConfigRequest.getAuthType());
        };
    }

    @Override
    public Set<String> supportAuthTypes() {
        return Set.of(
                AuthTypeConstants.FORM,
                AuthTypeConstants.GITHUB,
                AuthTypeConstants.GOOGLE
        );
    }

    private EmailAuthConfig buildEmailAuthConfig(AuthConfigRequest authConfigRequest, boolean enable) {
        Boolean enableRegister = MapUtils.getBoolean(authConfigRequest, "enableRegister");
        return new EmailAuthConfig(authConfigRequest.getId(), enable, enableRegister);
    }

    private Oauth2SimpleAuthConfig buildOauth2SimpleAuthConfig(String source, String sourceName, AuthConfigRequest authConfigRequest,
            boolean enable) {
        return new Oauth2SimpleAuthConfig(
                authConfigRequest.getId(),
                enable,
                authConfigRequest.isEnableRegister(),
                source,
                sourceName,
                requireNonNull(authConfigRequest.getClientId(), "clientId can not be null."),
                authConfigRequest.getClientSecret(),
                authConfigRequest.getAuthType());
    }
}
