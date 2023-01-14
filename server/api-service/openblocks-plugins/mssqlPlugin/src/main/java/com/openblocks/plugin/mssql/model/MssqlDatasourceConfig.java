package com.openblocks.plugin.mssql.model;

import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.exception.PluginCommonError;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.plugin.common.sql.SqlBasedDatasourceConnectionConfig;

import lombok.Builder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MssqlDatasourceConfig extends SqlBasedDatasourceConnectionConfig {

    private static final long DEFAULT_PORT = 1433L;

    @Builder
    public MssqlDatasourceConfig(String database, String username, String password, String host, Long port, boolean usingSsl, String serverTimezone,
            boolean isReadonly, boolean enableTurnOffPreparedStatement) {
        super(database, username, password, host, port, usingSsl, serverTimezone, isReadonly, enableTurnOffPreparedStatement);
    }

    @Override
    protected long defaultPort() {
        return DEFAULT_PORT;
    }

    @Override
    protected DatasourceConnectionConfig createMergedConnectionConfig(String database, String username, String password, String host, long port,
            boolean usingSsl, String serverTimezone, boolean readonly, boolean enableTurnOffPreparedStatement) {
        return new MssqlDatasourceConfig(database, username, password, host, port, usingSsl, serverTimezone, readonly,
                enableTurnOffPreparedStatement);
    }

    @VisibleForTesting
    public MssqlDatasourceConfigBuilder toBuilder() {
        return builder()
                .database(getDatabase())
                .username(getUsername())
                .password(getPassword())
                .usingSsl(isUsingSsl())
                .host(getHost())
                .port(getPort())
                .serverTimezone(getServerTimezone())
                .enableTurnOffPreparedStatement(isEnableTurnOffPreparedStatement());
    }

    public static MssqlDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        MssqlDatasourceConfig result = fromJson(toJson(requestMap), MssqlDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "INVALID_SQLSERVER_CONFIG");
        }
        return result;
    }
}
