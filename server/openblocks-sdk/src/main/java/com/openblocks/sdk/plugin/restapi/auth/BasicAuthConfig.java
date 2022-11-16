package com.openblocks.sdk.plugin.restapi.auth;

import java.util.function.Function;

import javax.annotation.Nullable;

import org.apache.commons.lang3.ObjectUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;

import lombok.Getter;

/**
 * not only basic auth config, but also digest auth config.
 */
@Getter
public final class BasicAuthConfig extends AuthConfig {
    private final String username;
    @JsonView(JsonViews.Internal.class)
    private String password;

    @JsonCreator
    public BasicAuthConfig(String username, String password, RestApiAuthType type) {
        super(type);
        this.username = username;
        this.password = password;
    }

    @Override
    public void doEncrypt(Function<String, String> encryptFunc) {
        this.password = encryptFunc.apply(this.password);
    }

    @Override
    public void doDecrypt(Function<String, String> decryptFunc) {
        this.password = decryptFunc.apply(this.password);
    }

    @Override
    public AuthConfig mergeWithUpdatedConfig(@Nullable AuthConfig updatedConfig) {
        // return new auth config if auth type changed
        if (!(updatedConfig instanceof BasicAuthConfig basicAuthConfig)) {
            return updatedConfig;
        }
        // otherwise merge basic auth config
        return new BasicAuthConfig(basicAuthConfig.getUsername(),
                ObjectUtils.firstNonNull(basicAuthConfig.getPassword(), this.password),
                basicAuthConfig.getType());
    }
}
