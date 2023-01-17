package com.openblocks.sdk.config.dynamic;

import java.util.function.Function;
import java.util.function.Supplier;

public interface Conf<T> extends Supplier<T> {

    default <K> Conf<K> then(Function<T, K> mapper) {
        return () -> mapper.apply(this.get());
    }
}
