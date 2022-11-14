package com.openblocks.api.authentication.service;

import com.openblocks.api.authentication.request.AuthRequestContext;
import com.openblocks.domain.organization.model.EnterpriseConnectionConfig;
import com.openblocks.domain.user.model.AuthorizedUser;
import com.openblocks.domain.user.model.User;
import com.openblocks.sdk.auth.AbstractAuthConfig;

import reactor.core.publisher.Mono;

public interface AuthenticationApiService {

    Mono<AuthorizedUser> getFormAuthUser(String loginId, String password, String domain, String source);

    Mono<Void> onUserLogin(String orgId, User user, String source);

    Mono<Void> onUserRegister(User user);

    Mono<AbstractAuthConfig> findAuthConfig(String source, AuthRequestContext context, String domain);

    Mono<EnterpriseConnectionConfig> getEnterpriseConnectionConfigMono(String domain);
}
