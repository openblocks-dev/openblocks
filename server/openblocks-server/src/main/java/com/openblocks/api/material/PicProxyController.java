package com.openblocks.api.material;

import static com.openblocks.api.util.MediaTypeUtils.getMediaType;

import java.time.Duration;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.util.MediaTypeUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
public class PicProxyController {

    private static final String UA =
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36";
    private final ExchangeStrategies largeBufferSize = ExchangeStrategies
            .builder()
            .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
            .build();

    @GetMapping("/api/proxy")
    public Mono<Void> proxyRequest(@RequestParam String url,
            @RequestParam(required = false) String type, ServerWebExchange exchange) {

        ServerHttpResponse response = exchange.getResponse();
        Mono<byte[]> byteStream = WebClient.builder()
                .exchangeStrategies(largeBufferSize)
                .build()
                .method(HttpMethod.GET)
                .uri(url)
                .header("User-Agent", UA)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(byte[].class))
                .onErrorResume(throwable -> {
                    log.error("event log report error", throwable);
                    return Mono.empty();
                })
                .timeout(Duration.ofSeconds(30));
        response.setStatusCode(HttpStatus.OK);
        response.getHeaders().add("Content-Type", getContentType(url, type).toString());
        return response.writeWith(byteStream.map(data -> new DefaultDataBufferFactory().wrap(data)));
    }

    @Nonnull
    private MediaType getContentType(String url, String type) {
        if (StringUtils.isNotBlank(type)) {
            return getMediaType(type);
        }
        return MediaTypeUtils.parse(url);
    }

}