package com.openblocks.domain.datasource.service.impl;

import org.springframework.stereotype.Service;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceConnectionHolder;
import com.openblocks.domain.datasource.model.StatelessDatasourceConnectionHolder;
import com.openblocks.domain.datasource.service.DatasourceConnectionPool;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class StatelessConnectionPool implements DatasourceConnectionPool {

    @Override
    public Mono<? extends DatasourceConnectionHolder> getOrCreateConnection(Datasource datasource) {
        return Mono.just(new StatelessDatasourceConnectionHolder());
    }

    @Override
    public Object info(String datasourceId) {
        throw new UnsupportedOperationException();
    }
}

