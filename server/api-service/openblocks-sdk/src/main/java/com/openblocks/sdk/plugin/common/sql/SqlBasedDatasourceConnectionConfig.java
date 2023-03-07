package com.openblocks.sdk.plugin.common.sql;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIG_TYPE;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;
import static org.apache.commons.collections4.MapUtils.emptyIfNull;
import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.function.Function;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.exception.ServerException;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@SuperBuilder
public abstract class SqlBasedDatasourceConnectionConfig implements DatasourceConnectionConfig {

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

    private final Map<String, Object> extParams;

    protected SqlBasedDatasourceConnectionConfig(String database, String username, String password, String host, Long port,
            boolean usingSsl, String serverTimezone, boolean isReadonly,
            boolean enableTurnOffPreparedStatement,
            Map<String, Object> extParams) {
        this.database = database;
        this.username = username;
        this.password = password;
        this.usingSsl = usingSsl;
        this.host = host;
        this.port = port;
        this.serverTimezone = serverTimezone;
        this.isReadonly = isReadonly;
        this.enableTurnOffPreparedStatement = enableTurnOffPreparedStatement;
        this.extParams = extParams;
    }

    protected abstract long defaultPort();

    public final String getDatabase() {
        return StringUtils.trimToEmpty(database);
    }

    public final long getPort() {
        return port == null ? defaultPort() : port;
    }

    public final String getPassword() {
        return password;
    }

    public final boolean isUsingSsl() {
        return usingSsl;
    }

    public final String getServerTimezone() {
        return serverTimezone;
    }

    public final String getHost() {
        return StringUtils.trimToEmpty(host);
    }

    public final String getUsername() {
        return StringUtils.trimToEmpty(username);
    }

    public final boolean isReadonly() {
        return isReadonly;
    }

    public final boolean isEnableTurnOffPreparedStatement() {
        return enableTurnOffPreparedStatement;
    }

    public Map<String, Object> getExtParams() {
        return emptyIfNull(extParams);
    }

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig updatedDatasourceConnectionConfig) {
        if (!(updatedDatasourceConnectionConfig instanceof SqlBasedDatasourceConnectionConfig updatedConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE",
                    updatedDatasourceConnectionConfig.getClass().getSimpleName());
        }

        return createMergedConnectionConfig(
                updatedConfig.getDatabase(),
                updatedConfig.getUsername(),
                firstNonNull(updatedConfig.getPassword(), getPassword()), // use original password if new password is not provided
                updatedConfig.getHost(),
                updatedConfig.getPort(),
                updatedConfig.isUsingSsl(),
                updatedConfig.getServerTimezone(),
                updatedConfig.isReadonly(),
                updatedConfig.isEnableTurnOffPreparedStatement(),
                updatedConfig.getExtParams()
        );
    }

    private DatasourceConnectionConfig createMergedConnectionConfig(String database, String username, String password, String host,
            long port, boolean usingSsl, String serverTimezone, boolean readonly, boolean enableTurnOffPreparedStatement,
            Map<String, Object> extParams) {
        Constructor<?>[] constructors = getClass().getConstructors();
        try {
            return (DatasourceConnectionConfig) constructors[0].newInstance(database, username, password,
                    host, port, usingSsl, serverTimezone, readonly, enableTurnOffPreparedStatement, extParams);
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
            throw new ServerException("fail to create SQL data source: {0}", e.getMessage());
        }
    }

    @Override
    public final DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        try {
            password = encryptFunc.apply(password);
            return this;
        } catch (Exception e) {
            log.error("fail to encrypt password: {}", password, e);
            return this;
        }
    }

    @Override
    public final DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        try {
            password = decryptFunc.apply(password);
            return this;
        } catch (Exception e) {
            log.error("fail to encrypt password: {}", password, e);
            return this;
        }
    }
}
