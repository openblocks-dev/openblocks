package com.openblocks.api.misc;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.time.Duration;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.ExchangeStrategies;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.localcache.ReloadableCache;
import com.openblocks.sdk.webclient.WebClientBuildHelper;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping(NewUrl.JS_LIBRARY)
public class JsLibraryController {

    private static final String META_URL_TEMPLATE = "https://registry.npmjs.com/%s";

    private static final ConcurrentMap<String, ReloadableCache<JsLibraryMeta>> RECOMMENDED_JS_LIB_META_CACHE = new ConcurrentHashMap<>();

    private static final LoadingCache<String, Mono<JsLibraryMeta>> JS_LIB_META_CACHE = CacheBuilder.newBuilder()
            .maximumSize(1000)
            .expireAfterAccess(Duration.ofDays(1))
            .build(new CacheLoader<>() {
                @Override
                public Mono<JsLibraryMeta> load(@NotNull String key) {
                    return fetch(key).cache();
                }
            });

    private static final ExchangeStrategies EXCHANGE_STRATEGY = ExchangeStrategies
            .builder()
            .codecs(configure -> configure.defaultCodecs().maxInMemorySize(-1))
            .build();

    static {
        try (InputStream is = JsLibraryController.class.getClassLoader().getResourceAsStream("recommendedJsLibraries")) {
            if (is != null) {
                List<String> names = IOUtils.readLines(is, Charset.defaultCharset());
                log.info("find recommended js library names: {}", names);
                for (String libName : names) {
                    ReloadableCache<JsLibraryMeta> reloadableCache = ReloadableCache.<JsLibraryMeta> newBuilder()
                            .setName(libName)
                            .setInterval(Duration.ofDays(1))
                            .setFactory(() -> {
                                Mono<JsLibraryMeta> fetch = fetch(libName);
                                log.info("reloaded recommended js library: {}", libName);
                                return fetch;
                            })
                            .build();
                    RECOMMENDED_JS_LIB_META_CACHE.put(libName, reloadableCache);
                }
            }
        } catch (IOException e) {
            log.error("load recommended js library name error.", e);
        }
    }

    @GetMapping("/recommendations")
    public Mono<ResponseView<List<JsLibraryMeta>>> getRecommendationMetas() {
        return getMeta(RECOMMENDED_JS_LIB_META_CACHE.keySet());
    }

    @GetMapping("/metas")
    public Mono<ResponseView<List<JsLibraryMeta>>> getMeta(@RequestParam("name") Collection<String> names) {
        if (CollectionUtils.isEmpty(names)) {
            return Mono.just(ResponseView.success(Collections.emptyList()));
        }
        return Flux.fromIterable(names)
                .flatMap(name -> {
                    if (RECOMMENDED_JS_LIB_META_CACHE.containsKey(name)) {
                        return RECOMMENDED_JS_LIB_META_CACHE.get(name).getMonoValue();
                    }
                    return JS_LIB_META_CACHE.getUnchecked(name)
                            .onErrorReturn(JsLibraryMeta.builder().name(name).build());
                })
                .collectList()
                .map(ResponseView::success);
    }

    @SuppressWarnings("unchecked")
    private static Mono<JsLibraryMeta> fetch(String name) {
        log.info("fetch js library:{}", name);
        return WebClientBuildHelper.builder()
                .systemProxy()
                .toWebClientBuilder()
                .exchangeStrategies(EXCHANGE_STRATEGY)
                .build()
                .get()
                .uri(META_URL_TEMPLATE.formatted(name))
                .exchangeToMono(response -> {
                    if (response.statusCode().is2xxSuccessful()) {
                        return response.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                        });
                    }
                    return Mono.empty();
                })
                .map(map -> {
                    String description = MapUtils.getString(map, "description");
                    String homepage = MapUtils.getString(map, "homepage");
                    if (StringUtils.isBlank(homepage)) {
                        homepage = Optional.ofNullable((Map<String, Object>) MapUtils.getMap(map, "repository"))
                                .filter(repository -> "git".equals(MapUtils.getString(repository, "type")))
                                .map(repository -> MapUtils.getString(repository, "url"))
                                .map(url -> url.replaceFirst("git\\+", ""))
                                .orElse(null);
                    }
                    String latestVersion = Optional.ofNullable((Map<String, Object>) MapUtils.getMap(map, "dist-tags"))
                            .map(distTags -> MapUtils.getString(distTags, "latest"))
                            .orElse(null);
                    return JsLibraryMeta.builder()
                            .name(name)
                            .latestVersion(latestVersion)
                            .homepage(homepage)
                            .description(description)
                            .build();
                })
                .defaultIfEmpty(JsLibraryMeta.builder().name(name).build());
    }

    @Data
    @Builder
    public static class JsLibraryMeta {
        private String name;
        private String latestVersion;
        private String homepage;
        private String description;
    }
}
