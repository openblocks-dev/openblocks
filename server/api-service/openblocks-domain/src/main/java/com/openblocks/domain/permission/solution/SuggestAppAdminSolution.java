package com.openblocks.domain.permission.solution;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Sets.newHashSet;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.domain.group.model.GroupMember;
import com.openblocks.domain.group.service.GroupMemberService;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SuggestAppAdminSolution {

    private static final int LIMIT_COUNT_FOR_DISPLAY_ADMIN_NAMES = 7;

    @Autowired
    private GroupMemberService groupMemberService;

    @Autowired
    private UserService userService;

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    public Mono<List<User>> getApplicationAdminUsers(String applicationId, int limit) {
        return resourcePermissionService.getByApplicationId(applicationId)
                .flatMap(permissions -> getSuggestAdminIds(limit, permissions))
                .flatMap(userIds -> userService.getByIds(userIds)
                        .map(mapData -> userIds.stream()
                                .map(mapData::get)
                                .filter(Objects::nonNull)
                                .toList()
                        )
                );
    }

    @Nonnull
    private Mono<List<String>> getSuggestAdminIds(int limit, List<ResourcePermission> permissions) {
        List<String> adminUserIds = permissions.stream()
                .filter(it -> it.ownedByUser() && it.getResourceRole() == ResourceRole.OWNER)
                .map(ResourcePermission::getResourceHolderId)
                .toList();
        List<String> adminGroupIds = permissions.stream()
                .filter(it -> it.ownedByGroup() && it.getResourceRole() == ResourceRole.OWNER)
                .map(ResourcePermission::getResourceHolderId)
                .toList();

        if (adminUserIds.size() >= limit) {
            return Mono.just(adminUserIds.stream()
                    .limit(limit)
                    .toList());
        }

        Set<String> adminUserIdSet = newHashSet(adminUserIds);
        return Flux.fromIterable(adminGroupIds)
                .flatMap(groupId -> groupMemberService.getGroupMembers(groupId, 1, 100))
                .flatMapIterable(list -> list)
                .map(GroupMember::getUserId)
                .filter(it -> !adminUserIdSet.contains(it))
                .take(limit - adminUserIds.size())
                .collectList()
                .map(groupUserIds -> {
                    List<String> userIds = newArrayList();
                    userIds.addAll(adminUserIds);
                    userIds.addAll(groupUserIds);
                    return userIds;
                });
    }

    public Mono<String> getSuggestAppAdminNames(String applicationId) {
        return getApplicationAdminUsers(applicationId, LIMIT_COUNT_FOR_DISPLAY_ADMIN_NAMES)
                .map(users -> users.stream()
                        .map(User::getName)
                        .collect(Collectors.joining(" "))
                );
    }

}
