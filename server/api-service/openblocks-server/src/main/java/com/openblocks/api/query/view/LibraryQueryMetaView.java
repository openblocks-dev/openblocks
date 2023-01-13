package com.openblocks.api.query.view;

import com.openblocks.domain.query.model.LibraryQuery;
import com.openblocks.domain.user.model.User;

public record LibraryQueryMetaView(String id,
                                   String datasourceType,
                                   String organizationId,
                                   String name,
                                   long createTime,
                                   String creatorName) {

    public static LibraryQueryMetaView from(LibraryQuery libraryQuery, User user) {
        return new LibraryQueryMetaView(libraryQuery.getId(),
                libraryQuery.getQuery().getCompType(),
                libraryQuery.getOrganizationId(),
                libraryQuery.getName(),
                libraryQuery.getCreatedAt().toEpochMilli(),
                user.getName());
    }
}
