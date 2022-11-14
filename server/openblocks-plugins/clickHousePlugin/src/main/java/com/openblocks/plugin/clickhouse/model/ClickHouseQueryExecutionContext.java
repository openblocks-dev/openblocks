package com.openblocks.plugin.clickhouse.model;

import java.util.Map;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClickHouseQueryExecutionContext extends QueryExecutionContext {

    private String query;
    private int timeoutInMillis;
    private Map<String, Object> requestParams;
    private boolean disablePreparedStatement;

}
