package com.openblocks.api.framework.filter;

import static com.openblocks.api.authentication.util.AuthenticationUtils.toAuthentication;
import static org.springframework.security.core.context.ReactiveSecurityContextHolder.withAuthentication;

import javax.annotation.Nonnull;

import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.sdk.util.CookieHelper;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
public class UserSessionPersistenceFilter implements WebFilter {

    private final SessionUserService service;
    private final CookieHelper cookieHelper;

    public UserSessionPersistenceFilter(SessionUserService service, CookieHelper cookieHelper) {
        this.service = service;
        this.cookieHelper = cookieHelper;
    }

    @Nonnull
    @Override
    public Mono<Void> filter(@Nonnull ServerWebExchange exchange, WebFilterChain chain) {
        String cookieToken = cookieHelper.getCookieToken(exchange);
        return service.resolveSessionUserFromCookie(cookieToken)
                .switchIfEmpty(chain.filter(exchange).then(Mono.empty()))
                .flatMap(user -> chain.filter(exchange).contextWrite(withAuthentication(toAuthentication(user)))
                        .then(service.extendValidity(cookieToken))
                );
    }
}
