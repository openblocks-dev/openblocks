package com.openblocks.api.framework.filter;

import static com.openblocks.api.framework.filter.FilterOrder.GLOBAL_CONTEXT;
import static com.openblocks.sdk.constants.Authentication.isAnonymousUser;
import static com.openblocks.sdk.constants.GlobalContext.CLIENT_IP;
import static com.openblocks.sdk.constants.GlobalContext.CLIENT_LOCALE;
import static com.openblocks.sdk.constants.GlobalContext.CURRENT_ORG_MEMBER;
import static com.openblocks.sdk.constants.GlobalContext.DOMAIN;
import static com.openblocks.sdk.constants.GlobalContext.REQUEST;
import static com.openblocks.sdk.constants.GlobalContext.REQUEST_ID_LOG;
import static com.openblocks.sdk.constants.GlobalContext.REQUEST_METHOD;
import static com.openblocks.sdk.constants.GlobalContext.REQUEST_PATH;
import static com.openblocks.sdk.constants.GlobalContext.VISITOR_ID;
import static com.openblocks.sdk.constants.GlobalContext.VISITOR_TOKEN;
import static com.openblocks.sdk.util.IDUtils.generate;
import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.toMap;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import javax.annotation.Nonnull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.openblocks.api.framework.service.GlobalContextService;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.infra.serverlog.ServerLog;
import com.openblocks.infra.serverlog.ServerLogService;
import com.openblocks.infra.util.NetworkUtils;
import com.openblocks.sdk.util.CookieHelper;
import com.openblocks.sdk.util.UriUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class GlobalContextFilter implements WebFilter, Ordered {

    private static final String MDC_HEADER_PREFIX = "X-MDC-";
    private static final String REQUEST_ID_HEADER = "X-REQUEST-ID";

    public static final String CONTEXT_MAP = "context-map";

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private ServerLogService serverLogService;

    @Autowired
    private GlobalContextService globalContextService;

    @Autowired
    private CookieHelper cookieHelper;

    @Nonnull
    @Override
    public Mono<Void> filter(@Nonnull ServerWebExchange exchange, @Nonnull WebFilterChain chain) {

        return sessionUserService.getVisitorId()
                .doOnNext(visitorId -> {
                    if (isAnonymousUser(visitorId)) {
                        return;
                    }
                    ServerLog serverLog = ServerLog.builder()
                            .userId(visitorId)
                            .urlPath(exchange.getRequest().getPath().toString())
                            .httpMethod(Optional.ofNullable(exchange.getRequest().getMethod()).map(HttpMethod::name).orElse(""))
                            .createTime(System.currentTimeMillis())
                            .build();
                    serverLogService.record(serverLog);
                })
                .flatMap(visitorId -> chain.filter(exchange)
                        .contextWrite(ctx -> {
                            Map<String, Object> contextMap = buildContextMap(exchange, visitorId);
                            for (Entry<String, Object> entry : contextMap.entrySet()) {
                                String key = entry.getKey();
                                Object value = entry.getValue();
                                ctx = ctx.put(key, value);
                            }
                            return ctx.put(CONTEXT_MAP, contextMap);
                        }));
    }

    private Map<String, Object> buildContextMap(ServerWebExchange serverWebExchange, String visitorId) {
        ServerHttpRequest request = serverWebExchange.getRequest();
        Map<String, Object> contextMap = request.getHeaders().toSingleValueMap().entrySet()
                .stream()
                .filter(x -> x.getKey().startsWith(MDC_HEADER_PREFIX))
                .collect(toMap(v -> v.getKey().substring((MDC_HEADER_PREFIX.length())), Map.Entry::getValue));
        contextMap.put(VISITOR_ID, visitorId);
        contextMap.put(CLIENT_IP, NetworkUtils.getRemoteIp(serverWebExchange));
        contextMap.put(REQUEST_ID_LOG, getOrCreateRequestId(request));
        contextMap.put(REQUEST_PATH, request.getPath().pathWithinApplication().value());
        contextMap.put(REQUEST, request);
        contextMap.put(REQUEST_METHOD, ofNullable(request.getMethod()).map(HttpMethod::name).orElse(""));
        contextMap.put(CLIENT_LOCALE, globalContextService.getClientLocale(request));
        contextMap.put(CURRENT_ORG_MEMBER, orgMemberService.getCurrentOrgMember(visitorId).cache());
        contextMap.put(VISITOR_TOKEN, cookieHelper.getCookieToken(serverWebExchange));
        contextMap.put(DOMAIN, UriUtils.getRefererDomainFromRequest(serverWebExchange));
        return contextMap;
    }

    @SuppressWarnings("ConstantConditions")
    private String getOrCreateRequestId(final ServerHttpRequest request) {
        if (!request.getHeaders().containsKey(REQUEST_ID_HEADER)) {
            request.mutate().header(REQUEST_ID_HEADER, generate()).build();
        }

        return request.getHeaders().get(REQUEST_ID_HEADER).get(0);
    }

    @Override
    public int getOrder() {
        return GLOBAL_CONTEXT.getOrder();
    }
}