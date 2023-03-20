package com.openblocks.plugin.snowflake;

import org.pf4j.Extension;

import com.openblocks.plugin.sql.SqlBasedConnector;
import com.zaxxer.hikari.HikariConfig;

@Extension
public class SnowflakeConnector extends SqlBasedConnector<SnowflakeDatasourceConfig> {

    private static final String JDBC_DRIVER = "net.snowflake.client.jdbc.SnowflakeDriver";

    public SnowflakeConnector() {
        super(50);
    }

    @Override
    protected String getJdbcDriver() {
        return JDBC_DRIVER;
    }

    @Override
    protected void setUpConfigs(SnowflakeDatasourceConfig datasourceConfig, HikariConfig config) {
        String host = datasourceConfig.getHost();
        String database = datasourceConfig.getDatabase();

        String url = "jdbc:snowflake://" + host + ".snowflakecomputing.com/";
        config.setJdbcUrl(url);
        config.addDataSourceProperty("db", database);
        config.addDataSourceProperty("user", datasourceConfig.getUsername());
        config.addDataSourceProperty("password", datasourceConfig.getPassword());
    }
}
