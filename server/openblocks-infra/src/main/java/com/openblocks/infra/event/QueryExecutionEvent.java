package com.openblocks.infra.event;

import java.util.Map;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class QueryExecutionEvent extends AbstractEvent {

    private final Map<String, Object> detail;

    @Override
    public EventType getEventType() {
        return EventType.QUERY_EXECUTION;
    }
}
