package com.openblocks.domain.authentication;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import com.openblocks.sdk.auth.EmailAuthConfig;
import com.openblocks.sdk.constants.AuthSourceConstants;

public interface AuthenticationService {

    EmailAuthConfig DEFAULT_AUTH_CONFIG = new EmailAuthConfig(AuthSourceConstants.EMAIL, true, true);

    Mono<FindAuthConfig> findAuthConfigByAuthId(String authId);

    Mono<FindAuthConfig> findAuthConfigBySource(String source);

    Flux<FindAuthConfig> findAllAuthConfigs(boolean enableOnly);
}
