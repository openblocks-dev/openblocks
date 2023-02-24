package com.openblocks.api.usermanagement;

import static com.openblocks.sdk.exception.BizError.UNSUPPORTED_OPERATION;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.user.model.Connection;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.model.UserDetail;
import com.openblocks.domain.user.repository.UserRepository;
import com.openblocks.domain.user.service.UserService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class UserApiService {

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository repository;

    public Mono<UserDetail> getUserDetailById(String userId) {
        return checkAdminPermissionAndUserBelongsToCurrentOrg(userId)
                .then(userService.findById(userId)
                        .flatMap(user -> userService.buildUserDetail(user, false)));
    }

    private Mono<Void> checkAdminPermissionAndUserBelongsToCurrentOrg(String userId) {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMap(orgMember -> {
                    if (!orgMember.isAdmin()) {
                        return ofError(UNSUPPORTED_OPERATION, "BAD_REQUEST");
                    }
                    return orgMemberService.getOrgMember(orgMember.getOrgId(), userId)
                            .hasElement()
                            .flatMap(hasElement -> {
                                if (hasElement) {
                                    return Mono.empty();
                                }
                                return ofError(UNSUPPORTED_OPERATION, "BAD_REQUEST");
                            });
                });
    }

    public Mono<String> resetPassword(String userId) {
        return checkAdminPermissionAndUserBelongsToCurrentOrg(userId)
                .then(userService.resetPassword(userId));
    }

    // ========================== TOKEN OPERATIONS START ==========================

    public Mono<Void> saveToken(String userId, String source, String token) {
        return repository.findById(userId)
                .doOnNext(user -> user.getConnections().stream()
                        .filter(connection -> connection.getSource().equals(source))
                        .forEach(connection -> connection.addToken(token)))
                .flatMap(repository::save)
                .then();
    }

    /**
     * Remove the token.
     */
    public Mono<Void> removeToken(String userId, String token) {
        return repository.findById(userId)
                .doOnNext(user -> removeToken(user, token))
                .flatMap(repository::save)
                .then();
    }

    private void removeToken(User user, String token) {
        user.getConnections().forEach(connection -> connection.removeToken(token));
    }

    public Flux<String> getTokensByAuthId(String userId, String authId) {
        return repository.findById(userId)
                .flatMapIterable(User::getConnections)
                .filter(connection -> Objects.equals(connection.getAuthId(), authId))
                .flatMapIterable(Connection::getTokens);
    }

    /**
     * Token stored in redis will expire if there's no access while it stored in mongodb will not expire. These tokens still stored in mongodb
     * become invalid so that we should clear them.
     */
    public Mono<Void> removeInvalidTokens(String userId) {
        return repository.findById(userId)
                .delayUntil(user -> getInvalidTokens(user).doOnNext(invalidToken -> removeToken(user, invalidToken)))
                .flatMap(repository::save)
                .then();
    }

    private Flux<String> getInvalidTokens(User user) {
        Set<String> allTokens = user.getConnections().stream()
                .map(Connection::getTokens)
                .flatMap(Set::stream)
                .collect(Collectors.toSet());
        return Flux.fromIterable(allTokens)
                // token not exist in redis
                .filterWhen(token -> sessionUserService.tokenExist(token).map(aBoolean -> !aBoolean));
    }

    // ========================== TOKEN OPERATIONS END ==========================
}
