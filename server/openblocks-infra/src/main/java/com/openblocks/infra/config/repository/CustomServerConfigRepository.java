package com.openblocks.infra.config.repository;

import com.openblocks.infra.config.model.ServerConfig;

import reactor.core.publisher.Mono;

interface CustomServerConfigRepository {

    Mono<ServerConfig> upsert(String key, Object value);
}
