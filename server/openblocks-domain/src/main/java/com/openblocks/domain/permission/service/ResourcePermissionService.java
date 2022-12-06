package com.openblocks.domain.permission.service;

import static com.openblocks.sdk.exception.BizError.INVALID_PERMISSION_OPERATION;
import static com.openblocks.sdk.exception.BizError.NOT_AUTHORIZED;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;
import static java.util.Collections.singleton;
import static org.apache.commons.collections4.SetUtils.emptyIfNull;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Nullable;
import javax.validation.constraints.NotNull;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.model.ResourceHolder;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.domain.permission.model.UserPermissionOnResourceStatus;
import com.openblocks.infra.annotation.NonEmptyMono;
import com.openblocks.infra.annotation.PossibleEmptyMono;
import com.openblocks.sdk.exception.BizException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ResourcePermissionService {

    @Autowired
    private ResourcePermissionRepository repository;

    @Lazy
    @Autowired
    private ApplicationPermissionHandler applicationPermissionHandler;

    @Lazy
    @Autowired
    private DatasourcePermissionHandler datasourcePermissionHandler;

    public Mono<Map<String, Collection<ResourcePermission>>> getByResourceTypeAndResourceIds(ResourceType resourceType,
            Collection<String> resourceIds) {
        return repository.getByResourceTypeAndResourceIds(resourceType, resourceIds);
    }

    @NonEmptyMono
    public Mono<List<ResourcePermission>> getByResourceTypeAndResourceId(ResourceType resourceType, String resourceId) {
        return repository.getByResourceTypeAndResourceId(resourceType, resourceId);
    }

    @NonEmptyMono
    public Mono<List<ResourcePermission>> getByApplicationId(String applicationId) {
        return getByResourceTypeAndResourceId(ResourceType.APPLICATION, applicationId);
    }

    @NonEmptyMono
    public Mono<List<ResourcePermission>> getByDataSourceId(String dataSourceId) {
        return getByResourceTypeAndResourceId(ResourceType.DATASOURCE, dataSourceId);
    }

    public Mono<Void> insertBatchPermission(ResourceType resourceType, String resourceId, @Nullable Set<String> userIds,
            @Nullable Set<String> groupIds, ResourceRole role) {
        if (CollectionUtils.isEmpty(userIds) && CollectionUtils.isEmpty(groupIds)) {
            return Mono.empty();
        }
        return repository.insertBatchPermission(resourceType, resourceId, buildResourceHolders(emptyIfNull(userIds), emptyIfNull(groupIds)), role);
    }

    private Multimap<ResourceHolder, String> buildResourceHolders(@NotNull Set<String> userIds, @NotNull Set<String> groupIds) {
        HashMultimap<ResourceHolder, String> result = HashMultimap.create();
        for (String userId : userIds) {
            result.put(ResourceHolder.USER, userId);
        }
        for (String groupId : groupIds) {
            result.put(ResourceHolder.GROUP, groupId);
        }
        return result;
    }

    @SuppressWarnings("SameParameterValue")
    Mono<Boolean> addPermission(ResourceType resourceType, String resourceId,
            ResourceHolder holderType, String holderId,
            ResourceRole resourceRole) {
        return repository.addPermission(resourceType, resourceId, holderType, holderId, resourceRole);
    }

    public Mono<Boolean> addDataSourcePermissionToUser(String dataSourceId,
            String userId,
            ResourceRole role) {
        return addPermission(ResourceType.DATASOURCE, dataSourceId, ResourceHolder.USER, userId, role);
    }

    public Mono<Boolean> addApplicationPermissionToUser(String applicationId,
            String userId,
            ResourceRole role) {
        return addPermission(ResourceType.APPLICATION, applicationId, ResourceHolder.USER, userId, role);
    }

    public Mono<Boolean> addApplicationPermissionToGroup(String applicationId,
            String groupId,
            ResourceRole role) {
        return addPermission(ResourceType.APPLICATION, applicationId, ResourceHolder.GROUP, groupId, role);
    }

    public Mono<ResourcePermission> getById(String permissionId) {
        return repository.getById(permissionId);
    }

    public Mono<Boolean> removeById(String permissionId) {
        return repository.removePermissionById(permissionId);
    }

    public Mono<Boolean> updateRoleById(String permissionId, ResourceRole role) {
        return repository.updatePermissionRoleById(permissionId, role);
    }

    /**
     * @return map key: resourceId, value: all permissions user have for this resource
     */
    private Mono<Map<String, List<ResourcePermission>>> getAllMatchingPermissions(String userId,
            Collection<String> resourceIds,
            ResourceAction resourceAction) {
        ResourceType resourceType = resourceAction.getResourceType();
        var resourcePermissionHandler = getResourcePermissionHandler(resourceType);
        return resourcePermissionHandler.getAllMatchingPermissions(userId, resourceIds, resourceAction);
    }

    private ResourcePermissionHandler getResourcePermissionHandler(ResourceType resourceType) {
        if (resourceType == ResourceType.DATASOURCE) {
            return datasourcePermissionHandler;
        }

        if (resourceType == ResourceType.APPLICATION) {
            return applicationPermissionHandler;
        }

        throw ofException(INVALID_PERMISSION_OPERATION, "INVALID_PERMISSION_OPERATION", resourceType);
    }

    public Flux<String> filterResourceWithPermission(String userId, Collection<String> resourceIds, ResourceAction resourceAction) {
        return getAllMatchingPermissions(userId, resourceIds, resourceAction)
                .flatMapIterable(Map::entrySet)
                .filter(entry -> CollectionUtils.isNotEmpty(entry.getValue()))
                .map(Entry::getKey);
    }

    public Mono<Void> checkResourcePermissionWithError(String userId, String resourceId, ResourceAction action) {
        return getAllMatchingPermissions(userId, singleton(resourceId), action)
                .flatMap(map -> {
                    List<ResourcePermission> resourcePermissions = map.get(resourceId);
                    if (CollectionUtils.isNotEmpty(resourcePermissions)) {
                        return Mono.empty();
                    }
                    return Mono.error(new BizException(NOT_AUTHORIZED, "NOT_AUTHORIZED"));
                });
    }

    @PossibleEmptyMono
    public Mono<ResourcePermission> getMaxMatchingPermission(String userId, String resourceId, ResourceAction resourceAction) {
        return getMaxMatchingPermission(userId, Collections.singleton(resourceId), resourceAction)
                .flatMap(map -> {
                    ResourcePermission resourcePermission = map.get(resourceId);
                    if (resourcePermission == null) {
                        return Mono.empty();
                    }
                    return Mono.just(resourcePermission);
                });
    }

    /**
     * If current user has enough permissions for all resources.
     */
    public Mono<Boolean> haveAllEnoughPermissions(String userId, Collection<String> resourceIds, ResourceAction resourceAction) {
        return getMaxMatchingPermission(userId, resourceIds, resourceAction)
                .map(map -> map.keySet().containsAll(resourceIds));
    }

    public Mono<Map<String, ResourcePermission>> getMaxMatchingPermission(String userId,
            Collection<String> resourceIds, ResourceAction resourceAction) {
        return getAllMatchingPermissions(userId, resourceIds, resourceAction)
                .flatMapIterable(Map::entrySet)
                .filter(it -> CollectionUtils.isNotEmpty(it.getValue()))
                .collectMap(Entry::getKey, entry -> getMaxRole(entry.getValue()));
    }

    @SuppressWarnings("OptionalGetWithoutIsPresent")
    private ResourcePermission getMaxRole(List<ResourcePermission> permissions) {
        return permissions.stream()
                .max(Comparator.comparingInt(it -> it.getResourceRole().getRoleWeight()))
                .get();
    }

    public Mono<ResourcePermission> checkAndReturnMaxPermission(String userId, String resourceId, ResourceAction resourceAction) {
        return getMaxMatchingPermission(userId, Collections.singleton(resourceId), resourceAction)
                .flatMap(permissionMap -> {
                    if (!permissionMap.containsKey(resourceId)) {
                        return ofError(NOT_AUTHORIZED, "NOT_AUTHORIZED");
                    }
                    return Mono.just(permissionMap.get(resourceId));
                });
    }

    public Mono<UserPermissionOnResourceStatus> checkUserPermissionStatusOnResource(String userId, String resourceId, ResourceAction resourceAction) {
        ResourceType resourceType = resourceAction.getResourceType();
        var resourcePermissionHandler = getResourcePermissionHandler(resourceType);
        return resourcePermissionHandler.checkUserPermissionStatusOnResource(userId, resourceId, resourceAction);
    }

    public Mono<Boolean> removeUserApplicationPermission(String appId, String userId) {
        return repository.removePermissionBy(ResourceType.APPLICATION, appId, ResourceHolder.USER, userId);
    }

    public Mono<Boolean> removeUserDatasourcePermission(String appId, String userId) {
        return repository.removePermissionBy(ResourceType.APPLICATION, appId, ResourceHolder.USER, userId);
    }

    public Mono<ResourcePermission> getUserAssignedPermissionForApplication(String applicationId, String userId) {
        return repository.getByResourceTypeAndResourceIdAndTargetId(ResourceType.APPLICATION,
                applicationId, ResourceHolder.USER, userId);
    }
}
