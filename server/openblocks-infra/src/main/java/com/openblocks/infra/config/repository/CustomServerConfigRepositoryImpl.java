package com.openblocks.infra.config.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.openblocks.infra.config.model.ServerConfig;
import com.openblocks.infra.mongo.MongoUpsertHelper;

import reactor.core.publisher.Mono;

@Repository
class CustomServerConfigRepositoryImpl implements CustomServerConfigRepository {

    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;

    @Override
    public Mono<ServerConfig> upsert(String key, Object value) {
        ServerConfig newConfig = ServerConfig.builder()
                .key(key)
                .value(value)
                .build();
        return mongoUpsertHelper.upsertWithAuditingParams(newConfig, "key", key);
    }
}
