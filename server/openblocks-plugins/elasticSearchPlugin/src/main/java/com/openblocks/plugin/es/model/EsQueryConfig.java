package com.openblocks.plugin.es.model;

import org.springframework.http.HttpMethod;

import lombok.Builder;

@Builder
public class EsQueryConfig {

    private String esMethod; // used by client side
    private String prefix;
    private String suffix;
    private String path;
    private HttpMethod httpMethod;
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

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getEsMethod() {
        return esMethod;
    }

    public void setEsMethod(String esMethod) {
        this.esMethod = esMethod;
    }

}
