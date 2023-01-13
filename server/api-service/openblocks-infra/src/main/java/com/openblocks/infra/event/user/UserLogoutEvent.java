package com.openblocks.infra.event.user;

import com.openblocks.infra.event.AbstractEvent;
import com.openblocks.infra.event.EventType;

import lombok.experimental.SuperBuilder;

@SuperBuilder
public class UserLogoutEvent extends AbstractEvent {

    @Override
    public EventType getEventType() {
        return EventType.USER_LOGOUT;
    }
}
