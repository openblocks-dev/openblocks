package com.openblocks.domain.datasource.service;

import javax.annotation.Nullable;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceConnectionHolder;

import reactor.core.publisher.Mono;

public interface DatasourceConnectionPool {

    Mono<? extends DatasourceConnectionHolder> getOrCreateConnection(Datasource datasource);

    Object info(@Nullable String datasourceId);
}
