package com.openblocks.sdk.exception;

import org.slf4j.helpers.MessageFormatter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ServerException extends BaseException {

    public ServerException(String messageTemplate, Object... args) {
        super(MessageFormatter.arrayFormat(messageTemplate, args, null).getMessage());
    }
}
