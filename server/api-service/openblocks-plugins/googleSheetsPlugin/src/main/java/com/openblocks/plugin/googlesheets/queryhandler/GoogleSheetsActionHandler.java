package com.openblocks.plugin.googlesheets.queryhandler;

import com.openblocks.plugin.googlesheets.model.GoogleSheetsQueryExecutionContext;
import com.openblocks.sdk.models.QueryExecutionResult;

import reactor.core.publisher.Mono;

public abstract class GoogleSheetsActionHandler {

    public static final String READ_DATA = "readData";
    public static final String APPEND_DATA = "appendData";
    public static final String UPDATE_DATA = "updateData";
    public static final String DELETE_DATA = "deleteData";
    public static final String CLEAR_DATA = "clearData";

    public abstract String getActionType();

    public abstract Mono<QueryExecutionResult> execute(Object o, GoogleSheetsQueryExecutionContext context);

}
