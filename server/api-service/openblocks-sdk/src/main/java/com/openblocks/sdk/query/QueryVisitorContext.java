package com.openblocks.sdk.query;

import java.util.List;

import org.springframework.http.HttpCookie;
import org.springframework.util.MultiValueMap;

import com.openblocks.sdk.models.Property;

import lombok.Getter;
import reactor.core.publisher.Mono;

@Getter
public class QueryVisitorContext {

    private final String visitorId;
    private final String applicationOrgId;
    private final MultiValueMap<String, HttpCookie> cookies;

    private final int systemPort;

    private final Mono<List<Property>> authTokenMono;

    public QueryVisitorContext(String visitorId, String applicationOrgId, int systemPort,
            MultiValueMap<String, HttpCookie> cookies, Mono<List<Property>> authTokenMono) {
        this.visitorId = visitorId;
        this.applicationOrgId = applicationOrgId;
        this.systemPort = systemPort;
        this.cookies = cookies;
        this.authTokenMono = authTokenMono;
    }
}
