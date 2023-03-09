package com.openblocks.sdk.models;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIG_TYPE;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;
import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.annotation.Transient;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class JsDatasourceConnectionConfig extends HashMap<String, Object> implements DatasourceConnectionConfig {

    @Transient
    private Object definition;
    @Transient
    private String type;

    public Object getExtra() {
        return this.get("extra");
    }

    @SuppressWarnings({"unchecked"})
    private Set<String> getAllStaticPasswordTypeKeys() {
        Set<String> passwordTypeKeys = new HashSet<>();
        for (Object param : getParamsFromPluginDefinition()) {
            if (param instanceof Map map && "password".equals(map.get("type"))) {
                passwordTypeKeys.add(MapUtils.getString(map, "key"));
            }
        }
        return passwordTypeKeys;
    }

    @SuppressWarnings({"unchecked"})
    private Set<String> getAllStaticKeys() {
        Set<String> keys = new HashSet<>();
        for (Object param : getParamsFromPluginDefinition()) {
            if (param instanceof Map map) {
                keys.add(MapUtils.getString(map, "key"));
            }
        }
        return keys;
    }

    @SuppressWarnings("unchecked")
    private Set<String> getAllDynamicKeys() {
        Set<String> allKeys = new HashSet<>();
        if (this.get("dynamicParamsDef") instanceof List<?> extraParamsDefinitions) {
            for (Object extraParamsDefinition : extraParamsDefinitions) {
                if (extraParamsDefinition instanceof Map map) {
                    allKeys.add(MapUtils.getString(map, "key"));
                }
            }
        }
        return allKeys;
    }

    @SuppressWarnings("unchecked")
    private Set<String> getAllDynamicPasswordTypeKeys() {
        Set<String> allKeys = new HashSet<>();
        if (this.get("dynamicParamsDef") instanceof List<?> extraParamsDefinitions) {
            for (Object extraParamsDefinition : extraParamsDefinitions) {
                if (extraParamsDefinition instanceof Map map && "password".equals(map.get("type"))) {
                    allKeys.add(MapUtils.getString(map, "key"));
                }
            }
        }
        return allKeys;
    }

    @SuppressWarnings("unchecked")
    private Object getDynamicParamsValue(String key) {
        return Optional.ofNullable(MapUtils.getMap(this, "dynamicParamsConfig"))
                .map(map -> MapUtils.getObject((Map<String, Object>) map, key))
                .orElse(null);
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private List<?> getParamsFromPluginDefinition() {
        if (definition == null) {
            log.error("definition is null: {}", type);
            return Collections.emptyList();
        }
        Map<Object, Object> dataSourceConfig = MapUtils.getMap((Map) definition, "dataSourceConfig", new HashMap<>());
        Object paramObject = dataSourceConfig.get("params");
        if (paramObject instanceof List<?> params) {
            return params;
        }
        return Collections.emptyList();
    }

    public void removePasswords() {
        for (String passwordKey : getAllStaticPasswordTypeKeys()) {
            this.remove(passwordKey);
        }
        for (String passwordKey : getAllDynamicPasswordTypeKeys()) {
            if (this.get("dynamicParamsConfig") instanceof Map<?, ?> map) {
                map.remove(passwordKey);
            }
        }
    }

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig detailConfig) {
        if (!(detailConfig instanceof JsDatasourceConnectionConfig jsDatasourceConnectionConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE", detailConfig.getClass().getSimpleName());
        }
        if (!Objects.equals(this.type, jsDatasourceConnectionConfig.type)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE", jsDatasourceConnectionConfig.type);
        }
        JsDatasourceConnectionConfig newJsDatasourceConnectionConfig = new JsDatasourceConnectionConfig();

        //static params
        Set<String> allKeys = getAllStaticKeys();
        Set<String> passwordTypeKeys = getAllStaticPasswordTypeKeys();
        for (String key : allKeys) {
            if (passwordTypeKeys.contains(key)) {
                // use old value if password type.
                newJsDatasourceConnectionConfig.put(key, firstNonNull(jsDatasourceConnectionConfig.get(key), this.get(key)));
                continue;
            }
            newJsDatasourceConnectionConfig.put(key, jsDatasourceConnectionConfig.get(key));
        }

        //dynamic params
        Set<String> allDynamicKeys = getAllDynamicKeys();
        Set<String> allDynamicPasswordTypeKeys = getAllDynamicPasswordTypeKeys();
        Map<String, Object> newDynamicParamsConfig = new HashMap<>();
        for (String key : allDynamicKeys) {
            if (allDynamicPasswordTypeKeys.contains(key)) {
                newDynamicParamsConfig.put(key,
                        firstNonNull(jsDatasourceConnectionConfig.getDynamicParamsValue(key), this.getDynamicParamsValue(key)));
                continue;
            }
            newDynamicParamsConfig.put(key, jsDatasourceConnectionConfig.getDynamicParamsValue(key));
        }
        newJsDatasourceConnectionConfig.put("dynamicParamsConfig", newDynamicParamsConfig);

        //dynamic params definition
        newJsDatasourceConnectionConfig.put("dynamicParamsDef", jsDatasourceConnectionConfig.get("dynamicParamsDef"));

        // For the "extra" field of dynamic data source plugin config, keep it.
        if (this.containsKey("extra") || jsDatasourceConnectionConfig.containsKey("extra")) {
            newJsDatasourceConnectionConfig.putIfAbsent("extra", ObjectUtils.firstNonNull(jsDatasourceConnectionConfig.getExtra(), this.getExtra()));
        }
        return newJsDatasourceConnectionConfig;
    }

    /**
     * encrypt all password type values
     */
    @Override
    public DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        return doEncryptOrDecrypt(encryptFunc);
    }

    /**
     * decrypt all password type values
     */
    @Override
    public DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        return doEncryptOrDecrypt(decryptFunc);
    }

    @SuppressWarnings("unchecked")
    private DatasourceConnectionConfig doEncryptOrDecrypt(Function<String, String> encryptOrDecryptFunc) {
        // encrypt or decrypt static password values
        Set<String> passwordTypeKeys = getAllStaticPasswordTypeKeys();
        for (Entry<String, Object> entry : this.entrySet()) {
            if (passwordTypeKeys.contains(entry.getKey()) && entry.getValue() instanceof String) {
                this.put(entry.getKey(), encryptOrDecryptFunc.apply((String) entry.getValue()));
            }
        }

        // encrypt or decrypt dynamic password values
        Set<String> allDynamicPasswordTypeKeys = getAllDynamicPasswordTypeKeys();
        Map<String, Object> dynamicParamsConfig = (Map<String, Object>) MapUtils.getMap(this, "dynamicParamsConfig", new HashMap<>());
        for (Entry<String, Object> entry : dynamicParamsConfig.entrySet()) {
            if (allDynamicPasswordTypeKeys.contains(entry.getKey()) && entry.getValue() instanceof String) {
                dynamicParamsConfig.put(entry.getKey(), encryptOrDecryptFunc.apply((String) entry.getValue()));
            }
        }

        return this;
    }
}
