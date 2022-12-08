package com.openblocks.plugin.graphql.utils;

import org.json.JSONObject;

import com.fasterxml.jackson.databind.JsonNode;
import com.openblocks.plugin.graphql.model.GraphQLQueryExecutionContext;
import com.openblocks.sdk.exception.PluginException;


public class GraphQLBodyUtils {

    public static final String QUERY_KEY = "query";
    public static final String VARIABLES_KEY = "variables";

    public static String convertToGraphQLPOSTBodyFormat(GraphQLQueryExecutionContext graphQLQueryExecutionContext) throws PluginException {
        JSONObject query = new JSONObject();
        query.put(QUERY_KEY, graphQLQueryExecutionContext.getQueryBody());
        JsonNode variables = graphQLQueryExecutionContext.getVariablesParams();
        query.put(VARIABLES_KEY, variables);
        return query.toString();
    }
}
