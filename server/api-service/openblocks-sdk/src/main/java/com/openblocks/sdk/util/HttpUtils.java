package com.openblocks.sdk.util;

import static org.apache.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.http.HttpMethod;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HttpUtils {

    private static final CloseableHttpClient HTTP_CLIENT = HttpClients.createDefault();

    public static String request(HttpMethod method, String uri, Map<String, String> params, Map<String, String> headers, String jsonBody) {
        return switch (method) {
            case GET -> get(uri, params, headers);
            case POST -> post(uri, params, headers, jsonBody);
            default -> throw new IllegalStateException("Unexpected value: " + method);
        };
    }

    public static String get(String uri, Map<String, String> params, Map<String, String> headers) {
        HttpGet get = new HttpGet(buildUri(uri, params));
        if (MapUtils.isNotEmpty(headers)) {
            for (Entry<String, String> entry : headers.entrySet()) {
                get.setHeader(entry.getKey(), entry.getValue());
            }
        }
        return execute(get);
    }

    public static String post(String uri, Map<String, String> params, Map<String, String> headers, String jsonBody) {
        HttpPost post;
        if (MapUtils.isNotEmpty(headers) && APPLICATION_FORM_URLENCODED_VALUE.equals(headers.get(CONTENT_TYPE))) {
            post = new HttpPost(buildUri(uri, null));
            if (MapUtils.isNotEmpty(params)) {
                List<NameValuePair> pairs = new ArrayList<>();
                for (Entry<String, String> entry : params.entrySet()) {
                    pairs.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
                }
                try {
                    post.setEntity(new UrlEncodedFormEntity(pairs));
                } catch (UnsupportedEncodingException e) {
                    throw new RuntimeException(e);
                }
            }
        } else {
            post = new HttpPost(buildUri(uri, params));
        }

        if (MapUtils.isNotEmpty(headers)) {
            for (Entry<String, String> entry : headers.entrySet()) {
                post.setHeader(entry.getKey(), entry.getValue());
            }
        }
        if (StringUtils.isNotBlank(jsonBody)) {
            HttpEntity entity = new StringEntity(jsonBody, ContentType.APPLICATION_JSON);
            post.setEntity(entity);
        }
        return execute(post);
    }

    private static String execute(HttpUriRequest request) {
        try {
            CloseableHttpResponse response = HTTP_CLIENT.execute(request);
            return EntityUtils.toString(response.getEntity());
        } catch (IOException e) {
            log.error("http get error.{}", request, e);
            throw new RuntimeException(e);
        }
    }

    private static URI buildUri(String uri, Map<String, String> params) {
        try {
            URIBuilder uriBuilder = new URIBuilder(uri);
            if (MapUtils.isNotEmpty(params)) {
                for (Entry<String, String> entry : params.entrySet()) {
                    uriBuilder.addParameter(entry.getKey(), entry.getValue());
                }
            }
            return uriBuilder.build();
        } catch (URISyntaxException e) {
            log.error("build uri error.{},{}", uri, JsonUtils.toJson(params), e);
            throw new RuntimeException(e);
        }
    }
}
