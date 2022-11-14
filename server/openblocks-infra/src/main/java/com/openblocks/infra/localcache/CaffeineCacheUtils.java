package com.openblocks.infra.localcache;

import java.util.function.Supplier;

import com.github.benmanes.caffeine.cache.Cache;

import reactor.core.publisher.Mono;

public class CaffeineCacheUtils {

    /**
     * @param cache should be created without a valueLoader:
     * <p>
     * Cache<Object, Object> cache = Caffeine.newBuilder()
     * .maximumSize()
     * .expireAfterWrite()
     * ...
     * .build();
     */
    public static <K, V> Mono<V> getCacheValueMono(Cache<K, V> cache, K key, Supplier<Mono<V>> valueMonoSupplier) {
        V v = cache.getIfPresent(key);
        if (v != null) {
            return Mono.just(v);
        }
        return valueMonoSupplier.get()
                .doOnNext(value -> cache.put(key, value));
    }
}
