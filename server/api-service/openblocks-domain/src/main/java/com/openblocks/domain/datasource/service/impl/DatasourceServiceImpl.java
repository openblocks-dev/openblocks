package com.openblocks.domain.datasource.service.impl;

import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static com.openblocks.sdk.util.LocaleUtils.getLocale;
import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

import java.time.Duration;
import java.util.Collection;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.google.common.base.Joiner;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.repository.ApplicationRepository;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.repository.DatasourceRepository;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.datasource.service.JsDatasourceHelper;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.plugin.client.DatasourcePluginClient;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.sdk.constants.FieldName;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.models.JsDatasourceConnectionConfig;
import com.openblocks.sdk.util.LocaleUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class DatasourceServiceImpl implements DatasourceService {

    private static final Duration DEFAULT_TEST_CONNECTION_TIMEOUT = Duration.ofSeconds(10);
    private static final String INVALID_PARAMETER_CODE = "INVALID_PARAMETER";

    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private ResourcePermissionService resourcePermissionService;
    @Autowired
    private DatasourceRepository repository;
    @Autowired
    private DatasourcePluginClient datasourcePluginClient;
    @Autowired
    private JsDatasourceHelper jsDatasourceHelper;

    @Override
    public Mono<Datasource> create(Datasource datasource, String creatorId) {
        if (datasource.getId() != null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, INVALID_PARAMETER_CODE, FieldName.ID));
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
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, INVALID_PARAMETER_CODE, FieldName.ID));
        }

        return repository.findById(datasourceId)
                .delayUntil(jsDatasourceHelper::fillPluginDefinition)
                .map(currentDatasource -> currentDatasource.mergeWith(updatedDatasource))
                .flatMap(this::validateDatasource)
                .flatMap(this::trySaveDatasource);
    }

    @Override
    public Mono<Datasource> getById(String id) {

        if (StringUtils.equals(id, Datasource.QUICK_REST_API_ID)) {
            return Mono.just(Datasource.QUICK_REST_API);
        }

        if (StringUtils.equals(id, Datasource.QUICK_GRAPHQL_ID)) {
            return Mono.just(Datasource.QUICK_GRAPHQL_API);
        }

        if (StringUtils.equals(id, Datasource.OPENBLOCKS_API_ID)) {
            return Mono.just(Datasource.OPENBLOCKS_API);
        }

        return repository.findById(id);
    }

    private Mono<Datasource> validateDatasource(Datasource datasource) {

        if (datasource.getOrganizationId() == null) {
            throw new BizException(BizError.INVALID_PARAMETER, INVALID_PARAMETER_CODE, FieldName.ORGANIZATION_ID);
        }

        if (StringUtils.isBlank(datasource.getName())) {
            throw new BizException(BizError.INVALID_PARAMETER, INVALID_PARAMETER_CODE, FieldName.NAME);
        }

        if (datasource.getType() == null) {
            throw new BizException(BizError.DATASOURCE_PLUGIN_ID_NOT_GIVEN, "DATASOURCE_PLUGIN_ID_NOT_GIVEN");
        }

        if (datasourceMetaInfoService.isJsDatasourcePlugin(datasource.getType())) {
            return Mono.just(datasource);
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
                    .delayUntil(jsDatasourceHelper::fillPluginDefinition)
                    .map(datasource -> datasource.mergeWith(testDatasource));
        }

        return datasourceMono
                .flatMap(this::validateDatasource)
                .flatMap(datasource -> {
                    if (datasourceMetaInfoService.isJsDatasourcePlugin(datasource.getType())) {
                        return testDatasourceByNodeJs(datasource);
                    }
                    return testDatasourceLocally(datasource);
                });
    }

    private Mono<DatasourceTestResult> testDatasourceLocally(Datasource datasource) {
        return datasourceMetaInfoService.getDatasourceConnector(datasource.getType())
                .doTestConnection(datasource.getDetailConfig())
                .timeout(DEFAULT_TEST_CONNECTION_TIMEOUT)
                .onErrorResume(error -> Mono.just(DatasourceTestResult.testFail(error)));
    }

    private Mono<DatasourceTestResult> testDatasourceByNodeJs(Datasource datasource) {
        return datasourcePluginClient.test(datasource.getType(), datasource.getDetailConfig());
    }

    @Override
    public Mono<Void> removePasswordTypeKeysFromJsDatasourcePluginConfig(Datasource datasource) {
        return jsDatasourceHelper.fillPluginDefinition(datasource)
                .doFinally(__ -> {
                    if (datasourceMetaInfoService.isJsDatasourcePlugin(datasource.getType())
                            && datasource.getDetailConfig() instanceof JsDatasourceConnectionConfig jsDatasourceConnectionConfig) {
                        jsDatasourceConnectionConfig.removePasswords();
                    }
                });
    }

    @Override
    public Flux<Datasource> getByOrgId(String orgId) {
        return repository.findAllByOrganizationId(orgId);
    }

    @Override
    public Mono<Long> countByOrganizationId(String orgId) {
        return repository.countByOrganizationId(orgId);
    }

    @Override
    public Mono<Datasource> findWorkspacePredefinedDatasource(String organizationId, String type) {
        return repository.findWorkspacePredefinedDatasourceByOrgIdAndType(organizationId, type);
    }

    @Override
    public Flux<String> retainNoneExistAndNonCurrentOrgDatasourceIds(Collection<String> datasourceIds, String orgId) {
        if (CollectionUtils.isEmpty(datasourceIds)) {
            return Flux.empty();
        }
        return repository.retainNoneExistAndNonCurrentOrgDatasourceIds(datasourceIds, orgId);
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

