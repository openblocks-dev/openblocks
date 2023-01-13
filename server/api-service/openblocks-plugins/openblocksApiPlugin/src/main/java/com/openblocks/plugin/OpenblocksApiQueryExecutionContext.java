package com.openblocks.plugin;

import org.springframework.http.HttpCookie;
import org.springframework.util.MultiValueMap;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OpenblocksApiQueryExecutionContext extends QueryExecutionContext {

    private int port;
    private String actionType;
    private String visitorId;
    private String applicationOrgId;
    private MultiValueMap<String, HttpCookie> requestCookies;
}
