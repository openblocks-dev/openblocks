package com.openblocks.domain.query.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BaseQuery {

    private final String datasourceId;

    @JsonProperty(value = "comp")
    private final Map<String, Object> queryConfig;

    private final String compType;

    @JsonProperty(value = "timeout")
    private final String timeoutStr;

    @JsonCreator
    private BaseQuery(String datasourceId, Map<String, Object> queryConfig, String compType, String timeoutStr) {
        this.datasourceId = datasourceId;
        this.queryConfig = queryConfig;
        this.compType = compType;
        this.timeoutStr = timeoutStr;
    }
}
