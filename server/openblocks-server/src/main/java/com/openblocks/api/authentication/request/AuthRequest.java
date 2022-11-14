package com.openblocks.api.authentication.request;

import com.openblocks.domain.user.model.AuthorizedUser;
import com.openblocks.domain.user.model.ConnectionAuthToken;

import reactor.core.publisher.Mono;

/**
 * @see AuthRequestFactory
 */
public interface AuthRequest {

    Mono<AuthorizedUser> auth(AuthRequestContext authRequestContext);

    default Mono<ConnectionAuthToken> refresh(ConnectionAuthToken old) {
        return Mono.error(new UnsupportedOperationException());
    }
}
