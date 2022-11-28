package com.openblocks.plugin.oracle.model;

import java.util.function.Function;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OracleDatasourceConfig implements DatasourceConnectionConfig {

    private final String username;
    @JsonView(JsonViews.Internal.class)
    private String password;
    private final String host;
    private final Integer port;
    private final String sid;
    private final String serviceName;
    private final String jdbcUrl;

    private final boolean enableTurnOffPreparedStatement;

    @JsonCreator
    public OracleDatasourceConfig(String username, String password, String host, Integer port, String sid, String serviceName, String jdbcUrl,
            boolean enableTurnOffPreparedStatement) {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.sid = sid;
        this.serviceName = serviceName;
        this.jdbcUrl = jdbcUrl;
        this.enableTurnOffPreparedStatement = enableTurnOffPreparedStatement;
    }

    public String getJdbcUrl() {
        if (StringUtils.isNotBlank(jdbcUrl)) {
            return jdbcUrl;
        }
        if (StringUtils.isNotBlank(sid)) {
            return String.format("jdbc:oracle:thin:@%s:%s:%s", host, port, sid);
        }
        return String.format("jdbc:oracle:thin:@//%s:%s/%s", host, port, serviceName);
    }

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig detailConfig) {
        OracleDatasourceConfig newConfig = (OracleDatasourceConfig) detailConfig;
        return OracleDatasourceConfig.builder()
                .username(newConfig.getUsername())
                .password(ObjectUtils.firstNonNull(newConfig.getPassword(), this.password))
                .host(newConfig.getHost())
                .port(newConfig.getPort())
                .sid(newConfig.getSid())
                .serviceName(newConfig.getServiceName())
                .jdbcUrl(newConfig.getJdbcUrl())
                .build();
    }

    @Override
    public DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        this.password = encryptFunc.apply(this.password);
        return this;
    }

    @Override
    public DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        this.password = decryptFunc.apply(this.password);
        return this;
    }
}
