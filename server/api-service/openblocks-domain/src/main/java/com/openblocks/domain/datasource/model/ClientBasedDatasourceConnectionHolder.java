package com.openblocks.domain.datasource.model;

import com.openblocks.sdk.exception.InvalidHikariDatasourceException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ClientBasedDatasourceConnectionHolder implements DatasourceConnectionHolder {

    private volatile boolean clientErrorOccurred;

    private final Object connection;

    public ClientBasedDatasourceConnectionHolder(Object connection) {
        this.connection = connection;
    }

    public boolean isStale() {
        return clientErrorOccurred;
    }

    @Override
    public Object connection() {
        return connection;
    }

    @Override
    public void onQueryError(Throwable throwable) {
        if (throwable instanceof InvalidHikariDatasourceException) {
            log.error("client based connection error.", throwable);
            clientErrorOccurred = true;
        }
    }
}
