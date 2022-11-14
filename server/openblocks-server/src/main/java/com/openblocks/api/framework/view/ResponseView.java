package com.openblocks.api.framework.view;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.openblocks.sdk.exception.BizError;

import lombok.Getter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class ResponseView<T> {

    public static final int SUCCESS = 1;
    private final int code;
    private final String message;
    private final T data;

    protected ResponseView(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> ResponseView<T> success(int code, T data) {
        return new ResponseView<>(code, "", data);
    }

    public static <T> ResponseView<T> success(T data) {
        return success(SUCCESS, data);
    }

    public static <T> ResponseView<T> error(int code, String message) {
        return new ResponseView<>(code, message, null);
    }

    public static <T> ResponseView<T> error(int code, String message, T data) {
        return new ResponseView<>(code, message, data);
    }

    public boolean isSuccess() {
        return this.code == SUCCESS || this.code == BizError.REDIRECT.getBizErrorCode();
    }
}
