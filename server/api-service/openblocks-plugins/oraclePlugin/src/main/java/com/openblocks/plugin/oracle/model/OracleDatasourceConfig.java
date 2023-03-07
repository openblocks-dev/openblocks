package com.openblocks.plugin.oracle.model;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIG_TYPE;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;

import java.util.Map;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.plugin.common.sql.SqlBasedDatasourceConnectionConfig;

import lombok.experimental.SuperBuilder;

@SuperBuilder
public class OracleDatasourceConfig extends SqlBasedDatasourceConnectionConfig {
    private final String sid;
    private final String serviceName;
    private final String jdbcUrl;

    @JsonCreator
    private OracleDatasourceConfig(String username, String password, String host,
            Long port, String sid, String serviceName, String jdbcUrl,
            boolean enableTurnOffPreparedStatement, boolean isReadonly, Map<String, Object> extParams) {
        super("", username, password, host, port, false, "", isReadonly, enableTurnOffPreparedStatement, extParams);
        this.sid = sid;
        this.serviceName = serviceName;
        this.jdbcUrl = jdbcUrl;
    }

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig detailConfig) {
        if (!(detailConfig instanceof OracleDatasourceConfig newConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE",
                    detailConfig.getClass().getSimpleName());
        }

        return OracleDatasourceConfig.builder()
                .username(newConfig.getUsername())
                .password(ObjectUtils.firstNonNull(newConfig.getPassword(), getPassword()))
                .host(newConfig.getHost())
                .port(newConfig.getPort())
                .jdbcUrl(newConfig.getJdbcUrl())
                .sid(newConfig.getSid())
                .serviceName(newConfig.getServiceName())
                .enableTurnOffPreparedStatement(newConfig.isEnableTurnOffPreparedStatement())
                .isReadonly(newConfig.isReadonly())
                .extParams(newConfig.getExtParams())
                .build();
    }

    public String getSid() {
        return sid;
    }

    public String getServiceName() {
        return serviceName;
    }

    public String getJdbcUrl() {
        if (StringUtils.isNotBlank(jdbcUrl)) {
            return jdbcUrl;
        }
        if (StringUtils.isNotBlank(sid)) {
            return String.format("jdbc:oracle:thin:@%s:%s:%s", getHost(), getPort(), getSid());
        }
        return String.format("jdbc:oracle:thin:@//%s:%s/%s", getHost(), getPort(), getServiceName());
    }

    @Override
    protected long defaultPort() {
        return 1521;
    }

}
