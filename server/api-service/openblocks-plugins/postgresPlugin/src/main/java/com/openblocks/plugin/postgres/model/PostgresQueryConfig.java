package com.openblocks.plugin.postgres.model;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_QUERY_SETTINGS;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.Map;

import org.apache.commons.collections4.MapUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.openblocks.sdk.exception.PluginException;

import lombok.Getter;

@Getter
public class PostgresQueryConfig {

    private final String sql;
    private final boolean disablePreparedStatement;

    @JsonCreator
    private PostgresQueryConfig(String sql, boolean disablePreparedStatement) {
        this.sql = sql;
        this.disablePreparedStatement = disablePreparedStatement;
    }

    public static PostgresQueryConfig from(Map<String, Object> queryConfigs) {
        if (MapUtils.isEmpty(queryConfigs)) {
            throw new PluginException(INVALID_QUERY_SETTINGS, "INVALID_PG_QUERY_CONFIG_EMPTY");
        }

        PostgresQueryConfig result = fromJson(toJson(queryConfigs), PostgresQueryConfig.class);
        if (result == null) {
            throw new PluginException(INVALID_QUERY_SETTINGS, "INVALID_PG");
        }
        return result;
    }
}
