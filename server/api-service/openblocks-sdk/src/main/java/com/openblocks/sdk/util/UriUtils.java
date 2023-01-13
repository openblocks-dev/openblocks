package com.openblocks.sdk.util;


import java.net.URI;
import java.util.Optional;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

import com.google.common.net.InternetDomainName;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UriUtils {

    public static final String REFERER = "Referer";
    private static final String LOCALHOST = "localhost";

    public static String getRefererDomain(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();
        return Optional.ofNullable(getRefererURI(request))
                .map(URI::getHost)
                .map(String::toLowerCase)
                .orElse("");
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
