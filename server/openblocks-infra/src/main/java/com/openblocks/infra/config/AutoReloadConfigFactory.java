package com.openblocks.infra.config;

import static com.openblocks.sdk.util.JsonUtils.toJson;
import static java.util.Collections.emptyMap;
import static java.util.stream.Collectors.toUnmodifiableMap;

import java.time.Duration;
import java.util.Map;

import javax.annotation.Nullable;
import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.infra.config.model.ServerConfig;
import com.openblocks.infra.config.repository.ServerConfigRepository;
import com.openblocks.infra.localcache.ReloadableCache;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
class AutoReloadConfigFactory {

    @Autowired
    private ServerConfigRepository configRepository;

    private ReloadableCache<Map<String, Object>> allConfigs;

    @PostConstruct
    private void init() {
        allConfigs = ReloadableCache.<Map<String, Object>> newBuilder()
                .setFactory(() -> configRepository.findAll()
                        .filter(it -> it.getValue() != null)
                        .collectList()
                        .map(configs -> configs.stream().collect(toUnmodifiableMap(ServerConfig::getKey, ServerConfig::getValue))))
                .setInterval(Duration.ofSeconds(3))
                .setName("autoReloadConfCache")
                .build();
    }

    @Nullable
    public String getValue(String confKey) {
        Object result = allConfigs.getCachedOrDefault(emptyMap()).get(confKey);
        if (result == null) {
            return null;
        }

        return toJson(result);
    }
}
