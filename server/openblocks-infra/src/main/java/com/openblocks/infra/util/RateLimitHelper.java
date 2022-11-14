package com.openblocks.infra.util;

import java.time.Duration;
import java.util.Set;

import com.google.common.collect.Sets;

import es.moki.ratelimitj.core.limiter.request.RequestLimitRule;

public class RateLimitHelper {

    // 1 request per 10 minutes, per phone
    public static final Set<RequestLimitRule> OTP_SEND_BY_PHONE_LIMIT_RULES = Sets.newHashSet(
            RequestLimitRule.of(Duration.ofMinutes(1), 1));

    // 100 request per minute, per IP
    public static final Set<RequestLimitRule> OTP_SEND_BY_IP_LIMIT_RULES = Sets.newHashSet(
            RequestLimitRule.of(Duration.ofMinutes(1), 100));

    // 100 request per minute, per phone
    public static final Set<RequestLimitRule> OTP_VERIFY_BY_PHONE_LIMIT_RULES = Sets.newHashSet(
            RequestLimitRule.of(Duration.ofMinutes(1), 100));

    public static final String OTP_SEND = "OPT_SEND:";
    public static final String OTP_VERIFTY = "OTP_VERIFTY:";

    public static String buildLimitKey(String biz, String key) {
        return "RateLimit:" + biz + key;
    }


}
