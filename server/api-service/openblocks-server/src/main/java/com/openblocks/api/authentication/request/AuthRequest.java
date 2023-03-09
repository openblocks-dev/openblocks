package com.openblocks.api.authentication.request;

import com.openblocks.domain.authentication.context.AuthRequestContext;
import com.openblocks.domain.user.model.AuthToken;
import com.openblocks.domain.user.model.AuthUser;

import reactor.core.publisher.Mono;

/**
 * @see AuthRequestFactory
 */
public interface AuthRequest {

    Mono<AuthUser> auth(AuthRequestContext authRequestContext);

    default Mono<AuthToken> refresh(String refreshToken) {
        return Mono.error(new UnsupportedOperationException());
    }
}
