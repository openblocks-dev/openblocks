package com.openblocks.sdk.config.dynamic;

import java.util.Map;

public class StaticConf<T> implements Conf<T> {

    private final T value;
    private final String confKey;
    private final Map<String, Object> overrideKeyValues;

    public StaticConf(T value, String confKey, Map<String, Object> overrideKeyValues) {
        this.value = value;
        this.confKey = confKey;
        this.overrideKeyValues = overrideKeyValues;
    }

    @SuppressWarnings("unchecked")
    @Override
    public T get() {
        Object overrideValue = overrideKeyValues.get(confKey);
        return overrideValue != null ? (T) overrideValue : value;
    }
}
