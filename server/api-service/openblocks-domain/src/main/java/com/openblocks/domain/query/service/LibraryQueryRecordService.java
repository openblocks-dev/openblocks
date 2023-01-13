package com.openblocks.domain.query.service;

import static com.openblocks.sdk.exception.BizError.LIBRARY_QUERY_NOT_FOUND;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.domain.query.model.LibraryQueryRecord;
import com.openblocks.domain.query.repository.LibraryQueryRecordRepository;

import reactor.core.publisher.Mono;

@Service
public class LibraryQueryRecordService {

    @Autowired
    private LibraryQueryRecordRepository libraryQueryRecordRepository;

    public Mono<LibraryQueryRecord> insert(LibraryQueryRecord libraryQueryRecord) {
        return libraryQueryRecordRepository.save(libraryQueryRecord);
    }

    /**
     * get all published versions
     */
    public Mono<List<LibraryQueryRecord>> getByLibraryQueryId(String libraryQueryId) {
        return libraryQueryRecordRepository.findByLibraryQueryId(libraryQueryId)
                .sort(Comparator.comparing(LibraryQueryRecord::getCreatedAt).reversed())
                .collectList();
    }

    public Mono<Map<String, List<LibraryQueryRecord>>> getByLibraryQueryIdIn(List<String> libraryQueryIdList) {
        return libraryQueryRecordRepository.findByLibraryQueryIdIn(libraryQueryIdList)
                .sort(Comparator.comparing(LibraryQueryRecord::getCreatedAt).reversed())
                .collectList()
                .map(libraryQueryRecords -> libraryQueryRecords.stream()
                        .collect(Collectors.groupingBy(LibraryQueryRecord::getLibraryQueryId)));
    }

    public Mono<LibraryQueryRecord> getById(String id) {
        return libraryQueryRecordRepository.findById(id)
                .switchIfEmpty(deferredError(LIBRARY_QUERY_NOT_FOUND, "LIBRARY_QUERY_NOT_FOUND"));
    }

    /**
     * get the latest published version
     */
    public Mono<LibraryQueryRecord> getLatestRecordByLibraryQueryId(String libraryQueryId) {
        return libraryQueryRecordRepository.findTop1ByLibraryQueryIdOrderByCreatedAtDesc(libraryQueryId);
    }

    public Mono<Long> deleteAllLibraryQueryTagByLibraryQueryId(String libraryQueryId) {
        return libraryQueryRecordRepository.deleteByLibraryQueryId(libraryQueryId);
    }

    public Mono<Void> deleteById(String id) {
        return libraryQueryRecordRepository.deleteById(id);
    }


}
