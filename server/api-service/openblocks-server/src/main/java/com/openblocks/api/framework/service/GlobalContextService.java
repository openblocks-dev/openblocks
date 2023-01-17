package com.openblocks.api.framework.service;

import java.util.Locale;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.reactive.function.server.ServerRequest;

public interface GlobalContextService {

    Locale getClientLocale(ServerHttpRequest request);

    Locale getClientLocale(ServerRequest request);
}
