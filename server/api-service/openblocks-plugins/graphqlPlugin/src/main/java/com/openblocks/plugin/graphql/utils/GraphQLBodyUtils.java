package com.openblocks.plugin.graphql.utils;

import java.util.HashMap;
import java.util.Map;

import com.openblocks.plugin.graphql.model.GraphQLQueryExecutionContext;
import com.openblocks.sdk.util.JsonUtils;


public class GraphQLBodyUtils {

    public static final String QUERY_KEY = "query";
    public static final String VARIABLES_KEY = "variables";

    public static String convertToGraphQLBody(GraphQLQueryExecutionContext graphQLQueryExecutionContext) {
        Map<String, Object> map = new HashMap<>();
        map.put(QUERY_KEY, graphQLQueryExecutionContext.getQueryBody());
        map.put(VARIABLES_KEY, graphQLQueryExecutionContext.getVariablesParams());
        return JsonUtils.toJson(map);
    }
}
