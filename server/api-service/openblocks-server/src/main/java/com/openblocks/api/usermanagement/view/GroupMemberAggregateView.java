package com.openblocks.api.usermanagement.view;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GroupMemberAggregateView {
    private String visitorRole;
    private List<GroupMemberView> members;
}
