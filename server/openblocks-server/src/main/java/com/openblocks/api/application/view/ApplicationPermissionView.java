package com.openblocks.api.application.view;

import com.openblocks.api.permission.view.CommonPermissionView;

import lombok.experimental.SuperBuilder;

@SuperBuilder
public class ApplicationPermissionView extends CommonPermissionView {

    private boolean publicToAll;

    public boolean isPublicToAll() {
        return publicToAll;
    }
}
