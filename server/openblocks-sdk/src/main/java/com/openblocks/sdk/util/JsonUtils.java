package com.openblocks.sdk.util;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class JsonUtils {

    private static final ObjectMapper objectMapper;

    static {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new ParameterNamesModule(JsonCreator.Mode.PROPERTIES));
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

    public static final JsonNode EMPTY_JSON_NODE = createObjectNode();

    private static final ObjectWriter WRITER = objectMapper.writer();

    public static String toJson(Object obj) {
        try {
            return WRITER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return "";
        }
    }

    public static String toJsonThrows(Object obj) throws JsonProcessingException {
        return WRITER.writeValueAsString(obj);
    }

    public static <T> T fromJson(String obj, Class<T> tClass) {
        try {
            return objectMapper.readValue(obj, tClass);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return null;
        }
    }

    public static <T> T fromJsonQuietly(String obj, Class<T> tClass) {
        try {
            return objectMapper.readValue(obj, tClass);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    public static List<Object> fromJsonList(String obj) {
        return fromJsonList(obj, Object.class);
    }

    public static <T> List<T> fromJsonList(String obj, Class<T> tClass) {
        try {
            CollectionType javaType = objectMapper.getTypeFactory().constructCollectionType(List.class, tClass);
            return objectMapper.readValue(obj, javaType);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return null;
        }
    }

    public static <T> Set<T> fromJsonSet(String obj, Class<T> tClass) {
        try {
            CollectionType javaType = objectMapper.getTypeFactory().constructCollectionType(Set.class, tClass);
            return objectMapper.readValue(obj, javaType);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return null;
        }
    }

    public static Map<String, Object> fromJsonMap(String obj) {
        return fromJsonMap(obj, String.class, Object.class);
    }

    public static <K, V> Map<K, V> fromJsonMap(String obj, Class<K> kClass, Class<V> vClass) {
        try {
            MapType mapType = objectMapper.getTypeFactory().constructMapType(Map.class, kClass, vClass);
            return objectMapper.readValue(obj, mapType);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return null;
        }
    }

    public static JsonNode readTree(byte[] body) throws JsonProcessingException {
        return objectMapper.readTree(new String(body, StandardCharsets.UTF_8));
    }

    public static JsonNode readTree(String value) throws JsonProcessingException {
        return objectMapper.readTree(value);
    }

    public static JsonNode valueToTree(Object value) {
        return objectMapper.valueToTree(value);
    }

    public static ObjectNode createObjectNode() {
        return objectMapper.createObjectNode();
    }

    public static ArrayNode createArrayNode() {
        return objectMapper.createArrayNode();
    }

    public static Object jsonNodeToObject(JsonNode jsonNode) {
        try {
            return objectMapper.treeToValue(jsonNode, Object.class);
        } catch (JsonProcessingException e) {
            log.error("jsonNode to object error ", e);
            return null;
        }
    }
}
