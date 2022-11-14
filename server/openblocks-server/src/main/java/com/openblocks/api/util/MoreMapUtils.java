package com.openblocks.api.util;

import java.util.List;
import java.util.Map;

/**
 * add more methods in addition to {@link org.apache.commons.collections4.MapUtils}
 */
public class MoreMapUtils {

    public static <K, T> List<T> getList(final Map<? super K, ?> map, final K key, final List<T> defaultValue) {
        List<T> answer = getList(map, key);
        if (answer == null) {
            answer = defaultValue;
        }
        return answer;
    }

    @SuppressWarnings("unchecked")
    public static <K, T> List<T> getList(final Map<? super K, ?> map, final K key) {
        if (map != null) {
            final Object answer = map.get(key);
            if (answer instanceof List<?>) {
                return (List<T>) answer;
            }
        }
        return null;
    }
}
