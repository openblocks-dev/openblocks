package com.openblocks.api.config;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.usermanagement.OrgApiService;
import com.openblocks.infra.config.model.ServerConfig;
import com.openblocks.infra.config.repository.ServerConfigRepository;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.constant.Url;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigCenter;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = {Url.CONFIG_URL, NewUrl.CONFIG_URL})
@Slf4j
public class ConfigController {

    @Autowired
    private CommonConfig commonConfig;

    @Autowired
    private ServerConfigRepository serverConfigRepository;

    @Autowired
    private OrgApiService orgApiService;

    @Autowired
    private ConfigCenter configCenter;

    private Conf<String> deploymentIdConf;

    @PostConstruct
    public void init() {
        deploymentIdConf = configCenter.deployment().ofString("id", "");
    }

    @GetMapping(value = "/deploymentId")
    public Mono<String> getDeploymentId() {
        return Mono.just(deploymentIdConf.get());
    }

    @GetMapping("/{key}")
    public Mono<ResponseView<ServerConfig>> getServerConfig(@PathVariable String key) {
        return serverConfigRepository.findByKey(key)
                .defaultIfEmpty(new ServerConfig(key, null))
                .map(ResponseView::success);
    }

    @PostMapping("/{key}")
    public Mono<ResponseView<ServerConfig>> updateServerConfig(@PathVariable String key, @RequestBody UpdateConfigRequest updateConfigRequest) {
        return serverConfigRepository.upsert(key, updateConfigRequest.value())
                .map(ResponseView::success);
    }

    @JsonView(JsonViews.Public.class)
    @GetMapping
    public Mono<ResponseView<ConfigView>> getConfig(ServerWebExchange exchange) {
        return orgApiService.getOrganizationConfigs()
                .map(ResponseView::success);
    }

    private record UpdateConfigRequest(String value) {
    }
}
