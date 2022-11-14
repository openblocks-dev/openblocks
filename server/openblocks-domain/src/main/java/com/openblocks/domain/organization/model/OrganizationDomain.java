package com.openblocks.domain.organization.model;

import java.util.List;
import java.util.function.Function;

import org.apache.commons.collections4.ListUtils;

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
        return ListUtils.emptyIfNull(this.authConfigs);
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
