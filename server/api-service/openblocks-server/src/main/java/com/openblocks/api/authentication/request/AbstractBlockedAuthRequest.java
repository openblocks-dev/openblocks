package com.openblocks.api.authentication.request;

import static com.openblocks.api.authentication.util.AuthenticationUtils.AUTH_REQUEST_THREAD_POOL;

import com.openblocks.domain.authentication.context.AuthRequestContext;
import com.openblocks.domain.user.model.AuthUser;

import reactor.core.publisher.Mono;

public abstract class AbstractBlockedAuthRequest implements AuthRequest {

    @Override
    public final Mono<AuthUser> auth(AuthRequestContext authRequestContext) {
        return Mono.fromSupplier(() -> authSync(authRequestContext))
                .subscribeOn(AUTH_REQUEST_THREAD_POOL);
    }

    protected abstract AuthUser authSync(AuthRequestContext authRequestContext);
}
