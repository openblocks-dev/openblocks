package com.openblocks.infra.event;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class FolderCommonEvent extends AbstractEvent {

    private final String id;
    private final String name;
    private final EventType type;

    @Override
    public EventType getEventType() {
        return type;
    }
}
