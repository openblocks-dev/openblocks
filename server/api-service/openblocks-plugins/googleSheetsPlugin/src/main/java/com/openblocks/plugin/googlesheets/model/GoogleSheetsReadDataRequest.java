package com.openblocks.plugin.googlesheets.model;

import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleSheetsReadDataRequest implements GoogleSheetsActionRequest {

    private String spreadsheetId;
    private String sheetName;
    private String range;

    private int limit;
    private int offset;

    @Override
    public void renderParams(Map<String, Object> paramMap) {
        spreadsheetId = renderMustacheString(spreadsheetId, paramMap);
        sheetName = renderMustacheString(sheetName, paramMap);
        range = renderMustacheString(range, paramMap);
    }

    @Override
    public boolean hasInvalidData() {
        return StringUtils.isAnyBlank(spreadsheetId, sheetName);
    }
}
