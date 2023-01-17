package com.openblocks.api.framework.filter;

import static com.openblocks.api.framework.filter.Position.AFTER_PROXY_CHAIN;
import static com.openblocks.api.framework.filter.Position.BEFORE_PROXY_CHAIN;

import org.springframework.core.PriorityOrdered;

public enum FilterOrder {

    REQUEST_COST(BEFORE_PROXY_CHAIN),
    THROTTLING(BEFORE_PROXY_CHAIN),

    // WEB_FILTER_CHAIN_PROXY here

    USER_BAN(AFTER_PROXY_CHAIN),
    GLOBAL_CONTEXT(AFTER_PROXY_CHAIN), // currentOrgMember is set here, filters needing currentOrgMember should be placed after this filter
    QUERY_EXECUTE_HTTP_BODY_SIZE(AFTER_PROXY_CHAIN),
    PRICING_FEATURE(AFTER_PROXY_CHAIN),
    ;


    private static final int INTERVAL = 100;
    private final Position positionToProxyChain;

    FilterOrder(Position positionToProxyChain) {
        this.positionToProxyChain = positionToProxyChain;
    }

    public int getOrder() {
        if (positionToProxyChain == BEFORE_PROXY_CHAIN) {
            // since ordinal indexed from zero, here we start from PriorityOrdered.HIGHEST_PRECEDENCE + INTERNAL
            return (PriorityOrdered.HIGHEST_PRECEDENCE + INTERVAL) + ordinal() * INTERVAL;
        }
        return ordinal() * INTERVAL; // WEB_FILTER_CHAIN_FILTER_ORDER = 0 - 100; so here we start from zero plus an offset=ordinal * INTERNAL
    }
}

/**
 * Authentication written inside this proxy chain,
 * filters needing User/Authentication should be placed after this proxy filter
 */
enum Position {
    BEFORE_PROXY_CHAIN,
    AFTER_PROXY_CHAIN,
}
