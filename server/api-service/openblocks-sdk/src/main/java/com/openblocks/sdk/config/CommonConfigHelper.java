package com.openblocks.sdk.config;

import org.springframework.stereotype.Component;

import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.config.dynamic.ConfigInstanceHelper;

@Component
public class CommonConfigHelper {

    private final CommonConfig commonConfig;
    private final ConfigInstanceHelper configInstanceHelper;

    public CommonConfigHelper(CommonConfig commonConfig, ConfigCenter configCenter) {
        this.commonConfig = commonConfig;
        this.configInstanceHelper = new ConfigInstanceHelper(configCenter.deployment());
    }

    public String getHost() {
        return configInstanceHelper.ofString("js-executor.host", commonConfig.getJsExecutor().getHost());
    }
}
