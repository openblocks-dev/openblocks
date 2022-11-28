package com.openblocks.plugin.clickhouse.model;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.Map;

import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.plugin.common.sql.SqlBasedDatasourceConnectionConfig;

import lombok.Builder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ClickHouseDatasourceConfig extends SqlBasedDatasourceConnectionConfig {

    private static final long DEFAULT_PORT = 8123L;

    @Builder
    protected ClickHouseDatasourceConfig(String database, String username, String password, String host, Long port, boolean usingSsl,
            String serverTimezone, boolean isReadonly, boolean enableTurnOffPreparedStatement) {
        super(database, username, password, host, port, usingSsl, serverTimezone, isReadonly, enableTurnOffPreparedStatement);
    }

    @Override
    protected long defaultPort() {
        return DEFAULT_PORT;
    }

    @Override
    protected DatasourceConnectionConfig createMergedConnectionConfig(String database, String username, String password, String host, long port,
            boolean usingSsl, String serverTimezone, boolean readonly, boolean enableTurnOffPreparedStatement) {
        return new ClickHouseDatasourceConfig(database, username, password, host, port, usingSsl, serverTimezone, readonly,
                enableTurnOffPreparedStatement);
    }

    public static ClickHouseDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        ClickHouseDatasourceConfig result = fromJson(toJson(requestMap), ClickHouseDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(DATASOURCE_ARGUMENT_ERROR, "INVALID_CLICKHOUSE_CONFIG");
        }
        return result;
    }


}
