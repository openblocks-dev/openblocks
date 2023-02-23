package com.openblocks.plugin.googlesheets.queryhandler;


import static com.openblocks.plugin.googlesheets.GoogleSheetError.GOOGLESHEETS_EMPTY_QUERY_PARAM;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.AppendValuesResponse;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.google.common.collect.Streams;
import com.openblocks.plugin.googlesheets.model.GoogleSheetsAppendDataRequest;
import com.openblocks.plugin.googlesheets.model.GoogleSheetsQueryExecutionContext;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.QueryExecutionUtils;
import com.openblocks.sdk.plugin.sheet.changeset.SheetChangeSetRow;

import reactor.core.publisher.Mono;

public class GoogleSheetsAppendDataHandler extends GoogleSheetsActionHandler {
    private final String valueInputOption = "RAW";

    private final String insertDataOption = "INSERT_ROWS";

    @Override
    public String getActionType() {
        return APPEND_DATA;
    }

    @Override
    public Mono<QueryExecutionResult> execute(Object o, GoogleSheetsQueryExecutionContext context) {
        return Mono.fromCallable(() -> {
                    GoogleSheetsAppendDataRequest googleSheetsActionRequest = (GoogleSheetsAppendDataRequest) context.getGoogleSheetsActionRequest();
                    Sheets sheetService = GoogleSheetsGetPreParameters.GetSheetsService(context);
                    SheetChangeSetRow changeSetItems = GoogleSheetsGetPreParameters.getChangeSet(context);
                    List<List<Object>> values = sheetService.spreadsheets()
                            .values()
                            .get(googleSheetsActionRequest.getSpreadsheetId(), googleSheetsActionRequest.getSheetName())
                            .execute()
                            .getValues();
                    List<List<Object>> collect = null;
                    List<Object> firstRow = values.get(0);

                    String range = googleSheetsActionRequest.getSheetName() + "!" + "A1";
                    if (firstRow != null && !firstRow.isEmpty()) {
                        Map<String, String> tempMap = new LinkedHashMap<>();
                        Map<String, String> newMap = new LinkedHashMap<>();
                        boolean validValues = false;
                        for (Object object : firstRow) {
                            Streams.stream(changeSetItems.iterator()).forEach((entry) -> tempMap.put(entry.column(),
                                    String.valueOf(entry.renderedValue())));
                            final String value = tempMap.getOrDefault(object, null);
                            if (value != null) {
                                validValues = true;
                            }
                            newMap.put((String) object, value);
                        }
                        if (Boolean.TRUE.equals(validValues)) {
                            List<Object> row = Streams.stream(newMap.keySet().iterator())
                                    .map(entry -> tempMap.getOrDefault(entry, null) == null ? "" : tempMap.getOrDefault(entry, null))
                                    .collect(Collectors.toCollection(LinkedList::new));
                            collect = List.of(row);
                        } else {
                            throw new PluginException(GOOGLESHEETS_EMPTY_QUERY_PARAM, "GOOGLESHEETS_QUERY_PARAM_EMPTY");
                        }
                    }
                    ValueRange requestBody = new ValueRange();
                    requestBody.setMajorDimension("ROWS");
                    requestBody.setRange(range);
                    requestBody.setValues(collect);

                    Sheets.Spreadsheets.Values.Append request = sheetService.spreadsheets()
                            .values()
                            .append(googleSheetsActionRequest.getSpreadsheetId(), range, requestBody);
                    request.setValueInputOption(valueInputOption);
                    request.setInsertDataOption(insertDataOption);
                    AppendValuesResponse response = request.execute();
                    return QueryExecutionResult.success(response.values());
                })
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }
}
