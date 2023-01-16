package com.openblocks.sdk.webclient;

import static com.openblocks.sdk.webclient.HttpClients.httpClient;
import static com.openblocks.sdk.webclient.HttpClients.withSecure;

import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.Builder;

import com.openblocks.sdk.plugin.common.ssl.SslConfig;

import lombok.extern.slf4j.Slf4j;
import reactor.netty.http.client.HttpClient;

@Slf4j
public class WebClients {

    private static final WebClient INSTANCE = builder().build();

    private static final WebClient SECURE_INSTANCE = withSafeHost(builder()).build();

    public static WebClient getInstance() {
        return INSTANCE;
    }

    public static WebClient getSecureInstance() {
        return SECURE_INSTANCE;
    }

    public static Builder builder() {
        return WebClient.builder();
    }

    public static Builder withSafeHost(Builder builder) {
        HttpClient httpClient = HttpClients.withSafeHost(httpClient());
        return builder.clientConnector(new ReactorClientHttpConnector(httpClient));
    }

    public static Builder withSafeHostAndSecure(Builder builder, SslConfig sslConfig) {
        HttpClient httpClient = withSecure(HttpClients.withSafeHost(httpClient()), sslConfig);
        return builder.clientConnector(new ReactorClientHttpConnector(httpClient));
    }

}
