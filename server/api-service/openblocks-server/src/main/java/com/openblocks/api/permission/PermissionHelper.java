package com.openblocks.api.permission;

import static com.openblocks.api.util.ViewBuilder.multiBuild;

import java.util.List;
import java.util.Locale;

import javax.validation.constraints.NotEmpty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.api.permission.view.PermissionItemView;
import com.openblocks.domain.group.model.Group;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.permission.model.ResourceHolder;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.util.LocaleUtils;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class PermissionHelper {

    @Autowired
    private GroupService groupService;
    @Autowired
    private UserService userService;

    public Mono<List<PermissionItemView>> getGroupPermissions(@NotEmpty List<ResourcePermission> resourcePermissions) {
        return Flux.fromIterable(resourcePermissions)
                .filter(ResourcePermission::ownedByGroup)
                .collectList()
                .flatMap(groupPermissions -> Mono.deferContextual(contextView -> {
                    Locale locale = LocaleUtils.getLocale(contextView);
                    return multiBuild(groupPermissions,
                            ResourcePermission::getResourceHolderId,
                            groupService::getByIds,
                            Group::getId,
                            (permission, group) -> PermissionItemView.builder()
                                    .permissionId(permission.getId())
                                    .type(ResourceHolder.GROUP)
                                    .id(group.getId())
                                    .name(group.getName(locale))
                                    .avatar("")
                                    .role(permission.getResourceRole().getValue())
                                    .build()
                    );
                }));
    }

    public Mono<List<PermissionItemView>> getUserPermissions(@NotEmpty List<ResourcePermission> resourcePermissions) {
        return Flux.fromIterable(resourcePermissions)
                .filter(ResourcePermission::ownedByUser)
                .collectList()
                .flatMap(userPermissions -> multiBuild(userPermissions,
                        ResourcePermission::getResourceHolderId,
                        userService::getByIds,
                        (permission, user) -> PermissionItemView.builder()
                                .permissionId(permission.getId())
                                .type(ResourceHolder.USER)
                                .id(user.getId())
                                .name(user.getName())
                                .avatar(user.getAvatar())
                                .role(permission.getResourceRole().getValue())
                                .build()
                ));
    }
}
