package com.openblocks.infra.event.datasource;

import java.util.Collection;

import com.openblocks.infra.event.AbstractEvent;
import com.openblocks.infra.event.EventType;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class DatasourcePermissionEvent extends AbstractEvent {

    private final String datasourceId;
    private final String name;
    private final String type;

    private final Collection<String> userIds;
    private final Collection<String> groupIds;
    private final String role;

    private final EventType eventType;
}
