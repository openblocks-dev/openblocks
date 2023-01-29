package com.openblocks.sdk.plugin.common;

import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.util.ExceptionUtils.wrapException;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.utils.URIBuilder;

import com.openblocks.sdk.exception.PluginException;

public final class RestApiUriBuilder {

    private RestApiUriBuilder() {
    }

    public static URI buildUri(String urlPrefix, String urlSuffix, Map<String, Object> paramsMap,
            Map<String, String> urlParams) {
        String trimmedPrefix = urlPrefix.trim();
        String trimmedSuffix = urlSuffix.trim();

        String url;
        if (StringUtils.isNotEmpty(trimmedPrefix) &&
                StringUtils.isNotEmpty(trimmedSuffix) && !trimmedSuffix.startsWith("/")) {
            url = trimmedPrefix + "/" + trimmedSuffix;
        } else {
            url = trimmedPrefix + trimmedSuffix;
        }
        return buildUri(url, paramsMap, urlParams);
    }

    public static URI buildUri(String url, Map<String, Object> paramsMap, Map<String, String> urlParams) {
        if (StringUtils.isEmpty(url)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "REQUEST_URL_EMPTY");
        }

        url = renderMustacheString(url, paramsMap);
        url = url.replaceAll("(?<!http:|https:)/{2,}", "/"); // remove redundant "/"


        URIBuilder uriBuilder;
        try {
            uriBuilder = new URIBuilder(url);
        } catch (URISyntaxException e) {
            throw wrapException(QUERY_ARGUMENT_ERROR, "INVALID_REQUEST_URL", e);
        }

        urlParams.forEach((param, value) -> {
            if (StringUtils.isBlank(param)) {
                return;
            }
            uriBuilder.addParameter(param, value);
        });
        try {
            return uriBuilder.build();
        } catch (URISyntaxException e) {
            throw wrapException(QUERY_ARGUMENT_ERROR, "INVALID_REQUEST_URL", e);
        }
    }
}
