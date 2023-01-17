package com.openblocks.api.datasource;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpsertDatasourceRequest {

    private String id;
    private String name;
    private String type;
    private String organizationId;

    private Map<String, Object> datasourceConfig;
}
