package com.openblocks.plugin.mssql.model;

import java.util.Map;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MssqlQueryExecutionContext extends QueryExecutionContext {

    private String query;
    private Map<String, Object> requestParams;
    private boolean disablePreparedStatement;

}
