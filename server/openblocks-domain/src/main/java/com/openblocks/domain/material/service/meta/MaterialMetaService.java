package com.openblocks.domain.material.service.meta;

import com.openblocks.domain.material.model.MaterialMeta;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MaterialMetaService {

    Mono<MaterialMeta> create(MaterialMeta resource);

    Mono<MaterialMeta> findById(String id);

    Mono<Boolean> existsByOrgIdAndFilename(String orgId, String filename);

    Mono<Long> totalSize(String orgId);

    Flux<MaterialMeta> getByOrgId(String orgId);

    Mono<Void> deleteById(String id);
}
