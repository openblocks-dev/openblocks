package com.openblocks.domain.query.service;

import static com.openblocks.sdk.exception.BizError.LIBRARY_QUERY_NOT_FOUND;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.domain.query.model.BaseQuery;
import com.openblocks.domain.query.model.LibraryQuery;
import com.openblocks.domain.query.model.LibraryQueryRecord;
import com.openblocks.domain.query.repository.LibraryQueryRepository;
import com.openblocks.infra.mongo.MongoUpsertHelper;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class LibraryQueryService {

    @Autowired
    private LibraryQueryRepository libraryQueryRepository;

    @Autowired
    private LibraryQueryRecordService libraryQueryRecordService;

    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;

    public Mono<LibraryQuery> getById(String libraryQueryId) {
        return libraryQueryRepository.findById(libraryQueryId)
                .switchIfEmpty(deferredError(LIBRARY_QUERY_NOT_FOUND, "LIBRARY_QUERY_NOT_FOUND"));
    }

    public Mono<LibraryQuery> getByName(String libraryQueryName) {
        return libraryQueryRepository.findByName(libraryQueryName)
                .switchIfEmpty(deferredError(LIBRARY_QUERY_NOT_FOUND, "LIBRARY_QUERY_NOT_FOUND"));
    }

    public Flux<LibraryQuery> getByOrganizationId(String organizationId) {
        return libraryQueryRepository.findByOrganizationId(organizationId);
    }

    public Mono<LibraryQuery> insert(LibraryQuery libraryQuery) {
        return libraryQueryRepository.save(libraryQuery);
    }

    public Mono<Boolean> update(String libraryQueryId, LibraryQuery libraryQuery) {
        return mongoUpsertHelper.updateById(libraryQuery, libraryQueryId);
    }

    public Mono<Void> delete(String libraryQueryId) {
        return libraryQueryRepository.deleteById(libraryQueryId);
    }

    public Mono<BaseQuery> getEditingBaseQueryByLibraryQueryId(String libraryQueryId) {
        return getById(libraryQueryId).map(LibraryQuery::getQuery);
    }

    public Mono<BaseQuery> getLiveBaseQueryByLibraryQueryId(String libraryQueryId) {
        return libraryQueryRecordService.getLatestRecordByLibraryQueryId(libraryQueryId)
                .map(LibraryQueryRecord::getQuery)
                .switchIfEmpty(getById(libraryQueryId)
                        .map(LibraryQuery::getQuery));
    }

    public Mono<Map<String, Object>> getLiveDSLByLibraryQueryId(String libraryQueryId) {
        return libraryQueryRecordService.getLatestRecordByLibraryQueryId(libraryQueryId)
                .map(LibraryQueryRecord::getLibraryQueryDSL)
                .switchIfEmpty(getById(libraryQueryId)
                        .map(LibraryQuery::getLibraryQueryDSL));
    }
}
