package com.openblocks.domain.datasource.model;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.openblocks.sdk.models.HasIdAndAuditing;
import com.querydsl.core.annotations.QueryExclude;

import lombok.Getter;
import lombok.Setter;

@QueryExclude
@Document(collection = "datasource")
@Getter
@Setter
public class DatasourceDO extends HasIdAndAuditing {

    private String name;
    private String type;
    private String organizationId;
    private int creationSource;
    private DatasourceStatus datasourceStatus;
    private Map<String, Object> detailConfig;

}
