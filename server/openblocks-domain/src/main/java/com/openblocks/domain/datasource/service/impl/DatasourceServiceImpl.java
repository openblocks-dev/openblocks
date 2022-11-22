package com.openblocks.domain.datasource.service.impl;

import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static com.openblocks.sdk.util.LocaleUtils.getLocale;
import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

import java.time.Duration;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.google.common.base.Joiner;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.repository.ApplicationRepository;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.repository.DatasourceRepository;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.sdk.constants.FieldName;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.util.LocaleUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class DatasourceServiceImpl implements DatasourceService {

    private static final Duration DEFAULT_TEST_CONNECTION_TIMEOUT = Duration.ofSeconds(10);

    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private ResourcePermissionService resourcePermissionService;
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private DatasourceRepository repository;

    @Override
    public Mono<Datasource> create(Datasource datasource, String creatorId) {
        if (datasource.getId() != null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ID));
        }

        return Mono.just(datasource)
                .flatMap(this::validateDatasource)
                .flatMap(this::trySaveDatasource)
                .delayUntil(savedDatasource -> resourcePermissionService.addDataSourcePermissionToUser(savedDatasource.getId(), creatorId,
                        ResourceRole.OWNER));
    }

    @Override
    public Mono<Datasource> update(String datasourceId, Datasource updatedDatasource) {

        if (datasourceId == null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ID));
        }

        return repository.findById(datasourceId)
                .map(currentDatasource -> currentDatasource.mergeWith(updatedDatasource))
                .flatMap(this::validateDatasource)
                .flatMap(this::trySaveDatasource);
    }

    @Override
    public Mono<Datasource> getById(String id) {
        return repository.findById(id);
    }

    private Mono<Datasource> validateDatasource(Datasource datasource) {

        if (datasource.getOrganizationId() == null) {
            throw new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ORGANIZATION_ID);
        }

        if (StringUtils.isBlank(datasource.getName())) {
            throw new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.NAME);
        }

        if (datasource.getType() == null) {
            throw new BizException(BizError.DATASOURCE_PLUGIN_ID_NOT_GIVEN, "DATASOURCE_PLUGIN_ID_NOT_GIVEN");
        }

        return Mono.deferContextual(ctx -> {
            Locale locale = getLocale(ctx);
            return Mono.just(datasourceMetaInfoService.getDatasourceConnector(datasource.getType()))
                    .flatMap(datasourceConnector -> {
                        DatasourceConnectionConfig detailConfig = datasource.getDetailConfig();
                        Set<String> errorMsgKeySet = datasourceConnector.doValidateConfig(detailConfig);
                        Set<String> errorMsgSet = errorMsgKeySet.stream()
                                .map(key -> LocaleUtils.getMessage(locale, key))
                                .collect(Collectors.toSet());
                        if (isNotEmpty(errorMsgKeySet)) {
                            return ofError(BizError.INVALID_DATASOURCE_CONFIGURATION, "INVALID_DATASOURCE_CONFIGURATION",
                                    Joiner.on('\n').join(errorMsgSet));
                        }

                        return Mono.just(datasource);
                    });
        });
    }

    @Nonnull
    private Mono<Datasource> trySaveDatasource(Datasource datasource) {
        return repository.save(datasource)
                .onErrorMap(error -> {
                    if (error instanceof DuplicateKeyException) {
                        return new BizException(BizError.DUPLICATE_DATABASE_NAME, "DUPLICATE_DATABASE_NAME", datasource.getName());
                    }
                    return error;
                });
    }

    @Override
    public Mono<DatasourceTestResult> testDatasource(Datasource testDatasource) {
        Mono<Datasource> datasourceMono = Mono.just(testDatasource);

        if (testDatasource.getId() != null) {
            datasourceMono = getById(testDatasource.getId())
                    .switchIfEmpty(deferredError(BizError.NOT_AUTHORIZED, "NOT_AUTHORIZED"))
                    .map(datasource -> datasource.mergeWith(testDatasource));
        }

        return datasourceMono
                .flatMap(this::validateDatasource)
                .flatMap(this::testDatasourceConnection);
    }

    private Mono<DatasourceTestResult> testDatasourceConnection(Datasource datasource) {
        return datasourceMetaInfoService.getDatasourceConnector(datasource.getType())
                .doTestConnection(datasource.getDetailConfig())
                .timeout(DEFAULT_TEST_CONNECTION_TIMEOUT)
                .onErrorResume(error -> Mono.just(DatasourceTestResult.testFail(error)));
    }

    @Override
    public Mono<List<Datasource>> getByOrgId(String orgId) {
        return repository.findAllByOrganizationId(orgId)
                .collectList();
    }

    @Override
    public Mono<List<Datasource>> getByAppId(String appId) {
        return applicationService.findByIdWithoutDsl(appId)
                .flatMap(application -> repository.findAllByOrganizationId(application.getOrganizationId()).collectList());
    }

    @Override
    public Mono<Long> countByOrganizationId(String orgId) {
        return repository.countByOrganizationId(orgId);
    }

    @Override
    public Mono<Datasource> findSystemPredefinedDatasource(String organizationId, String datasourceType) {
        return repository.findSystemPredefinedDatasourceByOrgIdAndType(organizationId, datasourceType);
    }

    @Override
    public Mono<Boolean> delete(String datasourceId) {
        return stillUsedInApplications(datasourceId)
                .flatMap(stillUsedInApplications -> {
                    if (Boolean.TRUE.equals(stillUsedInApplications)) {
                        return Mono.error(new BizException(BizError.DATASOURCE_DELETE_FAIL_DUE_TO_REMAINING_QUERIES,
                                "DATASOURCE_DELETE_FAIL_DUE_TO_REMAINING_QUERIES"));
                    }
                    return Mono.empty();
                })
                .then(repository.markDatasourceAsDeleted(datasourceId));
    }

    @Nonnull
    private Mono<Boolean> stillUsedInApplications(String datasourceId) {
        return applicationRepository.findByDatasourceId(datasourceId)
                .filter(application -> application.getApplicationStatus() != ApplicationStatus.DELETED)
                .hasElements();
    }
}

