package com.openblocks.plugin.mysql.model;

import java.util.Map;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand;
import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MysqlQueryExecutionContext extends QueryExecutionContext {

    private String query;
    private Map<String, Object> requestParams;
    private boolean disablePreparedStatement;
    private GuiSqlCommand guiSqlCommand;

}
