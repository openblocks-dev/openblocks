package com.openblocks.plugin.mysql;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.openblocks.plugin.sql.SqlBasedConnector;
import com.openblocks.sdk.plugin.mysql.MysqlDatasourceConfig;
import com.zaxxer.hikari.HikariConfig;

@Extension
public class MysqlConnector extends SqlBasedConnector<MysqlDatasourceConfig> {

    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";

    public MysqlConnector() {
        super(50);
    }

    @Override
    protected String getJdbcDriver() {
        return JDBC_DRIVER;
    }

    @Override
    protected void setUpConfigs(MysqlDatasourceConfig datasourceConfig, HikariConfig config) {
        // Set authentication properties
        String username = datasourceConfig.getUsername();
        if (StringUtils.isNotEmpty(username)) {
            config.setUsername(username);
        }
        String password = datasourceConfig.getPassword();
        if (StringUtils.isNotEmpty(password)) {
            config.setPassword(password);
        }

        String host = datasourceConfig.getHost();
        long port = datasourceConfig.getPort();
        String database = datasourceConfig.getDatabase();
        String url = "jdbc:mysql://" + host + ":" + port + "/" + (isNotBlank(database) ? database : "");
        config.setJdbcUrl(url);

        config.addDataSourceProperty("zeroDateTimeBehavior", "convertToNull");
        config.addDataSourceProperty("allowMultiQueries", "true");

        if (datasourceConfig.isUsingSsl()) {
            config.addDataSourceProperty("useSSL", "true");
            config.addDataSourceProperty("requireSSL", "true");
        } else {
            config.addDataSourceProperty("useSSL", "false");
            config.addDataSourceProperty("requireSSL", "false");
        }
        config.setReadOnly(datasourceConfig.isReadonly());
    }
}
