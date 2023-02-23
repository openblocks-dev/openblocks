package com.openblocks.plugin.googlesheets.queryhandler;


import static com.openblocks.plugin.googlesheets.GoogleSheetError.GOOGLESHEETS_EMPTY_QUERY_PARAM;
import static com.openblocks.plugin.googlesheets.GoogleSheetError.GOOGLESHEETS_REQUEST_ERROR;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.Sheets.Spreadsheets.Values.Update;
import com.google.api.services.sheets.v4.model.UpdateValuesResponse;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.google.common.collect.Streams;
import com.openblocks.plugin.googlesheets.model.GoogleSheetsQueryExecutionContext;
import com.openblocks.plugin.googlesheets.model.GoogleSheetsUpdateDataRequest;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.QueryExecutionUtils;
import com.openblocks.sdk.plugin.sheet.changeset.SheetChangeSetItem;
import com.openblocks.sdk.plugin.sheet.changeset.SheetChangeSetRow;

import reactor.core.publisher.Mono;

public class GoogleSheetsUpdateDataHandler extends GoogleSheetsActionHandler {
    private final String valueInputOption = "RAW";

    Boolean includeValuesInResponse = Boolean.TRUE;

    @Override
    public String getActionType() {
        return UPDATE_DATA;
    }

    @Override
    public Mono<QueryExecutionResult> execute(Object o, GoogleSheetsQueryExecutionContext context) {
        return Mono.fromCallable(() -> {
                    GoogleSheetsUpdateDataRequest googleSheetsActionRequest = (GoogleSheetsUpdateDataRequest) context.getGoogleSheetsActionRequest();
                    int headerRow = 1;
                    int updateRow = googleSheetsActionRequest.getRowIndex() + 1;
                    String range1 = googleSheetsActionRequest.getSheetName() + "!" + headerRow + ":" + headerRow;
                    String range2 = googleSheetsActionRequest.getSheetName() + "!" + updateRow + ":"
                            + updateRow;
                    List<List<Object>> values1;
                    List<List<Object>> values2;
                    Sheets sheetService = GoogleSheetsGetPreParameters.GetSheetsService(context);
                    SheetChangeSetRow changeSetItems = GoogleSheetsGetPreParameters.getChangeSet(context);
                    values1 = sheetService.spreadsheets()
                            .values()
                            .get(googleSheetsActionRequest.getSpreadsheetId(), range1)
                            .execute()
                            .getValues();
                    values2 = sheetService.spreadsheets()
                            .values()
                            .get(googleSheetsActionRequest.getSpreadsheetId(), range2)
                            .execute()
                            .getValues();
                    List<List<Object>> collect;
                    List<Object> headerList = values1.get(0);
                    if (values2 == null) {
                        throw new PluginException(GOOGLESHEETS_REQUEST_ERROR, "GOOGLESHEETS_REQUEST_ERROR");
                    }
                    List<Object> valuesList = values2.get(0);
                    Map<String, String> returnMap = new LinkedHashMap<>();
                    String[] valuesArray = new String[headerList.size()];
                    for (int i = 0; i < valuesList.size(); i++) {
                        valuesArray[i] = (String) valuesList.get(i);
                    }
                    for (int i = 0; i < headerList.size(); i++) {
                        returnMap.put((String) headerList.get(i), valuesArray[i]);
                    }
                    boolean validValues = false;
                    for (Entry<String, String> ele : returnMap.entrySet()) {
                        Map<String, String> tempMap = Streams.stream(changeSetItems.iterator())
                                .collect(Collectors.toMap(SheetChangeSetItem::column, entry -> String.valueOf(entry.renderedValue()), (a, b) -> b,
                                        LinkedHashMap::new));
                        String k = ele.getKey();
                        if (tempMap.containsKey(k)) {
                            returnMap.put(k, tempMap.get(k));
                            validValues = true;
                        }
                    }
                    if (Boolean.FALSE.equals(validValues)) {
                        throw new PluginException(GOOGLESHEETS_EMPTY_QUERY_PARAM, "GOOGLESHEETS_QUERY_PARAM_EMPTY");
                    }
                    final List<Object> tempObjects = new ArrayList<>(returnMap.values());
                    collect = List.of(tempObjects);
                    ValueRange requestBody = new ValueRange();
                    requestBody.setMajorDimension("ROWS");
                    requestBody.setValues(collect);
                    Update request;
                    UpdateValuesResponse response;
                    request = sheetService.spreadsheets()
                            .values().
                            update(googleSheetsActionRequest.getSpreadsheetId(), range2, requestBody);
                    request.setValueInputOption(valueInputOption);
                    request.setIncludeValuesInResponse(includeValuesInResponse);
                    response = request.execute();
                    return QueryExecutionResult.success(response.values());
                })
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }
}
