package com.openblocks.api.permission.view;

import lombok.Builder;
import lombok.Getter;

import com.openblocks.domain.permission.model.ResourceHolder;

@Builder
@Getter
public class PermissionItemView {
    private String permissionId;
    private ResourceHolder type;
    private String id;
    private String avatar;
    private String name;
    private String role;
}
