package com.openblocks.domain.query.model;

import java.util.Map;

import org.apache.commons.collections4.MapUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class ApplicationQuery {

    private final String id;

    private final String name;

    private final BaseQuery baseQuery;

    private final String triggerType;

    private final String timeoutStr;

    @JsonCreator
    public ApplicationQuery(@JsonProperty("id") String id,
            @JsonProperty("name") String name,
            @JsonProperty("datasourceId") String datasourceId,
            @JsonProperty("comp") Map<String, Object> queryConfig,
            @JsonProperty("triggerType") String triggerType,
            @JsonProperty("timeout") String timeoutStr,
            @JsonProperty("compType") String compType) {
        this.id = id;
        this.name = name;
        this.triggerType = triggerType;
        this.timeoutStr = timeoutStr;
        this.baseQuery = BaseQuery.builder()
                .queryConfig(queryConfig)
                .datasourceId(datasourceId)
                .compType(compType)
                .timeoutStr(timeoutStr).build();
    }

    public boolean isUsingLibraryQuery() {
        return "libraryQuery".equals(baseQuery.getCompType());
    }

    public LibraryQueryCombineId getLibraryRecordQueryId() {
        String libraryQueryId = MapUtils.getString(baseQuery.getQueryConfig(), "libraryQueryId");
        String libraryQueryRecordId = MapUtils.getString(baseQuery.getQueryConfig(), "libraryQueryRecordId");
        return new LibraryQueryCombineId(libraryQueryId, libraryQueryRecordId);
    }

}
