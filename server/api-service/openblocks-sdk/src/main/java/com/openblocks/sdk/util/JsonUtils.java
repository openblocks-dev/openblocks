package com.openblocks.sdk.util;

import static com.openblocks.sdk.auth.constants.AuthTypeConstants.FORM;
import static com.openblocks.sdk.auth.constants.AuthTypeConstants.GITHUB;
import static com.openblocks.sdk.auth.constants.AuthTypeConstants.GOOGLE;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.jsontype.NamedType;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import com.openblocks.sdk.auth.EmailAuthConfig;
import com.openblocks.sdk.auth.Oauth2SimpleAuthConfig;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class JsonUtils {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    static {
        OBJECT_MAPPER.registerModule(new ParameterNamesModule(JsonCreator.Mode.PROPERTIES));
        OBJECT_MAPPER.registerModule(new JavaTimeModule());
        OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        OBJECT_MAPPER.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        // register sub types
        OBJECT_MAPPER.registerSubtypes(new NamedType(EmailAuthConfig.class, FORM));
        OBJECT_MAPPER.registerSubtypes(new NamedType(Oauth2SimpleAuthConfig.class, GITHUB));
        OBJECT_MAPPER.registerSubtypes(new NamedType(Oauth2SimpleAuthConfig.class, GOOGLE));
    }

    public static final JsonNode EMPTY_JSON_NODE = createObjectNode();

    private static final ObjectWriter WRITER = OBJECT_MAPPER.writer();

    public static ObjectMapper getObjectMapper() {
        return OBJECT_MAPPER;
    }

    public static String toJson(Object obj) {
        try {
            return WRITER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return "";
        }
    }

    public static String toJsonSafely(Object obj, Class<?> viewClass) {
        try {
            return OBJECT_MAPPER.writerWithView(viewClass).writeValueAsString(obj);
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
            return OBJECT_MAPPER.readValue(obj, tClass);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return null;
        }
    }

    public static <T> T fromJsonSafely(String obj, TypeReference<T> valueTypeRef, @Nullable T defaultValue) {
        try {
            return OBJECT_MAPPER.readValue(obj, valueTypeRef);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", valueTypeRef.getType().getTypeName(), e);
            return defaultValue;
        }
    }

    public static <T> T fromJsonQuietly(String obj, Class<T> tClass) {
        try {
            return OBJECT_MAPPER.readValue(obj, tClass);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    public static List<Object> fromJsonList(String obj) {
        return fromJsonList(obj, Object.class);
    }

    public static <T> List<T> fromJsonList(String obj, Class<T> tClass) {
        try {
            CollectionType javaType = OBJECT_MAPPER.getTypeFactory().constructCollectionType(List.class, tClass);
            return OBJECT_MAPPER.readValue(obj, javaType);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return null;
        }
    }

    public static <T> Set<T> fromJsonSet(String obj, Class<T> tClass) {
        try {
            CollectionType javaType = OBJECT_MAPPER.getTypeFactory().constructCollectionType(Set.class, tClass);
            return OBJECT_MAPPER.readValue(obj, javaType);
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
            MapType mapType = OBJECT_MAPPER.getTypeFactory().constructMapType(Map.class, kClass, vClass);
            return OBJECT_MAPPER.readValue(obj, mapType);
        } catch (JsonProcessingException e) {
            log.error("fail to print json of class type: {}", obj.getClass().getSimpleName(), e);
            return null;
        }
    }

    public static JsonNode readTree(byte[] body) throws JsonProcessingException {
        return OBJECT_MAPPER.readTree(new String(body, StandardCharsets.UTF_8));
    }

    public static JsonNode readTree(String value) throws JsonProcessingException {
        return OBJECT_MAPPER.readTree(value);
    }

    public static JsonNode valueToTree(Object value) {
        return OBJECT_MAPPER.valueToTree(value);
    }

    public static ObjectNode createObjectNode() {
        return OBJECT_MAPPER.createObjectNode();
    }

    public static ArrayNode createArrayNode() {
        return OBJECT_MAPPER.createArrayNode();
    }

    public static Object jsonNodeToObject(JsonNode jsonNode) {
        try {
            return OBJECT_MAPPER.treeToValue(jsonNode, Object.class);
        } catch (JsonProcessingException e) {
            log.error("jsonNode to object error ", e);
            return null;
        }
    }
}
