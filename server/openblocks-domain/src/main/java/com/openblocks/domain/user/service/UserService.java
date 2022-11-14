package com.openblocks.domain.user.service;

import java.util.Collection;
import java.util.Map;

import org.springframework.http.codec.multipart.Part;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.domain.user.model.AuthorizedUser;
import com.openblocks.domain.user.model.Connection;
import com.openblocks.domain.user.model.User;
import com.openblocks.infra.annotation.NonEmptyMono;

import reactor.core.publisher.Mono;

public interface UserService {

    Mono<User> create(User user);

    Mono<User> update(String userId, User user);

    Mono<User> findById(String id);

    @NonEmptyMono
    Mono<Map<String, User>> getByIds(Collection<String> ids);

    Mono<User> findBySourceAndId(String connectionSource, String connectionSourceUuid);

    Mono<Boolean> saveProfilePhoto(Part filePart, User t2);

    Mono<Boolean> bindEmail(User user, String email);

    Mono<User> findByAuthUser(AuthorizedUser authorizedUser);

    Mono<User> createNewUserByAuthUser(AuthorizedUser authorizedUser);

    Mono<Void> getUserAvatar(ServerWebExchange exchange, String userId);

    Mono<Boolean> addNewConnection(String userId, Connection connection);

    Mono<Void> deleteProfilePhoto(User visitor);

    Mono<User> register(String loginId, String password, String source);

    Mono<Boolean> updatePassword(String userId, String oldPassword, String newPassword);

    Mono<Boolean> setPassword(String userId, String password);

}

