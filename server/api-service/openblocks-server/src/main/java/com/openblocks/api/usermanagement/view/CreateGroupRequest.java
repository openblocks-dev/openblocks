package com.openblocks.api.usermanagement.view;

import javax.validation.constraints.NotNull;

public class CreateGroupRequest {

    @NotNull
    private String name;

    private String dynamicRule;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDynamicRule() {
        return dynamicRule;
    }

    public void setDynamicRule(String dynamicRule) {
        this.dynamicRule = dynamicRule;
    }
}
