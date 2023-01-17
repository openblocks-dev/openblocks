package com.openblocks.sdk.models;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import com.openblocks.sdk.exception.PluginError;
import com.openblocks.sdk.exception.PluginException;

import lombok.Getter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class QueryExecutionResult {

    private static final String CODE_FAILED = "FAILED";
    private static final String CODE_OK = "OK";

    private String queryCode = CODE_OK;
    private JsonNode headers;
    private Object data;
    @JsonIgnore
    private String messageKey;
    @JsonIgnore
    private Object[] messageArgs;
    @JsonIgnore
    private List<LocaleMessage> hintLocaleMessages = new ArrayList<>();
    private String message;

    private QueryExecutionResult() {
    }

    public static QueryExecutionResult success(Object data) {
        QueryExecutionResult result = new QueryExecutionResult();
        result.data = data;
        return result;
    }

    public static QueryExecutionResult success(Object data, List<LocaleMessage> hintLocalMessages) {
        QueryExecutionResult result = new QueryExecutionResult();
        result.data = data;
        result.hintLocaleMessages = hintLocalMessages;
        return result;
    }

    public static QueryExecutionResult error(PluginException exception) {
        return error(exception.getError(), exception.getMessageKey(), exception.getArgs());
    }

    public static QueryExecutionResult error(PluginError bizError, String messageKey, Object... args) {
        QueryExecutionResult result = new QueryExecutionResult();
        result.queryCode = bizError.name();
        result.messageKey = messageKey;
        result.messageArgs = args;
        return result;
    }

    public static QueryExecutionResult error(PluginError bizError, String messageKey) {
        QueryExecutionResult result = new QueryExecutionResult();
        result.queryCode = bizError.name();
        result.messageKey = messageKey;
        return result;
    }

    public static QueryExecutionResult errorWithMessage(String message) {
        QueryExecutionResult result = new QueryExecutionResult();
        result.queryCode = CODE_FAILED;
        result.message = message;
        return result;
    }

    public static QueryExecutionResult ofRestApiResult(HttpStatus httpStatus, JsonNode resultHeaders, Object body) {
        QueryExecutionResult result = new QueryExecutionResult();
        if (!httpStatus.is2xxSuccessful()) {
            result.queryCode = "HTTP" + httpStatus.name();
        }
        result.headers = resultHeaders;
        result.data = body;
        return result;
    }

    public boolean isSuccess() {
        return queryCode.equals(CODE_OK);
    }

    @JsonIgnore
    public LocaleMessage getLocaleMessage() {
        if (StringUtils.isBlank(messageKey)) {
            return null;
        }
        return new LocaleMessage(messageKey, messageArgs);
    }

    public List<LocaleMessage> getHintLocaleMessages() {
        return hintLocaleMessages;
    }
}
