package com.openblocks.infra.event.groupmember;

import com.openblocks.infra.event.EventType;

import lombok.experimental.SuperBuilder;

@SuperBuilder
public class GroupMemberRemoveEvent extends BaseGroupMemberEvent {

    @Override
    public EventType getEventType() {
        return EventType.GROUP_MEMBER_REMOVE;
    }
}
