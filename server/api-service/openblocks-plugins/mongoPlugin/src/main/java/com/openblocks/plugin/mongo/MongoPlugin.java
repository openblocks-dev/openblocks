/**
 * Copyright 2021 Appsmith Inc.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * <p>
 */
// adapted for mongodb queries
package com.openblocks.plugin.mongo;

import static com.google.common.collect.Maps.newHashMap;
import static com.openblocks.plugin.mongo.MongoPluginError.MONGO_COMMAND_ERROR;
import static com.openblocks.plugin.mongo.MongoPluginError.MONGO_EXECUTION_ERROR;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.AGGREGATE_PIPELINE;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.COUNT_QUERY;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.DELETE_QUERY;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.DISTINCT_QUERY;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.FIND_PROJECTION;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.FIND_QUERY;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.FIND_SORT;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.INSERT_DOCUMENT;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.RAW_COMMAND;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.UPDATE_OPERATION;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.UPDATE_QUERY;
import static com.openblocks.plugin.mongo.model.MongoConnectionUriParser.extractInfoFromConnectionStringURI;
import static com.openblocks.plugin.mongo.utils.MongoQueryUtils.isRawCommand;
import static com.openblocks.plugin.mongo.utils.MongoQueryUtils.parseResultBody;
import static com.openblocks.sdk.exception.PluginCommonError.CONNECTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_GET_STRUCTURE_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_TIMEOUT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.INVALID_QUERY_SETTINGS;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_TIMEOUT;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getValueSafelyFromFormData;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.querySharedScheduler;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheJsonString;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheString;

import java.math.BigInteger;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.TimeoutException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.json.JSONObject;
import org.pf4j.Extension;
import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;
import org.reactivestreams.Publisher;

import com.google.common.base.Joiner;
import com.google.common.collect.ImmutableSet;
import com.mongodb.MongoCommandException;
import com.mongodb.MongoSocketWriteException;
import com.mongodb.MongoTimeoutException;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.openblocks.plugin.mongo.commands.MongoCommand;
import com.openblocks.plugin.mongo.constants.MongoSpecialDataTypes;
import com.openblocks.plugin.mongo.model.MongoConnection;
import com.openblocks.plugin.mongo.model.MongoConnectionUriParser;
import com.openblocks.plugin.mongo.model.MongoDatasourceConfig;
import com.openblocks.plugin.mongo.model.MongoQueryExecutionContext;
import com.openblocks.plugin.mongo.utils.MongoQueryUtils;
import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.DatasourceQueryEngine;
import com.openblocks.sdk.query.QueryVisitorContext;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

public class MongoPlugin extends Plugin {

    public MongoPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Slf4j
    @Extension
    public static class MongoEngine implements DatasourceQueryEngine<MongoDatasourceConfig, MongoConnection, MongoQueryExecutionContext> {

        private static final Integer MONGO_COMMAND_EXCEPTION_UNAUTHORIZED_ERROR_CODE = 13;

        private static final Joiner PATH_JOINER = Joiner.on(".");
        private static final Set<String> BSON_FIELD_PATHS = new HashSet<>(Arrays.asList(AGGREGATE_PIPELINE,
                COUNT_QUERY,
                DELETE_QUERY,
                DISTINCT_QUERY,
                FIND_QUERY,
                FIND_SORT,
                FIND_PROJECTION,
                INSERT_DOCUMENT,
                UPDATE_QUERY,
                UPDATE_OPERATION
        ));

        private final Scheduler scheduler = querySharedScheduler();
        private final Conf<Duration> datasourceValidateTimeout;

        public MongoEngine(ConfigCenter configCenter) {
            datasourceValidateTimeout = configCenter.mongoPlugin().ofInteger("datasourceValidateTimeoutMillis", 6000)
                    .then(Duration::ofMillis);
        }

        @Override
        public Mono<QueryExecutionResult> executeQuery(MongoConnection mongoConnection, MongoQueryExecutionContext context) {

            Document command = context.getCommand();

            Publisher<Document> source;
            try {
                source = mongoConnection.getDatabase().runCommand(command);
            } catch (Exception e) {
                throw new PluginException(MONGO_COMMAND_ERROR, "MONGODB_COMMAND_ERROR", e.getMessage());
            }

            return Mono.from(source)
                    .onErrorMap(MongoTimeoutException.class,
                            error -> new PluginException(QUERY_EXECUTION_TIMEOUT, "QUERY_TIMEOUT_ERROR", error.getMessage()))
                    .onErrorMap(MongoCommandException.class, error -> new PluginException(QUERY_ARGUMENT_ERROR, "QUERY_ARGUMENT_ERROR",
                            error.getErrorMessage()))
                    .onErrorMap(MongoSocketWriteException.class,
                            error -> new PluginException(CONNECTION_ERROR, "CONNECTION_ERROR", error.getMessage()))
                    .flatMap(mongoOutput -> {

                        try {
                            JSONObject outputJson = new JSONObject(mongoOutput.toJson());
                            BigInteger status = outputJson.getBigInteger("ok");
                            if (!BigInteger.ONE.equals(status)) {
                                return Mono.just(QueryExecutionResult.error(MONGO_EXECUTION_ERROR, "MONGODB_EXECUTE_ERROR", status));
                            }
                            return Mono.just(QueryExecutionResult.success(parseResultBody(outputJson)));

                        } catch (Exception e) {
                            return Mono.error(new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage()));
                        }
                    })
                    .onErrorResume(error -> {
                        if (error instanceof PluginException) {
                            return Mono.error(error);
                        }

                        return Mono.just(QueryExecutionResult.error(MONGO_EXECUTION_ERROR, "MONGODB_EXECUTE_ERROR", error.getMessage()));
                    })
                    .subscribeOn(scheduler);
        }

        @Nonnull
        @Override
        public MongoDatasourceConfig resolveConfig(Map<String, Object> configMap) {
            return MongoDatasourceConfig.buildFrom(configMap);
        }

        @Override
        public MongoQueryExecutionContext buildQueryExecutionContext(MongoDatasourceConfig datasourceConfig,
                Map<String, Object> queryConfig,
                Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {

            queryConfig = newHashMap(queryConfig);

            if (isRawCommand(queryConfig)) {
                Object body = getValueSafelyFromFormData(queryConfig, RAW_COMMAND);

                if (!(body instanceof String bodyStr)) {
                    throw new PluginException(INVALID_QUERY_SETTINGS, "INVALID_RAW_REQUEST_PARAM");
                }

                if (StringUtils.isBlank(bodyStr)) {
                    throw new PluginException(INVALID_QUERY_SETTINGS, "RAW_REQUEST_PARAM_EMPTY");
                }

                try {
                    String updatedRawQuery = renderMustacheJsonString(bodyStr, requestParams);
                    updatedRawQuery = removeOrAddQuotesAroundSpecialTypes(updatedRawQuery);

                    return MongoQueryExecutionContext.builder()
                            .command(Document.parse(updatedRawQuery))
                            .databaseName(datasourceConfig.getParsedDatabase())
                            .build();
                } catch (Exception e) {
                    if (e instanceof PluginException pluginException) {
                        throw pluginException;
                    }
                    throw new PluginException(INVALID_QUERY_SETTINGS, "INVALID_QUERY_SETTINGS", e.getMessage());
                }
            }

            List<String> currentPath = new ArrayList<>();
            Map<String, Object> evaluatedQueryConfig = traverseAndEvaluate(queryConfig, requestParams, currentPath);

            MongoCommand mongoCommand = MongoQueryUtils.convertMongoFormInputToRawCommand(evaluatedQueryConfig);

            Document command;
            try {
                command = mongoCommand.parseCommand();
            } catch (Exception e) {
                throw new PluginException(INVALID_QUERY_SETTINGS, "INVALID_QUERY_SETTINGS", e.getMessage());
            }
            return MongoQueryExecutionContext.builder()
                    .command(command)
                    .databaseName(datasourceConfig.getParsedDatabase())
                    .build();
        }

        @SuppressWarnings(value = {"unchecked", "rawtypes"})
        private <T> T traverseAndEvaluate(T object, Map<String, Object> paramMap, List<String> pathStack) {
            if (object == null) {
                return null;
            }

            if (object instanceof List) {
                List renderedList = new ArrayList();
                for (Object childValue : (List) object) {
                    renderedList.add(traverseAndEvaluate(childValue, paramMap, pathStack));
                }

                return (T) renderedList;
            }

            if (object instanceof Map map) {
                Map<String, Object> renderedMap = new HashMap<>();
                for (Object entry : map.entrySet()) {
                    String key = (String) ((Entry) entry).getKey();
                    pathStack.add(key);
                    renderedMap.put(key, traverseAndEvaluate(((Map.Entry) entry).getValue(), paramMap, pathStack));
                    pathStack.remove(pathStack.size() - 1);
                }

                return (T) renderedMap;
            }

            String leafNodePath = PATH_JOINER.join(pathStack);
            if (!(object instanceof String strValue)) {
                throw new PluginException(INVALID_QUERY_SETTINGS, "INVALID_FORMAT", leafNodePath, object.getClass().getSimpleName());
            }


            return (T) evaluateString(strValue, paramMap, leafNodePath);
        }

        private String evaluateString(String str, Map<String, Object> paramMap, String path) {

            if (BSON_FIELD_PATHS.contains(path)) {
                String renderedJsonStr = renderMustacheJsonString(str, paramMap);
                return removeOrAddQuotesAroundSpecialTypes(renderedJsonStr);
            }

            return renderMustacheString(str, paramMap);
        }

        private String removeOrAddQuotesAroundSpecialTypes(String query) {

            String result = query;

            for (MongoSpecialDataTypes specialType : MongoSpecialDataTypes.values()) {

                Map<String, String> objectIdMap = new LinkedHashMap<>();

                Pattern pattern = specialType.getRegexPattern();

                Matcher matcher = pattern.matcher(result);
                while (matcher.find()) {
                    // e.g."ObjectId('someId')":
                    //  o Group 1 = "ObjectId('someId')"
                    //  o Group 2 = ObjectId(someId)
                    //  o Group 3 = 'someId'
                    //  o Group 4 = someId
                    if (matcher.group(1) != null) {
                        String objectIdWithQuotes = matcher.group(1);
                        String objectIdWithoutQuotes = matcher.group(2);
                        String argWithQuotes = matcher.group(3);
                        String argWithoutQuotes = matcher.group(4);
                        if (specialType.isQuotesRequiredAroundParameter() && StringUtils.isNotEmpty(argWithQuotes)) {
                            argWithoutQuotes = toJson(argWithoutQuotes);
                        }
                        objectIdMap.put(objectIdWithQuotes, objectIdWithoutQuotes);
                        if (StringUtils.isNotEmpty(argWithQuotes)) {
                            objectIdMap.put(argWithQuotes, argWithoutQuotes);
                        }
                    }
                }

                for (Map.Entry<String, String> entry : objectIdMap.entrySet()) {
                    String objectIdWithQuotes = (entry).getKey();
                    String objectIdWithoutQuotes = (entry).getValue();
                    result = result.replace(objectIdWithQuotes, objectIdWithoutQuotes);
                }
            }
            return result;
        }

        @Override
        public Mono<MongoConnection> createConnection(MongoDatasourceConfig connectionConfig) {
            return Mono.just(buildClientUri(connectionConfig))
                    .map(MongoClients::create)
                    .map(mongoClient -> new MongoConnection(mongoClient, connectionConfig.getParsedDatabase()))
                    .onErrorMap(
                            IllegalArgumentException.class,
                            error -> new PluginException(DATASOURCE_ARGUMENT_ERROR, "DATASOURCE_ARGUMENT_ERROR", error.getMessage())
                    )
                    .onErrorMap(e -> {
                        if (!(e instanceof PluginException)) {
                            return new PluginException(QUERY_EXECUTION_ERROR, "QUERY_EXECUTION_ERROR", e.getMessage());
                        }

                        return e;
                    })
                    .subscribeOn(scheduler);
        }

        private String buildClientUri(MongoDatasourceConfig mongoDatasourceConfig) {

            if (mongoDatasourceConfig.isUsingUri()) {
                if (StringUtils.isBlank(mongoDatasourceConfig.getUri())) {
                    throw new PluginException(DATASOURCE_ARGUMENT_ERROR, "MONGODB_URI_EMPTY");
                }

                String uri = mongoDatasourceConfig.getUri();
                Map<String, String> extractedInfo = extractInfoFromConnectionStringURI(uri);
                if (extractedInfo == null) {
                    throw new PluginException(DATASOURCE_ARGUMENT_ERROR, "MONGODB_URI_EXTRACT_ERROR");
                }

                return uri;
            }

            StringBuilder builder = new StringBuilder();
            boolean isSrv = mongoDatasourceConfig.isSrvMode();

            if (isSrv) {
                builder.append("mongodb+srv://");
            } else {
                builder.append("mongodb://");
            }

            String username = mongoDatasourceConfig.getUsername();
            String password = mongoDatasourceConfig.getPassword();

            boolean hasUsername = StringUtils.isNotEmpty(username);
            boolean hasPassword = StringUtils.isNotEmpty(password);
            if (hasUsername) {
                builder.append(MongoQueryUtils.urlEncode(username));
            }
            if (hasPassword) {
                builder.append(':').append(MongoQueryUtils.urlEncode(password));
            }
            if (hasUsername || hasPassword) {
                builder.append('@');
            }

            String host = mongoDatasourceConfig.getHost();
            builder.append(host);
            builder.append(isSrv ? "" : ":" + mongoDatasourceConfig.getPort());
            builder.append('/').append(mongoDatasourceConfig.getParsedDatabase());

            List<String> queryParams = new ArrayList<>();
            if (mongoDatasourceConfig.isSsl()) {
                queryParams.add("ssl=true");
            } else {
                queryParams.add("ssl=false");
            }

            if (hasUsername && mongoDatasourceConfig.getAuthMechanism() != null) {
                queryParams.add("authMechanism=" + mongoDatasourceConfig.getAuthMechanism().getValue());
            }

            builder.append('?');
            for (String param : queryParams) {
                builder.append(param).append('&');
            }
            // Delete the trailing ampersand.
            builder.deleteCharAt(builder.length() - 1);
            return builder.toString();
        }

        @Override
        public Mono<Void> destroyConnection(MongoConnection mongoConnection) {
            return mongoConnection.close();
        }

        private boolean hostStringHasConnectionURIHead(String host) {
            return StringUtils.isNotBlank(host) && (host.contains("mongodb://") || host.contains("mongodb+srv"));
        }

        @Override
        public Set<String> validateConfig(MongoDatasourceConfig connectionConfig) {
            Set<String> invalids = new HashSet<>();

            if (connectionConfig.isUsingUri()) {
                if (StringUtils.isBlank(connectionConfig.getUri())) {
                    return ImmutableSet.of("MONGODB_URI_EMPTY_PLZ_CHECK");
                }

                String mongoUri = connectionConfig.getUri();
                if (!MongoConnectionUriParser.isValid(mongoUri)) {
                    return ImmutableSet.of("INVALID_MONGODB_URI_PLZ_CHECK");
                }

                Map<String, String> extractedInfo = extractInfoFromConnectionStringURI(mongoUri);
                if (extractedInfo == null) {
                    return ImmutableSet.of("INVALID_MONGODB_URI_PLZ_CHECK");
                }

                return invalids;
            }


            String host = connectionConfig.getHost();
            if (StringUtils.isBlank(host)) {
                invalids.add("HOST_EMPTY_PLZ_CHECK");
            }

            if (hostStringHasConnectionURIHead(host)) {
                invalids.add("HOST_EMPTY_PLZ_CHECK");
            }

            if (StringUtils.equalsIgnoreCase(host, "localhost") || StringUtils.equals(host, "127.0.0.1")) {
                invalids.add("INVALID_HOST");
            }

            if (StringUtils.isEmpty(connectionConfig.getDatabase())) {
                invalids.add("DATABASE_EMPTY");
            }

            return invalids;
        }

        @Override
        public Mono<DatasourceTestResult> testConnection(MongoDatasourceConfig connectionConfig) {
            return doCreateConnection(connectionConfig)
                    .flatMap(connection -> connection.ping()
                            .then(connection.close())
                    )
                    .timeout(datasourceValidateTimeout.get())
                    .thenReturn(DatasourceTestResult.testSuccess())
                    .onErrorMap(TimeoutException.class, error -> new PluginException(DATASOURCE_TIMEOUT_ERROR, "DATASOURCE_TIMEOUT_ERROR"))
                    .onErrorResume(error -> Mono.just(DatasourceTestResult.testFail(error)))
                    .subscribeOn(scheduler);
        }

        @Override
        public Mono<DatasourceStructure> getStructure(MongoConnection mongoClient,
                MongoDatasourceConfig connectionConfig) {
            final DatasourceStructure structure = new DatasourceStructure();
            List<DatasourceStructure.Table> tables = new ArrayList<>();
            structure.setTables(tables);

            MongoDatabase mongoDatabase = mongoClient.getDatabase();

            return Flux.from(mongoDatabase.listCollectionNames())
                    .flatMap(collectionName -> {
                        final ArrayList<DatasourceStructure.Column> columns = new ArrayList<>();
                        final ArrayList<DatasourceStructure.Template> templates = new ArrayList<>();
                        tables.add(new DatasourceStructure.Table(
                                DatasourceStructure.TableType.COLLECTION,
                                null,
                                collectionName,
                                columns,
                                new ArrayList<>(),
                                templates
                        ));

                        return Mono.zip(
                                Mono.just(columns),
                                Mono.just(templates),
                                Mono.just(collectionName),
                                Mono.from(mongoDatabase.getCollection(collectionName).find().limit(1).first())
                        );
                    })
                    .flatMap(tuple -> {
                        final ArrayList<DatasourceStructure.Column> columns = tuple.getT1();
                        Document document = tuple.getT4();
                        MongoQueryUtils.generateTemplatesAndStructureForACollection(document, columns);
                        return Mono.just(structure);
                    })
                    .collectList()
                    .thenReturn(structure)
                    .onErrorMap(MongoCommandException.class,
                            error -> {
                                if (MONGO_COMMAND_EXCEPTION_UNAUTHORIZED_ERROR_CODE.equals(error.getErrorCode())) {
                                    return new PluginException(DATASOURCE_GET_STRUCTURE_ERROR, "GET_MONGODB_STRUCTURE_ERROR");
                                }
                                return error;
                            }
                    )
                    .subscribeOn(scheduler);
        }

    }

}
