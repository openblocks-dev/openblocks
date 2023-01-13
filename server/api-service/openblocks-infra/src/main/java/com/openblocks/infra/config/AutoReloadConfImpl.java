package com.openblocks.infra.config;

import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.util.function.Function;

import org.apache.commons.lang3.StringUtils;

import com.openblocks.sdk.config.dynamic.Conf;

class AutoReloadConfImpl<T> implements Conf<T> {

    private final String confKey;
    private final T defaultValue;
    private final Function<String, T> valueResolver;
    private final AutoReloadConfigFactory autoReloadConfigFactory;

    private volatile String previousStrValue;
    private volatile T currentValue;

    public AutoReloadConfImpl(String confKey, T defaultValue,
            AutoReloadConfigFactory autoReloadConfigFactory,
            Function<String, T> strValueResolver) {
        this.confKey = confKey;
        this.defaultValue = defaultValue;
        this.autoReloadConfigFactory = autoReloadConfigFactory;
        this.valueResolver = strValueResolver;
    }

    @Override
    public T get() {
        String currentStrValue = autoReloadConfigFactory.getValue(confKey);
        if (currentStrValue == null) {
            return defaultValue;
        }

        if (StringUtils.equals(previousStrValue, currentStrValue)) {
            return firstNonNull(currentValue, defaultValue);
        }

        previousStrValue = currentStrValue;
        try {
            currentValue = valueResolver.apply(currentStrValue);
            return firstNonNull(currentValue, defaultValue);
        } catch (Exception e) {
            return defaultValue;
        }
    }

}
