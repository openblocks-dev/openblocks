package com.openblocks.plugin.redis.commands;

import static com.openblocks.plugin.redis.constants.RedisFieldName.COMMAND;
import static com.openblocks.plugin.redis.constants.RedisFieldName.COUNT;
import static com.openblocks.plugin.redis.constants.RedisFieldName.DESTINATION;
import static com.openblocks.plugin.redis.constants.RedisFieldName.FIELD;
import static com.openblocks.plugin.redis.constants.RedisFieldName.FIELDS;
import static com.openblocks.plugin.redis.constants.RedisFieldName.INDEX;
import static com.openblocks.plugin.redis.constants.RedisFieldName.KEY;
import static com.openblocks.plugin.redis.constants.RedisFieldName.KEYS;
import static com.openblocks.plugin.redis.constants.RedisFieldName.MAX;
import static com.openblocks.plugin.redis.constants.RedisFieldName.MEMBER;
import static com.openblocks.plugin.redis.constants.RedisFieldName.MIN;
import static com.openblocks.plugin.redis.constants.RedisFieldName.PATTERN;
import static com.openblocks.plugin.redis.constants.RedisFieldName.SCORE;
import static com.openblocks.plugin.redis.constants.RedisFieldName.SOURCE;
import static com.openblocks.plugin.redis.constants.RedisFieldName.START;
import static com.openblocks.plugin.redis.constants.RedisFieldName.STOP;
import static com.openblocks.plugin.redis.constants.RedisFieldName.VALUE;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getStringValueSafelyFromFormData;

import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import redis.clients.jedis.Protocol;

@SuppressWarnings("ALL")
@Slf4j
public abstract class RedisCommand {

    private final Map<String, Object> formData;

    private RedisCommand(Map<String, Object> formData) {
        this.formData = formData;
    }

    public Protocol.Command getProtocolCommand() {
        return Protocol.Command.valueOf(getStringValueSafelyFromFormData(formData, COMMAND));
    }

    public String[] getArgs() {
        return argsList()
                .stream()
                .map(field -> getStringValueSafelyFromFormData(formData, field))
                .toArray(String[]::new);
    }

    abstract List<String> argsList();


    public static class Get extends RedisCommand {
        public Get(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Set extends RedisCommand {

        public Set(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, VALUE);
        }
    }

    public static class Del extends RedisCommand {

        public Del(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Keys extends RedisCommand {

        public Keys(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(PATTERN);
        }
    }

    public static class Mget extends RedisCommand {

        public Mget(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEYS);
        }
    }

    public static class Hget extends RedisCommand {

        public Hget(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, FIELD);
        }
    }

    public static class Hmget extends RedisCommand {

        public Hmget(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, FIELDS);
        }
    }

    public static class Hgetall extends RedisCommand {

        public Hgetall(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Hset extends RedisCommand {

        public Hset(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, FIELD, VALUE);
        }
    }

    public static class Hsetnx extends RedisCommand {

        public Hsetnx(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, FIELD, VALUE);
        }
    }

    public static class Hlen extends RedisCommand {

        public Hlen(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Hdel extends RedisCommand {

        public Hdel(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, FIELD);
        }
    }

    public static class Hkeys extends RedisCommand {

        public Hkeys(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Hvals extends RedisCommand {

        public Hvals(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Lindex extends RedisCommand {

        public Lindex(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, INDEX);
        }
    }

    public static class Llen extends RedisCommand {

        public Llen(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Lpush extends RedisCommand {

        public Lpush(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, VALUE);
        }
    }

    public static class Lrem extends RedisCommand {

        public Lrem(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, COUNT, VALUE);
        }
    }

    public static class Rpoplpush extends RedisCommand {

        public Rpoplpush(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(SOURCE, DESTINATION);
        }
    }

    public static class Lrange extends RedisCommand {

        public Lrange(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, START, STOP);
        }
    }

    public static class Sadd extends RedisCommand {

        public Sadd(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, MEMBER);
        }
    }

    public static class Scard extends RedisCommand {

        public Scard(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Smembers extends RedisCommand {

        public Smembers(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Sismember extends RedisCommand {

        public Sismember(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, MEMBER);
        }
    }

    public static class Srandmember extends RedisCommand {

        public Srandmember(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, COUNT);
        }
    }

    public static class Srem extends RedisCommand {

        public Srem(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, MEMBER);
        }
    }

    public static class Zadd extends RedisCommand {

        public Zadd(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, SCORE, MEMBER);
        }
    }

    public static class Zcard extends RedisCommand {

        public Zcard(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY);
        }
    }

    public static class Zcount extends RedisCommand {

        public Zcount(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, MIN, MAX);
        }
    }

    public static class Zrange extends RedisCommand {

        public Zrange(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, START, STOP);
        }
    }

    public static class Zrangebyscore extends RedisCommand {

        public Zrangebyscore(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, MIN, MAX);
        }
    }

    public static class Zrank extends RedisCommand {

        public Zrank(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, MEMBER);
        }
    }

    public static class Zrem extends RedisCommand {

        public Zrem(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, MEMBER);
        }
    }

    public static class Zscore extends RedisCommand {

        public Zscore(Map<String, Object> formData) {
            super(formData);
        }

        @Override
        List<String> argsList() {
            return List.of(KEY, MEMBER);
        }
    }


}
