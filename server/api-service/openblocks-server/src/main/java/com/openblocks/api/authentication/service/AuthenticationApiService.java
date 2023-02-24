package com.openblocks.api.authentication.service;

import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.authentication.dto.AuthConfigRequest;
import com.openblocks.domain.user.model.AuthenticationUser;

import reactor.core.publisher.Mono;

public interface AuthenticationApiService {

    Mono<AuthenticationUser> authenticateByForm(String loginId, String password, String source, boolean register, String authId);

    Mono<AuthenticationUser> authenticateByOauth2(String authId, String source, String code, String redirectUrl);

    Mono<Void> loginOrRegister(AuthenticationUser authUser, ServerWebExchange exchange, String invitationId);

    Mono<Boolean> enableAuthConfig(AuthConfigRequest authConfigRequest);

    Mono<Boolean> disableAuthConfig(String authId);
}
