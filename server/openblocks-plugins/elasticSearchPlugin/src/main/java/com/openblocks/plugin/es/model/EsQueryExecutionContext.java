package com.openblocks.plugin.es.model;

import org.springframework.http.HttpMethod;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;

@Builder
public class EsQueryExecutionContext extends QueryExecutionContext {

    //http method
    private HttpMethod httpMethod;
    //path
    private String path;
    //dsl
    private String dsl;

    public HttpMethod getHttpMethod() {
        return httpMethod;
    }

    public void setHttpMethod(HttpMethod httpMethod) {
        this.httpMethod = httpMethod;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getDsl() {
        return dsl;
    }

    public void setDsl(String dsl) {
        this.dsl = dsl;
    }

}
