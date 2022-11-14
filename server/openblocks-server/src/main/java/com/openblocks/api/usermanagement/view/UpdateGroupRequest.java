package com.openblocks.api.usermanagement.view;

import javax.validation.constraints.NotBlank;

public class UpdateGroupRequest {

    @NotBlank
    private String groupName;

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
