package com.openblocks.api.permission.view;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class CommonPermissionView {

    private String orgName;
    private List<PermissionItemView> groupPermissions;
    private List<PermissionItemView> userPermissions;
    private String creatorId;

    public List<PermissionItemView> getPermissions() {
        ArrayList<PermissionItemView> permissionPairs = new ArrayList<>();
        permissionPairs.addAll(groupPermissions);
        permissionPairs.addAll(userPermissions);
        return permissionPairs;
    }
}
