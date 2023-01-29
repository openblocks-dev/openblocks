package com.openblocks.infra.event;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class LibraryQueryEvent extends AbstractEvent {

    private String id;
    private String name;
    private EventType eventType;

    @Override
    public EventType getEventType() {
        return eventType;
    }
}
