package com.openblocks.sdk.util;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;

public class EnumUtils {

    public static <T extends Enum<T>> void checkDuplicates(T[] values, Function<T, Integer> valueExtractor) {
        Set<Integer> seen = new HashSet<>();
        for (T enum0 : values) {
            boolean add = seen.add(valueExtractor.apply(enum0));
            if (!add) {
                throw new RuntimeException("duplicated enum value: " + enum0);
            }
        }
    }
}
