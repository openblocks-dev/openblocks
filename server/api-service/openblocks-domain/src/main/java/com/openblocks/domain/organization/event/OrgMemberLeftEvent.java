package com.openblocks.domain.organization.event;

import lombok.Getter;

@Getter
public class OrgMemberLeftEvent {

    private final String orgId;

    private final String userId;

    public OrgMemberLeftEvent(String orgId, String userId) {
        this.orgId = orgId;
        this.userId = userId;
    }
}
