package com.openblocks.sdk.test;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;

import com.google.common.annotations.VisibleForTesting;
import com.jayway.jsonpath.JsonPath;
import com.openblocks.sdk.util.JsonUtils;

@SuppressWarnings({"unused"})
@VisibleForTesting
public class JsonFileReader {

    public static <T> T read(Class<?> clazz, String jsonPath) {
        String path = buildPath(clazz);
        try {
            String json = IOUtils.toString(new FileReader(path));
            return JsonPath.read(json, jsonPath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static <T> T read(String classpath, String jsonPath) {
        String path = buildPath(classpath);
        try {
            String json = IOUtils.toString(new FileReader(path));
            return JsonPath.read(json, jsonPath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static List<Object> readList(String classpath) {
        String path = buildPath(classpath);
        try {
            String json = IOUtils.toString(new FileReader(path));
            return JsonUtils.fromJsonList(json);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Map<String, Object> readMap(Class<?> clazz) {
        String path = buildPath(clazz);
        try {
            String json = IOUtils.toString(new FileReader(path));
            return JsonUtils.fromJsonMap(json);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Map<String, Object> readMap(String classpath) {
        String path = buildPath(classpath);
        try {
            String json = IOUtils.toString(new FileReader(path));
            return JsonUtils.fromJsonMap(json);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String buildPath(String classpath) {
        return String.format("./src/test/java/%s", classpath);
    }

    private static String buildPath(Class<?> clazz) {
        String path = clazz.getCanonicalName().replace(".", "/");
        return buildPath(path + ".json");
    }
}
