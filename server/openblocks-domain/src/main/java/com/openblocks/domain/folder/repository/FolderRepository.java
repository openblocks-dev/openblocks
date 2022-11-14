package com.openblocks.domain.folder.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.folder.model.Folder;

import reactor.core.publisher.Flux;

@Repository
public interface FolderRepository extends ReactiveMongoRepository<Folder, String> {

    Flux<Folder> findByOrganizationId(String organizationId);
}
