package com.openblocks.plugin.oracle;

import static org.apache.commons.lang3.StringUtils.isAllBlank;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.openblocks.plugin.oracle.model.OracleDatasourceConfig;
import com.openblocks.plugin.sql.SqlBasedConnector;
import com.zaxxer.hikari.HikariConfig;

@Extension
public class OracleConnector extends SqlBasedConnector<OracleDatasourceConfig> {

    private static final String JDBC_DRIVER = "oracle.jdbc.OracleDriver";

    public OracleConnector() {
        super(50);
    }

    @Override
    protected String getJdbcDriver() {
        return JDBC_DRIVER;
    }

    @Override
    protected void setUpConfigs(OracleDatasourceConfig oracleDatasourceConfig, HikariConfig config) {

        config.setDriverClassName(JDBC_DRIVER);
        //username & password
        if (StringUtils.isNotBlank(oracleDatasourceConfig.getUsername())) {
            config.setUsername(oracleDatasourceConfig.getUsername());
        }
        if (StringUtils.isNotBlank(oracleDatasourceConfig.getPassword())) {
            config.setPassword(oracleDatasourceConfig.getPassword());
        }
        config.setJdbcUrl(oracleDatasourceConfig.getJdbcUrl());

        config.setReadOnly(oracleDatasourceConfig.isReadonly());
    }

    @Override
    public Set<String> validateConfig(OracleDatasourceConfig connectionConfig) {
        Set<String> validates = new HashSet<>();
        if (isBlank(connectionConfig.getJdbcUrl())
                && (isBlank(connectionConfig.getHost()) || isAllBlank(connectionConfig.getSid(), connectionConfig.getServiceName()))) {
            validates.add("INVALID_JDBC_URL_CONFIG");
        }
        return validates;
    }
}
