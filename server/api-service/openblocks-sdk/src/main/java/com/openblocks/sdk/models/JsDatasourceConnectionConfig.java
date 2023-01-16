package com.openblocks.sdk.models;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIG_TYPE;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.annotation.Transient;

import com.google.common.base.Preconditions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JsDatasourceConnectionConfig extends HashMap<String, Object> implements DatasourceConnectionConfig {

    @Transient
    private Object definition;
    @Transient
    private String type;

    @SuppressWarnings({"unchecked"})
    private Set<String> getPasswordTypeKeys() {
        Set<String> passwordTypeKeys = new HashSet<>();
        for (Object param : getParams()) {
            if (param instanceof Map map) {
                if ("password".equals(map.get("type"))) {
                    passwordTypeKeys.add(MapUtils.getString(map, "key"));
                }
            }
        }
        return passwordTypeKeys;
    }

    @SuppressWarnings({"unchecked"})
    private Set<String> getAllKeys() {
        Set<String> keys = new HashSet<>();
        for (Object param : getParams()) {
            if (param instanceof Map map) {
                keys.add(MapUtils.getString(map, "key"));
            }
        }
        return keys;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private List<?> getParams() {
        Preconditions.checkNotNull(definition);
        Map<Object, Object> dataSourceConfig = MapUtils.getMap((Map) definition, "dataSourceConfig", new HashMap<>());
        Object paramObject = dataSourceConfig.get("params");
        if (paramObject instanceof List<?> params) {
            return params;
        }
        return Collections.emptyList();
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
        //
        Set<String> allKeys = getAllKeys();
        Set<String> passwordTypeKeys = getPasswordTypeKeys();
        for (String key : allKeys) {
            if (passwordTypeKeys.contains(key)) {
                // use old value if password type.
                newJsDatasourceConnectionConfig.put(key, ObjectUtils.firstNonNull(jsDatasourceConnectionConfig.get(key), this.get(key)));
                continue;
            }
            newJsDatasourceConnectionConfig.put(key, jsDatasourceConnectionConfig.get(key));
        }
        return newJsDatasourceConnectionConfig;
    }

    /**
     * encrypt all password type values
     */
    @Override
    public DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        Set<String> passwordTypeKeys = getPasswordTypeKeys();
        for (Entry<String, Object> entry : this.entrySet()) {
            if (passwordTypeKeys.contains(entry.getKey()) && entry.getValue() instanceof String) {
                this.put(entry.getKey(), encryptFunc.apply((String) entry.getValue()));
            }
        }
        return this;
    }

    /**
     * decrypt all password type values
     */
    @Override
    public DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        Set<String> passwordTypeKeys = getPasswordTypeKeys();
        for (Entry<String, Object> entry : this.entrySet()) {
            if (passwordTypeKeys.contains(entry.getKey()) && entry.getValue() instanceof String) {
                this.put(entry.getKey(), decryptFunc.apply((String) entry.getValue()));
            }
        }
        return this;
    }
}
