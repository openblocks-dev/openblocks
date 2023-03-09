package com.openblocks.api.authentication.service;

import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.authentication.dto.AuthConfigRequest;
import com.openblocks.domain.user.model.AuthUser;

import reactor.core.publisher.Mono;

public interface AuthenticationApiService {

    Mono<AuthUser> authenticateByForm(String loginId, String password, String source, boolean register, String authId);

    Mono<AuthUser> authenticateByOauth2(String authId, String source, String code, String redirectUrl);

    Mono<Void> loginOrRegister(AuthUser authUser, ServerWebExchange exchange, String invitationId);

    Mono<Boolean> enableAuthConfig(AuthConfigRequest authConfigRequest);

    Mono<Boolean> disableAuthConfig(String authId);
}
