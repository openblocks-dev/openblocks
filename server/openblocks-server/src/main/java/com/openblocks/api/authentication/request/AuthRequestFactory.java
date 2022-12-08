package com.openblocks.api.authentication.request;

import java.util.Set;

import reactor.core.publisher.Mono;

public interface AuthRequestFactory<T extends AuthRequestContext> {

    Mono<AuthRequest> build(T context);

    Set<String> supportedAuthTypes();
}
