package com.openblocks.plugin.googlesheets.model;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleSheetsQueryExecutionContext extends QueryExecutionContext {

    private String actionType;
    private GoogleSheetsActionRequest googleSheetsActionRequest;
    private String serviceAccount;
    private ServiceAccountCredentials serviceAccountCredentials;

    @Override
    public String toString() {
        return "GoogleSheetsQueryExecutionContext{" +
                "actionType='" + actionType + '\'' +
                ", googleSheetsActionRequest=" + googleSheetsActionRequest +
                ", serviceAccount='" + serviceAccount + '\'' +
                ", serviceAccountCredentials=" + serviceAccountCredentials +
                '}';
    }
}
