package com.openblocks.sdk.exception;

import java.util.Locale;

import com.google.common.base.Preconditions;
import com.openblocks.sdk.util.LocaleUtils;

import lombok.Getter;

@Getter
public class PluginException extends BaseException {
    private final PluginError error;
    private final String messageKey;
    private final transient Object[] args;

    public PluginException(PluginError errorCode, String messageKey, Object... args) {
        super(LocaleUtils.getMessage(Locale.ENGLISH, messageKey, args));
        Preconditions.checkNotNull(errorCode);
        this.error = errorCode;
        this.messageKey = messageKey;
        this.args = args;
    }

    @Override
    public String getMessage() {
        return LocaleUtils.getMessage(Locale.ENGLISH, messageKey, args);
    }

    public String getLocaleMessage(Locale locale) {
        return LocaleUtils.getMessage(locale, messageKey, args);
    }
}
