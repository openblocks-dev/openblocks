package com.openblocks.sdk.util;

import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.exception.PluginError;
import com.openblocks.sdk.exception.PluginException;

public class Preconditions {

    public static void check(boolean condition, BizError errorCode, String messageKey, Object... args) {
        if (!condition) {
            throw new BizException(errorCode, messageKey, args);
        }
    }

    public static void check(boolean condition, PluginError errorCode, String messageKey, Object... args) {
        if (!condition) {
            throw new PluginException(errorCode, messageKey, args);
        }
    }
}
