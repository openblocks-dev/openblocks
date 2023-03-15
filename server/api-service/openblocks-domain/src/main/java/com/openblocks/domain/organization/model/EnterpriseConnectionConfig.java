package com.openblocks.domain.organization.model;

import java.util.List;

import com.openblocks.sdk.auth.AbstractAuthConfig;

public interface EnterpriseConnectionConfig {

    List<AbstractAuthConfig> getConfigs();
}
