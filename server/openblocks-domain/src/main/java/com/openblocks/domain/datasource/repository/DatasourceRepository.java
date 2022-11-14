package com.openblocks.domain.datasource.repository;

import static com.openblocks.sdk.util.JsonUtils.fromJsonMap;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceDO;
import com.openblocks.domain.datasource.model.DatasourceStatus;
import com.openblocks.domain.encryption.EncryptionService;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.infra.mongo.MongoUpsertHelper;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * all find operation must do data decryption
 * for update operations that try to save whole datasource object, data encryption is required
 */
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

    public Mono<Datasource> findById(String datasourceId) {
        return repository.findById(datasourceId)
                .map(this::convertToDomainObjectAndDecrypt);
    }

    public Flux<Datasource> findAllByOrganizationId(String orgId) {
        return repository.findAllByOrganizationId(orgId)
                .map(this::convertToDomainObjectAndDecrypt);
    }

    public Mono<Datasource> save(Datasource datasource) {
        return repository.save(encryptDataAndConvertToDataObject(datasource))
                .map(this::convertToDomainObjectAndDecrypt);
    }

    public Mono<Boolean> markDatasourceAsDeleted(String datasourceId) {
        Datasource datasource = new Datasource();
        datasource.setDatasourceStatus(DatasourceStatus.DELETED);
        return mongoUpsertHelper.updateById(datasource, datasourceId);
    }

    public Mono<Long> countByOrganizationId(String orgId) {
        return repository.countByOrganizationId(orgId);
    }

    @SuppressWarnings("DuplicatedCode")
    private Datasource convertToDomainObjectAndDecrypt(DatasourceDO datasourceDO) {
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

        DatasourceConnectionConfig detailConfig = datasourceMetaInfoService.resolveDetailConfig(datasourceDO.getDetailConfig(), result.getType());
        DatasourceConnectionConfig decryptedDetailConfig = detailConfig.doDecrypt(encryptionService::decryptString);
        result.setDetailConfig(decryptedDetailConfig);
        return result;
    }

    @SuppressWarnings("DuplicatedCode")
    private DatasourceDO encryptDataAndConvertToDataObject(Datasource datasource) {

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

        DatasourceConnectionConfig detailConfig = datasource.getDetailConfig();
        DatasourceConnectionConfig encryptedConfig = detailConfig.doEncrypt(encryptionService::encryptString);
        result.setDetailConfig(fromJsonMap(toJson(encryptedConfig)));
        return result;
    }
}
