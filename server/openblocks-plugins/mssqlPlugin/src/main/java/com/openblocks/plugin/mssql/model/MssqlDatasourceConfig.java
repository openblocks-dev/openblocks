package com.openblocks.plugin.mssql.model;

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
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.exception.PluginCommonError;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class MssqlDatasourceConfig implements DatasourceConnectionConfig {

    private static final long DEFAULT_PORT = 1433L;

    private final String database;
    private final String username;

    @JsonView(JsonViews.Internal.class)
    private String password;

    private final String host;
    private final Long port;
    private final boolean usingSsl;
    private final String serverTimezone;

    private final boolean isReadonly;

    // https://github.com/projectlombok/lombok/issues/1807
    @JsonCreator
    private MssqlDatasourceConfig(String database, String username, String password, String host, Long port,
            boolean usingSsl, String serverTimezone, boolean isReadonly) {
        this.database = database;
        this.username = username;
        this.password = password;
        this.usingSsl = usingSsl;
        this.host = host;
        this.port = port;
        this.serverTimezone = serverTimezone;
        this.isReadonly = isReadonly;
    }

    public static MssqlDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        MssqlDatasourceConfig result = fromJson(toJson(requestMap), MssqlDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "INVALID_SQLSERVER_CONFIG");
        }
        return result;
    }

    public static MssqlDatasourceConfig from(DatasourceConnectionConfig datasourceConfig) {
        if (datasourceConfig instanceof MssqlDatasourceConfig config) {
            return config;
        }
        throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "INVALID_SQLSERVER_CONFIG");
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
        if (!(updatedConfig instanceof MssqlDatasourceConfig updatedMssqlConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE", updatedConfig.getClass().getSimpleName());
        }

        return new MssqlDatasourceConfig(updatedMssqlConfig.getDatabase(),
                updatedMssqlConfig.getUsername(),
                firstNonNull(updatedMssqlConfig.getPassword(), getPassword()),
                updatedMssqlConfig.getHost(),
                updatedMssqlConfig.getPort(),
                updatedMssqlConfig.isUsingSsl(),
                updatedMssqlConfig.getServerTimezone(),
                updatedMssqlConfig.isReadonly()
        );
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
