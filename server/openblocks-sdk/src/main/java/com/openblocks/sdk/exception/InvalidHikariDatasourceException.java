package com.openblocks.sdk.exception;

import static com.openblocks.sdk.exception.PluginCommonError.CONNECTION_ERROR;

public class InvalidHikariDatasourceException extends PluginException {

    public InvalidHikariDatasourceException() {
        super(CONNECTION_ERROR, "CONNECTION_ERROR", "hikari datasource closed.");
    }
}
