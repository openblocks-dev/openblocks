package com.openblocks.domain.datasource.service;

import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.plugin.client.DatasourcePluginClient;
import com.openblocks.domain.plugin.client.dto.GetPluginDynamicConfigRequestDTO;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.sdk.models.JsDatasourceConnectionConfig;

import reactor.core.publisher.Mono;

@Component
public class JsDatasourceHelper {

    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;
    @Autowired
    private DatasourcePluginClient datasourcePluginClient;

    /**
     * before merge, encrypt, decrypt, and removePasswords
     */
    public Mono<Void> fillPluginDefinition(Datasource datasource) {
        return Mono.defer(() -> {
            if (datasourceMetaInfoService.isJsDatasourcePlugin(datasource.getType())
                    && datasource.getDetailConfig() instanceof JsDatasourceConnectionConfig jsDatasourceConfig
                    && ObjectUtils.anyNull(datasource.getPluginDefinition(), jsDatasourceConfig.getDefinition(), jsDatasourceConfig.getType())) {

                return datasourcePluginClient.getDatasourcePluginDefinition(datasource.getType())
                        .doOnNext(datasourcePluginDTO -> {
                            datasource.setPluginDefinition(datasourcePluginDTO);
                            jsDatasourceConfig.setDefinition(datasourcePluginDTO);
                            jsDatasourceConfig.setType(datasource.getType());
                        })
                        .then();
            }
            return Mono.empty();
        });
    }

    public Mono<Void> processDynamicDatasourceConfigExtra(Datasource datasource) {
        if (datasourceMetaInfoService.isJavaDatasourcePlugin(datasource.getType())) {
            return Mono.empty();
        }
        return fillPluginDefinition(datasource)
                .then(Mono.fromSupplier(datasource::getPluginDefinition))
                .flatMap(datasourcePluginDefinition -> {
                    if (!datasourcePluginDefinition.isDatasourceConfigExtraDynamic()) {
                        return Mono.empty();
                    }
                    GetPluginDynamicConfigRequestDTO getPluginDynamicConfigRequestDTO = GetPluginDynamicConfigRequestDTO.builder()
                            .pluginName(datasource.getType())
                            .path("$.dataSourceConfig.extra")
                            .dataSourceConfig((JsDatasourceConnectionConfig) datasource.getDetailConfig())
                            .build();
                    return datasourcePluginClient.getPluginDynamicConfig(List.of(getPluginDynamicConfigRequestDTO))
                            .flatMap(list -> {
                                if (list.size() == 1) {
                                    Object datasourceConfigExtra = list.get(0);
                                    JsDatasourceConnectionConfig jsDatasourceConnectionConfig =
                                            (JsDatasourceConnectionConfig) datasource.getDetailConfig();
                                    jsDatasourceConnectionConfig.put("extra", datasourceConfigExtra);
                                }
                                return Mono.empty();
                            });
                });
    }

    public Mono<Void> processDynamicQueryConfig(Datasource datasource) {
        if (datasourceMetaInfoService.isJavaDatasourcePlugin(datasource.getType())) {
            return Mono.empty();
        }
        return fillPluginDefinition(datasource)
                .then(Mono.fromSupplier(datasource::getPluginDefinition))
                .flatMap(datasourcePluginDefinition -> {
                    if (!datasourcePluginDefinition.isQueryConfigDynamic()) {
                        return Mono.empty();
                    }
                    GetPluginDynamicConfigRequestDTO getPluginDynamicConfigRequestDTO = GetPluginDynamicConfigRequestDTO.builder()
                            .pluginName(datasource.getType())
                            .path("$.queryConfig")
                            .dataSourceConfig((JsDatasourceConnectionConfig) datasource.getDetailConfig())
                            .build();
                    return datasourcePluginClient.getPluginDynamicConfigSafely(List.of(getPluginDynamicConfigRequestDTO))
                            .flatMap(list -> {
                                if (list.size() == 1) {
                                    Object queryConfig = list.get(0);
                                    datasourcePluginDefinition.put("queryConfig", queryConfig);
                                }
                                return Mono.empty();
                            });
                });
    }
}
