package com.openblocks.plugin.postgres.model;

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
public class PostgresDatasourceConfig implements DatasourceConnectionConfig {

    private static final long DEFAULT_PORT = 5432L;

    private final String database;
    private final String username;

    @JsonView(JsonViews.Internal.class)
    private String password;

    private final String host;
    private final Long port;
    private final boolean usingSsl;
    private final boolean readonly;

    @JsonCreator
    private PostgresDatasourceConfig(String database, String username, String password, String host, Long port,
            boolean usingSsl, boolean readonly) {
        this.database = database;
        this.username = username;
        this.password = password;
        this.usingSsl = usingSsl;
        this.host = host;
        this.port = port;
        this.readonly = readonly;
    }

    public static PostgresDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        PostgresDatasourceConfig result = fromJson(toJson(requestMap), PostgresDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "INVALID_PG_CONFIG");
        }
        return result;
    }

    public String getUsername() {
        return StringUtils.trimToEmpty(username);
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

    @VisibleForTesting
    public PostgresDatasourceConfigBuilder toBuilder() {
        return builder()
                .database(database)
                .username(username)
                .password(password)
                .usingSsl(usingSsl)
                .host(host)
                .port(port)
                .readonly(readonly);
    }

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig updatedConfig) {
        if (!(updatedConfig instanceof PostgresDatasourceConfig updatedPostgresConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE", updatedConfig.getClass().getSimpleName());
        }

        return new PostgresDatasourceConfig(updatedPostgresConfig.getDatabase(),
                updatedPostgresConfig.getUsername(),
                firstNonNull(updatedPostgresConfig.getPassword(), getPassword()),
                updatedPostgresConfig.getHost(),
                updatedPostgresConfig.getPort(),
                updatedPostgresConfig.isUsingSsl(),
                updatedPostgresConfig.isReadonly());
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
