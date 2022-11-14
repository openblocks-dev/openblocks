package com.openblocks.sdk.config.dynamic;

import java.util.List;
import java.util.Map;

public interface ConfigInstance {

    Conf<Integer> ofInteger(String confKey, int defaultValue);

    Conf<String> ofString(String confKey, String defaultValue);

    Conf<Boolean> ofBoolean(String confKey, boolean defaultValue);

    <T> Conf<T> ofJson(String confKey, Class<T> tClass, T defaultValue);

    <T> Conf<List<T>> ofList(String confKey, List<T> defaultValue, Class<T> tClass);

    Conf<List<String>> ofStringList(String confKey, List<String> defaultValue);

    Conf<List<Integer>> ofIntList(String confKey, List<Integer> defaultValue);

    Conf<List<Long>> ofLongList(String confKey, List<Long> defaultValue);

    <K, V> Conf<Map<K, V>> ofMap(String confKey, Class<K> kClass, Class<V> vClass, Map<K, V> defaultValue);
}
