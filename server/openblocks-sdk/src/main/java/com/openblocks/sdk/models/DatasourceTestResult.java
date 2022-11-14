package com.openblocks.sdk.models;

import java.util.Locale;
import java.util.concurrent.TimeoutException;

import javax.annotation.Nonnull;

import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.util.LocaleUtils;

public class DatasourceTestResult {

    private static final DatasourceTestResult TEST_SUCCESS = new DatasourceTestResult(null);

    private final LocaleMessage localeErrorMsg;

    private DatasourceTestResult(LocaleMessage localeErrorMsg) {
        this.localeErrorMsg = localeErrorMsg;
    }

    public static DatasourceTestResult testSuccess() {
        return TEST_SUCCESS;
    }

    public static DatasourceTestResult testFail(@Nonnull LocaleMessage localeErrorMessage) {
        return new DatasourceTestResult(localeErrorMessage);
    }

    public static DatasourceTestResult testFail(@Nonnull String rawErrorMsg) {
        return new DatasourceTestResult(new LocaleMessage("DATASOURCE_TEST_GENERIC_ERROR", rawErrorMsg));
    }

    public static DatasourceTestResult testFail(Throwable e) {
        if (e instanceof PluginException pluginException) {
            LocaleMessage localeMessage = new LocaleMessage(pluginException.getMessageKey(), pluginException.getArgs());
            return new DatasourceTestResult(localeMessage);
        }

        if (e instanceof TimeoutException) {
            return new DatasourceTestResult(new LocaleMessage("DATASOURCE_TEST_TIMEOUT_ERROR"));
        }

        return new DatasourceTestResult(new LocaleMessage("DATASOURCE_TEST_GENERIC_ERROR", e.getMessage()));
    }

    public boolean isSuccess() {
        return localeErrorMsg == null;
    }

    public String getInvalidMessage(Locale locale) {
        return LocaleUtils.getMessage(locale, localeErrorMsg);
    }

}
