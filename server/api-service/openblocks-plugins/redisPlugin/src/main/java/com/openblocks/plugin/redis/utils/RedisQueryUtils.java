package com.openblocks.plugin.redis.utils;

import static com.openblocks.plugin.redis.constants.RedisFieldName.COMMAND;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;

import java.util.Map;

import com.openblocks.plugin.redis.commands.RedisCommand;
import com.openblocks.plugin.redis.commands.RedisCommand.Del;
import com.openblocks.plugin.redis.commands.RedisCommand.Get;
import com.openblocks.plugin.redis.commands.RedisCommand.Hdel;
import com.openblocks.plugin.redis.commands.RedisCommand.Hget;
import com.openblocks.plugin.redis.commands.RedisCommand.Hgetall;
import com.openblocks.plugin.redis.commands.RedisCommand.Hkeys;
import com.openblocks.plugin.redis.commands.RedisCommand.Hlen;
import com.openblocks.plugin.redis.commands.RedisCommand.Hmget;
import com.openblocks.plugin.redis.commands.RedisCommand.Hset;
import com.openblocks.plugin.redis.commands.RedisCommand.Hsetnx;
import com.openblocks.plugin.redis.commands.RedisCommand.Hvals;
import com.openblocks.plugin.redis.commands.RedisCommand.Keys;
import com.openblocks.plugin.redis.commands.RedisCommand.Lindex;
import com.openblocks.plugin.redis.commands.RedisCommand.Llen;
import com.openblocks.plugin.redis.commands.RedisCommand.Lpush;
import com.openblocks.plugin.redis.commands.RedisCommand.Lrange;
import com.openblocks.plugin.redis.commands.RedisCommand.Lrem;
import com.openblocks.plugin.redis.commands.RedisCommand.Mget;
import com.openblocks.plugin.redis.commands.RedisCommand.Rpoplpush;
import com.openblocks.plugin.redis.commands.RedisCommand.Sadd;
import com.openblocks.plugin.redis.commands.RedisCommand.Scard;
import com.openblocks.plugin.redis.commands.RedisCommand.Set;
import com.openblocks.plugin.redis.commands.RedisCommand.Sismember;
import com.openblocks.plugin.redis.commands.RedisCommand.Smembers;
import com.openblocks.plugin.redis.commands.RedisCommand.Srandmember;
import com.openblocks.plugin.redis.commands.RedisCommand.Srem;
import com.openblocks.plugin.redis.commands.RedisCommand.Zadd;
import com.openblocks.plugin.redis.commands.RedisCommand.Zcard;
import com.openblocks.plugin.redis.commands.RedisCommand.Zcount;
import com.openblocks.plugin.redis.commands.RedisCommand.Zrange;
import com.openblocks.plugin.redis.commands.RedisCommand.Zrangebyscore;
import com.openblocks.plugin.redis.commands.RedisCommand.Zrank;
import com.openblocks.plugin.redis.commands.RedisCommand.Zrem;
import com.openblocks.plugin.redis.commands.RedisCommand.Zscore;
import com.openblocks.sdk.exception.PluginException;

public class RedisQueryUtils {


    public static boolean isRawCommand(Map<String, Object> formData) {
        String command = (String) formData.getOrDefault(COMMAND, "");
        return "RAW".equalsIgnoreCase(command);
    }

    public static RedisCommand convertRedisFormInputToRedisCommand(Map<String, Object> formData) {
        String commandType = (String) formData.getOrDefault(COMMAND, "");
        return switch (commandType.toUpperCase()) {
            case "SET" -> new Set(formData);
            case "GET" -> new Get(formData);
            case "DEL" -> new Del(formData);
            case "KEYS" -> new Keys(formData);
            case "MGET" -> new Mget(formData);
            case "HGET" -> new Hget(formData);
            case "HMGET" -> new Hmget(formData);
            case "HGETALL" -> new Hgetall(formData);
            case "HSET" -> new Hset(formData);
            case "HSETNX" -> new Hsetnx(formData);
            case "HLEN" -> new Hlen(formData);
            case "HDEL" -> new Hdel(formData);
            case "HKEYS" -> new Hkeys(formData);
            case "HVALS" -> new Hvals(formData);
            case "LINDEX" -> new Lindex(formData);
            case "LLEN" -> new Llen(formData);
            case "LPUSH" -> new Lpush(formData);
            case "LREM" -> new Lrem(formData);
            case "RPOPLPUSH" -> new Rpoplpush(formData);
            case "LRANGE" -> new Lrange(formData);
            case "SADD" -> new Sadd(formData);
            case "SCARD" -> new Scard(formData);
            case "SMEMBERS" -> new Smembers(formData);
            case "SISMEMBER" -> new Sismember(formData);
            case "SRANDMEMBER" -> new Srandmember(formData);
            case "SREM" -> new Srem(formData);
            case "ZADD" -> new Zadd(formData);
            case "ZCARD" -> new Zcard(formData);
            case "ZCOUNT" -> new Zcount(formData);
            case "ZRANGE" -> new Zrange(formData);
            case "ZRANGEBYSCORE" -> new Zrangebyscore(formData);
            case "ZRANK" -> new Zrank(formData);
            case "ZREM" -> new Zrem(formData);
            case "ZSCORE" -> new Zscore(formData);
            default -> throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_REDIS_REQUEST", commandType);
        };
    }

}
