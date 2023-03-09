package com.openblocks.domain.user.repository;

import java.util.Collection;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.user.model.User;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveMongoRepository<User, String> {

    Flux<User> findByIdIn(Collection<String> ids);

    Mono<User> findByConnections_SourceAndConnections_RawId(String source, String rawId);

    Flux<User> findByConnections_SourceAndConnections_RawIdIn(String source, Collection<String> rawIds);

}
