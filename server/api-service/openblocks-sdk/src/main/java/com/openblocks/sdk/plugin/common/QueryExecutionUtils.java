package com.openblocks.sdk.plugin.common;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.collections4.MapUtils;

import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

public class QueryExecutionUtils {

    private static final Scheduler SHARED_SCHEDULER = Schedulers.newBoundedElastic(100,
            10000
            , "plugin-executor");

    public static Scheduler querySharedScheduler() {
        return SHARED_SCHEDULER;
    }

    public static List<String> getIdenticalColumns(List<String> columnNames) {

        Map<String, Long> columnFrequencies = columnNames
                .stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        return columnFrequencies.entrySet().stream()
                .filter(entry -> entry.getValue() > 1)
                .map(Entry::getKey)
                .collect(Collectors.toList());
    }

    public static Boolean validConfigurationPresentInFormData(Map<String, Object> formData, String field) {
        return getValueSafelyFromFormData(formData, field) != null;
    }

    @SuppressWarnings("unchecked")
    public static <T> T getValueSafelyFromFormData(Map<String, Object> formData, String field, Class<T> type,
            T defaultValue) {
        Object formDataValue = getValueSafelyFromFormData(formData, field);
        return formDataValue != null ? (T) formDataValue : defaultValue;
    }

    @SuppressWarnings("unchecked")
    public static <T> T getValueSafelyFromFormData(Map<String, Object> formData, String field, Class<T> type) {
        return (T) (getValueSafelyFromFormData(formData, field));
    }

    public static String getStringValueSafelyFromFormData(Map<String, Object> formData, String field) {
        return getValueSafelyFromFormData(formData, field, String.class);
    }

    @SuppressWarnings("unchecked")
    public static Object getValueSafelyFromFormData(Map<String, Object> formData, String field) {
        if (MapUtils.isEmpty(formData)) {
            return null;
        }

        if (!field.contains(".")) {
            return formData.getOrDefault(field, null);
        }

        String[] fieldNames = field.split("\\.");

        Map<String, Object> nestedMap = (Map<String, Object>) formData.get(fieldNames[0]);

        String[] trimmedFieldNames = Arrays.copyOfRange(fieldNames, 1, fieldNames.length);
        String nestedFieldName = String.join(".", trimmedFieldNames);

        return getValueSafelyFromFormData(nestedMap, nestedFieldName);

    }

    public static Object getValueSafelyFromFormDataOrDefault(Map<String, Object> formData, String field, Object defaultValue) {

        Object value = getValueSafelyFromFormData(formData, field);

        if (value == null) {
            return defaultValue;
        }

        return value;
    }

    @SuppressWarnings("unchecked")
    public static void setValueSafelyInFormData(Map<String, Object> formData, String field, Object value) {

        if (formData == null) {
            formData = new HashMap<>();
        }

        if (!field.contains(".")) {
            formData.put(field, value);
            return;
        }

        String[] fieldNames = field.split("\\.");

        formData.putIfAbsent(fieldNames[0], new HashMap<String, Object>());

        Map<String, Object> nestedMap = (Map<String, Object>) formData.get(fieldNames[0]);

        String[] trimmedFieldNames = Arrays.copyOfRange(fieldNames, 1, fieldNames.length);
        String nestedFieldName = String.join(".", trimmedFieldNames);

        setValueSafelyInFormData(nestedMap, nestedFieldName, value);
    }

}
