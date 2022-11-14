package com.openblocks.api.home;

import static com.openblocks.sdk.constants.GlobalContext.CURRENT_ORG_MEMBER;
import static com.openblocks.sdk.constants.GlobalContext.VISITOR;
import static com.openblocks.sdk.exception.BizError.UNABLE_TO_FIND_VALID_ORG;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.time.Duration;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Service;

import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.infra.annotation.NonEmptyMono;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Slf4j
@Service
public class SessionUserServiceImpl implements SessionUserService {

    @Autowired
    private UserService userService;
    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private ReactiveRedisTemplate<String, String> reactiveTemplate;

    @SuppressWarnings("ReactiveStreamsNullableInLambdaInTransform")
    @Override
    public Mono<String> getVisitorId() {
        return getVisitorFromSecurityContext()
                .map(User::getId);
    }

    /**
     * @see com.openblocks.api.framework.filter.GlobalContextFilter
     */
    @Override
    public Mono<User> getVisitor() {
        return Mono.deferContextual(contextView -> getVisitorFromSecurityContext()
                .flatMap(it -> {
                    if (it.isAnonymous()) {
                        return Mono.just(it);
                    }
                    return contextView.get(VISITOR);
                }));
    }

    /**
     * @see com.openblocks.api.framework.filter.GlobalContextFilter
     */
    @SuppressWarnings("unchecked")
    @Override
    public Mono<OrgMember> getVisitorOrgMemberCache() {
        return Mono.deferContextual(contextView -> (Mono<OrgMember>) contextView.get(CURRENT_ORG_MEMBER))
                .delayUntil(orgMember -> {
                    if (orgMember == OrgMember.NOT_EXIST) {
                        return deferredError(UNABLE_TO_FIND_VALID_ORG, "UNABLE_TO_FIND_VALID_ORG");
                    }
                    return Mono.empty();
                })
                .switchIfEmpty(deferredError(UNABLE_TO_FIND_VALID_ORG, "UNABLE_TO_FIND_VALID_ORG"));
    }

    @Override
    public Mono<OrgMember> getVisitorOrgMember() {
        return getVisitorId()
                .flatMap(userId -> orgMemberService.getCurrentOrgMember(userId))
                .switchIfEmpty(deferredError(UNABLE_TO_FIND_VALID_ORG, "UNABLE_TO_FIND_VALID_ORG"));
    }

    @NonEmptyMono
    private Mono<User> getVisitorFromSecurityContext() {
        return ReactiveSecurityContextHolder.getContext()
                .flatMap(securityContext -> {
                    Authentication authentication = securityContext.getAuthentication();
                    return Mono.just((User) authentication.getPrincipal());
                });
    }

    @Override
    public Mono<Boolean> isAnonymousUser() {
        return getVisitorFromSecurityContext()
                .map(User::isAnonymous);
    }

    @Override
    public Mono<Void> saveUserSession(String sessionId, User user) {
        ReactiveValueOperations<String, String> ops = getRedisOps();
        return ops.set(sessionId, toJson(user), Duration.ofDays(7))
                .then();
    }

    @Override
    public Mono<Void> extendValidity(String token) {
        if (StringUtils.isBlank(token)) {
            return Mono.empty();
        }
        return reactiveTemplate.expire(token, Duration.ofDays(7))
                .then();
    }

    @Override
    public Mono<Void> removeUserSession(String sessionId) {
        if (StringUtils.isBlank(sessionId)) {
            return Mono.empty();
        }
        ReactiveValueOperations<String, String> ops = getRedisOps();
        return ops.delete(sessionId)
                .then();
    }

    @Override
    public Mono<User> resolveSessionUserFromCookie(String token) {
        if (StringUtils.isBlank(token)) {
            return Mono.empty();
        }
        return getRedisOps().get(token)
                .flatMap(it -> {
                    User user = fromJson(it, User.class);
                    if (user == null) {
                        return Mono.empty();
                    }
                    return Mono.just(user);
                })
                .subscribeOn(Schedulers.boundedElastic());
    }


    private ReactiveValueOperations<String, String> getRedisOps() {
        return reactiveTemplate.opsForValue();
    }


}

