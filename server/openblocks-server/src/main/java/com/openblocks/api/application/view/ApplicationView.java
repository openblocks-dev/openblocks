package com.openblocks.api.application.view;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ApplicationView {
    private final ApplicationInfoView applicationInfoView;
    private final Map<String, Object> applicationDSL;
    private final Map<String, Map<String, Object>> moduleDSL;
    private final Map<String, Object> orgCommonSettings;
    private final String templateId;
}
