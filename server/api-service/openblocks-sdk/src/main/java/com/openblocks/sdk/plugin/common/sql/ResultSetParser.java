package com.openblocks.sdk.plugin.common.sql;

import static com.openblocks.sdk.util.DateTimeUtils.DATE_TIME_FORMAT;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.jetbrains.annotations.Nullable;

/**
 * sql result parser
 */
public class ResultSetParser {

    public static final String DATE_COLUMN_TYPE_NAME = "date";
    public static final String DATETIME_COLUMN_TYPE_NAME = "datetime";
    public static final String TIMESTAMP_COLUMN_TYPE_NAME = "timestamp";
    public static final String YEAR_COLUMN_TYPE_NAME = "year";

    public static List<Map<String, Object>> parseRows(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
        int columnCount = metaData.getColumnCount();
        List<Map<String, Object>> result = new ArrayList<>();
        while (resultSet.next()) {
            Map<String, Object> row = parseRow(resultSet, metaData, columnCount);
            result.add(row);
        }
        return result;
    }

    private static Map<String, Object> parseRow(ResultSet resultSet, ResultSetMetaData metaData, int colCount) throws SQLException {
        Map<String, Object> row = new LinkedHashMap<>(colCount);

        // the first column is 1, the second is 2, ...
        for (int i = 1; i <= colCount; i++) {
            String typeName = metaData.getColumnTypeName(i);
            Object value = getValue(resultSet, i, typeName);
            row.put(metaData.getColumnLabel(i), value);
        }
        return row;
    }

    @Nullable
    private static Object getValue(ResultSet resultSet, int i, String typeName) throws SQLException {

        // Special handle for this issue:
        // com.mysql.cj.exceptions.DataReadException: The value '30:00:00' is an invalid TIME value.
        //  JDBC Time objects represent a wall-clock time and not a duration as MySQL treats them. If
        //  you are treating this type as a duration, consider retrieving this value as a string and
        //  dealing with it according to your requirements.
        if (typeName.equalsIgnoreCase("TIME") && isDuration(resultSet, i)) {
            return resultSet.getString(i);
        }

        if (resultSet.getObject(i) == null) {
            return null;
        }
        if (DATE_COLUMN_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return DateTimeFormatter.ISO_DATE.format(resultSet.getDate(i).toLocalDate());
        }
        if (DATETIME_COLUMN_TYPE_NAME.equalsIgnoreCase(typeName)
                || TIMESTAMP_COLUMN_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return DATE_TIME_FORMAT.format(LocalDateTime.of(resultSet.getDate(i).toLocalDate(), resultSet.getTime(i).toLocalTime()));
        }
        if (YEAR_COLUMN_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return resultSet.getDate(i).toLocalDate().getYear();
        }
        return resultSet.getObject(i);
    }

    private static boolean isDuration(ResultSet resultSet, int i) {
        try {
            resultSet.getObject(i);
        } catch (SQLException e) {
            return e.getMessage().contains("JDBC Time objects represent a wall-clock");
        }
        return false;
    }

    public static List<String> parseColumns(ResultSetMetaData metaData) throws SQLException {
        return IntStream
                .range(1, metaData.getColumnCount() + 1) // JDBC column indexes start from 1
                .mapToObj(i -> {
                    try {
                        return metaData.getColumnLabel(i);
                    } catch (SQLException exception) {
                        throw new RuntimeException(exception);
                    }
                })
                .collect(Collectors.toList());
    }
}
