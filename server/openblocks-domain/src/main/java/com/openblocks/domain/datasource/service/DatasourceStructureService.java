package com.openblocks.domain.datasource.service;

import com.openblocks.sdk.models.DatasourceStructure;

import reactor.core.publisher.Mono;

public interface DatasourceStructureService {

    Mono<DatasourceStructure> getStructure(String datasourceId, boolean ignoreCache);

}

