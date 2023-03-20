package com.openblocks.domain.organization.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.core.type.TypeReference;
import com.openblocks.domain.mongodb.MongodbInterceptorContext;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.util.JsonUtils;

import lombok.Getter;
import lombok.Setter;

public class OrganizationDomain implements EnterpriseConnectionConfig {

    @Getter
    @Setter
    private String domain;

    @Setter
    @Getter
    @Transient
    private List<AbstractAuthConfig> configs = new ArrayList<>();

    /**
     * Only used for mongodb (de)serialization
     */
    private List<Object> authConfigs = new ArrayList<>();

    void beforeMongodbWrite(MongodbInterceptorContext context) {
        this.configs.forEach(authConfig -> authConfig.doEncrypt(s -> context.encryptionService().encryptString(s)));
        authConfigs = JsonUtils.fromJsonSafely(JsonUtils.toJsonSafely(configs, JsonViews.Internal.class), new TypeReference<>() {
        }, new ArrayList<>());
    }

    void afterMongodbRead(MongodbInterceptorContext context) {
        this.configs = JsonUtils.fromJsonSafely(JsonUtils.toJson(authConfigs), new TypeReference<>() {
        }, new ArrayList<>());
        this.configs.forEach(authConfig -> authConfig.doDecrypt(s -> context.encryptionService().decryptString(s)));
    }
}
