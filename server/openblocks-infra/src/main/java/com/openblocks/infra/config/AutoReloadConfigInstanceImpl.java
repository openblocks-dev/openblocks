package com.openblocks.infra.config;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigInstance;
import com.openblocks.sdk.util.JsonUtils;

@Component
@SuppressWarnings("unchecked")
public class AutoReloadConfigInstanceImpl implements ConfigInstance {

    @Autowired
    private AutoReloadConfigFactory autoReloadConfigFactory;

    private final ConcurrentHashMap<ConfKey, Conf<?>> confMap = new ConcurrentHashMap<>();

    @Override
    public Conf<Integer> ofInteger(String confKey, int defaultValue) {
        return fromJson(confKey, Integer.class, defaultValue);
    }

    @Override
    public Conf<String> ofString(String confKey, String defaultValue) {
        return fromJson(confKey, String.class, defaultValue);
    }

    @Override
    public Conf<Boolean> ofBoolean(String confKey, boolean defaultValue) {
        return fromJson(confKey, Boolean.class, defaultValue);
    }

    @Override
    public <T> Conf<T> ofJson(String confKey, Class<T> tClass, T defaultValue) {
        return fromJson(confKey, tClass, defaultValue);
    }

    @Override
    public <T> Conf<List<T>> ofList(String confKey, List<T> defaultValue, Class<T> tClass) {
        return fromJsonList(confKey, tClass, defaultValue);
    }

    @Override
    public Conf<List<String>> ofStringList(String confKey, List<String> defaultValue) {
        return fromJsonList(confKey, String.class, defaultValue);
    }

    @Override
    public Conf<List<Integer>> ofIntList(String confKey, List<Integer> defaultValue) {
        return fromJsonList(confKey, Integer.class, defaultValue);
    }

    @Override
    public Conf<List<Long>> ofLongList(String confKey, List<Long> defaultValue) {
        return fromJsonList(confKey, Long.class, defaultValue);
    }

    @Override
    public <K, V> Conf<Map<K, V>> ofMap(String confKey, Class<K> kClass, Class<V> vClass, Map<K, V> defaultValue) {
        return (Conf<Map<K, V>>) confMap.computeIfAbsent(new ConfKey(confKey, defaultValue),
                k -> new AutoReloadConfImpl<>(k.key(), defaultValue, autoReloadConfigFactory, s -> JsonUtils.fromJsonMap(s, kClass, vClass)));
    }

    private <T> Conf<T> fromJson(String confKey, Class<T> tClass, T defaultValue) {
        return (Conf<T>) confMap.computeIfAbsent(new ConfKey(confKey, defaultValue),
                k -> new AutoReloadConfImpl<>(k.key(), defaultValue, autoReloadConfigFactory, s -> JsonUtils.fromJson(s, tClass)));
    }

    private <T> Conf<List<T>> fromJsonList(String confKey, Class<T> tClass, List<T> defaultValue) {
        return (Conf<List<T>>) confMap.computeIfAbsent(new ConfKey(confKey, defaultValue),
                k -> new AutoReloadConfImpl<>(k.key(), defaultValue, autoReloadConfigFactory, s -> JsonUtils.fromJsonList(s, tClass)));
    }

    private record ConfKey(String key, Object defaultValue) {

        @Override
        public boolean equals(Object o) {
            if (this == o) {
                return true;
            }
            if (o == null || getClass() != o.getClass()) {
                return false;
            }
            ConfKey confKey = (ConfKey) o;
            return Objects.equals(key, confKey.key) && Objects.equals(defaultValue, confKey.defaultValue);
        }

        @Override
        public int hashCode() {
            return Objects.hash(key, defaultValue);
        }
    }
}
