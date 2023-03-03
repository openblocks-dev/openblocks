package com.openblocks.api.authentication.dto;

import static com.openblocks.sdk.util.IDUtils.generate;

import java.util.HashMap;

import javax.annotation.Nullable;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;

public class AuthConfigRequest extends HashMap<String, Object> {

    /**
     * If the current auth config is new, the id should be absent, and we will generate a new one. In other word, if the id is present, the auth
     * config will be updated instead of creating a new one.
     */
    public String getId() {
        return ObjectUtils.firstNonNull(getString("id"), generate());
    }

    public String getAuthType() {
        return getString("authType");
    }

    public boolean isEnableRegister() {
        return MapUtils.getBoolean(this, "enableRegister", true);
    }

    @Nullable
    public String getClientId() {
        return getString("clientId");
    }

    @Nullable
    public String getClientSecret() {
        return getString("clientSecret");
    }

    public String getSource(String defaultValue) {
        String source = getString("source");
        if (StringUtils.isNotBlank(source)) {
            return source;
        }
        return defaultValue;
    }

    public String getSourceName(String defaultValue) {
        String sourceName = getString("sourceName");
        if (StringUtils.isNotBlank(sourceName)) {
            return sourceName;
        }
        return defaultValue;
    }

    public String getString(String key) {
        return MapUtils.getString(this, key);
    }
}
