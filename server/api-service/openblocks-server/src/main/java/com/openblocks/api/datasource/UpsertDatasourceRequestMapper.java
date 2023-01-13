package com.openblocks.api.datasource;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIGURATION;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;

@Component
public class UpsertDatasourceRequestMapper {

    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;

    public Datasource resolve(UpsertDatasourceRequest dto) {

        if (StringUtils.isBlank(dto.getName())) {
            throw ofException(INVALID_DATASOURCE_CONFIGURATION, "DATASOURCE_NAME_EMPTY");
        }

        if (StringUtils.isBlank(dto.getType())) {
            throw ofException(INVALID_DATASOURCE_CONFIGURATION, "INVALID_DATASOURCE_TYPE_0");
        }

        if (StringUtils.isBlank(dto.getOrganizationId())) {
            throw ofException(INVALID_DATASOURCE_CONFIGURATION, "INVALID_DATASOURCE_ORG_ID");
        }

        Datasource datasource = new Datasource();
        datasource.setId(dto.getId());
        datasource.setName(dto.getName());
        datasource.setType(dto.getType());
        datasource.setOrganizationId(dto.getOrganizationId());
        datasource.setDetailConfig(datasourceMetaInfoService.resolveDetailConfig(dto.getDatasourceConfig(), dto.getType()));
        return datasource;
    }

}
