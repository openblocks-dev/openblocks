package com.openblocks.infra.event;

import javax.annotation.Nullable;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class ApplicationCommonEvent extends AbstractEvent {

    private final String applicationId;
    private final String applicationName;
    private final EventType type;
    @Nullable
    private final String folderId;
    @Nullable
    private final String folderName;

    @Override
    public EventType getEventType() {
        return type;
    }
}
