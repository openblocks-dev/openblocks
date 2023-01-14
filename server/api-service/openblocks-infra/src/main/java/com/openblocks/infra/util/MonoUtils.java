package com.openblocks.infra.util;

import java.util.List;

import reactor.core.publisher.Mono;

public class MonoUtils {

    public static <T> Mono<List<T>> emptyMonoIfEmptyList(Mono<List<T>> mono) {
        return mono.flatMap(value -> {
            if (value.isEmpty()) {
                return Mono.empty();
            }
            return Mono.just(value);
        });
    }

    public static <T> Mono<T> emptyIfNull(T t) {
        if (t == null) {
            return Mono.empty();
        }
        return Mono.just(t);
    }
}
