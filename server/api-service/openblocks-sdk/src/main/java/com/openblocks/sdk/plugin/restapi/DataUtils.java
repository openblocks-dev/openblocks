/**
 * Copyright 2021 Appsmith Inc.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * <p>
 */

// copied and adapted for rest api request
package com.openblocks.sdk.plugin.restapi;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.JSON_PARSE_ERROR;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.http.client.reactive.ClientHttpRequest;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Streams;
import com.google.gson.JsonSyntaxException;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.Property;
import com.openblocks.sdk.models.RestBodyFormFileData;
import com.openblocks.sdk.util.ExceptionUtils;
import com.openblocks.sdk.util.MustacheHelper;

import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import reactor.core.publisher.Mono;

public class DataUtils {

    private static DataUtils dataUtils;
    private final ObjectMapper objectMapper;

    public enum MultipartFormDataType {
        TEXT,
        FILE
    }

    private DataUtils() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

    public static DataUtils getInstance() {
        if (dataUtils == null) {
            dataUtils = new DataUtils();
        }
        return dataUtils;
    }

    public BodyInserter<?, ? super ClientHttpRequest> buildBodyInserter(List<Property> body, String contentType,
            boolean encodeParamsToggle) {
        if (body == null) {
            return BodyInserters.fromValue(new byte[0]);
        }
        switch (contentType) {
            case MediaType.APPLICATION_FORM_URLENCODED_VALUE:
                String formData = parseFormData(body, encodeParamsToggle);
                if ("".equals(formData)) {
                    return BodyInserters.fromValue(new byte[0]);
                }
                return BodyInserters.fromValue(formData);
            case MediaType.MULTIPART_FORM_DATA_VALUE:
                return parseMultipartFileData(body);
            default:
                return BodyInserters.fromValue(body);
        }
    }

    public static Object parseJsonBody(Object body) {
        try {
            if (body instanceof String str) {
                if ("" == body) {
                    return new byte[0];
                }
                Object objectFromJson = parseJsonObject(str);
                if (objectFromJson != null) {
                    body = objectFromJson;
                }
            }
        } catch (JsonSyntaxException | ParseException e) {
            throw new PluginException(JSON_PARSE_ERROR, "JSON_PARSE_ERROR", body, "Malformed JSON: " + e.getMessage());
        }
        return body;
    }

    public String parseFormData(List<Property> bodyFormData, boolean encodeParamsToggle) {
        if (bodyFormData == null || bodyFormData.isEmpty()) {
            return "";
        }

        return bodyFormData
                .stream()
                .filter(property -> property.getKey() != null)
                .map(property -> {
                    String key = property.getKey();
                    String value = property.getValue();

                    if (encodeParamsToggle) {
                        try {
                            value = URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
                        } catch (UnsupportedEncodingException e) {
                            throw new UnsupportedOperationException(e);
                        }
                    }

                    return key + "=" + value;
                })
                .collect(Collectors.joining("&"));

    }

    public BodyInserter<?, ? super ClientHttpRequest> parseMultipartFileData(List<Property> bodyFormData) {
        if (CollectionUtils.isEmpty(bodyFormData)) {
            return BodyInserters.fromValue(new byte[0]);
        }

        return (BodyInserter<?, ClientHttpRequest>) (outputMessage, context) ->
                Mono.defer(() -> {
                    MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
                    bodyFormData.stream()
                            .filter(it -> StringUtils.isNotBlank(it.getKey()))
                            .forEach(property -> {
                                String key = property.getKey();
                                if (!property.isMultipartFileType()) {
                                    bodyBuilder.part(key, property.getValue());
                                    return;
                                }

                                try {
                                    populateMultiformFileData(bodyBuilder, property);
                                } catch (Exception e) {
                                    throw ExceptionUtils.wrapException(DATASOURCE_ARGUMENT_ERROR, "CONTENT_PARSE_ERROR", e);
                                }
                            });

                    return BodyInserters.fromMultipartData(bodyBuilder.build())
                            .insert(outputMessage, context);
                });
    }

    private void populateMultiformFileData(MultipartBodyBuilder bodyBuilder, Property property) {
        parseMultipartFormDataList(property)
                .forEach(multipartFormData -> {
                    String name = multipartFormData.getName();
                    String data = multipartFormData.getData();
                    byte[] decodedValue = Base64.getDecoder().decode(data);
                    bodyBuilder.part(property.getKey(), decodedValue)
                            .filename(name);
                });
    }

    private List<MultipartFormData> parseMultipartFormDataList(Property property) {
        if (property instanceof RestBodyFormFileData restBodyFormFileData) {
            return restBodyFormFileData.getFileData();
        }
        throw new PluginException(DATASOURCE_ARGUMENT_ERROR, "CONTENT_PARSE_ERROR");
    }

    public static List<MultipartFormData> convertToMultiformFileValue(String fileValue, Map<String, Object> paramMap) {
        try {
            JsonNode jsonValue = MustacheHelper.renderMustacheJson(fileValue, paramMap);
            if (jsonValue.isObject()) {
                return List.of(parseMultipartFormData(jsonValue));
            }

            if (jsonValue.isArray()) {
                return Streams.stream(jsonValue)
                        .filter(JsonNode::isObject)
                        .map(DataUtils::parseMultipartFormData)
                        .toList();
            }
        } catch (Throwable ignored) {
            // ignore
        }
        throw new PluginException(DATASOURCE_ARGUMENT_ERROR, "CONTENT_PARSE_ERROR");
    }

    @Nonnull
    private static MultipartFormData parseMultipartFormData(JsonNode jsonObject) {
        MultipartFormData result = new MultipartFormData();
        result.setData(jsonObject.get("data").asText());
        result.setName(jsonObject.get("name").asText());
        return result;
    }

    private static Object parseJsonObject(String jsonString) throws ParseException {
        String trimmed = jsonString.trim();

        if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
            return null;
        }

        // JSONParser is not thread safe!!
        JSONParser jsonParser = new JSONParser(JSONParser.MODE_PERMISSIVE);
        return jsonParser.parse(jsonString);

    }
}
