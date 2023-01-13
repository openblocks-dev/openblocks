package com.openblocks.domain.permission.service;

import static com.openblocks.sdk.constants.Authentication.isAnonymousUser;
import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static java.util.Collections.singletonList;
import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.ListUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.openblocks.domain.group.service.GroupMemberService;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.model.ResourceHolder;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.domain.permission.model.UserPermissionOnResourceStatus;

import reactor.core.publisher.Mono;

abstract class ResourcePermissionHandler {

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    @Autowired
    private GroupMemberService groupMemberService;

    @Autowired
    private OrgMemberService orgMemberService;

    public Mono<Map<String, List<ResourcePermission>>> getAllMatchingPermissions(String userId,
            Collection<String> resourceIds,
            ResourceAction resourceAction) {

        ResourceType resourceType = resourceAction.getResourceType();

        if (CollectionUtils.isEmpty(resourceIds)) {
            return Mono.just(emptyMap());
        }

        if (isAnonymousUser(userId)) {
            return getAnonymousUserPermissions(resourceIds, resourceAction);
        }

        return getOrgId(resourceIds.iterator().next())
                .flatMap(orgId -> orgMemberService.getOrgMember(orgId, userId))
                .flatMap(orgMember -> {
                    if (orgMember.isAdmin()) {
                        return Mono.just(buildAdminPermissions(resourceType, resourceIds, userId));
                    }
                    return getAllMatchingPermissions0(userId, orgMember.getOrgId(), resourceType, resourceIds, resourceAction);
                })
                .switchIfEmpty(Mono.just(Maps.newHashMap()))
                .zipWith(getAnonymousUserPermissions(resourceIds, resourceAction))
                .flatMap(tuple2 -> {
                    Map<String, List<ResourcePermission>> permissionMap = tuple2.getT1();
                    Map<String, List<ResourcePermission>> templatePermissionMap = tuple2.getT2();
                    templatePermissionMap.forEach((key, value) -> permissionMap.merge(key, value, ListUtils::union));
                    return Mono.just(permissionMap);
                });
    }

    public Mono<UserPermissionOnResourceStatus> checkUserPermissionStatusOnResource(String userId,
            String resourceId, ResourceAction resourceAction) {

        ResourceType resourceType = resourceAction.getResourceType();

        Mono<UserPermissionOnResourceStatus> publicResourcePermissionMono = getAnonymousUserPermissions(singletonList(resourceId), resourceAction)
                .map(it -> it.getOrDefault(resourceId, emptyList()))
                .map(it -> {
                    if (!it.isEmpty()) {
                        return UserPermissionOnResourceStatus.success(it.get(0));
                    }
                    return isAnonymousUser(userId) ? UserPermissionOnResourceStatus.anonymousUser() : UserPermissionOnResourceStatus.notInOrg();
                });

        if (isAnonymousUser(userId)) {
            return publicResourcePermissionMono;
        }

        Mono<UserPermissionOnResourceStatus> orgUserPermissionMono = getOrgId(resourceId)
                .flatMap(orgId -> orgMemberService.getOrgMember(orgId, userId))
                .flatMap(orgMember -> {
                    if (orgMember.isAdmin()) {
                        return Mono.just(UserPermissionOnResourceStatus.success(buildAdminPermission(resourceType, resourceId, userId)));
                    }
                    return getAllMatchingPermissions0(userId, orgMember.getOrgId(), resourceType, Collections.singleton(resourceId), resourceAction)
                            .map(it -> it.getOrDefault(resourceId, emptyList()))
                            .map(permissions -> permissions.isEmpty() ? UserPermissionOnResourceStatus.notEnoughPermission()
                                                                      : UserPermissionOnResourceStatus.success(getMaxPermission(permissions)));
                })
                .defaultIfEmpty(UserPermissionOnResourceStatus.notInOrg());

        return Mono.zip(publicResourcePermissionMono, orgUserPermissionMono)
                .map(tuple -> {
                    UserPermissionOnResourceStatus publicResourcePermission = tuple.getT1();
                    UserPermissionOnResourceStatus orgUserPermission = tuple.getT2();
                    if (orgUserPermission.hasPermission()) {
                        return orgUserPermission;
                    }
                    if (publicResourcePermission.hasPermission()) {
                        return publicResourcePermission;
                    }
                    return orgUserPermission;
                });
    }

    @SuppressWarnings("OptionalGetWithoutIsPresent")
    @Nonnull
    private ResourcePermission getMaxPermission(List<ResourcePermission> permissions) {
        return permissions.stream()
                .max(Comparator.comparingInt(it -> it.getResourceRole().getRoleWeight()))
                .get();
    }

    protected abstract Mono<Map<String, List<ResourcePermission>>> getAnonymousUserPermissions(Collection<String> resourceIds,
            ResourceAction resourceAction);

    private Mono<Map<String, List<ResourcePermission>>> getAllMatchingPermissions0(String userId, String orgId, ResourceType resourceType,
            Collection<String> resourceIds,
            ResourceAction resourceAction) {
        Mono<Map<String, Collection<ResourcePermission>>> permissionsMapMono =
                resourcePermissionService.getByResourceTypeAndResourceIds(resourceType, resourceIds);
        Mono<Set<String>> userGroupIdsMono = getUserGroupIds(orgId, userId);

        return Mono.zip(userGroupIdsMono, permissionsMapMono)
                .map(tuple -> {
                    Set<String> userGroupIds = tuple.getT1();
                    Map<String, Collection<ResourcePermission>> permissionMap = tuple.getT2();

                    return resourceIds
                            .stream()
                            .collect(toMap(identity(),
                                    resourceId -> {
                                        var resourcePermissions = permissionMap.getOrDefault(resourceId, emptyList());
                                        return filterMatchingPermissions(userId, userGroupIds, resourcePermissions, resourceAction);
                                    }));
                });
    }

    private List<ResourcePermission> filterMatchingPermissions(String userId,
            Set<String> userGroupIds, Collection<ResourcePermission> resourcePermissions, ResourceAction resourceAction) {
        if (CollectionUtils.isEmpty(resourcePermissions)) {
            return emptyList();
        }
        return resourcePermissions.stream()
                .filter(permission -> permission.matchUser(userId, resourceAction)
                        || permission.matchGroup(userGroupIds, resourceAction))
                .toList();
    }

    private Map<String, List<ResourcePermission>> buildAdminPermissions(ResourceType resourceType,
            Collection<String> resourceIds, String userId) {
        return resourceIds.stream()
                .distinct()
                .collect(toMap(it -> it,
                        resourceId -> singletonList(buildAdminPermission(resourceType, userId, resourceId)))
                );
    }

    private ResourcePermission buildAdminPermission(ResourceType resourceType, String userId, String resourceId) {
        return ResourcePermission.builder()
                .resourceType(resourceType)
                .resourceId(resourceId)
                .resourceHolder(ResourceHolder.USER)
                .resourceHolderId(userId)
                .resourceRole(ResourceRole.OWNER)
                .build();
    }


    private Mono<Set<String>> getUserGroupIds(String orgId, String userId) {
        return groupMemberService.getUserGroupIdsInOrg(orgId, userId)
                .map(Sets::newHashSet);
    }

    protected abstract Mono<String> getOrgId(String resourceId);
}
