package com.openblocks.api.authentication.request.oauth2.request;

import static com.openblocks.sdk.exception.BizError.FAIL_TO_GET_OIDC_INFO;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import com.openblocks.api.authentication.request.AuthRequest;
import com.openblocks.api.authentication.request.oauth2.OAuth2RequestContext;
import com.openblocks.api.authentication.request.oauth2.Oauth2Source;
import com.openblocks.api.authentication.util.AuthenticationUtils;
import com.openblocks.domain.authentication.context.AuthRequestContext;
import com.openblocks.domain.user.model.AuthToken;
import com.openblocks.domain.user.model.AuthenticationUser;
import com.openblocks.domain.user.model.ConnectionAuthToken;
import com.openblocks.sdk.auth.Oauth2SimpleAuthConfig;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
public abstract class AbstractOauth2Request<T extends Oauth2SimpleAuthConfig> implements AuthRequest {

    protected T config;
    protected Oauth2Source source;
    protected OAuth2RequestContext context;

    public AbstractOauth2Request(T config, Oauth2Source source, OAuth2RequestContext context) {
        this.config = config;
        this.source = source;
        this.context = context;
    }

    public Mono<AuthenticationUser> auth(AuthRequestContext authRequestContext) {
        return Mono.defer(() -> {
                    try {
                        OAuth2RequestContext context = (OAuth2RequestContext) authRequestContext;

                        AuthToken token = this.getAccessToken(context);
                        AuthenticationUser authenticationUser = this.getUserInfo(token);
                        authenticationUser.setAuthToken(token);
                        return Mono.just(authenticationUser);
                    } catch (Exception e) {
                        log.error("get oidc failed: {}", toJson(authRequestContext), e);
                        return deferredError(FAIL_TO_GET_OIDC_INFO, "FAIL_TO_GET_OIDC_INFO", e.getMessage());
                    }
                })
                .subscribeOn(AuthenticationUtils.AUTH_REQUEST_THREAD_POOL);
    }

    protected abstract AuthToken getAccessToken(OAuth2RequestContext context);

    protected abstract AuthenticationUser getUserInfo(AuthToken authToken);

    public Mono<ConnectionAuthToken> refresh(ConnectionAuthToken old) {
        return Mono.fromSupplier(() -> {
            AuthToken authToken = AuthToken.builder()
                    .refreshToken(old.getRefreshToken())
                    .build();
            AuthToken refresh = refresh(authToken);
            return ConnectionAuthToken.of(refresh);
        });
    }

    protected AuthToken refresh(AuthToken authToken) {
        throw new UnsupportedOperationException();
    }
}
