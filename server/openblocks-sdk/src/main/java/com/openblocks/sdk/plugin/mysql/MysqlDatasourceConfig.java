package com.openblocks.sdk.plugin.mysql;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIG_TYPE;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;
import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.util.Map;
import java.util.function.Function;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonView;
import com.google.common.annotations.VisibleForTesting;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.exception.PluginCommonError;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class MysqlDatasourceConfig implements DatasourceConnectionConfig {

    private static final long DEFAULT_PORT = 3306L;

    private final String database;
    private final String username;

    @JsonView(JsonViews.Internal.class)
    private String password;

    private final String host;
    private final Long port;
    private final boolean usingSsl;
    private final String serverTimezone;

    private final boolean isReadonly;

    private final boolean enableTurnOffPreparedStatement;

    // https://github.com/projectlombok/lombok/issues/1807
    @JsonCreator
    private MysqlDatasourceConfig(String database, String username, String password, String host, Long port,
            boolean usingSsl, String serverTimezone, boolean isReadonly,
            boolean enableTurnOffPreparedStatement) {
        this.database = database;
        this.username = username;
        this.password = password;
        this.usingSsl = usingSsl;
        this.host = host;
        this.port = port;
        this.serverTimezone = serverTimezone;
        this.isReadonly = isReadonly;
        this.enableTurnOffPreparedStatement = enableTurnOffPreparedStatement;
    }

    public static MysqlDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        MysqlDatasourceConfig result = fromJson(toJson(requestMap), MysqlDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "INVALID_MYSQL_CONFIG");
        }
        return result;
    }

    public static MysqlDatasourceConfig from(DatasourceConnectionConfig datasourceConfig) {
        if (datasourceConfig instanceof MysqlDatasourceConfig config) {
            return config;
        }
        throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "INVALID_MYSQL_CONFIG");
    }

    public String getDatabase() {
        return StringUtils.trimToEmpty(database);
    }

    public long getPort() {
        return port == null ? DEFAULT_PORT : port;
    }

    public String getHost() {
        return StringUtils.trimToEmpty(host);
    }

    public String getUsername() {
        return StringUtils.trimToEmpty(username);
    }

    public boolean isReadonly() {
        return isReadonly;
    }

    @VisibleForTesting
    public MysqlDatasourceConfigBuilder toBuilder() {
        return builder()
                .database(database)
                .username(username)
                .password(password)
                .usingSsl(usingSsl)
                .host(host)
                .port(port)
                .serverTimezone(serverTimezone)
                .enableTurnOffPreparedStatement(enableTurnOffPreparedStatement);
    }

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig updatedConfig) {
        if (!(updatedConfig instanceof MysqlDatasourceConfig updatedMysqlConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE", updatedConfig.getClass().getSimpleName());
        }

        return new MysqlDatasourceConfig(updatedMysqlConfig.getDatabase(),
                updatedMysqlConfig.getUsername(),
                firstNonNull(updatedMysqlConfig.getPassword(), getPassword()), // use original password if new password is not provided
                updatedMysqlConfig.getHost(),
                updatedMysqlConfig.getPort(),
                updatedMysqlConfig.isUsingSsl(),
                updatedMysqlConfig.getServerTimezone(),
                updatedMysqlConfig.isReadonly(),
                updatedMysqlConfig.isEnableTurnOffPreparedStatement());
    }

    public boolean isEnableTurnOffPreparedStatement() {
        return enableTurnOffPreparedStatement;
    }

    @Override
    public DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        try {
            password = encryptFunc.apply(password);
            return this;
        } catch (Exception e) {
            log.error("fail to encrypt password: {}", password, e);
            return this;
        }
    }

    @Override
    public DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        try {
            password = decryptFunc.apply(password);
            return this;
        } catch (Exception e) {
            log.error("fail to encrypt password: {}", password, e);
            return this;
        }
    }
}
