package com.openblocks.impl.mock;

import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;

import com.openblocks.domain.plugin.DatasourceMetaInfo;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.plugin.common.DatasourceConnector;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.query.QueryExecutionContext;

public class MockDatasourceMetaInfoService implements DatasourceMetaInfoService {

    MockDatasourceConnector mockDatasourceConnectionFactory = new MockDatasourceConnector();

    @Override
    public List<DatasourceMetaInfo> getJavaBasedSupportedDatasourceMetaInfos() {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isJavaDatasourcePlugin(String type) {
        return false;
    }

    @Override
    public boolean isJsDatasourcePlugin(String type) {
        return false;
    }

    @Override
    public Flux<DatasourceMetaInfo> getAllSupportedDatasourceMetaInfos() {
        return null;
    }

    @Override
    public DatasourceMetaInfo getDatasourceMetaInfo(String datasourceType) {
        throw new UnsupportedOperationException();
    }


    @Override
    @SuppressWarnings({"unchecked", "rawtypes"})
    public DatasourceConnector<Object, ? extends DatasourceConnectionConfig> getDatasourceConnector(String datasourceMetaInfo) {
        return (DatasourceConnector) mockDatasourceConnectionFactory;
    }

    @Override
    public QueryExecutor<? extends DatasourceConnectionConfig, Object, ? extends QueryExecutionContext> getQueryExecutor(String datasourceMetaInfo) {
        throw new UnsupportedOperationException();
    }

    @Override
    public DatasourceConnectionConfig resolveDetailConfig(Map<String, Object> datasourceDetailMap, String datasourceMetaInfo) {
        throw new UnsupportedOperationException();
    }

}
