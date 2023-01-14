package com.openblocks.plugin.redis.model;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;
import lombok.Getter;
import redis.clients.jedis.Protocol;

@Getter
@Builder
public class RedisQueryExecutionContext extends QueryExecutionContext {

    private Protocol.Command protocolCommand;
    private String[] args;
}
