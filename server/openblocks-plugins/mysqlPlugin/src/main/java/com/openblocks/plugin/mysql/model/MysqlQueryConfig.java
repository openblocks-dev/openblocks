package com.openblocks.plugin.mysql.model;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_QUERY_SETTINGS;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.Map;

import org.apache.commons.collections4.MapUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.openblocks.sdk.exception.PluginException;

import lombok.Getter;

@Getter
public class MysqlQueryConfig {

    private final String sql;
    private final boolean disablePreparedStatement;
    private final String mode;

    private final String guiStatementType;
    private final Map<String, Object> guiStatementDetail;

    @JsonCreator
    private MysqlQueryConfig(String sql, boolean disablePreparedStatement,
            String mode,
            @JsonProperty("commandType") String guiStatementType,
            @JsonProperty("command") Map<String, Object> guiStatementDetail) {
        this.sql = sql;
        this.disablePreparedStatement = disablePreparedStatement;
        this.mode = mode;
        this.guiStatementType = guiStatementType;
        this.guiStatementDetail = guiStatementDetail;
    }

    public static MysqlQueryConfig from(Map<String, Object> queryConfigs) {
        if (MapUtils.isEmpty(queryConfigs)) {
            throw new PluginException(INVALID_QUERY_SETTINGS, "MYSQL_QUERY_CONFIG_EMPTY");
        }

        MysqlQueryConfig result = fromJson(toJson(queryConfigs), MysqlQueryConfig.class);
        if (result == null) {
            throw new PluginException(INVALID_QUERY_SETTINGS, "INVALID_MYSQL");
        }
        return result;
    }

    public boolean isGuiMode() {
        return "GUI".equalsIgnoreCase(mode);
    }

    public String getSql() {
        return sql.trim();
    }
}
