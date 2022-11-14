package com.openblocks.plugin.googlesheets.queryhandler;


import static com.openblocks.plugin.googlesheets.GoogleSheetError.GOOGLESHEETS_EXECUTION_ERROR;
import static com.openblocks.sdk.models.QueryExecutionResult.error;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ClearValuesRequest;
import com.google.api.services.sheets.v4.model.ClearValuesResponse;
import com.openblocks.plugin.googlesheets.model.GoogleSheetsDeleteDataRequest;
import com.openblocks.plugin.googlesheets.model.GoogleSheetsQueryExecutionContext;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.QueryExecutionUtils;

import reactor.core.publisher.Mono;

public class GoogleSheetsDeleteDataHandler extends GoogleSheetsActionHandler {

    @Override
    public String getActionType() {
        return DELETE_DATA;
    }

    @Override
    public Mono<QueryExecutionResult> execute(Object o, GoogleSheetsQueryExecutionContext context) {
        GoogleSheetsDeleteDataRequest googleSheetsActionRequest = (GoogleSheetsDeleteDataRequest) context.getGoogleSheetsActionRequest();
        final int rowDelete = googleSheetsActionRequest.getRowIndex() + 1;
        Sheets sheetService = GoogleSheetsGetPreParameters.GetSheetsService(context);
        String range = googleSheetsActionRequest.getSheetName() + "!" + rowDelete + ":" + rowDelete;
        ClearValuesRequest requestBody = new ClearValuesRequest();
        return Mono.fromCallable(() -> {
                    Sheets.Spreadsheets.Values.Clear request =
                            sheetService.spreadsheets().values().clear(googleSheetsActionRequest.getSpreadsheetId(), range, requestBody);
                    ClearValuesResponse response = request.execute();
                    return QueryExecutionResult.success(response.values());
                })
                .onErrorResume(e -> Mono.just(error(GOOGLESHEETS_EXECUTION_ERROR, "GOOGLESHEETS_EXECUTION_ERROR", e.getMessage())))
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }
}
