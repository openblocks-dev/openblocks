package com.openblocks.domain.plugin.client.dto;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.collections4.MapUtils;

public class DatasourcePluginDefinition extends HashMap<String, Object> {

    public String getId() {
        return MapUtils.getString(this, "id");
    }

    public String getName() {
        return MapUtils.getString(this, "name");
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public boolean isDatasourceConfigExtraDynamic() {
        return Optional.ofNullable(MapUtils.getMap(this, "dataSourceConfig"))
                .map(datasourceConfig -> MapUtils.getMap((Map) datasourceConfig, "extra"))
                .map(extra -> MapUtils.getString(extra, "type", "").equals("dynamic"))
                .orElse(false);
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public boolean isQueryConfigDynamic() {
        return Optional.ofNullable(MapUtils.getMap(this, "queryConfig"))
                .map(queryConfig -> MapUtils.getString((Map) queryConfig, "type", "").equals("dynamic"))
                .orElse(false);
    }
}
