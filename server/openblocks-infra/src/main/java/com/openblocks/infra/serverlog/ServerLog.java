package com.openblocks.infra.serverlog;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Builder;
import lombok.Getter;


@Document
@Getter
@Builder
public class ServerLog {
    private String userId;
    private String urlPath;
    private String httpMethod;
    private String requestBody;
    private Map<String, String> queryParameters;
    private long createTime;

    @JsonCreator
    private ServerLog(String userId, String urlPath, String httpMethod, String requestBody, Map<String, String> queryParameters, long createTime) {
        this.userId = userId;
        this.urlPath = urlPath;
        this.createTime = createTime;
        this.httpMethod = httpMethod;
        this.requestBody = requestBody;
        this.queryParameters = queryParameters;
    }
}
