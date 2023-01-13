package com.openblocks.plugin.mongo.constants;

public class MongoFieldName {

    public static final String COMMAND_TYPE = "compType";
    public static final String FIELD_PREFIX = "comp";
    public static final String COLLECTION = "collection";
    public static final String QUERY = "query";
    public static final String SORT = "sort";
    public static final String PROJECTION = "projection";
    public static final String LIMIT = "limit";
    public static final String SKIP = "skip";
    public static final String UPDATE = "update";
    public static final String KEY = "key";
    public static final String PIPELINES = "arrayPipelines";
    public static final String DOCUMENTS = "documents";

    public static final String RAW_COMMAND = FIELD_PREFIX + "." + "command";
    public static final String AGGREGATE_PIPELINE = FIELD_PREFIX + "." + PIPELINES;
    public static final String AGGREGATE_LIMIT = FIELD_PREFIX + "." + "limit";
    public static final String COUNT_QUERY = FIELD_PREFIX + "." + QUERY;
    public static final String DELETE_QUERY = FIELD_PREFIX + "." + QUERY;
    public static final String DELETE_LIMIT = FIELD_PREFIX + "." + LIMIT;
    public static final String DISTINCT_QUERY = FIELD_PREFIX + "." + QUERY;
    public static final String FIND_QUERY = FIELD_PREFIX + "." + QUERY;
    public static final String FIND_SORT = FIELD_PREFIX + "." + SORT;
    public static final String FIND_PROJECTION = FIELD_PREFIX + "." + PROJECTION;
    public static final String INSERT_DOCUMENT = FIELD_PREFIX + "." + DOCUMENTS;
    public static final String UPDATE_QUERY = FIELD_PREFIX + "." + QUERY;
    public static final String UPDATE_OPERATION = FIELD_PREFIX + "." + UPDATE;
    public static final String DISTINCT_KEY = FIELD_PREFIX + "." + KEY;
    public static final String FIND_LIMIT = FIELD_PREFIX + "." + LIMIT;
    public static final String FIND_SKIP = FIELD_PREFIX + "." + SKIP;
    public static final String UPDATE_LIMIT = FIELD_PREFIX + "." + LIMIT;

}
