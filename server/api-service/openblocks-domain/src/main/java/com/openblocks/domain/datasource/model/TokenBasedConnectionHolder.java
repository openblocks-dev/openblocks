package com.openblocks.domain.datasource.model;

import java.time.Instant;

public class TokenBasedConnectionHolder implements DatasourceConnectionHolder {

    public static final TokenBasedConnectionHolder EMPTY_CONNECTION = new TokenBasedConnectionHolder(null);

    private final TokenBasedConnection connection;

    public TokenBasedConnectionHolder(TokenBasedConnection tokenBasedConnection) {
        this.connection = tokenBasedConnection;
    }

    public boolean isStale(Instant datasourceUpdateTime) {

        if (connection == null) {
            return true;
        }

        Instant connectionUpdateTime = connection.getUpdatedAt();
        if (datasourceUpdateTime != null && datasourceUpdateTime.isAfter(connectionUpdateTime)) {
            return true;
        }

        return connection.isStale();

    }

    @Override
    public void onQueryError(Throwable throwable) {
    }

    @Override
    public Object connection() {
        return connection.getTokenDetail();
    }

}
