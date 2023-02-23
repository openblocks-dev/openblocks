package com.openblocks.api.authentication.request;

import com.openblocks.domain.authentication.context.AuthRequestContext;
import com.openblocks.domain.user.model.AuthenticationUser;
import com.openblocks.domain.user.model.ConnectionAuthToken;

import reactor.core.publisher.Mono;

/**
 * @see AuthRequestFactory
 */
public interface AuthRequest {

    Mono<AuthenticationUser> auth(AuthRequestContext authRequestContext);

    default Mono<ConnectionAuthToken> refresh(ConnectionAuthToken old) {
        return Mono.error(new UnsupportedOperationException());
    }
}
