package com.openblocks.sdk.auth;

import java.util.function.Function;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.sdk.auth.constants.AuthTypeConstants;
import com.openblocks.sdk.auth.constants.Oauth2Constants;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;

import lombok.Getter;

/**
 * simple oauth2 auth config.
 */
@Getter
public class Oauth2SimpleAuthConfig extends AbstractAuthConfig {

    protected String clientId;
    @JsonView(JsonViews.Internal.class)
    protected String clientSecret;

    @JsonCreator
    public Oauth2SimpleAuthConfig(
            @Nullable String id,
            Boolean enable,
            Boolean enableRegister,
            String source,
            String sourceName,
            String clientId,
            String clientSecret,
            String authType) {
        super(id, source, sourceName, enable, enableRegister, authType);
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    /**
     * used by fe.
     * <p>
     * we only render client-id, leaving redirect-url and state rendered by fe.
     */
    @SuppressWarnings("unused")
    @JsonView(JsonViews.Public.class)
    public String getAuthorizeUrl() {
        return switch (authType) {
            case AuthTypeConstants.GOOGLE -> Oauth2Constants.GOOGLE_AUTHORIZE_URL;
            case AuthTypeConstants.GITHUB -> Oauth2Constants.GITHUB_AUTHORIZE_URL;
            default -> null;
        };
    }

    @Override
    public void doEncrypt(Function<String, String> encryptFunc) {
        this.clientSecret = encryptFunc.apply(clientSecret);
    }

    @Override
    public void doDecrypt(Function<String, String> decryptFunc) {
        this.clientSecret = decryptFunc.apply(clientSecret);
    }

    @Override
    public void merge(AbstractAuthConfig oldConfig) {
        if (StringUtils.isBlank(this.clientSecret) && oldConfig instanceof Oauth2SimpleAuthConfig oldSimpleConfig) {
            this.clientSecret = oldSimpleConfig.getClientSecret();
        }
    }
}
