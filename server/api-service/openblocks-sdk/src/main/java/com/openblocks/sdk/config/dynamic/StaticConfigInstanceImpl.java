package com.openblocks.sdk.config.dynamic;

import java.util.List;
import java.util.Map;

public class StaticConfigInstanceImpl implements ConfigInstance {

    private final Map<String, Object> overrideKeyValues;

    public StaticConfigInstanceImpl(Map<String, Object> overrideKeyValues) {
        this.overrideKeyValues = overrideKeyValues;
    }

    @Override
    public Conf<Integer> ofInteger(String confKey, int defaultValue) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }

    @Override
    public Conf<String> ofString(String confKey, String defaultValue) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }

    @Override
    public Conf<Boolean> ofBoolean(String confKey, boolean defaultValue) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }

    @Override
    public <T> Conf<T> ofJson(String confKey, Class<T> tClass, T defaultValue) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }

    @Override
    public <T> Conf<List<T>> ofList(String confKey, List<T> defaultValue, Class<T> tClass) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }

    @Override
    public Conf<List<String>> ofStringList(String confKey, List<String> defaultValue) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }

    @Override
    public Conf<List<Integer>> ofIntList(String confKey, List<Integer> defaultValue) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }

    @Override
    public Conf<List<Long>> ofLongList(String confKey, List<Long> defaultValue) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }

    @Override
    public <K, V> Conf<Map<K, V>> ofMap(String confKey, Class<K> kClass, Class<V> vClass, Map<K, V> defaultValue) {
        return new StaticConf<>(defaultValue, confKey, overrideKeyValues);
    }
}
