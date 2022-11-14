package com.openblocks.domain.datasource.model;

import java.util.Optional;

import org.apache.commons.lang3.ObjectUtils;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Datasource extends HasIdAndAuditing {

    private static final DatasourceStatus DEFAULT_STATUS = DatasourceStatus.NORMAL;

    private String name;
    private String type;
    private String organizationId;
    private int creationSource;
    private DatasourceStatus datasourceStatus;

    @JsonProperty(value = "datasourceConfig")
    private DatasourceConnectionConfig detailConfig;

    public Datasource mergeWith(Datasource updatedDatasource) {
        setName(updatedDatasource.getName());
        Optional.of(getDetailConfig())
                .ifPresentOrElse(currentDetailConfig -> {
                            DatasourceConnectionConfig updatedDetailConfig =
                                    currentDetailConfig.mergeWithUpdatedConfig(updatedDatasource.getDetailConfig());
                            setDetailConfig(updatedDetailConfig);
                        },
                        () -> setDetailConfig(updatedDatasource.getDetailConfig()));
        return this;
    }

    public long getCreateTime() {
        return createdAt.toEpochMilli();
    }

    public DatasourceStatus getDatasourceStatus() {
        return ObjectUtils.firstNonNull(this.datasourceStatus, DEFAULT_STATUS);
    }
}
