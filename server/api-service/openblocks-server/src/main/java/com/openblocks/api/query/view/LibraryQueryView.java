package com.openblocks.api.query.view;

import java.util.Map;

import com.openblocks.domain.query.model.LibraryQuery;
import com.openblocks.domain.user.model.User;

public record LibraryQueryView(String id,
                               String organizationId,
                               String name,
                               Map<String, Object> libraryQueryDSL,
                               long createTime,
                               String creatorName) {

    public static LibraryQueryView from(LibraryQuery libraryQuery, User user) {
        return new LibraryQueryView(libraryQuery.getId(),
                libraryQuery.getOrganizationId(),
                libraryQuery.getName(),
                libraryQuery.getLibraryQueryDSL(),
                libraryQuery.getCreatedAt().toEpochMilli(),
                user.getName());
    }
}
