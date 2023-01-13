package com.openblocks.sdk.plugin.openblocksapi;

import com.openblocks.sdk.models.DatasourceConnectionConfig;

public class OpenblocksApiDatasourceConfig implements DatasourceConnectionConfig {

    public static final OpenblocksApiDatasourceConfig INSTANCE = new OpenblocksApiDatasourceConfig();

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig detailConfig) {
        return detailConfig;
    }
}
