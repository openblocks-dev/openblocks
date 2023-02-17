package com.openblocks.domain.group.repository;

import java.util.Collection;

import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.group.model.Group;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface GroupRepository extends ReactiveMongoRepository<Group, String> {

    Flux<Group> findByIdIn(Collection<String> id);

    Flux<Group> findByOrganizationId(String organizationId);

    Mono<Long> countByOrganizationId(@NotNull String organizationId);

    Mono<Group> findByOrganizationIdAndAllUsersGroup(String organizationId, boolean allUsersGroup);

    Mono<Group> findByOrganizationIdAndType(String organizationId, String type);

    Flux<Group> findBySourceAndOrganizationId(String source, String organizationId);
}

