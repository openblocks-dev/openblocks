package com.openblocks.domain.plugin;

import static org.apache.commons.lang3.StringUtils.firstNonEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.openblocks.domain.datasource.service.DatasourceConnectionPool;

import lombok.Builder;
import lombok.Getter;

@Builder
public final class DatasourceMetaInfo {

    private final String type;
    private final String displayName;
    private final String pluginExecutorKey;
    private final String version;
    private final boolean hasStructureInfo;
    @Getter
    private final Object definition;

    // connection pool type
    private final Class<? extends DatasourceConnectionPool> connectionPool;

    @JsonProperty("id")
    public String getType() {
        return type;
    }

    @JsonProperty("name")
    public String getDisplayName() {
        return displayName;
    }

    @JsonIgnore
    public String getPluginExecutorKey() {
        return pluginExecutorKey;
    }

    public String getVersion() {
        return firstNonEmpty(version, "default");
    }

    public boolean isHasStructureInfo() {
        return hasStructureInfo;
    }

    @JsonIgnore
    public Class<? extends DatasourceConnectionPool> getConnectionPool() {
        return connectionPool;
    }
}
