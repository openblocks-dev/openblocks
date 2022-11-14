package com.openblocks.domain.datasource.model;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum DatasourceCreationSource {
    USER_CREATED(0),
    SYSTEM_TEMPLATE(1), // e.g. onboard datasource/template datasource, and user can update it later
    SYSTEM_PREDEFINED(2), // e.g. rest api empty datasource, internal datasource, cannot be modified
    ;

    private final int value;

    DatasourceCreationSource(int value) {
        this.value = value;
    }

    public DatasourceCreationSource fromValue(int value) {
        return Arrays.stream(values())
                .filter(it -> it.getValue() == value)
                .findFirst()
                .orElseThrow();
    }
}
