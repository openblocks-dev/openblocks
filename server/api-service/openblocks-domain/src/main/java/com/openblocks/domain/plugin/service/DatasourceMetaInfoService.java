package com.openblocks.domain.plugin.service;

import java.util.List;
import java.util.Map;

import com.openblocks.domain.plugin.DatasourceMetaInfo;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.plugin.common.DatasourceConnector;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.query.QueryExecutionContext;

import reactor.core.publisher.Flux;

public interface DatasourceMetaInfoService {

    DatasourceMetaInfo getDatasourceMetaInfo(String datasourceType);

    /**
     * java based data sources only
     */
    List<DatasourceMetaInfo> getJavaBasedSupportedDatasourceMetaInfos();

    boolean isJavaDatasourcePlugin(String type);

    boolean isJsDatasourcePlugin(String type);

    /**
     * all data sources, include java based, js based...
     */
    Flux<DatasourceMetaInfo> getAllSupportedDatasourceMetaInfos();

    DatasourceConnector<Object, ? extends DatasourceConnectionConfig> getDatasourceConnector(String datasourceType);

    QueryExecutor<? extends DatasourceConnectionConfig, Object, ? extends QueryExecutionContext> getQueryExecutor(String datasourceType);

    DatasourceConnectionConfig resolveDetailConfig(Map<String, Object> datasourceDetailMap, String datasourceType);
}
