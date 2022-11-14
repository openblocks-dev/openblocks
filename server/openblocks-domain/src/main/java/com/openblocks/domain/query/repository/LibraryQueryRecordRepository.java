package com.openblocks.domain.query.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.query.model.LibraryQueryRecord;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface LibraryQueryRecordRepository extends ReactiveMongoRepository<LibraryQueryRecord, String> {

    Mono<Long> deleteByLibraryQueryId(String libraryQueryId);

    Flux<LibraryQueryRecord> findByLibraryQueryId(String libraryQueryId);

    Flux<LibraryQueryRecord> findByLibraryQueryIdIn(List<String> ids);

    Mono<LibraryQueryRecord> findTop1ByLibraryQueryIdOrderByCreatedAtDesc(String libraryQueryId);

}
