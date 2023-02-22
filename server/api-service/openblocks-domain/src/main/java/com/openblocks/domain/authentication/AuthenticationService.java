package com.openblocks.domain.authentication;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AuthenticationService {

    Mono<FindAuthConfig> findAuthConfigByAuthId(String authId);

    Mono<FindAuthConfig> findAuthConfigBySource(String source);

    Flux<FindAuthConfig> findAllAuthConfigs(boolean enableOnly);
}
