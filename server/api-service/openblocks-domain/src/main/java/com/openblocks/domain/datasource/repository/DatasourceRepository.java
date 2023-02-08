package com.openblocks.domain.datasource.repository;

import static com.openblocks.sdk.util.JsonUtils.fromJsonMap;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceCreationSource;
import com.openblocks.domain.datasource.model.DatasourceDO;
import com.openblocks.domain.datasource.model.DatasourceStatus;
import com.openblocks.domain.datasource.service.JsDatasourceHelper;
import com.openblocks.domain.encryption.EncryptionService;
import com.openblocks.domain.plugin.client.DatasourcePluginClient;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.infra.mongo.MongoUpsertHelper;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.models.HasIdAndAuditing;
import com.openblocks.sdk.models.JsDatasourceConnectionConfig;
import com.openblocks.sdk.util.JsonUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * all find operation must do data decryption
 * for update operations that try to save whole datasource object, data encryption is required
 */
@Slf4j
@Repository
public class DatasourceRepository {

    @Autowired
    private DatasourceDORepository repository;

    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;

    @Autowired
    private EncryptionService encryptionService;

    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;

    @Autowired
    private DatasourcePluginClient datasourcePluginClient;

    @Autowired
    private JsDatasourceHelper jsDatasourceHelper;

    public Mono<Datasource> findById(String datasourceId) {
        return repository.findById(datasourceId)
                .flatMap(this::convertToDomainObjectAndDecrypt);
    }

    public Mono<Datasource> findWorkspacePredefinedDatasourceByOrgIdAndType(String organizationId, String type) {
        return repository.findByOrganizationIdAndTypeAndCreationSource(organizationId, type,
                        DatasourceCreationSource.LEGACY_WORKSPACE_PREDEFINED.getValue())
                .flatMap(this::convertToDomainObjectAndDecrypt);
    }

    public Flux<Datasource> findAllById(Iterable<String> ids) {
        return repository.findAllById(ids)
                .flatMap(this::convertToDomainObjectAndDecrypt);
    }

    public Flux<Datasource> findAllByOrganizationId(String orgId) {
        return repository.findAllByOrganizationId(orgId)
                .flatMap(this::convertToDomainObjectAndDecrypt);
    }

    public Mono<Datasource> save(Datasource datasource) {
        return encryptDataAndConvertToDataObject(datasource)
                .flatMap(repository::save)
                .flatMap(this::convertToDomainObjectAndDecrypt);
    }

    public Mono<Boolean> markDatasourceAsDeleted(String datasourceId) {
        Datasource datasource = new Datasource();
        datasource.setDatasourceStatus(DatasourceStatus.DELETED);
        return mongoUpsertHelper.updateById(datasource, datasourceId);
    }

    public Flux<String> retainNoneExistAndNonCurrentOrgDatasourceIds(Collection<String> datasourceIds, String orgId) {
        if (CollectionUtils.isEmpty(datasourceIds)) {
            return Flux.empty();
        }
        return repository.findAllById(new HashSet<>(datasourceIds))
                .collectList()
                .map(existDatasources -> {
                    Set<String> result = new HashSet<>(datasourceIds);
                    existDatasources.stream()
                            .filter(datasource -> datasource.getOrganizationId().equals(orgId))
                            .map(HasIdAndAuditing::getId)
                            .forEach(result::remove);
                    return result;
                })
                .flatMapIterable(Function.identity());
    }

    public Mono<Long> countByOrganizationId(String orgId) {
        return repository.countByOrganizationId(orgId);
    }

    @SuppressWarnings("DuplicatedCode")
    private Mono<Datasource> convertToDomainObjectAndDecrypt(DatasourceDO datasourceDO) {

        Mono<Datasource> datasourceMono = Mono.fromSupplier(() -> {
                    Datasource result = new Datasource();
                    result.setName(datasourceDO.getName());
                    result.setType(datasourceDO.getType());
                    result.setOrganizationId(datasourceDO.getOrganizationId());
                    result.setCreationSource(datasourceDO.getCreationSource());
                    result.setDatasourceStatus(datasourceDO.getDatasourceStatus());
                    result.setId(datasourceDO.getId());
                    result.setCreatedAt(datasourceDO.getCreatedAt());
                    result.setUpdatedAt(datasourceDO.getUpdatedAt());
                    result.setCreatedBy(datasourceDO.getCreatedBy());
                    result.setModifiedBy(datasourceDO.getModifiedBy());
                    return result;
                })
                .cache();

        return datasourceMono
                .doOnNext(datasource -> {
                    if (datasourceMetaInfoService.isJsDatasourcePlugin(datasource.getType())) {
                        JsDatasourceConnectionConfig jsDatasourceConnectionConfig = new JsDatasourceConnectionConfig();
                        jsDatasourceConnectionConfig.putAll(datasourceDO.getDetailConfig());
                        datasource.setDetailConfig(jsDatasourceConnectionConfig);
                    } else {
                        DatasourceConnectionConfig detailConfig =
                                datasourceMetaInfoService.resolveDetailConfig(datasourceDO.getDetailConfig(), datasource.getType());
                        datasource.setDetailConfig(detailConfig);
                    }
                })
                .delayUntil(jsDatasourceHelper::fillPluginDefinition)
                .doOnNext(datasource -> {
                    DatasourceConnectionConfig decryptedDetailConfig = datasource.getDetailConfig().doDecrypt(encryptionService::decryptString);
                    // override
                    datasource.setDetailConfig(decryptedDetailConfig);
                })
                .doOnError(throwable -> log.error("resolve detail config error.{},{}", datasourceDO.getType(),
                        JsonUtils.toJson(datasourceDO.getDetailConfig()), throwable))
                .onErrorResume(__ -> datasourceMono);
    }

    @SuppressWarnings("DuplicatedCode")
    private Mono<DatasourceDO> encryptDataAndConvertToDataObject(Datasource datasource) {

        return Mono.fromSupplier(() -> {
                    DatasourceDO result = new DatasourceDO();
                    result.setName(datasource.getName());
                    result.setType(datasource.getType());
                    result.setOrganizationId(datasource.getOrganizationId());
                    result.setCreationSource(datasource.getCreationSource());
                    result.setDatasourceStatus(datasource.getDatasourceStatus());
                    result.setId(datasource.getId());
                    result.setCreatedAt(datasource.getCreatedAt());
                    result.setUpdatedAt(datasource.getUpdatedAt());
                    result.setCreatedBy(datasource.getCreatedBy());
                    result.setModifiedBy(datasource.getModifiedBy());
                    return result;
                })
                .delayUntil(__ -> jsDatasourceHelper.fillPluginDefinition(datasource))
                .doOnNext(datasourceDO -> {
                    DatasourceConnectionConfig detailConfig = datasource.getDetailConfig();
                    DatasourceConnectionConfig encryptedConfig = detailConfig.doEncrypt(encryptionService::encryptString);
                    // override
                    datasourceDO.setDetailConfig(fromJsonMap(toJson(encryptedConfig)));
                });
    }
}
