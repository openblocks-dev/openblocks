package com.openblocks.plugin.mssql;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

import org.apache.commons.lang3.StringUtils;
import org.pf4j.Extension;

import com.openblocks.plugin.mssql.model.MssqlDatasourceConfig;
import com.openblocks.plugin.sql.SqlBasedConnector;
import com.zaxxer.hikari.HikariConfig;

@Extension
public class MssqlConnector extends SqlBasedConnector<MssqlDatasourceConfig> {
    private static final String JDBC_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    protected MssqlConnector() {
        super(50);
    }

    @Override
    protected String getJdbcDriver() {
        return JDBC_DRIVER;
    }

    @Override
    protected void setUpConfigs(MssqlDatasourceConfig datasourceConfig, HikariConfig config) {
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

        StringBuilder urlBuilder = new StringBuilder();
        urlBuilder.append("jdbc:sqlserver://");

        // SQL Server supports instanceName like this: jdbc:sqlserver://INNOWAVE-99\SQLEXPRESS01;databaseName=EDS
        // And when host contains instanceName, port should be ignored, see https://stackoverflow.com/a/40830281/2139436
        if (host.contains("\\")) {
            urlBuilder.append(host)
                    .append(";");
        } else {
            urlBuilder.append(host)
                    .append(":")
                    .append(port)
                    .append(";");
        }


        if (isNotBlank(database)) {
            urlBuilder.append("database=")
                    .append(database)
                    .append(";");
        }

        if (isNotBlank(username)) {
            urlBuilder.append("user=")
                    .append(username)
                    .append(";");
        }

        if (isNotBlank(password)) {
            urlBuilder.append("password=")
                    .append(password)
                    .append(";");
        }

        urlBuilder.append("encrypt=")
                .append(datasourceConfig.isUsingSsl())
                .append(";");

        config.setJdbcUrl(urlBuilder.toString());
        config.setReadOnly(datasourceConfig.isReadonly());
    }

}
