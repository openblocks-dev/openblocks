package com.openblocks.sdk.auth;

import java.util.function.Function;

import javax.annotation.Nullable;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.ObjectUtils;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonTypeInfo(use = Id.NAME, property = "authType", visible = true)
public abstract class AbstractAuthConfig {

    protected String id;
    /**
     * here source should be unique for every authentication source. e.g., the google oauth2, the gitHub oauth2, or cas-sso of an org.
     */
    protected String source;
    protected String sourceName;

    protected Boolean enable;
    protected Boolean enableRegister;

    protected String authType;

    protected AbstractAuthConfig(@Nullable String id, String source, String sourceName, Boolean enable, Boolean enableRegister, String authType) {
        this.id = id;
        this.source = source;
        this.sourceName = sourceName;
        this.enable = enable;
        this.enableRegister = enableRegister;
        this.authType = authType;
    }

    /**
     * For the authentication configuration stored in the mongodb, an uuid will be generated and stored with.
     * For the authentication configuration stored in the yaml, just use the source for now.
     */
    public String getId() {
        return ObjectUtils.firstNonNull(id, source);
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public final boolean isEnable() {
        return BooleanUtils.isTrue(enable);
    }

    public final boolean isEnableRegister() {
        return BooleanUtils.isTrue(enableRegister);
    }

    public final String getAuthType() {
        return this.authType;
    }

    public void doEncrypt(Function<String, String> encryptFunc) {
    }

    public void doDecrypt(Function<String, String> decryptFunc) {
    }

    public void merge(AbstractAuthConfig oldConfig) {
    }
}
