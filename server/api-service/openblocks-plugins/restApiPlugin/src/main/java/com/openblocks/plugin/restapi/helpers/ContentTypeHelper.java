package com.openblocks.plugin.restapi.helpers;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
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

    public static boolean isJson(MediaType mediaType) {
        return StringUtils.equalsIgnoreCase("application", mediaType.getType())
                && (StringUtils.equalsIgnoreCase(mediaType.getSubtype(), "json")
                || StringUtils.equals(mediaType.getSubtype(), "x-ndjson")
                || StringUtils.contains(mediaType.getSubtype(), "+json")
                || isSpecialJson(mediaType));
    }

    /**
     * for this type of json, its body should be parsed as JSON but write with stringify text when sending request
     */
    public static boolean isSpecialJson(MediaType mediaType) {
        return StringUtils.contains(mediaType.getSubtype(), "-json");
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
        if (StringUtils.isBlank(requestContentType)) {
            return true;
        }

        try {
            MediaType.valueOf(requestContentType);
        } catch (InvalidMediaTypeException e) {
            return false;
        }

        return true;
    }

    public static Pair<Boolean, Boolean> isJsonContentType(String contentType) {
        if (StringUtils.isBlank(contentType)) {
            return Pair.of(false, false);
        }
        MediaType mediaType = MediaType.valueOf(contentType);
        return Pair.of(isJson(mediaType), isSpecialJson(mediaType));
    }

}
