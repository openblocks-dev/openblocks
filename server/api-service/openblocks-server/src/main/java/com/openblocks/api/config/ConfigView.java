package com.openblocks.api.config;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.constants.WorkspaceMode;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class ConfigView {

    private boolean isCloudHosting;
    private List<AbstractAuthConfig> authConfigs;
    private WorkspaceMode workspaceMode;
    private boolean selfDomain;
    private String cookieName;
}
