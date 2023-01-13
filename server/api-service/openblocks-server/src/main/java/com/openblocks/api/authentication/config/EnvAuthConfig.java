package com.openblocks.api.authentication.config;

import java.util.List;

import org.apache.commons.collections4.ListUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.domain.organization.model.EnterpriseConnectionConfig;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.config.AuthProperties;

@Component
public class EnvAuthConfig implements EnterpriseConnectionConfig {

    @Autowired
    private AuthProperties authProperties;

    @Override
    public List<AbstractAuthConfig> getAuthConfigs() {
        return ListUtils.emptyIfNull(authProperties.getAuthConfigs());
    }
}
