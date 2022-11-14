package com.openblocks.domain.util;

import com.querydsl.core.types.Path;

public class QueryDslUtils {

    public static String fieldName(Path<?> path) {
        return path != null ? path.getMetadata().getName() : null;
    }

}
