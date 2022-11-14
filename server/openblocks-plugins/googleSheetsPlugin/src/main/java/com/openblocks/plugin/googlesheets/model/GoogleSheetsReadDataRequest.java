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
        /*
        这里判断的时候先不判断range是否为空，因为按照retool的做法可能按照limit与offset
         */
        return StringUtils.isAnyBlank(spreadsheetId, sheetName);
    }
}
