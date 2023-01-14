package com.openblocks.sdk.config.dynamic;

public interface ConfigCenter {

    ConfigInstance asset();

    ConfigInstance mysqlPlugin();

    ConfigInstance clickHousePlugin();

    ConfigInstance mongoPlugin();

    ConfigInstance postgresPlugin();

    ConfigInstance oraclePlugin();

    ConfigInstance threshold();

    ConfigInstance proxy();

    ConfigInstance auth();

    ConfigInstance datasource();

    ConfigInstance deployment();

    ConfigInstance application();
}
