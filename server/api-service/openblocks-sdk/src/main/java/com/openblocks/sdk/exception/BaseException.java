package com.openblocks.sdk.exception;

/**
 * marker interface
 */
public class BaseException extends RuntimeException {
    public BaseException(String message) {
        super(message);
    }
}
