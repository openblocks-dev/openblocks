package com.openblocks.sdk.util;

import static org.springframework.http.MediaType.APPLICATION_OCTET_STREAM;
import static org.springframework.http.MediaType.APPLICATION_PDF;
import static org.springframework.http.MediaType.IMAGE_GIF;
import static org.springframework.http.MediaType.IMAGE_JPEG;
import static org.springframework.http.MediaType.IMAGE_PNG;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;

import com.google.common.base.Preconditions;

public class MediaTypeUtils {

    @Nonnull
    @SuppressWarnings("ConstantConditions")
    public static MediaType parse(String filename) {
        return parse(filename, APPLICATION_OCTET_STREAM);
    }

    @Nullable
    public static MediaType parse(String filename, @Nullable MediaType defaultContentType) {
        Preconditions.checkArgument(StringUtils.isNotBlank(filename));
        String[] split = filename.split("\\.");
        return getMediaType(split[split.length - 1], defaultContentType);
    }

    @Nonnull
    @SuppressWarnings("ConstantConditions")
    public static MediaType getMediaType(String fileType) {
        return getMediaType(fileType, APPLICATION_OCTET_STREAM);
    }

    @Nullable
    public static MediaType getMediaType(String fileType, @Nullable MediaType defaultContentType) {
        return switch (fileType) {
            case "jpg", "jpeg" -> IMAGE_JPEG;
            case "gif" -> IMAGE_GIF;
            case "png" -> IMAGE_PNG;
            case "pdf" -> APPLICATION_PDF;
            case "svg" -> new MediaType("image", "svg+xml");
            default -> defaultContentType;
        };
    }
}
