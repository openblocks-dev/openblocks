package com.openblocks.domain.datasource.model;


import org.springframework.data.mongodb.core.mapping.Document;

import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.HasIdAndAuditing;
import com.querydsl.core.annotations.QueryExclude;

@QueryExclude
@Document(collection = "datasourceStructure")
public class DatasourceStructureDO extends HasIdAndAuditing {

    private String datasourceId;
    private DatasourceStructure structure;

    public String getDatasourceId() {
        return datasourceId;
    }

    public void setDatasourceId(String datasourceId) {
        this.datasourceId = datasourceId;
    }

    public DatasourceStructure getStructure() {
        return structure;
    }

    public void setStructure(DatasourceStructure structure) {
        this.structure = structure;
    }
}
