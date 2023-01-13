package com.openblocks.infra.event;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public abstract class AbstractEvent implements Event {

    protected final String orgId;
    protected final String userId;
}
