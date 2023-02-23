package com.openblocks.api.home;

import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.user.model.User;
import com.openblocks.infra.annotation.NonEmptyMono;

import reactor.core.publisher.Mono;

public interface SessionUserService {

    @NonEmptyMono
    Mono<User> getVisitor();

    @NonEmptyMono
    Mono<String> getVisitorId();

    @NonEmptyMono
    Mono<OrgMember> getVisitorOrgMemberCache();

    Mono<OrgMember> getVisitorOrgMember();

    Mono<Boolean> isAnonymousUser();

    Mono<Void> saveUserSession(String sessionId, User user, String source);

    Mono<Void> extendValidity(String sessionId);

    Mono<Void> removeUserSession(String sessionId);

    Mono<User> resolveSessionUserFromCookie(String token);

    Mono<Boolean> tokenExist(String token);
}
