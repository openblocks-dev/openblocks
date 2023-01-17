package com.openblocks.impl.mock;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

public record MockDatasourceConnectionConfig(Datasource datasource) implements DatasourceConnectionConfig {

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig detailConfig) {
        throw new UnsupportedOperationException();
    }
}
