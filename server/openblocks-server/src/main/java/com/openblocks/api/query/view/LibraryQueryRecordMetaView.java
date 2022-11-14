package com.openblocks.api.query.view;

import com.openblocks.domain.query.model.LibraryQueryRecord;
import com.openblocks.domain.user.model.User;

public record LibraryQueryRecordMetaView(String id,
                                         String libraryQueryId,
                                         String datasourceType,
                                         String tag,
                                         String commitMessage,
                                         long createTime,
                                         String creatorName) {

    public static LibraryQueryRecordMetaView from(LibraryQueryRecord libraryQueryRecord) {
        return new LibraryQueryRecordMetaView(libraryQueryRecord.getId(),
                libraryQueryRecord.getLibraryQueryId(),
                libraryQueryRecord.getQuery().getCompType(),
                libraryQueryRecord.getTag(),
                libraryQueryRecord.getCommitMessage(),
                libraryQueryRecord.getCreatedAt().toEpochMilli(),
                null);
    }

    public static LibraryQueryRecordMetaView from(LibraryQueryRecord libraryQueryRecord, User libraryQueryRecordCreator) {
        return new LibraryQueryRecordMetaView(libraryQueryRecord.getId(),
                libraryQueryRecord.getLibraryQueryId(),
                libraryQueryRecord.getQuery().getCompType(),
                libraryQueryRecord.getTag(),
                libraryQueryRecord.getCommitMessage(),
                libraryQueryRecord.getCreatedAt().toEpochMilli(),
                libraryQueryRecordCreator.getName());
    }
}
