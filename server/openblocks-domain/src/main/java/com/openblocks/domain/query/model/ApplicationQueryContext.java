package com.openblocks.domain.query.model;

import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.datasource.model.Datasource;

import lombok.Getter;
import reactor.core.publisher.Mono;

@Getter
public class ApplicationQueryContext extends QueryContext {

    private final Mono<ApplicationQuery> applicationQueryMono;

    private final Mono<Application> applicationMono;

    public ApplicationQueryContext(Mono<BaseQuery> baseQueryMono, Mono<Datasource> datasourceMono,
            Mono<ApplicationQuery> applicationQueryMono, Mono<Application> applicationMono) {
        super(baseQueryMono, datasourceMono);
        this.applicationQueryMono = applicationQueryMono;
        this.applicationMono = applicationMono;
    }
}
