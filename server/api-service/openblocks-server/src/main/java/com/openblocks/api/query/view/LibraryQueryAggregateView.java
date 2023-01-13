package com.openblocks.api.query.view;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.openblocks.domain.query.model.LibraryQuery;
import com.openblocks.domain.query.model.LibraryQueryRecord;
import com.openblocks.domain.user.model.User;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record LibraryQueryAggregateView(LibraryQueryMetaView libraryQueryMetaView,
                                        List<LibraryQueryRecordMetaView> recordMetaViewList) {

    public static LibraryQueryAggregateView from(LibraryQuery libraryQuery, User libraryQueryCreator, List<LibraryQueryRecord> libraryQueryRecordList) {
        List<LibraryQueryRecordMetaView> libraryQueryRecordMetaViews = libraryQueryRecordList.stream()
                .map(LibraryQueryRecordMetaView::from)
                .toList();
        LibraryQueryMetaView libraryQueryMetaView = LibraryQueryMetaView.from(libraryQuery, libraryQueryCreator);
        return new LibraryQueryAggregateView(libraryQueryMetaView, libraryQueryRecordMetaViews);
    }

    public static LibraryQueryAggregateView from(LibraryQuery libraryQuery, User libraryQueryCreator) {
        LibraryQueryMetaView libraryQueryMetaView = LibraryQueryMetaView.from(libraryQuery, libraryQueryCreator);
        return new LibraryQueryAggregateView(libraryQueryMetaView, null);
    }

}
