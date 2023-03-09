package com.openblocks.sdk.util;


import java.net.URI;
import java.util.Optional;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

import com.google.common.net.InternetDomainName;
import com.openblocks.sdk.constants.GlobalContext;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
public class UriUtils {

    public static final String REFERER = "Referer";
    private static final String LOCALHOST = "localhost";

    public static String getRefererDomainFromRequest(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();
        return Optional.ofNullable(getRefererURI(request))
                .map(URI::getHost)
                .map(String::toLowerCase)
                .orElse("");
    }

    public static Mono<String> getRefererDomainFromContext() {
        return Mono.deferContextual(contextView -> {
            String domain = contextView.getOrDefault(GlobalContext.DOMAIN, null);
            if (domain == null) {
                return Mono.empty();
            }
            return Mono.just(domain);
        });
    }

    @Nullable
    public static URI getRefererURI(ServerHttpRequest request) {
        String refer = request.getHeaders().getFirst(REFERER);
        if (StringUtils.isNotBlank(refer)) {
            return URI.create(refer);
        }
        return null;
    }

    @SuppressWarnings("UnstableApiUsage")
    public static String getTopPrivateDomain(ServerWebExchange exchange) {
        URI uri = exchange.getRequest().getURI();
        try {
            if (InternetDomainName.isValid(uri.getHost()) && !LOCALHOST.equalsIgnoreCase(uri.getHost())) {
                return InternetDomainName.from(uri.getHost()).topPrivateDomain().toString().toLowerCase();
            }
        } catch (Exception e) {
            log.error("get top private domain error", e);
        }
        return uri.getHost().toLowerCase();
    }

}
