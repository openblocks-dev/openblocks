package com.openblocks.plugin.clickhouse.model;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIG_TYPE;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
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
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class ClickHouseDatasourceConfig implements DatasourceConnectionConfig {

    private static final long DEFAULT_PORT = 3306L;

    private final String database;
    private final String username;

    @JsonView(JsonViews.Internal.class)
    private String password;

    private final String host;
    private final Long port;
    private final boolean usingSsl;

    private final boolean isReadonly;

    private final boolean enableTurnOffPreparedStatement;

    @JsonCreator
    private ClickHouseDatasourceConfig(String database, String username, String password, String host, Long port,
            boolean usingSsl, boolean isReadonly,
            boolean enableTurnOffPreparedStatement) {
        this.database = database;
        this.username = username;
        this.password = password;
        this.usingSsl = usingSsl;
        this.host = host;
        this.port = port;
        this.isReadonly = isReadonly;
        this.enableTurnOffPreparedStatement = enableTurnOffPreparedStatement;
    }

    public static ClickHouseDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        ClickHouseDatasourceConfig result = fromJson(toJson(requestMap), ClickHouseDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(DATASOURCE_ARGUMENT_ERROR, "INVALID_CLICKHOUSE_CONFIG");
        }
        return result;
    }

    public static ClickHouseDatasourceConfig from(DatasourceConnectionConfig datasourceConfig) {
        if (datasourceConfig instanceof ClickHouseDatasourceConfig config) {
            return config;
        }
        throw ofPluginException(DATASOURCE_ARGUMENT_ERROR, "INVALID_CLICKHOUSE_CONFIG");
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

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig updatedConfig) {
        if (!(updatedConfig instanceof ClickHouseDatasourceConfig updatedMysqlConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE", updatedConfig.getClass().getSimpleName());
        }

        return new ClickHouseDatasourceConfig(updatedMysqlConfig.getDatabase(),
                updatedMysqlConfig.getUsername(),
                firstNonNull(updatedMysqlConfig.getPassword(), getPassword()),
                updatedMysqlConfig.getHost(),
                updatedMysqlConfig.getPort(),
                updatedMysqlConfig.isUsingSsl(),
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
