package com.openblocks.sdk.query;

public abstract class QueryExecutionContext {

    private String visitorId;

    public String getVisitorId() {
        return visitorId;
    }

    public void setVisitorId(String visitorId) {
        this.visitorId = visitorId;
    }

}
