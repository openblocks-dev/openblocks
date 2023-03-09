package com.openblocks.api.authentication.request.oauth2;

import static com.openblocks.sdk.auth.constants.AuthTypeConstants.GITHUB;
import static com.openblocks.sdk.auth.constants.AuthTypeConstants.GOOGLE;

import java.util.Set;

import org.springframework.stereotype.Component;

import com.openblocks.api.authentication.request.AuthRequest;
import com.openblocks.api.authentication.request.AuthRequestFactory;
import com.openblocks.api.authentication.request.oauth2.request.AbstractOauth2Request;
import com.openblocks.api.authentication.request.oauth2.request.GithubRequest;
import com.openblocks.api.authentication.request.oauth2.request.GoogleRequest;
import com.openblocks.sdk.auth.Oauth2SimpleAuthConfig;

import reactor.core.publisher.Mono;

@Component
public class Oauth2AuthRequestFactory implements AuthRequestFactory<OAuth2RequestContext> {

    @Override
    public Mono<AuthRequest> build(OAuth2RequestContext context) {
        return Mono.fromSupplier(() -> buildRequest(context));
    }

    private AbstractOauth2Request<? extends Oauth2SimpleAuthConfig> buildRequest(OAuth2RequestContext context) {
        return switch (context.getAuthConfig().getAuthType()) {
            case GITHUB -> new GithubRequest((Oauth2SimpleAuthConfig) context.getAuthConfig());
            case GOOGLE -> new GoogleRequest((Oauth2SimpleAuthConfig) context.getAuthConfig());
            default -> throw new UnsupportedOperationException(context.getAuthConfig().getAuthType());
        };
    }

    @Override
    public Set<String> supportedAuthTypes() {
        return Set.of(
                GITHUB,
                GOOGLE);
    }
}
