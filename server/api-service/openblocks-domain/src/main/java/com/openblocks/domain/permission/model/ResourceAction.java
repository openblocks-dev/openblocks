package com.openblocks.domain.permission.model;

import static com.google.common.collect.Multimaps.toMultimap;
import static java.util.Collections.emptySet;
import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.util.Arrays;
import java.util.Set;

import javax.annotation.Nonnull;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.SetMultimap;

import lombok.Getter;

@Getter
public enum ResourceAction {

    MANAGE_APPLICATIONS(ResourceRole.OWNER, ResourceType.APPLICATION),
    READ_APPLICATIONS(ResourceRole.VIEWER, ResourceType.APPLICATION),
    PUBLISH_APPLICATIONS(ResourceRole.EDITOR, ResourceType.APPLICATION),
    EXPORT_APPLICATIONS(ResourceRole.EDITOR, ResourceType.APPLICATION),
    EDIT_APPLICATIONS(ResourceRole.EDITOR, ResourceType.APPLICATION),

    SET_APPLICATIONS_PUBLIC(ResourceRole.EDITOR, ResourceType.APPLICATION),

    // datasource action
    MANAGE_DATASOURCES(ResourceRole.OWNER, ResourceType.DATASOURCE),
    USE_DATASOURCES(ResourceRole.VIEWER, ResourceType.DATASOURCE),
    ;

    private static final SetMultimap<ResourceRole, ResourceAction> ROLE_PERMISSIONS;

    static {
        ROLE_PERMISSIONS = Arrays.stream(values())
                .collect(toMultimap(ResourceAction::getRole, it -> it, HashMultimap::create));
    }

    private final ResourceRole role;
    private final ResourceType resourceType;

    ResourceAction(ResourceRole role, ResourceType resourceType) {
        this.role = role;
        this.resourceType = resourceType;
    }

    @Nonnull
    static Set<ResourceAction> getMatchingPermissions(ResourceRole role) {
        return firstNonNull(ROLE_PERMISSIONS.get(role), emptySet());
    }
}
