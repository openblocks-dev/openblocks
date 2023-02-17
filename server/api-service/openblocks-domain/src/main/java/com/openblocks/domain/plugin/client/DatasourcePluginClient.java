package com.openblocks.domain.plugin.client;

import static com.openblocks.sdk.constants.GlobalContext.REQUEST;

import java.time.Duration;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.openblocks.domain.plugin.client.dto.DatasourcePluginDefinition;
import com.openblocks.domain.plugin.client.dto.GetPluginDynamicConfigRequestDTO;
import com.openblocks.infra.js.NodeServerClient;
import com.openblocks.infra.js.NodeServerHelper;
import com.openblocks.sdk.config.CommonConfigHelper;
import com.openblocks.sdk.exception.ServerException;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.models.QueryExecutionResult;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class DatasourcePluginClient implements NodeServerClient {

    private static final ExchangeStrategies EXCHANGE_STRATEGIES = ExchangeStrategies
            .builder()
            .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(-1))
            .build();

    private static final WebClient WEB_CLIENT = WebClient.builder()
            .exchangeStrategies(EXCHANGE_STRATEGIES)
            .build();

    @Autowired
    private CommonConfigHelper commonConfigHelper;
    @Autowired
    private NodeServerHelper nodeServerHelper;

    private static final String PLUGINS_PATH = "plugins";
    private static final String RUN_PLUGIN_QUERY = "runPluginQuery";
    private static final String VALIDATE_PLUGIN_DATA_SOURCE_CONFIG = "validatePluginDataSourceConfig";
    private static final String GET_PLUGIN_DYNAMIC_CONFIG = "getPluginDynamicConfig";

    public Mono<List<Object>> getPluginDynamicConfigSafely(List<GetPluginDynamicConfigRequestDTO> getPluginDynamicConfigRequestDTOS) {
        return getPluginDynamicConfig(getPluginDynamicConfigRequestDTOS)
                .onErrorResume(throwable -> {
                    log.error("request /getPluginDynamicConfig error.", throwable);
                    return Mono.just(Collections.emptyList());
                })
                .defaultIfEmpty(Collections.emptyList());
    }

    public Mono<List<Object>> getPluginDynamicConfig(List<GetPluginDynamicConfigRequestDTO> getPluginDynamicConfigRequestDTOS) {
        if (CollectionUtils.isEmpty(getPluginDynamicConfigRequestDTOS)) {
            return Mono.just(Collections.emptyList());
        }
        return getAcceptLanguage()
                .flatMap(language -> WEB_CLIENT
                        .post()
                        .uri(nodeServerHelper.createUri(GET_PLUGIN_DYNAMIC_CONFIG))
                        .header(HttpHeaders.ACCEPT_LANGUAGE, language)
                        .bodyValue(getPluginDynamicConfigRequestDTOS)
                        .<List<Object>> exchangeToMono(response -> {
                            if (response.statusCode().is2xxSuccessful()) {
                                return response.bodyToMono(new ParameterizedTypeReference<>() {
                                });
                            }
                            log.error("request /getPluginDynamicConfig error.{},{}", getPluginDynamicConfigRequestDTOS, response.rawStatusCode());
                            return Mono.error(new ServerException("get dynamic config error"));
                        })
                        .timeout(Duration.ofSeconds(10))
                );
    }

    public Mono<DatasourcePluginDefinition> getDatasourcePluginDefinition(String type) {
        return getDatasourcePluginDefinitions()
                .filter(datasourcePluginDefinition -> datasourcePluginDefinition.getId().equals(type))
                .next();
    }

    public Flux<DatasourcePluginDefinition> getDatasourcePluginDefinitions() {
        if (StringUtils.isBlank(commonConfigHelper.getHost())) {
            return Flux.empty();
        }
        return getAcceptLanguage()
                .flatMap(language -> WEB_CLIENT
                        .get()
                        .uri(nodeServerHelper.createUri(PLUGINS_PATH))
                        .header(HttpHeaders.ACCEPT_LANGUAGE, language)
                        .exchangeToMono(response -> {
                            if (response.statusCode().is2xxSuccessful()) {
                                return response.bodyToMono(new ParameterizedTypeReference<List<DatasourcePluginDefinition>>() {
                                });
                            }
                            log.error("request /plugins error.{}", response.rawStatusCode());
                            return Mono.just(Collections.emptyList());
                        })
                        .timeout(Duration.ofSeconds(10))
                )
                .onErrorResume(throwable -> {
                    log.error("request /plugins error", throwable);
                    return Mono.just(Collections.emptyList());
                })
                .defaultIfEmpty(Collections.emptyList())
                .flatMapIterable(Function.identity());
    }

    @SuppressWarnings("unchecked")
    public Mono<QueryExecutionResult> executeQuery(String pluginName, Object queryDsl, List<Map<String, Object>> context, Object datasourceConfig) {
        return getAcceptLanguage()
                .flatMap(language -> WEB_CLIENT
                        .post()
                        .uri(nodeServerHelper.createUri(RUN_PLUGIN_QUERY))
                        .header(HttpHeaders.ACCEPT_LANGUAGE, language)
                        .bodyValue(Map.of("pluginName", pluginName, "dsl", queryDsl, "context", context, "dataSourceConfig", datasourceConfig))
                        .exchangeToMono(response -> {
                            if (response.statusCode().is2xxSuccessful()) {
                                return response.bodyToMono(Map.class)
                                        .map(map -> map.get("result"))
                                        .map(QueryExecutionResult::success);
                            }
                            return response.bodyToMono(Map.class)
                                    .map(map -> MapUtils.getString(map, "message"))
                                    .map(QueryExecutionResult::errorWithMessage);
                        }));
    }

    @SuppressWarnings("unchecked")
    public Mono<DatasourceTestResult> test(String pluginName, Object datasourceConfig) {
        return getAcceptLanguage()
                .flatMap(language -> WEB_CLIENT
                        .post()
                        .uri(nodeServerHelper.createUri(VALIDATE_PLUGIN_DATA_SOURCE_CONFIG))
                        .header(HttpHeaders.ACCEPT_LANGUAGE, language)
                        .bodyValue(Map.of("pluginName", pluginName, "dataSourceConfig", datasourceConfig))
                        .exchangeToMono(response -> {
                            if (response.statusCode().is2xxSuccessful()) {
                                return response.bodyToMono(Map.class)
                                        .map(map -> {
                                            if (MapUtils.getBoolean(map, "success", false)) {
                                                return DatasourceTestResult.testSuccess();
                                            }
                                            return DatasourceTestResult.testFail(MapUtils.getString(map, "message", ""));
                                        });
                            }
                            return response.bodyToMono(Map.class)
                                    .map(map -> DatasourceTestResult.testFail(MapUtils.getString(map, "message", "")));
                        }));
    }

    private Mono<String> getAcceptLanguage() {
        return Mono.deferContextual(contextView -> contextView.<ServerHttpRequest> getOrEmpty(REQUEST)
                .map(request -> request.getHeaders().getFirst(HttpHeaders.ACCEPT_LANGUAGE))
                .map(Mono::just)
                .orElse(Mono.just("")));
    }
}
