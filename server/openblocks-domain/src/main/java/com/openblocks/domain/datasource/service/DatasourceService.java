package com.openblocks.domain.datasource.service;

import java.util.List;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.sdk.models.DatasourceTestResult;

import reactor.core.publisher.Mono;

public interface DatasourceService {

    Mono<Datasource> create(Datasource datasource, String creatorId);

    Mono<Datasource> update(String id, Datasource resource);

    Mono<Datasource> getById(String id);

    Mono<Boolean> delete(String id);

    Mono<DatasourceTestResult> testDatasource(Datasource datasource);

    Mono<List<Datasource>> getByOrgId(String orgId);

    Mono<List<Datasource>> getByAppId(String appId);

    Mono<Long> countByOrganizationId(String orgId);

    Mono<Datasource> findSystemPredefinedDatasource(String organizationId, String datasourceType);
}
