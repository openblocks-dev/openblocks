package com.openblocks.plugin.googlesheets.queryhandler;


import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.openblocks.plugin.googlesheets.constants.FieldName;
import com.openblocks.plugin.googlesheets.model.GoogleSheetsQueryExecutionContext;
import com.openblocks.plugin.googlesheets.model.GoogleSheetsReadDataRequest;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.QueryExecutionUtils;

import reactor.core.publisher.Mono;

public class GoogleSheetsReadDataHandler extends GoogleSheetsActionHandler {

    private static final String APPLICATION_NAME = "ReadSheets";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Override
    public String getActionType() {
        return READ_DATA;
    }

    @Override
    public Mono<QueryExecutionResult> execute(Object o, GoogleSheetsQueryExecutionContext context) {
        return Mono.fromCallable(() -> {
                    GoogleSheetsReadDataRequest googleSheetsActionRequest = (GoogleSheetsReadDataRequest) context.getGoogleSheetsActionRequest();
                    Sheets service = GoogleSheetsGetPreParameters.GetSheetsService(context);
                    ValueRange valueRange;
                    valueRange = service.spreadsheets()
                            .values()
                            .get(googleSheetsActionRequest.getSpreadsheetId(), googleSheetsActionRequest.getSheetName())
                            .execute();
                    List<Map<String, String>> result = transformToFinalValues(valueRange);
                    return QueryExecutionResult.success(result);
                })
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }

    public List<Map<String, String>> transformToFinalValues(ValueRange valueRange) {
        final List<Map<String, String>> result = new LinkedList<>();
        Pattern findOffsetRowPattern = Pattern.compile("(\\d+):");
        String range = valueRange.getRange();
        List<List<Object>> values = valueRange.getValues();
        Matcher matcher = findOffsetRowPattern.matcher(range);
        matcher.find();
        final int rowOffset = Integer.parseInt(matcher.group(1));
        int valueSize = 0;
        for (int i = 0; i < values.size(); i++) {
            valueSize = Math.max(valueSize, values.get(i).size());
        }
        List<Object> headers = values.get(0);
        Set<String> headerSet = pardonHeaders(headers, valueSize);
        final String[] headerArray = headerSet.toArray(new String[0]);
        for (int i = 1; i < values.size(); i++) {
            List<Object> row = values.get(i);
            Map<String, String> valueMap = getValueMap(headerArray, row, rowOffset + i - 1);
            result.add(valueMap);
        }
        return result;
    }

    public Map<String, String> getValueMap(String[] headerArray, List<Object> row, int rowIndex) {
        Map<String, String> valueMap = new LinkedHashMap<>(row.size() + 1);
        int i = 0;
        valueMap.put(FieldName.ROW_INDEX, String.valueOf(rowIndex));
        for (; i < row.size(); i++) {
            valueMap.put(headerArray[i], (String) row.get(i));
        }
        while (i < headerArray.length) {
            valueMap.put(headerArray[i++], "");
        }
        return valueMap;
    }

    public Set<String> pardonHeaders(List<Object> headers, int valueSize) {
        final Set<String> headerSet = new LinkedHashSet<>();
        int headerSize = headers.size();
        final int size = Math.max(headerSize, valueSize);

        // Manipulation to find valid headers for all columns
        for (int j = 0; j < size; j++) {
            String headerValue = "";

            if (j < headerSize) {
                headerValue = (String) headers.get(j);
            }
            if (headerValue.isBlank()) {
                headerValue = "Column-" + (j + 1);
            }
            int count = 1;
            String tempHeaderValue = headerValue;
            while (headerSet.contains(tempHeaderValue)) {
                tempHeaderValue += "_" + count++;
            }
            headerValue = tempHeaderValue;

            headerSet.add(headerValue);
        }
        return headerSet;
    }
}
