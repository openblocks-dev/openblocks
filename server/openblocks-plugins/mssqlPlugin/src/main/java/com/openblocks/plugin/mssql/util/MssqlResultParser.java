package com.openblocks.plugin.mssql.util;

import static com.openblocks.sdk.util.DateTimeUtils.DATE_TIME_FORMAT;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import com.google.common.collect.ImmutableSet;

public class MssqlResultParser {

    private static final Set<String> TIMESTAMP_TYPES = ImmutableSet.of("smalldatetime", "timestamp", "datetime", "datetime2");

    public static Map<String, Object> parseRowValue(ResultSet resultSet, ResultSetMetaData metaData, int colCount) throws SQLException {
        Map<String, Object> row = new LinkedHashMap<>();
        for (int i = 1; i <= colCount; i++) {
            String typeName = metaData.getColumnTypeName(i);
            Object value = getValue(resultSet, i, typeName);
            row.put(metaData.getColumnName(i), value);
        }
        return row;
    }

    private static Object getValue(ResultSet resultSet, int i, String typeName) throws SQLException {

        if (resultSet.getObject(i) == null) {
            return null;
        }

        if ("date".equalsIgnoreCase(typeName) || "time".equalsIgnoreCase(typeName)) {
            return resultSet.getString(i);
        }

        if (TIMESTAMP_TYPES.contains(typeName)) {
            return DATE_TIME_FORMAT.format(resultSet.getTimestamp(i).toLocalDateTime());
        }

        if ("datetimeoffset".equalsIgnoreCase(typeName)) {
            return DateTimeFormatter.ISO_DATE_TIME.format(resultSet.getObject(i, OffsetDateTime.class));
        }

        return resultSet.getObject(i);
    }
}
