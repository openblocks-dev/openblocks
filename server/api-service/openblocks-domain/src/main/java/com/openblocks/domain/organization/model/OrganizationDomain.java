package com.openblocks.domain.organization.model;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import com.openblocks.sdk.auth.AbstractAuthConfig;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrganizationDomain implements EnterpriseConnectionConfig {

    private String domain;
    private List<AbstractAuthConfig> authConfigs;

    @Override
    public List<AbstractAuthConfig> getAuthConfigs() {
        if (authConfigs == null) {
            authConfigs = new ArrayList<>();
        }
        return authConfigs;
    }

    OrganizationDomain doEncrypt(Function<String, String> encryptFunc) {
        getAuthConfigs().forEach(authConfig -> authConfig.doEncrypt(encryptFunc));
        return this;
    }

    OrganizationDomain doDecrypt(Function<String, String> decryptFunc) {
        getAuthConfigs().forEach(authConfig -> authConfig.doDecrypt(decryptFunc));
        return this;
    }
}
