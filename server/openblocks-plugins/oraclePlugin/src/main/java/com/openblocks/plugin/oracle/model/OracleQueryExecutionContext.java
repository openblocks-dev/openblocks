package com.openblocks.plugin.oracle.model;

import java.util.Map;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OracleQueryExecutionContext extends QueryExecutionContext {

    private final String query;
    private final Map<String, Object> requestParams;
}
