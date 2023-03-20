package com.openblocks.sdk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openblocks.sdk.util.JsonUtils;

@Configuration
public class SerializeConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return JsonUtils.getObjectMapper();
    }

    public static class JsonViews {
        public static class Public {
        }

        public static class Internal {
        }
    }
}
