package com.openblocks.api.framework.filter;

import static com.openblocks.api.framework.filter.FilterOrder.REQUEST_COST;

import java.time.Duration;

import javax.annotation.Nonnull;

import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class RequestCostFilter implements WebFilter, Ordered {

    @Nonnull
    @Override
    public Mono<Void> filter(@Nonnull ServerWebExchange exchange, @Nonnull WebFilterChain chain) {
        long currentTime = System.nanoTime();
        exchange.getResponse().beforeCommit(() -> Mono.fromRunnable(() -> {
            HttpHeaders httpHeaders = exchange.getResponse().getHeaders();
            httpHeaders.add("X-REQUEST-COST", Duration.ofNanos(System.nanoTime() - currentTime).toMillis() + "ms");
        }));
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return REQUEST_COST.getOrder();
    }
}
