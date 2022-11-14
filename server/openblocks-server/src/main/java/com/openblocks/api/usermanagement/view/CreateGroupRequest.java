package com.openblocks.api.usermanagement.view;

import javax.validation.constraints.NotNull;

public class CreateGroupRequest {

    @NotNull
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
