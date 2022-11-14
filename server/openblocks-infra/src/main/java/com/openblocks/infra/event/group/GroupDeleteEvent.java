package com.openblocks.infra.event.group;

import com.openblocks.infra.event.EventType;

import lombok.experimental.SuperBuilder;

@SuperBuilder
public class GroupDeleteEvent extends BaseGroupEvent {

    @Override
    public EventType getEventType() {
        return EventType.GROUP_DELETE;
    }
}
