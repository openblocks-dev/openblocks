package com.openblocks.domain.permission.service;

import static com.google.common.collect.Sets.newHashSet;
import static com.openblocks.domain.permission.model.ResourceHolder.USER;
import static com.openblocks.sdk.constants.Authentication.ANONYMOUS_USER_ID;
import static com.openblocks.sdk.util.StreamUtils.collectMap;
import static java.util.Collections.emptyMap;
import static java.util.function.Function.identity;
import static org.apache.commons.collections4.SetUtils.union;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.domain.solutions.TemplateSolution;

import reactor.core.publisher.Mono;

@Lazy
@Component
class ApplicationPermissionHandler extends ResourcePermissionHandler {

    private static final ResourceRole ANONYMOUS_USER_ROLE = ResourceRole.VIEWER;
    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private TemplateSolution templateSolution;

    @Override
    protected Mono<Map<String, List<ResourcePermission>>> getAnonymousUserPermissions(Collection<String> resourceIds,
            ResourceAction resourceAction) {
        if (!ANONYMOUS_USER_ROLE.canDo(resourceAction)) {
            return Mono.just(emptyMap());
        }

        Set<String> applicationIds = newHashSet(resourceIds);
        return Mono.zip(applicationService.getPublicApplicationIds(applicationIds),
                        templateSolution.getTemplateApplicationIds(applicationIds))
                .map(tuple -> {
                    Set<String> publicAppIds = tuple.getT1();
                    Set<String> templateAppIds = tuple.getT2();
                    return collectMap(union(publicAppIds, templateAppIds), identity(), this::getAnonymousUserPermission);
                });
    }

    private List<ResourcePermission> getAnonymousUserPermission(String applicationId) {
        return Collections.singletonList(ResourcePermission.builder()
                .resourceId(applicationId)
                .resourceType(ResourceType.APPLICATION)
                .resourceHolder(USER)
                .resourceHolderId(ANONYMOUS_USER_ID)
                .resourceRole(ANONYMOUS_USER_ROLE)
                .build());
    }

    @Override
    protected Mono<String> getOrgId(String resourceId) {
        return applicationService.findByIdWithoutDsl(resourceId)
                .map(Application::getOrganizationId);
    }
}
