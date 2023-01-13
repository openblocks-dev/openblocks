package com.openblocks.api.common;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.boot.test.context.TestConfiguration;

import com.google.common.util.concurrent.Uninterruptibles;

import redis.embedded.RedisServer;

@SuppressWarnings("UnstableApiUsage")
@TestConfiguration
public class TestRedisConfiguration {

    private static final AtomicInteger STATE = new AtomicInteger(0);

    private static final RedisServer redisServer;

    static {
        redisServer = new RedisServer(RedisConfiguration.REDIS_PORT);
    }

    @PostConstruct
    public void postConstruct() {
        try {
            while (true) {
                if (STATE.compareAndSet(0, 1)) {
                    // execute only once.
                    redisServer.start();
                    STATE.set(2);
                }
                if (STATE.get() == 1) {
                    // wait for executing success.
                    Uninterruptibles.sleepUninterruptibly(Duration.ofMillis(50));
                    continue;
                }
                if (STATE.get() == 2) {
                    // execute end, then break.
                    break;
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PreDestroy
    public void preDestroy() {
        redisServer.stop();
    }
}
