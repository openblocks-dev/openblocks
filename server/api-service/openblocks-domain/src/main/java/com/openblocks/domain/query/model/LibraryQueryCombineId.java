package com.openblocks.domain.query.model;

import org.apache.commons.lang.StringUtils;

public record LibraryQueryCombineId(String libraryQueryId, String libraryQueryRecordId) {

    public boolean isUsingLiveRecord() {
        return "latest".equals(libraryQueryRecordId);
    }

    public boolean isUsingEditingRecord() {
        return StringUtils.isBlank(libraryQueryRecordId) || "editing".equals(libraryQueryRecordId);
    }
}
