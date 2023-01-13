package com.openblocks.domain.query.model;

import static com.google.common.base.Suppliers.memoize;

import java.util.Map;
import java.util.function.Supplier;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.openblocks.sdk.models.HasIdAndAuditing;
import com.openblocks.sdk.util.JsonUtils;

import lombok.Builder;
import lombok.Getter;

@Document
@Getter
@Builder
public class LibraryQueryRecord extends HasIdAndAuditing {

    private final String libraryQueryId;
    private final String tag;
    private final String commitMessage;
    private final Map<String, Object> libraryQueryDSL;

    @JsonCreator
    public LibraryQueryRecord(@JsonProperty("libraryQueryId") String libraryQueryId,
            @JsonProperty("tag") String tag,
            @JsonProperty("commitMessage") String commitMessage,
            @JsonProperty("libraryQueryDSL") Map<String, Object> libraryQueryDSL) {
        this.libraryQueryId = libraryQueryId;
        this.tag = tag;
        this.commitMessage = commitMessage;
        this.libraryQueryDSL = libraryQueryDSL;
    }

    @Transient
    private final Supplier<BaseQuery> baseQuerySupplier = memoize(() ->
            JsonUtils.fromJson(JsonUtils.toJson(getLibraryQueryDSL().get("query")), BaseQuery.class));

    @Transient
    public BaseQuery getQuery() {
        return baseQuerySupplier.get();
    }

    public long getCreateTime() {
        return createdAt.toEpochMilli();
    }
}
