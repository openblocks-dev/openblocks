package com.openblocks.api.framework.filter;

import static com.openblocks.api.framework.filter.FilterOrder.USER_BAN;
import static com.openblocks.sdk.constants.Authentication.isAnonymousUser;
import static com.openblocks.sdk.exception.BizError.USER_BANNED;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import javax.annotation.Nonnull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.domain.user.model.UserStatus;
import com.openblocks.domain.user.service.UserStatusService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class UserBanFilter implements WebFilter, Ordered {

    @Autowired
    private UserStatusService userStatusService;

    @Autowired
    private SessionUserService sessionUserService;

    @Nonnull
    @Override
    public Mono<Void> filter(@Nonnull ServerWebExchange exchange, @Nonnull WebFilterChain chain) {
        return sessionUserService.getVisitorId()
                .flatMap(visitorId -> {
                    if (isAnonymousUser(visitorId)) {
                        return Mono.empty();
                    }

                    return userStatusService.findByUserId(visitorId)
                            .map(UserStatus::isBanned)
                            .defaultIfEmpty(false)
                            .flatMap(isBanned -> {
                                if (isBanned) {
                                    return ofError(USER_BANNED, "USER_BANNED");
                                }
                                return Mono.empty();
                            });
                })
                .then(Mono.defer(() -> chain.filter(exchange)));
    }

    @Override
    public int getOrder() {
        return USER_BAN.getOrder();
    }
}

