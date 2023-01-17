package com.openblocks.plugin.googlesheets.model;

import java.util.Map;

public interface GoogleSheetsActionRequest {
    void renderParams(Map<String, Object> paramMap);

    boolean hasInvalidData();
}
