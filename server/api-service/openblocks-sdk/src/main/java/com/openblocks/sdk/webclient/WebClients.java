package com.openblocks.sdk.webclient;

import org.springframework.web.reactive.function.client.WebClient;

public class WebClients {

    private static final WebClient INSTANCE = WebClient.builder().build();

    public static WebClient getInstance() {
        return INSTANCE;
    }
}
