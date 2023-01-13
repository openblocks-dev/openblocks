package com.openblocks.infra.event.user;

import com.openblocks.infra.event.AbstractEvent;
import com.openblocks.infra.event.EventType;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class UserLoginEvent extends AbstractEvent {

    private final String source;

    @Override
    public EventType getEventType() {
        return EventType.USER_LOGIN;
    }
}
