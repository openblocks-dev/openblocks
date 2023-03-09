package com.openblocks.domain.datasource.service.impl;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_GET_STRUCTURE_ERROR;

import java.time.Duration;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceStructureDO;
import com.openblocks.domain.datasource.repository.DatasourceStructureRepository;
import com.openblocks.domain.datasource.service.DatasourceConnectionPool;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.datasource.service.DatasourceStructureService;
import com.openblocks.domain.plugin.DatasourceMetaInfo;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.infra.mongo.MongoUpsertHelper;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class DatasourceStructureServiceImpl implements DatasourceStructureService {

    @Autowired
    private CommonConfig commonConfig;

    @Autowired
    private DatasourceService datasourceService;
    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;
    @Autowired
    private DatasourceConnectionPool connectionContextService;
    @Autowired
    private DatasourceStructureRepository datasourceStructureRepository;
    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;

    public Mono<DatasourceStructure> getStructure(String datasourceId, boolean ignoreCache) {
        return getStructure0(datasourceId, ignoreCache)
                .defaultIfEmpty(new DatasourceStructure())
                .onErrorMap(e -> {
                    if (e instanceof PluginException) {
                        return e;
                    }

                    return new PluginException(DATASOURCE_GET_STRUCTURE_ERROR,
                            "DATASOURCE_GET_STRUCTURE_ERROR", e.getMessage());
                });
    }

    private Mono<DatasourceStructure> getStructure0(String datasourceId, boolean ignoreCache) {
        if (ignoreCache) {
            return getLatestAndSave(datasourceId);
        }

        return getFromCache(datasourceId)
                .switchIfEmpty(Mono.defer(() -> getLatestAndSave(datasourceId)));
    }

    @SuppressWarnings("ConstantConditions")
    private Mono<DatasourceStructure> getLatestAndSave(String datasourceId) {
        return datasourceService.getById(datasourceId)
                .flatMap(datasource -> {
                    DatasourceMetaInfo metaInfo = datasourceMetaInfoService.getDatasourceMetaInfo(datasource.getType());
                    if (!metaInfo.isHasStructureInfo()) {
                        return Mono.empty();
                    }

                    var queryExecutor = datasourceMetaInfoService.getQueryExecutor(datasource.getType());
                    return getLatestStructure(datasource, queryExecutor)
                            .flatMap(structure -> saveStructure(datasource.getId(), structure));
                });
    }

    private Mono<DatasourceStructure> getFromCache(String datasourceId) {
        return datasourceStructureRepository.findByDatasourceId(datasourceId)
                .map(DatasourceStructureDO::getStructure);
    }

    private Mono<DatasourceStructure> saveStructure(String datasourceId, DatasourceStructure structure) {
        DatasourceStructureDO dataModel = new DatasourceStructureDO();
        dataModel.setDatasourceId(datasourceId);
        dataModel.setStructure(structure);
        return mongoUpsertHelper.upsertWithAuditingParams(dataModel, "datasourceId", datasourceId)
                .thenReturn(structure);
    }

    private Mono<DatasourceStructure> getLatestStructure(Datasource datasource,
            QueryExecutor<? extends DatasourceConnectionConfig, Object, ? extends QueryExecutionContext> queryExecutor) {

        long readStructureTimeout = commonConfig.getQuery().getReadStructureTimeout();
        return connectionContextService.getOrCreateConnection(datasource)
                .flatMap(connectionContext -> queryExecutor.doGetStructure(connectionContext.connection(), datasource.getDetailConfig())
                        .timeout(Duration.ofMillis(readStructureTimeout))
                        .doOnError(connectionContext::onQueryError)
                        .onErrorMap(TimeoutException.class, e -> new BizException(BizError.PLUGIN_EXECUTION_TIMEOUT, "PLUGIN_EXECUTION_TIMEOUT",
                                readStructureTimeout))
                )
                .onErrorMap(e -> {
                    if (e instanceof PluginException) {
                        return e;
                    }
                    log.error("get datasource structure error", e);
                    return new PluginException(DATASOURCE_GET_STRUCTURE_ERROR, "DATASOURCE_GET_STRUCTURE_ERROR", e.getMessage());
                });
    }

}
