package com.openblocks.domain.application.service;


import static com.openblocks.domain.application.ApplicationUtil.getDependentModulesFromDsl;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.repository.ApplicationRepository;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.infra.annotation.NonEmptyMono;
import com.openblocks.infra.mongo.MongoUpsertHelper;
import com.openblocks.sdk.constants.FieldName;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Lazy
@Service
@Slf4j
public class ApplicationService {


    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    @Autowired
    private ApplicationRepository repository;

    public Mono<Application> findById(String id) {
        if (id == null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ID));
        }

        return repository.findByIdWithDsl(id)
                .switchIfEmpty(Mono.error(new BizException(BizError.NO_RESOURCE_FOUND, "CANT_FIND_APPLICATION", id)));
    }

    public Mono<Application> findByIdWithoutDsl(String id) {
        if (id == null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ID));
        }

        return repository.findById(id)
                .switchIfEmpty(Mono.error(new BizException(BizError.NO_RESOURCE_FOUND, "CANT_FIND_APPLICATION", id)));
    }

    public Mono<Boolean> updateById(String applicationId, Application application) {
        if (applicationId == null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ID));
        }

        return mongoUpsertHelper.updateById(application, applicationId);
    }


    public Mono<Boolean> updatePublishedApplicationDSL(String applicationId, Map<String, Object> applicationDSL) {
        Application application = Application.builder().publishedApplicationDSL(applicationDSL).build();
        return mongoUpsertHelper.updateById(application, applicationId);
    }

    public Mono<Application> publish(String applicationId) {
        return findById(applicationId)
                .flatMap(newApplication -> { // copy editingApplicationDSL to publishedApplicationDSL
                    Map<String, Object> editingApplicationDSL = newApplication.getEditingApplicationDSL();
                    return updatePublishedApplicationDSL(applicationId, editingApplicationDSL)
                            .thenReturn(newApplication);
                });
    }

    public Mono<Application> create(Application newApplication, String visitorId) {
        return repository.save(newApplication)
                .delayUntil(app -> resourcePermissionService.addApplicationPermissionToUser(app.getId(), visitorId, ResourceRole.OWNER));
    }

    /**
     * If you don't need dsl, please use {@link #findByOrganizationIdWithoutDsl(String)}
     */
    public Flux<Application> findByOrganizationIdWithDsl(String organizationId) {
        return repository.findByOrganizationIdWithDsl(organizationId);
    }

    public Flux<Application> findByOrganizationIdWithoutDsl(String organizationId) {
        return repository.findByOrganizationId(organizationId);
    }

    public Mono<Long> countByOrganizationId(String orgId, ApplicationStatus applicationStatus) {
        return repository.countByOrganizationIdAndApplicationStatus(orgId, applicationStatus);
    }

    public Flux<Application> findByIdIn(List<String> applicationIds) {
        return repository.findByIdIn(applicationIds);
    }

    public Mono<List<Application>> getAllDependentModulesFromApplicationId(String applicationId, boolean viewMode) {
        return findById(applicationId)
                .flatMap(app -> getAllDependentModulesFromApplication(app, viewMode));
    }

    public Mono<List<Application>> getAllDependentModulesFromApplication(Application application, boolean viewMode) {
        Map<String, Object> dsl = viewMode ? application.getLiveApplicationDsl() : application.getEditingApplicationDSL();
        return getAllDependentModulesFromDsl(dsl);
    }

    public Mono<List<Application>> getAllDependentModulesFromDsl(Map<String, Object> dsl) {
        Set<String> circularDependencyCheckSet = Sets.newHashSet();
        return Mono.just(getDependentModulesFromDsl(dsl))
                .doOnNext(circularDependencyCheckSet::addAll)
                .flatMapMany(moduleSet -> findByIdIn(Lists.newArrayList(moduleSet)))
                .onErrorContinue((e, i) -> log.warn("get dependent modules on error continue , {}", e.getMessage()))
                .expandDeep(module -> getDependentModules(module, circularDependencyCheckSet))
                .collectList();
    }

    private Flux<Application> getDependentModules(Application module, Set<String> circularDependencyCheckSet) {
        return Flux.fromIterable(module.getLiveModules())
                .filter(moduleId -> !circularDependencyCheckSet.contains(moduleId))
                .doOnNext(circularDependencyCheckSet::add)
                .collectList()
                .flatMapMany(this::findByIdIn)
                .onErrorContinue((e, i) -> log.warn("get dependent modules on error continue , {}", e.getMessage()));
    }

    public Mono<Boolean> setApplicationPublicToAll(String applicationId, boolean publicToAll) {
        Application application = Application.builder()
                .publicToAll(publicToAll)
                .build();
        return mongoUpsertHelper.updateById(application, applicationId);
    }

    @NonEmptyMono
    @SuppressWarnings("ReactiveStreamsNullableInLambdaInTransform")
    public Mono<Set<String>> getPublicApplicationIds(Collection<String> applicationIds) {
        return repository.findByPublicToAllIsTrueAndIdIn(applicationIds)
                .map(HasIdAndAuditing::getId)
                .collect(Collectors.toSet());
    }
}
