package com.openblocks.plugin.restapi.helpers;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;

public final class ContentTypeHelper {

    private ContentTypeHelper() {
    }

    private static final Set<String> BINARY_DATA_TYPES = Set.of("application/zip",
            "application/octet-stream",
            "application/pdf",
            "application/pkcs8",
            "application/x-binary");


    public static boolean isBinary(MediaType contentType) {
        return BINARY_DATA_TYPES.contains(contentType.toString());
    }

    public static boolean isPicture(MediaType contentType) {
        return MediaType.IMAGE_GIF.equals(contentType) ||
                MediaType.IMAGE_JPEG.equals(contentType) ||
                MediaType.IMAGE_PNG.equals(contentType);
    }

    public static boolean isJson(MediaType contentType) {
        return StringUtils.equalsIgnoreCase("application", contentType.getType())
                && (StringUtils.equalsIgnoreCase(contentType.getSubtype(), "json") ||
                StringUtils.contains(contentType.getSubtype(), "+json"));
    }

    public static String parseContentType(Map<String, String> allHeaders) {
        return allHeaders.entrySet()
                .stream()
                .filter(it -> HttpHeaders.CONTENT_TYPE.equalsIgnoreCase(it.getKey()))
                .map(Entry::getValue)
                .findFirst()
                .orElse("");
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

    @SuppressWarnings("deprecation")
    public static boolean isJsonContentType(String requestContentType) {
        return MediaType.APPLICATION_JSON_VALUE.equals(requestContentType)
                || MediaType.APPLICATION_JSON_UTF8_VALUE.equals(requestContentType)
                || MediaType.APPLICATION_PROBLEM_JSON_VALUE.equals(requestContentType)
                || MediaType.APPLICATION_PROBLEM_JSON_UTF8_VALUE.equals(requestContentType);
    }

}
