package com.openblocks.api.framework.service;

import java.util.Locale;

import org.springframework.http.server.reactive.ServerHttpRequest;

public interface GlobalContextService {

    Locale getClientLocale(ServerHttpRequest request);
}
