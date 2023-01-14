package com.openblocks.sdk.webclient;

import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.Builder;

import lombok.extern.slf4j.Slf4j;
import reactor.netty.http.client.HttpClient;

@Slf4j
public class WebClients {

    private static final WebClient INSTANCE = WebClient.create();

    private static final WebClient SECURE_INSTANCE = builder().build();

    public static WebClient getInstance() {
        return INSTANCE;
    }

    public static Builder builder() {
        HttpClient httpClient = HttpClient.create().resolver(ResolverGroup.INSTANCE);
        return WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient));
    }

    public static WebClient getSecureInstance() {
        return SECURE_INSTANCE;
    }
}
