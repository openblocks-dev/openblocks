package com.openblocks.api.authentication.service.factory;

import java.util.Set;

import com.openblocks.api.authentication.dto.AuthConfigRequest;
import com.openblocks.sdk.auth.AbstractAuthConfig;

public interface AuthConfigFactory {

    AbstractAuthConfig build(AuthConfigRequest authConfigRequest, boolean enable);

    Set<String> supportAuthTypes();
}
