package com.openblocks.domain.material.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.material.model.MaterialMeta;
import com.openblocks.domain.material.model.MaterialType;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface MaterialMateRepository extends ReactiveMongoRepository<MaterialMeta, String> {

    Flux<MaterialMeta> findByOrgId(String orgId);

    Flux<MaterialMeta> findByOrgIdAndType(String orgId, MaterialType type);

    Flux<MaterialMeta> findByOrgIdAndFilenameAndType(String orgId, String filename, MaterialType type);

    Mono<Boolean> existsByOrgIdAndFilename(String orgId, String filename);
}
