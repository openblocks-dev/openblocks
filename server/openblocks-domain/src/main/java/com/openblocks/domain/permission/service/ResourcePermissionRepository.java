package com.openblocks.domain.permission.service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Multimap;
import com.openblocks.domain.permission.model.ResourceHolder;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.infra.annotation.NonEmptyMono;

import reactor.core.publisher.Mono;

public interface ResourcePermissionRepository {

    @NonEmptyMono
    Mono<Map<String, Collection<ResourcePermission>>> getByResourceTypeAndResourceIds(ResourceType resourceType, Collection<String> resourceIds);

    @NonEmptyMono
    Mono<List<ResourcePermission>> getByResourceTypeAndResourceId(ResourceType resourceType, String resourceId);

    Mono<Void> insertBatchPermission(ResourceType resourceType, String resourceId,
            Multimap<ResourceHolder, String> resourceHolderMap, ResourceRole role);

    Mono<Boolean> addPermission(ResourceType resourceType, String resourceId,
            ResourceHolder holderType, String holderId, ResourceRole resourceRole);

    Mono<Boolean> updatePermissionRoleById(String permissionId, ResourceRole role);

    Mono<Boolean> removePermissionById(String permissionId);

    Mono<Boolean> removePermissionBy(ResourceType resourceType, String resourceId,
            ResourceHolder resourceHolder,
            String resourceHolderId);

    Mono<ResourcePermission> getById(String permissionId);

    Mono<ResourcePermission> getByResourceTypeAndResourceIdAndTargetId(ResourceType resourceType, String resourceId,
            ResourceHolder user, String userId);
}
