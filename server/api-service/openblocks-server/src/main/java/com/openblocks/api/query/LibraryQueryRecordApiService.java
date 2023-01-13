package com.openblocks.api.query;

import static com.openblocks.api.util.ViewBuilder.multiBuild;
import static com.openblocks.sdk.exception.BizError.LIBRARY_QUERY_AND_ORG_NOT_MATCH;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.query.view.LibraryQueryRecordMetaView;
import com.openblocks.api.usermanagement.OrgDevChecker;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.query.model.LibraryQuery;
import com.openblocks.domain.query.model.LibraryQueryCombineId;
import com.openblocks.domain.query.model.LibraryQueryRecord;
import com.openblocks.domain.query.service.LibraryQueryRecordService;
import com.openblocks.domain.query.service.LibraryQueryService;
import com.openblocks.domain.user.service.UserService;

import reactor.core.publisher.Mono;

@Service
public class LibraryQueryRecordApiService {

    @Autowired
    private LibraryQueryService libraryQueryService;

    @Autowired
    private LibraryQueryRecordService libraryQueryRecordService;

    @Autowired
    private LibraryQueryApiService libraryQueryApiService;

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private OrgDevChecker orgDevChecker;

    @Autowired
    private UserService userService;

    public Mono<Map<String, Object>> getRecordDSLFromLibraryQueryCombineId(LibraryQueryCombineId libraryQueryCombineId) {
        return libraryQueryApiService.checkLibraryQueryViewPermission(libraryQueryCombineId.libraryQueryId())
                .then(checkLibraryQueryRecordViewPermission(libraryQueryCombineId))
                .then(Mono.defer(() -> {
                    if (libraryQueryCombineId.isUsingLiveRecord()) {
                        return libraryQueryService.getLiveDSLByLibraryQueryId(libraryQueryCombineId.libraryQueryId());
                    }
                    return libraryQueryRecordService.getById(libraryQueryCombineId.libraryQueryRecordId())
                            .map(LibraryQueryRecord::getLibraryQueryDSL);
                }));
    }

    public Mono<Void> delete(String id) {
        return checkLibraryQueryRecordManagementPermission(id)
                .then(libraryQueryRecordService.deleteById(id));
    }

    public Mono<List<LibraryQueryRecordMetaView>> getByLibraryQueryId(String libraryQueryId) {
        return libraryQueryApiService.checkLibraryQueryManagementPermission(libraryQueryId)
                .then(libraryQueryRecordService.getByLibraryQueryId(libraryQueryId))
                .flatMap(libraryQueryRecords -> multiBuild(libraryQueryRecords,
                        LibraryQueryRecord::getCreatedBy,
                        userService::getByIds,
                        LibraryQueryRecordMetaView::from
                ));
    }


    Mono<Void> checkLibraryQueryRecordManagementPermission(String libraryQueryRecordId) {
        return orgDevChecker.checkCurrentOrgDev()
                .then(sessionUserService.getVisitorOrgMemberCache())
                .zipWith(libraryQueryRecordService.getById(libraryQueryRecordId)
                        .flatMap(libraryQueryRecord -> libraryQueryService.getById(libraryQueryRecord.getLibraryQueryId())))
                .flatMap(tuple2 -> {
                    OrgMember orgMember = tuple2.getT1();
                    LibraryQuery libraryQuery = tuple2.getT2();
                    if (!orgMember.getOrgId().equals(libraryQuery.getOrganizationId())) {
                        return ofError(LIBRARY_QUERY_AND_ORG_NOT_MATCH, "LIBRARY_QUERY_AND_ORG_NOT_MATCH");
                    }
                    return Mono.empty();
                });
    }

    Mono<Void> checkLibraryQueryRecordViewPermission(LibraryQueryCombineId libraryQueryCombineId) {
        return sessionUserService.getVisitorOrgMemberCache()
                .zipWith(Mono.defer(() -> {
                    if (libraryQueryCombineId.isUsingLiveRecord()) {
                        return libraryQueryService.getById(libraryQueryCombineId.libraryQueryId());
                    }
                    return libraryQueryRecordService.getById(libraryQueryCombineId.libraryQueryRecordId())
                            .flatMap(libraryQueryRecord -> libraryQueryService.getById(libraryQueryRecord.getLibraryQueryId()));

                }))
                .flatMap(tuple2 -> {
                    OrgMember orgMember = tuple2.getT1();
                    LibraryQuery libraryQuery = tuple2.getT2();
                    if (!orgMember.getOrgId().equals(libraryQuery.getOrganizationId())) {
                        return ofError(LIBRARY_QUERY_AND_ORG_NOT_MATCH, "LIBRARY_QUERY_AND_ORG_NOT_MATCH");
                    }
                    return Mono.empty();
                });
    }


}
