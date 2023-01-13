package com.openblocks.infra.config.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.infra.config.model.ServerConfig;

import reactor.core.publisher.Mono;

@VisibleForTesting
public interface ServerConfigRepository extends ReactiveMongoRepository<ServerConfig, String>, CustomServerConfigRepository {

    Mono<ServerConfig> findByKey(String key);

}
