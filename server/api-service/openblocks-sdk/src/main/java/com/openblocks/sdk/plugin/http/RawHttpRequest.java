package com.openblocks.sdk.plugin.http;

import static com.openblocks.sdk.util.MustacheHelper.renderMustacheJsonString;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.ListUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpMethod;

import com.openblocks.sdk.models.Property;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RawHttpRequest {

    private final HttpMethod httpMethod;
    private String body;
    private String path;
    private List<Property> params;
    private List<Property> headers;
    private List<Property> bodyFormData;

    protected RawHttpRequest(HttpMethod httpMethod, String body, String path,
            List<Property> params, List<Property> headers, List<Property> bodyFormData) {
        this.httpMethod = httpMethod;
        this.body = body;
        this.path = path;
        this.params = params;
        this.headers = headers;
        this.bodyFormData = bodyFormData;
    }

    public void renderParams(Map<String, Object> paramMap) {
        body = renderMustacheJsonString(body, paramMap);
        path = renderMustacheString(path, paramMap);
        params = ListUtils.emptyIfNull(params).stream()
                .map(property -> render(property, paramMap))
                .toList();
        headers = ListUtils.emptyIfNull(headers).stream()
                .map(property -> render(property, paramMap))
                .toList();
        bodyFormData = ListUtils.emptyIfNull(bodyFormData).stream()
                .map(property -> render(property, paramMap))
                .toList();
    }

    private Property render(Property property, Map<String, Object> paramMap) {
        String key = renderMustacheString(property.getKey(), paramMap);
        String value = renderMustacheString(property.getValue(), paramMap);
        return new Property(key, value, property.getType());
    }

    public boolean hasInvalidData() {
        return httpMethod == null || StringUtils.isBlank(path);
    }
}
