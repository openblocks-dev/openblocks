package com.openblocks.api.application.view;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HistorySnapshotDslView {
    private final Map<String, Object> applicationsDsl;
    private final Map<String, Map<String, Object>> moduleDSL;
}
