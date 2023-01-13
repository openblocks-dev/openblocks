package com.openblocks.sdk.config.dynamic;

import java.util.List;
import java.util.Map;

public record ConfigInstanceHelper(ConfigInstance configInstance) {

    public int ofInteger(String confKey, int defaultValue) {
        return configInstance.ofInteger(confKey, defaultValue).get();
    }

    public long ofLong(String confKey, long defaultValue) {
        return configInstance.ofJson(confKey, Long.class, defaultValue).get();
    }

    public String ofString(String confKey, String defaultValue) {
        return configInstance.ofString(confKey, defaultValue).get();
    }

    public boolean ofBoolean(String confKey, boolean defaultValue) {
        return configInstance.ofBoolean(confKey, defaultValue).get();
    }

    public <T> T ofJson(String confKey, Class<T> tClass, T defaultValue) {
        return configInstance.ofJson(confKey, tClass, defaultValue).get();
    }

    public <T> List<T> ofList(String confKey, List<T> defaultValue, Class<T> tClass) {
        return configInstance.ofList(confKey, defaultValue, tClass).get();
    }

    public List<String> ofStringList(String confKey, List<String> defaultValue) {
        return configInstance.ofStringList(confKey, defaultValue).get();
    }

    public List<Integer> ofIntList(String confKey, List<Integer> defaultValue) {
        return configInstance.ofIntList(confKey, defaultValue).get();
    }

    public List<Long> ofLongList(String confKey, List<Long> defaultValue) {
        return configInstance.ofLongList(confKey, defaultValue).get();
    }

    public <K, V> Map<K, V> ofMap(String confKey, Class<K> kClass, Class<V> vClass, Map<K, V> defaultValue) {
        return configInstance.ofMap(confKey, kClass, vClass, defaultValue).get();
    }
}
