package com.openblocks.domain.query.model;

import org.apache.commons.lang3.StringUtils;

public record LibraryQueryCombineId(String libraryQueryId, String libraryQueryRecordId) {

    public boolean isUsingLatestRecord() {
        return StringUtils.isBlank(libraryQueryRecordId) || "latest".equals(libraryQueryRecordId);
    }
}
