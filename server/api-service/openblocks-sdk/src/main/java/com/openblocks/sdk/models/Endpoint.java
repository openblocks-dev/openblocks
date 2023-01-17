package com.openblocks.sdk.models;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.EqualsAndHashCode;
import lombok.ToString;

@ToString
@EqualsAndHashCode
public class Endpoint {

    private final String host;
    private final Long port;

    @JsonCreator
    public Endpoint(String host, Long port) {
        this.host = host;
        this.port = port;
    }

    public Long getPort() {
        return port;
    }

    public String getHost() {
        return StringUtils.trimToEmpty(host);
    }

    public long getPort(long defaultPort) {
        return port == null ? defaultPort : port;
    }
}
