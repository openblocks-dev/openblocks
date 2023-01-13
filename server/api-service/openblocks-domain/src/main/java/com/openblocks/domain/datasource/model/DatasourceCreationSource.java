package com.openblocks.domain.datasource.model;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum DatasourceCreationSource {
    USER_CREATED(0),
    CLONE_FROM_TEMPLATE(1), // e.g. onboard datasource/template datasource, and user can update it later
    @Deprecated
    LEGACY_WORKSPACE_PREDEFINED(2), // e.g. openblocks api, automatically created with creation of a workspace, cannot be modified
    SYSTEM_STATIC(3), // e.g. rest api/graphQL quick data source, only exist in memory and doesn't store in DB
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
