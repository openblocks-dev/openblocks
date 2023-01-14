package com.openblocks.sdk.plugin.common.sql;

import java.util.Properties;
import java.util.function.Supplier;

public class HikariPerfWrapper {
    private final Object hikariDataSource;
    private final Supplier<Integer> totalConnections;
    private final Supplier<Integer> idleConnections;
    private final Supplier<Integer> activeConnections;
    private final Supplier<Integer> awaitConnections;
    private final Supplier<Properties> datasourceProperties;
    private final Supplier<Properties> healthCheckProperties;

    private HikariPerfWrapper(Object hikariDataSource, Supplier<Integer> totalConnections,
            Supplier<Integer> idleConnections,
            Supplier<Integer> activeConnections,
            Supplier<Integer> awaitConnections, Supplier<Properties> datasourceProperties, Supplier<Properties> healthCheckProperties) {
        this.hikariDataSource = hikariDataSource;
        this.totalConnections = totalConnections;
        this.idleConnections = idleConnections;
        this.activeConnections = activeConnections;
        this.awaitConnections = awaitConnections;
        this.datasourceProperties = datasourceProperties;
        this.healthCheckProperties = healthCheckProperties;
    }

    public static HikariPerfWrapper wrap(Object hikariDataSource,
            Supplier<Integer> totalConnections,
            Supplier<Integer> idleConnections,
            Supplier<Integer> activeConnections,
            Supplier<Integer> awaitConnections,
            Supplier<Properties> datasourceProperties,
            Supplier<Properties> healthCheckProperties) {
        return new HikariPerfWrapper(hikariDataSource, totalConnections, idleConnections, activeConnections, awaitConnections, datasourceProperties,
                healthCheckProperties);
    }

    public Object getHikariDataSource() {
        return hikariDataSource;
    }

    public int getTotalConnections() {
        return totalConnections.get();
    }

    public int getIdleConnections() {
        return idleConnections.get();
    }

    public int getActiveConnections() {
        return activeConnections.get();
    }

    public int getWaitingConnections() {
        return awaitConnections.get();
    }

    public Properties getDatasourceProperties() {
        return datasourceProperties.get();
    }

    public Properties getHealthCheckProperties() {
        return healthCheckProperties.get();
    }
}
