package com.openblocks.sdk.util;

import static java.util.function.Function.identity;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamUtils {

    public static <T, K> Set<K> collectSet(Collection<T> collection, Function<T, K> mapper) {
        return collection.stream()
                .map(mapper)
                .collect(Collectors.toSet());
    }

    public static <T, K> List<K> collectList(Collection<T> collection, Function<T, K> mapper) {
        return collection.stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    public static <T, K, V> Map<K, V> collectMap(Stream<T> collection, Function<T, K> keyMapper,
            Function<T, V> valueMapper) {
        return collection.collect(Collectors.toMap(keyMapper, valueMapper, (a, b) -> b));
    }

    public static <T, K> Map<K, T> collectMap(Stream<T> collection, Function<T, K> keyMapper) {
        return collectMap(collection, keyMapper, identity());
    }

    public static <T, K, V> Map<K, V> collectMap(Collection<T> collection, Function<T, K> keyMapper,
            Function<T, V> valueMapper) {
        return collectMap(collection.stream(), keyMapper, valueMapper);
    }

    public static <T> Predicate<T> distinctByKey(
            Function<? super T, ?> keyExtractor) {

        Map<Object, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }

    public static <T, K, U> Collector<T, ?, Map<K, U>> toMapNullFriendly(
            Function<? super T, ? extends K> keyMapper,
            Function<? super T, ? extends U> valueMapper) {
        @SuppressWarnings("unchecked")
        U none = (U) new Object();
        return Collectors.collectingAndThen(
                Collectors.<T, K, U> toMap(keyMapper,
                        valueMapper.andThen(v -> v == null ? none : v)
                ), map -> {
                    map.replaceAll((k, v) -> v == none ? null : v);
                    return map;
                });
    }

    public static <T, K, U> Collector<T, ?, Map<K, U>> toMapNullFriendly(
            Function<? super T, ? extends K> keyMapper,
            Function<? super T, ? extends U> valueMapper,
            BinaryOperator<U> mergeFunction) {
        @SuppressWarnings("unchecked")
        U none = (U) new Object();
        return Collectors.collectingAndThen(
                Collectors.<T, K, U> toMap(keyMapper,
                        valueMapper.andThen(v -> v == null ? none : v),
                        mergeFunction
                ), map -> {
                    map.replaceAll((k, v) -> v == none ? null : v);
                    return map;
                });
    }
}
