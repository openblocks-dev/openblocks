package com.openblocks.plugin.graphql.utils;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.openblocks.plugin.graphql.model.GraphQLQueryExecutionContext;


public class GraphQLBodyUtils {

    public static final String QUERY_KEY = "query";
    public static final String VARIABLES_KEY = "variables";

    public static Object convertToGraphQLBody(GraphQLQueryExecutionContext graphQLQueryExecutionContext) {
        Map<String, Object> map = new HashMap<>();
        map.put(QUERY_KEY, graphQLQueryExecutionContext.getQueryBody());
        // variables
        JsonNode variablesParams = graphQLQueryExecutionContext.getVariablesParams();
        if (!variablesParams.isEmpty()) {
            map.put(VARIABLES_KEY, graphQLQueryExecutionContext.getVariablesParams());
        }
        return map;
    }
}
