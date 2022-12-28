package com.openblocks.api.home;

import static com.openblocks.sdk.constants.GlobalContext.CURRENT_ORG_MEMBER;
import static com.openblocks.sdk.exception.BizError.UNABLE_TO_FIND_VALID_ORG;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.JsonUtils.fromJsonQuietly;

import java.time.Duration;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Service;

import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.model.UserState;
import com.openblocks.domain.user.service.UserService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

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
        return getVisitor()
                .map(User::getId);
    }

    /**
     * @see com.openblocks.api.framework.filter.GlobalContextFilter
     */
    @Override
    public Mono<User> getVisitor() {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> (User) securityContext.getAuthentication().getPrincipal());
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

    @Override
    public Mono<Boolean> isAnonymousUser() {
        return getVisitor()
                .map(User::isAnonymous);
    }

    @Override
    public Mono<Void> saveUserSession(String token, User user) {
        ReactiveValueOperations<String, String> ops = getRedisOps();
        return ops.set(token, Objects.requireNonNull(user.getId()), Duration.ofDays(7))
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
    public Mono<Void> removeUserSession(String token) {
        if (StringUtils.isBlank(token)) {
            return Mono.empty();
        }
        ReactiveValueOperations<String, String> ops = getRedisOps();
        return ops.delete(token)
                .then();
    }

    @Override
    public Mono<User> resolveSessionUserFromCookie(String token) {
        if (StringUtils.isBlank(token)) {
            return Mono.empty();
        }
        return getRedisOps().get(token)
                .flatMap(value -> {
                    User user = fromJsonQuietly(value, User.class);
                    if (user == null) {
                        return userService.findById(value);
                    }
                    // some compatible code
                    return userService.findById(user.getId());
                })
                .filter(user -> user.getState() != UserState.DELETED);
    }

    private ReactiveValueOperations<String, String> getRedisOps() {
        return reactiveTemplate.opsForValue();
    }
}

