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
public class LibraryQuery extends HasIdAndAuditing {

    private final String organizationId;
    private final String name;
    private final Map<String, Object> libraryQueryDSL;

    @JsonCreator
    public LibraryQuery(@JsonProperty("organizationId") String organizationId,
            @JsonProperty("name") String name,
            @JsonProperty("libraryQueryDSL") Map<String, Object> libraryQueryDSL) {
        this.name = name;
        this.organizationId = organizationId;
        this.libraryQueryDSL = libraryQueryDSL;
    }

    @Transient
    private final Supplier<BaseQuery> baseQuerySupplier = memoize(() ->
            JsonUtils.fromJson(JsonUtils.toJson(getLibraryQueryDSL().get("query")), BaseQuery.class));

    @Transient
    public BaseQuery getQuery() {
        return baseQuerySupplier.get();
    }

}
