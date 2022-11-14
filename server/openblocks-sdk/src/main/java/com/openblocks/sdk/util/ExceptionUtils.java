package com.openblocks.sdk.util;

import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.exception.PluginError;
import com.openblocks.sdk.exception.PluginException;

import reactor.core.publisher.Mono;

public class ExceptionUtils {

    public static <T> Mono<T> deferredError(BizError errorCode, String messageKey, Object... args) {
        return Mono.defer(() -> Mono.error(new BizException(errorCode, messageKey, args)));
    }

    public static <T> Mono<T> ofError(BizError errorCode, String messageKey, Object... args) {
        return Mono.error(new BizException(errorCode, messageKey, args));
    }

    public static BizException ofException(BizError errorCode, String messageKey, Object... args) {
        return new BizException(errorCode, messageKey, args);
    }

    public static <T> Mono<T> ofPluginError(PluginError error, String messageKey, Object... args) {
        return Mono.error(ofPluginException(error, messageKey, args));
    }

    public static PluginException ofPluginException(PluginError error, String messageKey, Object... args) {
        return new PluginException(error, messageKey, args);
    }
}
