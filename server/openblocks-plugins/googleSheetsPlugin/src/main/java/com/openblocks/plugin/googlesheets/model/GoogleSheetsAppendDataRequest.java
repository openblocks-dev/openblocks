package com.openblocks.plugin.googlesheets.model;

import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.util.Map;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

import com.openblocks.sdk.plugin.sheet.changeset.SheetChangeSet;
import com.openblocks.sdk.plugin.sheet.changeset.SheetChangeSetRow;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleSheetsAppendDataRequest implements GoogleSheetsActionRequest {
    private String spreadsheetId;
    private String sheetName;
    private SheetChangeSet changeSet;

    private SheetChangeSetRow changeSetItems;

    public static GoogleSheetsAppendDataRequest from(Map<String, Object> commandDetail) {
        SheetChangeSet sheetChangeSet = SheetChangeSet.parseChangeSet(commandDetail);
        String spreadsheetId = MapUtils.getString(commandDetail, "spreadsheetId");
        String sheetName = MapUtils.getString(commandDetail, "sheetName");
        GoogleSheetsAppendDataRequest googleSheetsAppendDataRequest = new GoogleSheetsAppendDataRequest();
        googleSheetsAppendDataRequest.setSpreadsheetId(spreadsheetId);
        googleSheetsAppendDataRequest.setSheetName(sheetName);
        googleSheetsAppendDataRequest.setChangeSet(sheetChangeSet);
        return googleSheetsAppendDataRequest;
    }


    @Override
    public void renderParams(Map<String, Object> paramMap) {
        spreadsheetId = renderMustacheString(spreadsheetId, paramMap);
        sheetName = renderMustacheString(sheetName, paramMap);
        changeSetItems = changeSet.render(paramMap);
    }

    @Override
    public boolean hasInvalidData() {
        return StringUtils.isAnyBlank(spreadsheetId, sheetName);
    }
}
