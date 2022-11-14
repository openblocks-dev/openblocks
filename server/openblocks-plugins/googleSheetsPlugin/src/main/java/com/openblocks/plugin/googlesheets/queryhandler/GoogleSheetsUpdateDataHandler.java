package com.openblocks.plugin.googlesheets.queryhandler;


import static com.openblocks.plugin.googlesheets.GoogleSheetError.GOOGLESHEETS_EMPTY_QUERY_PARAM;
import static com.openblocks.plugin.googlesheets.GoogleSheetError.GOOGLESHEETS_EXECUTION_ERROR;
import static com.openblocks.plugin.googlesheets.GoogleSheetError.GOOGLESHEETS_REQUEST_ERROR;
import static com.openblocks.sdk.models.QueryExecutionResult.error;

import java.io.IOException;
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
        try {
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
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        //同样的从changeSet拿出数据。
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
                    .collect(Collectors.toMap(SheetChangeSetItem::column, entry -> (String) entry.renderedValue(), (a, b) -> b, LinkedHashMap::new));
            String k = ele.getKey();
            if (tempMap.containsKey(k)) {
                returnMap.put(k, tempMap.get(k));
                validValues = true;
            }
        }
        if (Boolean.FALSE.equals(validValues)) {
            /*想在这里回传给前端一个错误信息
             * Could not map request back to existing data，目前看来是不能成功的
             * */
            throw new PluginException(GOOGLESHEETS_EMPTY_QUERY_PARAM, "GOOGLESHEETS_QUERY_PARAM_ERROR");
        }
        final List<Object> tempObjects = new ArrayList<>(returnMap.values());
        collect = List.of(tempObjects);
        ValueRange requestBody = new ValueRange();
        requestBody.setMajorDimension("ROWS");
        //        requestBody.setRange(range);
        requestBody.setValues(collect);
        Update request;
        UpdateValuesResponse response;
        try {
            request = sheetService.spreadsheets()
                    .values().
                    update(googleSheetsActionRequest.getSpreadsheetId(), range2, requestBody);
            request.setValueInputOption(valueInputOption);
            request.setIncludeValuesInResponse(includeValuesInResponse);
            response = request.execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return Mono.fromCallable(() -> {
                    return QueryExecutionResult.success(response.values());
                })
                .onErrorResume(e -> Mono.just(error(GOOGLESHEETS_EXECUTION_ERROR, "GOOGLESHEETS_EXECUTION_ERROR", e.getMessage())))
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }
}
