package com.openblocks.plugin.postgres;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.openblocks.plugin.postgres.model.PostgresDatasourceConfig;
import com.openblocks.plugin.sql.SqlBasedConnector;
import com.zaxxer.hikari.HikariConfig;

@Extension
public class PostgresConnector extends SqlBasedConnector<PostgresDatasourceConfig> {

    public PostgresConnector() {
        super(100);
    }

    @Override
    protected String getJdbcDriver() {
        return "org.postgresql.Driver";
    }

    @Override
    protected void setUpConfigs(PostgresDatasourceConfig datasourceConfig, HikariConfig config) {

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
        String url = "jdbc:postgresql://" + host + ":" + port + "/" + (isNotBlank(database) ? database : "");
        config.setJdbcUrl(url);

        if (datasourceConfig.isUsingSsl()) {
            config.addDataSourceProperty("ssl", "true");
            config.addDataSourceProperty("sslmode", "require");
        } else {
            config.addDataSourceProperty("ssl", "false");
            config.addDataSourceProperty("sslmode", "disable");
        }

        if (datasourceConfig.isReadonly()) {
            config.setReadOnly(true);
            config.addDataSourceProperty("readOnlyMode", "always");
        } else {
            config.setReadOnly(false);
        }
    }
}
