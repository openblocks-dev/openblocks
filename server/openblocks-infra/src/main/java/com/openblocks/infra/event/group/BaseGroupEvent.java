package com.openblocks.infra.event.group;

import com.openblocks.infra.event.AbstractEvent;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public abstract class BaseGroupEvent extends AbstractEvent {

    private final String groupId;
    private final String groupName;
}
