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
package com.openblocks.plugin.redis;

import static com.google.common.collect.Maps.newHashMap;
import static com.openblocks.plugin.redis.RedisError.REDIS_EXECUTION_ERROR;
import static com.openblocks.plugin.redis.RedisError.REDIS_URI_ERROR;
import static com.openblocks.plugin.redis.constants.RedisConstants.JEDIS_POOL_MAX_IDLE;
import static com.openblocks.plugin.redis.constants.RedisConstants.JEDIS_POOL_MAX_TOTAL;
import static com.openblocks.plugin.redis.constants.RedisConstants.JEDIS_POOL_MIN_EVICTABLE_IDLE_MILLIS;
import static com.openblocks.plugin.redis.constants.RedisConstants.JEDIS_POOL_MIN_IDLE;
import static com.openblocks.plugin.redis.constants.RedisConstants.JEDIS_POOL_TIME_BETWEEN_EVICTION_RUNS_MILLIS;
import static com.openblocks.plugin.redis.constants.RedisConstants.TEST_TIMEOUT_MILLIS;
import static com.openblocks.plugin.redis.constants.RedisFieldName.RAW_COMMAND;
import static com.openblocks.plugin.redis.utils.RedisQueryUtils.convertRedisFormInputToRedisCommand;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getValueSafelyFromFormData;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheArrayString;
import static com.openblocks.sdk.util.MustacheHelper.renderMustacheStringWithoutRemoveSurroundedPar;
import static java.util.Objects.isNull;

import java.net.URI;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.pf4j.Extension;
import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;

import com.openblocks.plugin.redis.commands.RedisCommand;
import com.openblocks.plugin.redis.model.RedisDatasourceConfig;
import com.openblocks.plugin.redis.model.RedisQueryExecutionContext;
import com.openblocks.plugin.redis.utils.RedisQueryUtils;
import com.openblocks.plugin.redis.utils.RedisUriUtils;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.DatasourceQueryEngine;
import com.openblocks.sdk.plugin.common.QueryExecutionUtils;
import com.openblocks.sdk.query.QueryVisitorContext;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.Protocol;
import redis.clients.jedis.Protocol.Command;
import redis.clients.jedis.exceptions.JedisException;
import redis.clients.jedis.util.SafeEncoder;

public class RedisPlugin extends Plugin {
    public static final int DEFAULT_QUERY_TIMEOUT_SECONDS = 8;
    private static final String CMD_KEY = "cmd";
    private static final String ARGS_KEY = "args";

    public RedisPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Slf4j
    @Extension
    public static class RedisEngine implements DatasourceQueryEngine<RedisDatasourceConfig, JedisPool, RedisQueryExecutionContext> {

        private final Scheduler scheduler = QueryExecutionUtils.querySharedScheduler();

        @Override
        public Mono<JedisPool> createConnection(RedisDatasourceConfig connectionConfig) {
            return Mono.fromCallable(() -> {
                        final JedisPoolConfig poolConfig = buildPoolConfig();
                        int timeout = (int) Duration.ofSeconds(DEFAULT_QUERY_TIMEOUT_SECONDS).toMillis();
                        URI uri = RedisUriUtils.getURI(connectionConfig);
                        return new JedisPool(poolConfig, uri, timeout);
                    })
                    .subscribeOn(scheduler)
                    .onErrorMap(t -> {
                        if (t instanceof ArrayIndexOutOfBoundsException && connectionConfig.isUsingUri()) {
                            return new PluginException(REDIS_URI_ERROR, "REDIS_URI_ERROR", t.getMessage());
                        }
                        return t;
                    });
        }

        /**
         * <a href="https://help.aliyun.com/document_detail/98726.html#section-m2c-5kr-zfb">...</a>
         */
        private JedisPoolConfig buildPoolConfig() {
            final JedisPoolConfig poolConfig = new JedisPoolConfig();
            poolConfig.setMaxTotal(JEDIS_POOL_MAX_TOTAL);
            poolConfig.setMaxIdle(JEDIS_POOL_MAX_IDLE);
            poolConfig.setMinIdle(JEDIS_POOL_MIN_IDLE);
            poolConfig.setTestOnBorrow(true);
            poolConfig.setTestOnReturn(true);
            poolConfig.setTestWhileIdle(true);
            poolConfig.setMinEvictableIdleTimeMillis(Duration.ofSeconds(JEDIS_POOL_MIN_EVICTABLE_IDLE_MILLIS).toMillis());
            poolConfig.setTimeBetweenEvictionRunsMillis(Duration.ofSeconds(JEDIS_POOL_TIME_BETWEEN_EVICTION_RUNS_MILLIS).toMillis());
            poolConfig.setBlockWhenExhausted(false);
            return poolConfig;
        }

        @Override
        public Mono<Void> destroyConnection(JedisPool jedisPool) {
            // Schedule on elastic thread pool and subscribe immediately.
            return Mono.fromRunnable(() -> {
                try {
                    if (jedisPool != null) {
                        jedisPool.destroy();
                    }
                } catch (JedisException e) {
                    log.error("Error destroying Jedis pool.");
                }
            });
        }

        @Override
        public Mono<DatasourceTestResult> testConnection(RedisDatasourceConfig connectionConfig) {
            return Mono.fromCallable(() ->
                            doCreateConnection(connectionConfig)
                                    .map(jedisPool -> {
                                        Jedis jedis = jedisPool.getResource();
                                        jedis.ping();
                                        jedisPool.destroy();
                                        return DatasourceTestResult.testSuccess();
                                    })
                                    .onErrorResume(error -> {
                                        log.error("test error", error);
                                        return Mono.just(DatasourceTestResult.testFail(error));
                                    }))
                    .timeout(Duration.ofMillis(TEST_TIMEOUT_MILLIS))
                    .flatMap(obj -> obj)
                    .subscribeOn(scheduler);
        }

        @Nonnull
        @Override
        public RedisDatasourceConfig resolveConfig(Map<String, Object> configMap) {
            return RedisDatasourceConfig.buildFrom(configMap);
        }

        @Override
        public Set<String> validateConfig(RedisDatasourceConfig connectionConfig) {
            Set<String> invalids = new HashSet<>();
            String host = connectionConfig.getHost();
            if (StringUtils.equalsIgnoreCase(host, "localhost") || StringUtils.equals(host, "127.0.0.1")) {
                invalids.add("INVALID_HOST");
            }

            if (connectionConfig.isUsingUri()) {
                if (StringUtils.isBlank(connectionConfig.getUri())) {
                    invalids.add("REDIS_URI_EMPTY");
                }
            } else {
                if (StringUtils.isBlank(host)) {
                    invalids.add("HOST_EMPTY_PLZ_CHECK");
                }
                if (isNull(connectionConfig.getPort())) {
                    invalids.add("PORT_EMPTY");
                }
            }
            return invalids;
        }

        @Override
        public RedisQueryExecutionContext buildQueryExecutionContext(RedisDatasourceConfig datasourceConfig, Map<String, Object> queryConfig,
                Map<String, Object> requestParams, QueryVisitorContext queryVisitorContext) {

            queryConfig = newHashMap(queryConfig);
            Protocol.Command protocolCommand;
            String[] args;

            if (RedisQueryUtils.isRawCommand(queryConfig)) {
                String rawCommandString = getValueSafelyFromFormData(queryConfig, RAW_COMMAND, String.class);
                String renderedCommandString = renderMustacheStringWithoutRemoveSurroundedPar(rawCommandString, requestParams);
                Map<String, Object> cmdAndArgs = getCommandAndArgs(renderedCommandString.trim());
                protocolCommand = Protocol.Command.valueOf((String) cmdAndArgs.get(CMD_KEY));
                args = (String[]) cmdAndArgs.get(ARGS_KEY);
            } else {
                RedisCommand redisCommand = convertRedisFormInputToRedisCommand(queryConfig);
                protocolCommand = redisCommand.getProtocolCommand();
                // this method will remove quotes around {{}}
                args = renderMustacheArrayString(redisCommand.getArgs(), requestParams);
            }

            if (isNull(protocolCommand)) {
                throw new PluginException(QUERY_ARGUMENT_ERROR, "COMMAND_EMPTY");
            }

            return RedisQueryExecutionContext.builder()
                    .protocolCommand(protocolCommand)
                    .args(args)
                    .build();
        }


        @Override
        public Mono<QueryExecutionResult> executeQuery(JedisPool jedisPool, RedisQueryExecutionContext context) {
            Command protocolCommand = context.getProtocolCommand();
            String[] args = context.getArgs();
            return Mono.fromCallable(() -> {
                        try (Jedis jedis = jedisPool.getResource()) {
                            Object commandOutput;
                            if (ArrayUtils.isNotEmpty(args)) {
                                commandOutput = jedis.sendCommand(protocolCommand, args);
                            } else {
                                commandOutput = jedis.sendCommand(protocolCommand);
                            }
                            return QueryExecutionResult.success(processCommandOutput(commandOutput));
                        }
                    })
                    .onErrorResume(error -> {
                        log.error("redis execute error", error);
                        return Mono.just(QueryExecutionResult.error(REDIS_EXECUTION_ERROR, "REDIS_EXECUTION_ERROR", error));
                    })
                    .subscribeOn(scheduler);
        }

        private static Map<String, Object> getCommandAndArgs(String query) {
            /*
              - This regex matches either a whole word, or anything inside double quotes. If something is inside
              single quotes then it gets matched like a whole word
              - e.g. if the query string is: set key 'test match' "my val" '{"a":"b"}', then the regex matches the following:
              (1) set
              (2) key
              (3) 'test match'
              (4) "my val"
              (5) '{"a":"b"}'
              Please note that the above example string is not a valid redis cmd and is only mentioned here for info.
             */
            String redisCmdRegex = "\"[^\"]+\"|'[^']+'|\\S+";
            Pattern pattern = Pattern.compile(redisCmdRegex);
            Matcher matcher = pattern.matcher(query);
            Map<String, Object> cmdAndArgs = new HashMap<>();
            List<String> args = new ArrayList<>();
            while (matcher.find()) {
                if (!cmdAndArgs.containsKey(CMD_KEY)) {
                    cmdAndArgs.put(CMD_KEY, matcher.group().toUpperCase());
                } else {
                    String arg = matcher.group();
                    if (arg.startsWith("\"") && arg.endsWith("\"")) {
                        arg = arg.substring(1, arg.length() - 1);
                    }
                    args.add(arg);
                }
            }

            if (args.size() > 0) {
                cmdAndArgs.put(ARGS_KEY, args.toArray(new String[0]));
            }

            return cmdAndArgs;
        }

        // This will be updated as we encounter different outputs.
        @SuppressWarnings("unchecked")
        private Object processCommandOutput(Object commandOutput) {
            if (commandOutput == null) {
                return null;
            }
            if (commandOutput instanceof byte[]) {
                return SafeEncoder.encode((byte[]) commandOutput);
            }
            if (commandOutput instanceof List) {
                List<byte[]> commandList = (List<byte[]>) commandOutput;
                return commandList.stream()
                        .map(s -> {
                            if (isNull(s)) {
                                return null;
                            } else {
                                return SafeEncoder.encode(s);
                            }
                        })
                        .collect(Collectors.toList());
            }
            return String.valueOf(commandOutput);
        }

    }


}
