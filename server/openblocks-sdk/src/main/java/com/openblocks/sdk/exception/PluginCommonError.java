package com.openblocks.sdk.exception;

public enum PluginCommonError implements PluginError {

    // general
    QUERY_EXECUTION_ERROR(ErrorLogType.VERBOSE),
    QUERY_ARGUMENT_ERROR,
    QUERY_EXECUTION_TIMEOUT,

    INVALID_QUERY_SETTINGS,
    DATASOURCE_GET_STRUCTURE_ERROR,
    DATASOURCE_ARGUMENT_ERROR,
    DATASOURCE_TEST_GENERIC_ERROR(ErrorLogType.VERBOSE),
    DATASOURCE_TIMEOUT_ERROR,
    JSON_PARSE_ERROR,

    SQL_IN_OPERATOR_PARSE_ERROR(ErrorLogType.VERBOSE),
    PREPARED_STATEMENT_BIND_PARAMETERS_ERROR,
    EXCEED_MAX_QUERY_TIMEOUT,

    CONNECTION_ERROR,

    // SQL GUI mode
    INVALID_GUI_SETTINGS,
    INVALID_INSERT_COMMAND,
    INVALID_UPDATE_COMMAND,
    INVALID_UPSERT_COMMAND,
    INVALID_BULK_INSERT_COMMAND,
    INVALID_IN_OPERATOR_SETTINGS,
    ;

    private final ErrorLogType logType;

    PluginCommonError(ErrorLogType logType) {
        this.logType = logType;
    }

    PluginCommonError() {
        this(ErrorLogType.SIMPLE);
    }


    @Override
    public boolean logVerbose() {
        return logType == ErrorLogType.VERBOSE;
    }
}
