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

import com.openblocks.api.usermanagement.UserApiService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.model.UserState;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.config.CommonConfig;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class SessionUserServiceImpl implements SessionUserService {

    @Autowired
    private CommonConfig commonConfig;
    @Autowired
    private UserService userService;
    @Autowired
    private OrgMemberService orgMemberService;
    @Autowired
    private UserApiService userApiService;

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
    public Mono<Void> saveUserSession(String token, User user, String source) {
        ReactiveValueOperations<String, String> ops = reactiveTemplate.opsForValue();
        return ops.set(token, Objects.requireNonNull(user.getId()), getTokenExpireTime())
                .then(userApiService.removeInvalidTokens(user.getId()))
                .then(userApiService.saveToken(user.getId(), source, token));
    }

    @Override
    public Mono<Void> extendValidity(String token) {
        if (StringUtils.isBlank(token)) {
            return Mono.empty();
        }
        return reactiveTemplate.expire(token, getTokenExpireTime())
                .then();
    }

    private Duration getTokenExpireTime() {
        long maxAgeInSeconds = commonConfig.getCookie().getMaxAgeInSeconds();
        if (maxAgeInSeconds >= 0) {
            return Duration.ofSeconds(maxAgeInSeconds).plus(Duration.ofDays(1));
        }
        return Duration.ofDays(7);
    }

    @Override
    public Mono<Void> removeUserSession(String token) {
        if (StringUtils.isBlank(token)) {
            return Mono.empty();
        }
        ReactiveValueOperations<String, String> ops = reactiveTemplate.opsForValue();
        return ops.get(token)
                .delayUntil(__ -> ops.delete(token))
                .flatMap(userId -> userApiService.removeToken(userId, token));
    }

    @Override
    public Mono<User> resolveSessionUserFromCookie(String token) {
        if (StringUtils.isBlank(token)) {
            return Mono.empty();
        }
        return reactiveTemplate.opsForValue().get(token)
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

    @Override
    public Mono<Boolean> tokenExist(String token) {
        return reactiveTemplate.hasKey(token);
    }
}

