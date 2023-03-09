package com.openblocks.domain.authentication;

import javax.annotation.Nullable;

import com.openblocks.domain.organization.model.Organization;
import com.openblocks.sdk.auth.AbstractAuthConfig;

public record FindAuthConfig(AbstractAuthConfig authConfig, @Nullable Organization organization) {
}