package com.openblocks.domain.datasource.repository;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.openblocks.domain.datasource.model.DatasourceStructureDO;

import reactor.core.publisher.Mono;

public interface DatasourceStructureRepository extends ReactiveMongoRepository<DatasourceStructureDO, String> {

    Mono<DatasourceStructureDO> findByDatasourceId(String datasourceId);

}
