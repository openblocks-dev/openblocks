package com.openblocks.plugin.restapi.helpers;

import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.util.UriComponentsBuilder;

import com.openblocks.sdk.exception.PluginException;

public final class RestApiUriBuilder {

    private RestApiUriBuilder() {
    }

    public static URI buildUri(String urlPrefix, String urlSuffix, Map<String, Object> paramsMap,
            Map<String, String> urlParams, boolean encodeParams) {
        String trimmedPrefix = urlPrefix.trim();
        String trimmedSuffix = urlSuffix.trim();

        String url;
        if (StringUtils.isNotEmpty(trimmedPrefix) &&
                StringUtils.isNotEmpty(trimmedSuffix) && !trimmedSuffix.startsWith("/")) {
            url = trimmedPrefix + "/" + trimmedSuffix;
        } else {
            url = trimmedPrefix + trimmedSuffix;
        }

        if (StringUtils.isEmpty(url)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "REQUEST_URL_EMPTY");
        }

        url = renderMustacheString(url, paramsMap);
        url = url.replaceAll("(?<!http:|https:)/{2,}", "/"); // remove redundant "/"

        URI uri;
        try {
            uri = new URI(url).normalize();
        } catch (URISyntaxException e) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_REQUEST_URL", url);
        }

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.newInstance();
        uriBuilder.uri(uri);
        urlParams.forEach((key, value) -> {
            if (encodeParams) {
                uriBuilder.queryParam(URLEncoder.encode(key, StandardCharsets.UTF_8),
                        URLEncoder.encode(value, StandardCharsets.UTF_8)
                );
            } else {
                uriBuilder.queryParam(key, value);
            }
        });
        return uriBuilder.build(true).toUri();
    }

}
