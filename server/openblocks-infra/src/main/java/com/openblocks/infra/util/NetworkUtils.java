package com.openblocks.infra.util;

import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.sdk.util.JsonUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NetworkUtils {

    public static String getRemoteIp(ServerWebExchange serverWebExchange) {
        ServerHttpRequest request = serverWebExchange.getRequest();
        HttpHeaders headers = request.getHeaders();
        String xRealIp = headers.getFirst("X-Real-IP");
        if (StringUtils.isNotBlank(xRealIp)) {
            return xRealIp;
        }
        String remoteIp = headers.getFirst("RemoteIp");
        if (StringUtils.isNotBlank(remoteIp)) {
            return remoteIp;
        }
        log.debug("get remote ip from remoteAddress , header {}", JsonUtils.toJson(headers));
        return Optional.ofNullable(serverWebExchange.getRequest().getRemoteAddress())
                .map(InetSocketAddress::getAddress)
                .map(InetAddress::getHostAddress)
                .orElse("");
    }

}
