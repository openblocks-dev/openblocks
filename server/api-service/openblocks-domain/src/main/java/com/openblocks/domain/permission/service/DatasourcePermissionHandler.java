package com.openblocks.domain.permission.service;

import static com.openblocks.domain.permission.model.ResourceHolder.USER;
import static com.openblocks.sdk.constants.Authentication.ANONYMOUS_USER_ID;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.google.common.collect.Maps;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;

import reactor.core.publisher.Mono;

@Lazy
@Component
class DatasourcePermissionHandler extends ResourcePermissionHandler {

    private static final ResourceRole SYSTEM_STATIC_DATASOURCE_USER_ROLE = ResourceRole.OWNER;

    @Autowired
    private DatasourceService datasourceService;

    @Override
    protected Mono<Map<String, List<ResourcePermission>>> getAnonymousUserPermissions(Collection<String> resourceIds, ResourceAction resourceAction) {
        return Mono.just(Collections.emptyMap());
    }

    @Override
    protected Mono<String> getOrgId(String resourceId) {
        return datasourceService.getById(resourceId)
                .map(Datasource::getOrganizationId);
    }

    @Override
    public Mono<Map<String, List<ResourcePermission>>> getAllMatchingPermissions(String userId, Collection<String> resourceIds,
            ResourceAction resourceAction) {

        List<String> systemStaticDatasourceIds = resourceIds.stream()
                .filter(Datasource::isSystemStaticId)
                .distinct()
                .toList();
        List<String> nonSystemStaticDatasourceIds = resourceIds.stream()
                .filter(Datasource::isNotSystemStaticId)
                .distinct()
                .toList();

        if (CollectionUtils.isEmpty(systemStaticDatasourceIds)) {
            return super.getAllMatchingPermissions(userId, nonSystemStaticDatasourceIds, resourceAction);
        }
        return super.getAllMatchingPermissions(userId, nonSystemStaticDatasourceIds, resourceAction)
                .map(allMatchingPermissions -> {
                    Map<String, List<ResourcePermission>> result = Maps.newHashMap();
                    Map<String, List<ResourcePermission>> systemStaticDatasourcePermissions = systemStaticDatasourceIds.stream()
                            .collect(Collectors.toMap(Function.identity(), id -> getSystemStaticDatasourcePermission(userId, id)));
                    result.putAll(systemStaticDatasourcePermissions);
                    result.putAll(allMatchingPermissions);
                    return result;
                });
    }

    private List<ResourcePermission> getSystemStaticDatasourcePermission(String userId, String datasourceId) {
        return Collections.singletonList(ResourcePermission.builder()
                .resourceId(datasourceId)
                .resourceType(ResourceType.DATASOURCE)
                .resourceHolder(USER)
                .resourceHolderId(userId)
                .resourceRole(SYSTEM_STATIC_DATASOURCE_USER_ROLE)
                .build());
    }
}
