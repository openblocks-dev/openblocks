package com.openblocks.domain.plugin.client.dto;

import java.util.HashMap;

import org.apache.commons.collections4.MapUtils;

public class DatasourcePluginDTO extends HashMap<String, Object> {

    public String getId() {
        return MapUtils.getString(this, "id");
    }

    public String getName() {
        return MapUtils.getString(this, "name");
    }
}
