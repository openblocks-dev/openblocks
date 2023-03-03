package com.openblocks.plugin.restapi.model;

import static com.openblocks.sdk.exception.PluginCommonError.INVALID_QUERY_SETTINGS;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static org.apache.commons.collections4.ListUtils.emptyIfNull;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpMethod;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.Property;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class RestApiQueryConfig {

    private final HttpMethod httpMethod;
    private boolean disableEncodingParams;
    private final String body;
    private final String path;
    private final List<Property> params;
    private final List<Property> headers;
    private final List<Property> bodyFormData;

    @JsonCreator
    private RestApiQueryConfig(HttpMethod httpMethod, boolean disableEncodingParams, String body, String path,
            List<Property> params, List<Property> headers, List<Property> bodyFormData) {
        this.httpMethod = httpMethod;
        this.disableEncodingParams = disableEncodingParams;
        this.body = body;
        this.path = path;
        this.params = params;
        this.headers = headers;
        this.bodyFormData = bodyFormData;
    }

    public static RestApiQueryConfig from(Map<String, Object> queryConfigs) {
        RestApiQueryConfig queryConfig = fromJson(toJson(queryConfigs), RestApiQueryConfig.class);
        if (queryConfig == null) {
            log.error("deserialize query config fail:{}", toJson(queryConfigs));
            throw new PluginException(INVALID_QUERY_SETTINGS, "INVALID_RESTAPI");
        }
        return queryConfig;
    }

    public List<Property> getHeaders() {
        return emptyIfNull(headers);
    }

    public List<Property> getParams() {
        return emptyIfNull(params);
    }

    public List<Property> getBodyFormData() {
        return emptyIfNull(bodyFormData);
    }
}
