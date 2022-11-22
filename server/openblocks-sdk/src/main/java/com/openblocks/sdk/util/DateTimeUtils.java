package com.openblocks.sdk.util;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.apache.commons.lang3.time.DateFormatUtils;

public class DateTimeUtils {

    public static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static String format(Date date) {
        return DateFormatUtils.format(date, "yyyy-MM-dd");
    }

    public static Instant toInstant(Date date) {
        return Instant.ofEpochMilli(date.getTime());
    }

    public static Instant toInstant(Object o) {
        if (o instanceof Instant instant) {
            return instant;
        }
        if (o instanceof Date date) {
            return toInstant(date);
        }
        return null;
    }
}
