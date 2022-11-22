package com.openblocks.api.authentication.request;

import java.util.Set;

import reactor.core.publisher.Mono;

public interface AuthRequestFactory {

    Mono<AuthRequest> build(AuthRequestContext context);

    Set<String> supportedAuthTypes();
}
