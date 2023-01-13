package com.openblocks.sdk.config.dynamic;

import java.util.Collections;
import java.util.Map;

import com.google.common.annotations.VisibleForTesting;

@VisibleForTesting
public class ConfigCenterForTest implements ConfigCenter {

    private Map<String, Object> overrideKeyValues = Collections.emptyMap();

    public ConfigCenterForTest(Map<String, Object> overrideKeyValues) {
        this.overrideKeyValues = overrideKeyValues;
    }

    public ConfigCenterForTest() {
    }

    @Override
    public ConfigInstance asset() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance mysqlPlugin() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance clickHousePlugin() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance mongoPlugin() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance postgresPlugin() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance oraclePlugin() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance threshold() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance proxy() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance auth() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance datasource() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance deployment() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }

    @Override
    public ConfigInstance application() {
        return new StaticConfigInstanceImpl(overrideKeyValues);
    }
}
