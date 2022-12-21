package com.openblocks.sdk.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.openblocks.sdk.plugin.restapi.DataUtils.MultipartFormDataType;

import lombok.EqualsAndHashCode;
import lombok.ToString;

@ToString
@EqualsAndHashCode
public class Property {

    private final String key;
    private final String value;
    private String type;

    @JsonCreator
    public Property(String key, String value) {
        this(key, value, null);
    }

    public Property(String key, String value, String type) {
        this.key = key;
        this.value = value;
        this.type = type;
    }

    public String getKey() {
        return key;
    }

    public String getValue() {
        return value;
    }

    public String getType() {
        return type;
    }

    public boolean isMultipartFileType() {
        return MultipartFormDataType.FILE.name().equalsIgnoreCase(type);
    }

    public void setType(String type) {
        this.type = type;
    }
}
