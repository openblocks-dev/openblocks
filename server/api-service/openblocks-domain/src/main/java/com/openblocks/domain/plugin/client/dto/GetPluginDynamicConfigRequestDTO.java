package com.openblocks.domain.plugin.client.dto;

import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetPluginDynamicConfigRequestDTO {

    private String dataSourceId;
    private String pluginName;
    private String path;
    private Map<String, Object> dataSourceConfig;
}
