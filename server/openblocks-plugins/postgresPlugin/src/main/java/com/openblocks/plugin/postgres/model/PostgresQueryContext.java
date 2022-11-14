package com.openblocks.plugin.postgres.model;

import java.util.Map;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostgresQueryContext extends QueryExecutionContext {

    private String query;
    private Map<String, Object> requestParams;
    private boolean disablePreparedStatement;

}
