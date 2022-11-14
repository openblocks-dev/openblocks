package com.openblocks.domain.datasource.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.openblocks.domain.datasource.model.TokenBasedConnectionDO;

import reactor.core.publisher.Mono;


public interface TokenBasedConnectionDORepository extends ReactiveMongoRepository<TokenBasedConnectionDO, String> {

    Mono<TokenBasedConnectionDO> findByDatasourceId(String datasourceId);
}
