package com.openblocks.plugin.graphql;

import static com.google.common.base.MoreObjects.firstNonNull;
import static com.openblocks.plugin.graphql.GraphQLError.GRAPHQL_EXECUTION_ERROR;
import static com.openblocks.plugin.graphql.utils.GraphQLBodyUtils.convertToGraphQLBody;
import static com.openblocks.sdk.exception.PluginCommonError.JSON_PARSE_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_TIMEOUT;
import static com.openblocks.sdk.plugin.restapi.auth.RestApiAuthType.DIGEST_AUTH;
import static com.openblocks.sdk.util.JsonUtils.readTree;
import static com.openblocks.sdk.util.JsonUtils.toJsonThrows;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;
import static com.openblocks.sdk.util.StreamUtils.collectList;
import static com.openblocks.sdk.util.StreamUtils.distinctByKey;
import static org.apache.commons.lang3.StringUtils.firstNonBlank;
import static org.apache.commons.lang3.StringUtils.trimToEmpty;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.TimeoutException;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.Nullable;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.bson.internal.Base64;
import org.pf4j.Extension;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.reactive.ClientHttpRequest;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.openblocks.plugin.graphql.constants.ResponseDataType;
import com.openblocks.plugin.graphql.helpers.AuthHelper;
import com.openblocks.plugin.graphql.helpers.BufferingFilter;
import com.openblocks.plugin.graphql.model.GraphQLQueryConfig;
import com.openblocks.plugin.graphql.model.GraphQLQueryExecutionContext;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.Property;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.QueryExecutionUtils;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.plugin.common.RestApiUriBuilder;
import com.openblocks.sdk.plugin.graphql.GraphQLDatasourceConfig;
import com.openblocks.sdk.plugin.restapi.DataUtils;
import com.openblocks.sdk.plugin.restapi.auth.AuthConfig;
import com.openblocks.sdk.plugin.restapi.auth.BasicAuthConfig;
import com.openblocks.sdk.plugin.restapi.auth.RestApiAuthType;
import com.openblocks.sdk.query.QueryVisitorContext;
import com.openblocks.sdk.util.JsonUtils;
import com.openblocks.sdk.util.MoreMapUtils;
import com.openblocks.sdk.util.MustacheHelper;
import com.openblocks.sdk.webclient.WebClientBuildHelper;

import lombok.Builder;
import lombok.Getter;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

@Extension
public class GraphQLExecutor implements QueryExecutor<GraphQLDatasourceConfig, Object, GraphQLQueryExecutionContext> {
    private static final String RESPONSE_DATA_TYPE = "X-OPENBLOCKS-RESPONSE-DATA-TYPE";
    private static final String GRAPHQL_TYPE = "application/graphql";
    private static final int MAX_REDIRECTS = 5;
    private static final Set<String> BINARY_DATA_TYPES = Set.of("application/zip",
            "application/octet-stream",
            "application/pdf",
            "application/pkcs8",
            "application/x-binary");
    private final ExchangeStrategies EXCHANGE_STRATEGIES = ExchangeStrategies
            .builder()
            .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
            .build();
    private final Scheduler scheduler = QueryExecutionUtils.querySharedScheduler();
    private final DataUtils dataUtils = DataUtils.getInstance();
    Consumer<HttpHeaders> DEFAULT_HEADERS_CONSUMER = httpHeaders -> {};

    private final CommonConfig commonConfig;

    public GraphQLExecutor(CommonConfig commonConfig) {
        this.commonConfig = commonConfig;
    }

    private static List<Property> renderMustacheValueInProperties(List<Property> properties, Map<String, Object> paramMap) {
        return properties.stream()
                .map(it -> {
                    Property newProperty =
                            new Property(renderMustacheString(it.getKey(), paramMap), renderMustacheString(it.getValue(), paramMap));
                    newProperty.setType(it.getType());
                    return newProperty;
                })
                .toList();
    }

    @Override
    public GraphQLQueryExecutionContext buildQueryExecutionContext(GraphQLDatasourceConfig datasourceConfig,
            Map<String, Object> queryConfigMap,
            Map<String, Object> requestParams,
            QueryVisitorContext queryVisitorContext) {
        GraphQLQueryConfig queryConfig = GraphQLQueryConfig.from(queryConfigMap);
        // from datasource config
        String urlDomain = datasourceConfig.getUrl();
        String datasourceBody = datasourceConfig.getBody();
        List<Property> datasourceHeaders = datasourceConfig.getHeaders();
        List<Property> datasourceUrlParams = datasourceConfig.getParams();
        List<Property> datasourceBodyFormData = datasourceConfig.getBodyFormData();
        Set<String> forwardCookies = datasourceConfig.getForwardCookies();
        boolean forwardAllCookies = datasourceConfig.isForwardAllCookies();

        // from query config
        HttpMethod httpMethod = queryConfig.getHttpMethod();
        boolean encodeParams = !queryConfig.isDisableEncodingParams();
        String queryBody = trimToEmpty(queryConfig.getBody());
        String queryPath = trimToEmpty(queryConfig.getPath());
        List<Property> queryParams = queryConfig.getParams();
        List<Property> queryHeaders = queryConfig.getHeaders();
        List<Property> queryBodyParams = queryConfig.getBodyFormData();
        String updatedQueryPath = renderMustacheString(queryPath, requestParams);
        List<Property> updatedQueryParams = renderMustacheValueInProperties(queryParams, requestParams);
        List<Property> updatedQueryHeaders = renderMustacheValueInProperties(queryHeaders, requestParams);
        List<Property> updatedQueryBodyParams = renderMustacheValueInProperties(queryBodyParams, requestParams);
        var updatedVariables = JsonUtils.createObjectNode();
        queryConfig.getVariables().forEach(property -> {
            if (StringUtils.isAllBlank(property.getKey(), property.getValue())) {
                return;
            }
            updatedVariables.set(property.getKey(),
                    MustacheHelper.renderMustacheJson(property.getValue(), requestParams));
        });
        String updatedQueryBody = renderMustacheString(queryBody, requestParams);
        String normalizedUrl = buildUrl(urlDomain, updatedQueryPath, requestParams);
        Map<String, String> allHeaders = buildHeaders(datasourceHeaders, updatedQueryHeaders);
        if (!MoreMapUtils.containsStringKeyIgnoreCase(allHeaders, HttpHeaders.CONTENT_TYPE)) {
            allHeaders.put(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        }
        String contentType = parseContentType(allHeaders).toLowerCase();
        if (!isValidContentType(contentType)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_CONTENT_TYPE", contentType);
        }

        Map<String, String> urlParams = buildUrlParams(datasourceUrlParams, updatedQueryParams);
        List<Property> bodyParams = buildBodyParams(datasourceBodyFormData, updatedQueryBodyParams);

        return GraphQLQueryExecutionContext.builder()
                .httpMethod(httpMethod)
                .url(normalizedUrl)
                .headers(allHeaders)
                .contentType(contentType)
                .urlParams(urlParams)
                .bodyParams(bodyParams)
                .encodeParams(encodeParams)
                .queryBody(firstNonBlank(updatedQueryBody, datasourceBody))
                .variablesParams(updatedVariables)
                .forwardCookies(forwardCookies)
                .forwardAllCookies(forwardAllCookies)
                .requestCookies(queryVisitorContext.getCookies())
                .authConfig(datasourceConfig.getAuthConfig())
                .authTokenMono(queryVisitorContext.getAuthTokenMono())
                .build();
    }

    private String buildUrl(String urlDomain, String updatedQueryPath, Map<String, Object> paramsMap) {
        String url = urlDomain.trim() + updatedQueryPath.trim();
        if (StringUtils.isEmpty(url)) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "REQUEST_URL_EMPTY");
        }

        url = renderMustacheString(url, paramsMap);

        try {
            return new URI(url).normalize().toString();
        } catch (URISyntaxException e) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_REQUEST_URL", url);
        }
    }

    private Map<String, String> buildHeaders(List<Property> datasourceHeaders, List<Property> updatedQueryHeaders) {
        return Stream.concat(datasourceHeaders.stream(), updatedQueryHeaders.stream())
                .filter(it -> StringUtils.isNotBlank(it.getKey()) && StringUtils.isNotBlank(it.getValue()))
                .collect(Collectors.toMap(property -> property.getKey().trim(),
                        Property::getValue,
                        (oldValue, newValue) -> newValue));
    }

    private String parseContentType(Map<String, String> allHeaders) {
        return allHeaders.entrySet()
                .stream()
                .filter(it -> HttpHeaders.CONTENT_TYPE.equalsIgnoreCase(it.getKey()))
                .map(Entry::getValue)
                .findFirst()
                .orElse("");
    }

    private boolean isValidContentType(String requestContentType) {
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

    private Map<String, String> buildUrlParams(List<Property> datasourceUrlParams, List<Property> updatedQueryParams) {
        return Stream.concat(datasourceUrlParams.stream(),
                        updatedQueryParams.stream())
                .collect(Collectors.toUnmodifiableMap(Property::getKey,
                        Property::getValue,
                        (oldValue, newValue) -> newValue));
    }

    private List<Property> buildBodyParams(List<Property> datasourceBodyFormData, List<Property> updatedQueryBodyParams) {
        return Stream.concat(datasourceBodyFormData.stream(),
                        updatedQueryBodyParams.stream())
                .filter(it -> it.getKey() != null)
                .filter(distinctByKey(Property::getKey))
                .toList();
    }

    @Override
    public Mono<QueryExecutionResult> executeQuery(Object o, GraphQLQueryExecutionContext context) {
        return Mono.defer(() -> {
            URI uri = RestApiUriBuilder.buildUri(context.getUrl(), new HashMap<>(), context.getUrlParams());
            WebClient.Builder webClientBuilder = WebClientBuildHelper.builder()
                    .disallowedHosts(commonConfig.getDisallowedHosts())
                    .toWebClientBuilder();

            Map<String, String> allHeaders = context.getHeaders();
            String contentType = context.getContentType();
            allHeaders.forEach(webClientBuilder::defaultHeader);

            //basic auth
            AuthConfig authConfig = context.getAuthConfig();
            if (authConfig != null && authConfig.getType() == RestApiAuthType.BASIC_AUTH) {
                webClientBuilder.defaultHeaders(AuthHelper.basicAuth((BasicAuthConfig) authConfig));
            }

            if (MediaType.MULTIPART_FORM_DATA_VALUE.equals(contentType)) {
                webClientBuilder.filter(new BufferingFilter());
            }

            webClientBuilder.defaultCookies(injectCookies(context));

            WebClient client = webClientBuilder
                    .exchangeStrategies(EXCHANGE_STRATEGIES)
                    .build();
            if (!GRAPHQL_TYPE.equalsIgnoreCase(contentType)) {
                context.setQueryBody(convertToGraphQLBody(context));
            }
            BodyInserter<?, ? super ClientHttpRequest> bodyInserter = buildBodyInserter(
                    context.isEncodeParams(),
                    contentType,
                    context.getQueryBody(),
                    context.getBodyParams());
            return httpCall(client, context.getHttpMethod(), uri, bodyInserter, 0, authConfig, DEFAULT_HEADERS_CONSUMER)
                    .flatMap(clientResponse -> clientResponse.toEntity(byte[].class))
                    .map(this::convertToQueryExecutionResult)
                    .onErrorResume(error -> {
                        if (error instanceof TimeoutException) {
                            return Mono.just(QueryExecutionResult.error(QUERY_EXECUTION_TIMEOUT, "QUERY_TIMEOUT_ERROR", error));
                        }
                        if (error instanceof PluginException pluginException) {
                            throw pluginException;
                        }
                        return Mono.just(
                                QueryExecutionResult.error(GRAPHQL_EXECUTION_ERROR, "GRAPHQL_EXECUTION_ERROR", error));
                    });
        });
    }

    private Consumer<MultiValueMap<String, String>> injectCookies(GraphQLQueryExecutionContext request) {
        return currentCookies -> {
            Set<String> forwardCookies = request.getForwardCookies();
            MultiValueMap<String, HttpCookie> requestCookies = request.getRequestCookies();
            if (requestCookies == null) {
                return;
            }

            if (request.isForwardAllCookies()) {
                requestCookies.forEach((cookieName, httpCookies) -> {
                    if (StringUtils.equals(cookieName, commonConfig.getCookieName())) {
                        return;
                    }
                    currentCookies.addAll(cookieName, collectList(httpCookies, HttpCookie::getValue));
                });
                return;
            }

            requestCookies.entrySet()
                    .stream()
                    .filter(it -> forwardCookies.contains(it.getKey()))
                    .filter(it -> ObjectUtils.notEqual(it.getKey(), commonConfig.getCookieName()))
                    .forEach(entry -> {
                        String cookieName = entry.getKey();
                        List<HttpCookie> httpCookies = entry.getValue();
                        currentCookies.addAll(cookieName, collectList(httpCookies, HttpCookie::getValue));
                    });
        };
    }

    private Mono<ClientResponse> httpCall(WebClient webClient, HttpMethod httpMethod,
            URI uri,
            BodyInserter<?, ? super ClientHttpRequest> requestBody,
            int iteration,
            @Nullable AuthConfig authConfig,
            Consumer<HttpHeaders> headersConsumer) {
        if (iteration == MAX_REDIRECTS) {
            return Mono.error(new PluginException(QUERY_EXECUTION_ERROR, "REACH_REDIRECT_LIMIT", MAX_REDIRECTS));
        }

        return webClient
                .method(httpMethod)
                .uri(uri)
                .headers(headersConsumer)
                .body(requestBody)
                .exchange()
                .onErrorMap(e -> new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage()))
                .flatMap(response -> {
                    if (response.statusCode().is3xxRedirection()) {
                        String redirectUrl = response.headers().header("Location").get(0);
                        URI redirectUri;
                        try {
                            redirectUri = new URI(redirectUrl);
                        } catch (URISyntaxException e) {
                            return Mono.error(new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR",
                                    e.getMessage()));
                        }
                        return httpCall(webClient, httpMethod, redirectUri, requestBody, iteration + 1, authConfig, headersConsumer);
                    }
                    //digest auth
                    if (authConfig != null && authConfig.getType() == DIGEST_AUTH && AuthHelper.shouldDigestAuth(response)) {
                        try {
                            return httpCall(webClient, httpMethod, uri, requestBody, iteration + 1, authConfig,
                                    headersConsumer.andThen(
                                            AuthHelper.digestAuth((BasicAuthConfig) authConfig, response, httpMethod, uri.getPath())));
                        } catch (ParseException e) {
                            return Mono.error(new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR",
                                    e.getMessage()));
                        }
                    }
                    return Mono.just(response);
                })
                .subscribeOn(scheduler);
    }

    private QueryExecutionResult convertToQueryExecutionResult(ResponseEntity<byte[]> stringResponseEntity) {
        HttpHeaders headers = stringResponseEntity.getHeaders();
        MediaType contentType = firstNonNull(headers.getContentType(), MediaType.TEXT_PLAIN); // text type if null
        byte[] body = stringResponseEntity.getBody();
        HttpStatus statusCode = stringResponseEntity.getStatusCode();
        JsonNode resultHeaders = parseExecuteResultHeaders(headers);

        if (body == null) {
            return QueryExecutionResult.ofRestApiResult(statusCode, resultHeaders, null);
        }

        ResponseBodyData responseBodyData = parseResponseDataInfo(body, contentType);
        ResponseDataType responseDataType = responseBodyData.getDataType();
        ObjectNode headersObjectNode = (ObjectNode) resultHeaders;
        headersObjectNode.putArray(RESPONSE_DATA_TYPE).add(String.valueOf(responseDataType));

        return QueryExecutionResult.ofRestApiResult(statusCode, headersObjectNode, responseBodyData.getBody());
    }

    private JsonNode parseExecuteResultHeaders(HttpHeaders headers) {
        // Convert the headers into json tree to store in the results
        String headerInJsonString;
        try {
            headerInJsonString = toJsonThrows(headers);
        } catch (JsonProcessingException e) {
            throw new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
        }

        // Set headers in the result now
        try {
            return (readTree(headerInJsonString));
        } catch (IOException e) {
            throw new PluginException(JSON_PARSE_ERROR, "JSON_PARSE_ERROR", headerInJsonString, e.getMessage());
        }
    }

    private ResponseBodyData parseResponseDataInfo(byte[] body, MediaType contentType) {

        if (contentType.includes(MediaType.APPLICATION_JSON)) {
            try {
                return ResponseBodyData.builder()
                        .body(readTree(body))
                        .dataType(ResponseDataType.JSON)
                        .build();

            } catch (IOException e) {
                throw new PluginException(GRAPHQL_EXECUTION_ERROR, "INVALID_JSON_FROM_RESPONSE");
            }
        }

        if (MediaType.IMAGE_GIF.equals(contentType) ||
                MediaType.IMAGE_JPEG.equals(contentType) ||
                MediaType.IMAGE_PNG.equals(contentType)) {
            return ResponseBodyData.builder()
                    .body(Base64.encode(body))
                    .dataType(ResponseDataType.IMAGE)
                    .build();
        }
        if (BINARY_DATA_TYPES.contains(contentType.toString())) {
            return ResponseBodyData.builder()
                    .body(Base64.encode(body))
                    .dataType(ResponseDataType.BINARY)
                    .build();
        }

        return ResponseBodyData.builder()
                .body(new String(body, StandardCharsets.UTF_8).trim())
                .dataType(ResponseDataType.TEXT)
                .build();
    }

    private BodyInserter<?, ? super ClientHttpRequest> buildBodyInserter(boolean isEncodeParams,
            String requestContentType,
            Object queryBody,
            List<Property> bodyFormData) {
        switch (requestContentType) {

            case MediaType.APPLICATION_FORM_URLENCODED_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE:
                return dataUtils.buildBodyInserter(bodyFormData, requestContentType, isEncodeParams);

            // include application/json
            default:
                if (queryBody == null) {
                    return BodyInserters.fromValue(new byte[0]);
                }
                return BodyInserters.fromValue(queryBody);
        }
    }

    @Getter
    @Builder
    private static class ResponseBodyData {
        private ResponseDataType dataType;
        private Object body;
    }
}
