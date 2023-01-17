package com.openblocks.sdk.plugin.http;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ClientHttpRequest;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.util.UriComponentsBuilder;

import com.openblocks.sdk.models.Property;
import com.openblocks.sdk.plugin.restapi.DataUtils;

public class RawHttpHandlerHelper {

    private static final DataUtils DATA_UTILS = DataUtils.getInstance();


    public static BodyInserter<?, ? super ClientHttpRequest> buildBodyInserter(HttpMethod httpMethod,
            boolean isEncodeParams,
            String requestContentType,
            String queryBody,
            List<Property> bodyFormData) {

        if (HttpMethod.GET.equals(httpMethod)) {
            return BodyInserters.fromValue(new byte[0]);
        }

        if (isNoneContentType(requestContentType)) {
            return BodyInserters.fromValue(new byte[0]);
        }

        if (isJsonContentType(requestContentType)) {
            return BodyInserters.fromValue(DataUtils.parseJsonBody(queryBody));
        }

        if (MediaType.APPLICATION_FORM_URLENCODED_VALUE.equals(requestContentType)
                || MediaType.MULTIPART_FORM_DATA_VALUE.equals(requestContentType)) {
            return DATA_UTILS.buildBodyInserter(bodyFormData, requestContentType, isEncodeParams);
        }
        return BodyInserters.fromValue(queryBody);
    }

    @SuppressWarnings("deprecation")
    private static boolean isJsonContentType(String requestContentType) {
        return MediaType.APPLICATION_JSON_VALUE.equals(requestContentType)
                || MediaType.APPLICATION_JSON_UTF8_VALUE.equals(requestContentType)
                || MediaType.APPLICATION_PROBLEM_JSON_VALUE.equals(requestContentType)
                || MediaType.APPLICATION_PROBLEM_JSON_UTF8_VALUE.equals(requestContentType);
    }

    private static boolean isNoneContentType(String requestContentType) {
        return StringUtils.isBlank(requestContentType);
    }

    public static String parseContentType(Map<String, String> allHeaders) {
        return allHeaders.entrySet()
                .stream()
                .filter(it -> HttpHeaders.CONTENT_TYPE.equalsIgnoreCase(it.getKey()))
                .map(Entry::getValue)
                .findFirst()
                .orElse("");
    }

    public static Map<String, String> buildHeaders(List<Property> queryHeaders) {
        return queryHeaders.stream()
                .filter(it -> StringUtils.isNotBlank(it.getKey()) && StringUtils.isNotBlank(it.getValue()))
                .collect(Collectors.toUnmodifiableMap(property -> property.getKey().trim().toLowerCase(),
                        Property::getValue,
                        (oldValue, newValue) -> newValue));
    }

    public static boolean isValidContentType(String requestContentType) {
        if (StringUtils.isEmpty(requestContentType)) {
            return true;
        }
        try {
            MediaType.valueOf(requestContentType);
        } catch (InvalidMediaTypeException e) {
            return false;
        }
        return true;
    }

    public static URI buildUri(String path, List<Property> params) throws URISyntaxException {
        URI uri;
        UriComponentsBuilder builder = UriComponentsBuilder.newInstance();
        builder.uri(new URI(path));
        if (params != null) {
            params.forEach(property -> builder.queryParam(property.getKey(), property.getValue()));
        }
        uri = builder.build(true).toUri();
        return uri;
    }

}
