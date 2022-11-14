package com.openblocks.api.util;

import static org.springframework.http.MediaType.APPLICATION_OCTET_STREAM;
import static org.springframework.http.MediaType.APPLICATION_PDF;
import static org.springframework.http.MediaType.IMAGE_GIF;
import static org.springframework.http.MediaType.IMAGE_JPEG;
import static org.springframework.http.MediaType.IMAGE_PNG;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;

import com.google.common.base.Preconditions;

public class MediaTypeUtils {

    public static MediaType parse(String filename) {
        Preconditions.checkArgument(StringUtils.isNotBlank(filename));
        String[] split = filename.split("\\.");
        return getMediaType(split[split.length - 1]);
    }

    @Nonnull
    public static MediaType getMediaType(String fileType) {
        return switch (fileType) {
            case "jpg", "jpeg" -> IMAGE_JPEG;
            case "gif" -> IMAGE_GIF;
            case "png" -> IMAGE_PNG;
            case "pdf" -> APPLICATION_PDF;
            case "svg" -> new MediaType("image", "svg+xml");
            default -> APPLICATION_OCTET_STREAM;
        };
    }
}
