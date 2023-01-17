package com.openblocks.plugin.mongo.model;

import org.bson.Document;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;

@Builder
public class MongoQueryExecutionContext extends QueryExecutionContext {

    private String databaseName;
    private Document command;

    public Document getCommand() {
        return command;
    }

    public String getDatabaseName() {
        return databaseName;
    }

}
