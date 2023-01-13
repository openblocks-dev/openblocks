package com.openblocks.domain.organization.model;

public enum OrgMemberState {
    INVITING("inviting"),
    NORMAL("normal"),
    CURRENT("current"),
    ;

    private final String value;

    OrgMemberState(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
