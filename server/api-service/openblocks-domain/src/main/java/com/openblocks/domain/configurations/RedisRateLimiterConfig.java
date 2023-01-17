package com.openblocks.domain.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import es.moki.ratelimitj.redis.request.RedisRateLimiterFactory;
import io.lettuce.core.RedisClient;

@Configuration
public class RedisRateLimiterConfig {

    @Value("${spring.redis.url:redis}")
    private String redis;

    @Bean
    RedisRateLimiterFactory build() {
        return new RedisRateLimiterFactory(RedisClient.create(redis));
    }
}
