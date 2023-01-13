package com.openblocks.api.framework.filter;

import static com.openblocks.api.framework.filter.FilterOrder.THROTTLING;
import static com.openblocks.sdk.exception.BizError.REQUEST_THROTTLED;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static java.util.Collections.emptyMap;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;

import javax.annotation.Nonnull;
import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.google.common.util.concurrent.RateLimiter;
import com.openblocks.sdk.config.dynamic.ConfigCenter;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;


@SuppressWarnings("UnstableApiUsage")
@Slf4j
@Component
public class ThrottlingFilter implements WebFilter, Ordered {

    private static final int DEFAULT_RATE_THRESHOLD = 50;

    private final Map<String, RateLimiterWrapper> rateLimiterMap = new ConcurrentHashMap<>();
    private Supplier<Map<String, Integer>> urlRateLimiter;

    @Autowired
    private ConfigCenter configCenter;

    @PostConstruct
    private void init() {
        urlRateLimiter = configCenter.threshold().ofMap("urlRateLimiter", String.class, Integer.class, emptyMap());
    }

    @Nonnull
    @Override
    public Mono<Void> filter(@Nonnull ServerWebExchange exchange, @Nonnull WebFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();
        String requestUrl = request.getPath().pathWithinApplication().value();

        RateLimiterWrapper rateLimiter = rateLimiterMap.compute(requestUrl,
                (url, currentLimiter) -> {
                    int targetRate = urlRateLimiter.get().getOrDefault(url, DEFAULT_RATE_THRESHOLD);
                    if (currentLimiter == null) {
                        return RateLimiterWrapper.create(targetRate);
                    }
                    if (currentLimiter.rateNotChanged(targetRate)) {
                        return currentLimiter;
                    }
                    return currentLimiter.updateRate(targetRate);
                });


        if (!rateLimiter.tryAcquire()) {
            return ofError(REQUEST_THROTTLED, "REQUEST_THROTTLED");
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return THROTTLING.getOrder();
    }

    @Getter
    private static class RateLimiterWrapper {
        private final RateLimiter rateLimiter;

        private volatile long initMillis;

        private RateLimiterWrapper(int targetRate) {
            this.rateLimiter = RateLimiter.create(targetRate);
            this.initMillis = System.currentTimeMillis();
        }

        public static RateLimiterWrapper create(int targetRate) {
            return new RateLimiterWrapper(targetRate);
        }

        public boolean rateNotChanged(int targetRate) {
            return Math.abs(targetRate - rateLimiter.getRate()) < 1e-6;
        }

        public RateLimiterWrapper updateRate(int targetRate) {
            rateLimiter.setRate(targetRate);
            initMillis = System.currentTimeMillis();
            return this;
        }

        public boolean tryAcquire() {
            // might fail when just init, e.g. multiple queries come after server restarted
            // so here we give one second for the rateLimiter to become active
            if (System.currentTimeMillis() - initMillis <= 1000) {
                return true;
            }
            return rateLimiter.tryAcquire();
        }

    }

}
