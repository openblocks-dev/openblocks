package com.openblocks.sdk.plugin.mysql;

import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.Map;

import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.exception.PluginCommonError;
import com.openblocks.sdk.plugin.common.sql.SqlBasedDatasourceConnectionConfig;

import lombok.Builder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MysqlDatasourceConfig extends SqlBasedDatasourceConnectionConfig {

    private static final long DEFAULT_PORT = 3306L;

    @Builder
    public MysqlDatasourceConfig(String database, String username, String password, String host,
            Long port, boolean usingSsl, String serverTimezone,
            boolean isReadonly, boolean enableTurnOffPreparedStatement, Map<String, Object> extParams) {
        super(database, username, password, host, port, usingSsl, serverTimezone, isReadonly, enableTurnOffPreparedStatement, extParams);
    }

    @Override
    protected long defaultPort() {
        return DEFAULT_PORT;
    }

    public static MysqlDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        MysqlDatasourceConfig result = fromJson(toJson(requestMap), MysqlDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "INVALID_MYSQL_CONFIG");
        }
        return result;
    }

    @VisibleForTesting
    public MysqlDatasourceConfigBuilder toBuilder() {
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

}
