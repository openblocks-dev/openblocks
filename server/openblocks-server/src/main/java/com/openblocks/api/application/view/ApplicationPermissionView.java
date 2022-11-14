package com.openblocks.api.application.view;

import java.util.ArrayList;
import java.util.List;

import com.openblocks.domain.permission.model.ResourceHolder;

import lombok.Builder;
import lombok.Getter;

@Builder
public class ApplicationPermissionView {

    private String orgName;
    private List<PermissionItemView> groupPermissions;
    private List<PermissionItemView> userPermissions;
    private String creatorId;

    private boolean publicToAll;

    @Builder
    @Getter
    public static class PermissionItemView {
        private String permissionId;
        private ResourceHolder type;
        private String id;
        private String avatar;
        private String name;
        private String role;
    }

    public String getOrgName() {
        return orgName;
    }

    public List<PermissionItemView> getPermissions() {
        ArrayList<PermissionItemView> permissionPairs = new ArrayList<>();
        permissionPairs.addAll(groupPermissions);
        permissionPairs.addAll(userPermissions);
        return permissionPairs;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public boolean isPublicToAll() {
        return publicToAll;
    }
}
