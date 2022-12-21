package com.openblocks.sdk.util;

import static reactor.core.Exceptions.throwIfFatal;

import com.openblocks.sdk.exception.BaseException;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.exception.PluginError;
import com.openblocks.sdk.exception.PluginException;

import reactor.core.publisher.Mono;

public final class ExceptionUtils {

    private ExceptionUtils() {
    }

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

    public static BaseException wrapException(PluginError error, String messageKey, Throwable e) {
        BaseException baseException = castAsBaseException(e);
        if (baseException != null) {
            return baseException;
        }
        return ofPluginException(error, messageKey, e.getMessage());
    }

    public static BaseException wrapException(BizError error, String messageKey, Throwable e) {
        BaseException baseException = castAsBaseException(e);
        if (baseException != null) {
            return baseException;
        }
        return new BizException(error, messageKey, e.getMessage());
    }

    public static <T> Mono<T> propagateError(PluginError error, String messageKey, Throwable e) {
        BaseException baseException = castAsBaseException(e);
        if (baseException != null) {
            return Mono.error(baseException);
        }
        return ofPluginError(error, messageKey, e.getMessage());
    }

    public static <T> Mono<T> propagateError(BizError error, String messageKey, Throwable e) {
        BaseException baseException = castAsBaseException(e);
        if (baseException != null) {
            return Mono.error(baseException);
        }
        return ofError(error, messageKey, e.getMessage());
    }

    private static BaseException castAsBaseException(Throwable e) {
        throwIfFatal(e);
        if (e instanceof BaseException baseException) {
            return baseException;
        }
        if (e.getCause() instanceof BaseException baseException) {
            return baseException;
        }
        return null;
    }

}
