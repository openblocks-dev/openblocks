package com.openblocks.infra.config;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.config.dynamic.ConfigInstance;

@Component
public class ConfigCenterImpl implements ConfigCenter {

    @Autowired
    private ConfigInstance delegateConfigInstance;

    private final ConcurrentHashMap<String, ForwardingConfigInstance> instanceMap = new ConcurrentHashMap<>();

    private ConfigInstance getInstance(String bizKey) {
        return instanceMap.computeIfAbsent(bizKey, s -> new ForwardingConfigInstance(s, delegateConfigInstance));
    }

    @Override
    public ConfigInstance asset() {
        return getInstance("asset");
    }

    @Override
    public ConfigInstance mysqlPlugin() {
        return getInstance("mysqlPlugin");
    }

    @Override
    public ConfigInstance clickHousePlugin() {
        return new ForwardingConfigInstance("clickHousePlugin", delegateConfigInstance);
    }

    @Override
    public ConfigInstance mongoPlugin() {
        return getInstance("mongoPlugin");
    }

    @Override
    public ConfigInstance postgresPlugin() {
        return getInstance("postgresPlugin");
    }

    @Override
    public ConfigInstance oraclePlugin() {
        return getInstance("oraclePlugin");
    }

    @Override
    public ConfigInstance threshold() {
        return getInstance("threshold");
    }

    @Override
    public ConfigInstance proxy() {
        return getInstance("proxy");
    }

    @Override
    public ConfigInstance auth() {
        return getInstance("auth");
    }

    @Override
    public ConfigInstance datasource() {
        return getInstance("datasource");
    }

    @Override
    public ConfigInstance deployment() {
        return getInstance("deployment");
    }

    @Override
    public ConfigInstance application() {
        return getInstance("application");
    }

    private record ForwardingConfigInstance(String bizKey, ConfigInstance delegateConfigInstance) implements ConfigInstance {

        @Override
        public Conf<Integer> ofInteger(String confKey, int defaultValue) {
            return delegateConfigInstance.ofInteger(bizKey + "." + confKey, defaultValue);
        }

        @Override
        public Conf<String> ofString(String confKey, String defaultValue) {
            return delegateConfigInstance.ofString(bizKey + "." + confKey, defaultValue);
        }

        @Override
        public Conf<Boolean> ofBoolean(String confKey, boolean defaultValue) {
            return delegateConfigInstance.ofBoolean(bizKey + "." + confKey, defaultValue);
        }

        @Override
        public <T> Conf<T> ofJson(String confKey, Class<T> tClass, T defaultValue) {
            return delegateConfigInstance.ofJson(bizKey + "." + confKey, tClass, defaultValue);
        }

        @Override
        public <T> Conf<List<T>> ofList(String confKey, List<T> defaultValue, Class<T> tClass) {
            return delegateConfigInstance.ofList(bizKey + "." + confKey, defaultValue, tClass);
        }

        @Override
        public Conf<List<String>> ofStringList(String confKey, List<String> defaultValue) {
            return delegateConfigInstance.ofStringList(bizKey + "." + confKey, defaultValue);
        }

        @Override
        public Conf<List<Integer>> ofIntList(String confKey, List<Integer> defaultValue) {
            return delegateConfigInstance.ofIntList(bizKey + "." + confKey, defaultValue);
        }

        @Override
        public Conf<List<Long>> ofLongList(String confKey, List<Long> defaultValue) {
            return delegateConfigInstance.ofLongList(bizKey + "." + confKey, defaultValue);
        }

        @Override
        public <K, V> Conf<Map<K, V>> ofMap(String confKey, Class<K> kClass, Class<V> vClass, Map<K, V> defaultValue) {
            return delegateConfigInstance.ofMap(bizKey + "." + confKey, kClass, vClass, defaultValue);
        }
    }
}
