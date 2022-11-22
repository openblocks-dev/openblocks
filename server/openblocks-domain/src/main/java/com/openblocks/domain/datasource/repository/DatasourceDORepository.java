package com.openblocks.domain.datasource.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.openblocks.domain.datasource.model.DatasourceDO;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface DatasourceDORepository extends ReactiveMongoRepository<DatasourceDO, String> {

    Flux<DatasourceDO> findAllByOrganizationId(String organizationId);

    Mono<DatasourceDO> findByOrganizationIdAndTypeAndCreationSource(String organizationId, String type, int creationSource);

    Mono<Long> countByOrganizationId(String organizationId);
}
