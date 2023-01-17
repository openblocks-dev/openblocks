package com.openblocks.infra.config.model;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.Builder;

@Builder
@Document
public class ServerConfig extends HasIdAndAuditing {

    private String key;

    private Object value;

    @JsonCreator
    public ServerConfig(String key, Object value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public Object getValue() {
        return value;
    }

}
