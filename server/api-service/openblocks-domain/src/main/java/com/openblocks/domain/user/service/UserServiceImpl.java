package com.openblocks.domain.user.service;


import static com.google.common.collect.Sets.newHashSet;
import static com.openblocks.domain.user.model.UserDetail.ANONYMOUS_CURRENT_USER;
import static com.openblocks.sdk.constants.GlobalContext.CLIENT_IP;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;

import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;

import com.google.common.collect.ImmutableSet;
import com.openblocks.domain.asset.model.Asset;
import com.openblocks.domain.asset.service.AssetService;
import com.openblocks.domain.encryption.EncryptionService;
import com.openblocks.domain.group.model.Group;
import com.openblocks.domain.group.service.GroupMemberService;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.user.model.AuthorizedUser;
import com.openblocks.domain.user.model.Connection;
import com.openblocks.domain.user.model.UserDetail;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.model.User.TransformedUserInfo;
import com.openblocks.domain.user.model.UserState;
import com.openblocks.domain.user.repository.UserRepository;
import com.openblocks.infra.mongo.MongoUpsertHelper;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.constants.AuthSourceConstants;
import com.openblocks.sdk.constants.FieldName;
import com.openblocks.sdk.constants.WorkspaceMode;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.util.LocaleUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AssetService assetService;
    @Autowired
    private ConfigCenter configCenter;
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;
    @Autowired
    private UserRepository repository;
    @Autowired
    private GroupMemberService groupMemberService;
    @Autowired
    private OrgMemberService orgMemberService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private CommonConfig commonConfig;

    private Conf<Integer> avatarMaxSizeInKb;

    @PostConstruct
    public void init() {
        avatarMaxSizeInKb = configCenter.asset().ofInteger("avatarMaxSizeInKb", 300);
    }

    @Override
    public Mono<User> create(User user) {
        return repository.save(user);
    }

    @Override
    public Mono<User> findById(String id) {
        if (id == null) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "INVALID_PARAMETER", FieldName.ID));
        }

        return repository.findById(id);
    }

    @Override
    public Mono<Map<String, User>> getByIds(Collection<String> ids) {
        Set<String> idSet = newHashSet(ids);
        return repository.findByIdIn(idSet)
                .collectList()
                .map(it -> it.stream()
                        .collect(Collectors.toMap(User::getId, Function.identity()))
                );
    }

    @Override
    public Mono<User> findBySourceAndId(String source, String sourceUuid) {
        return repository.findByConnections_SourceAndConnections_RawId(source, sourceUuid);
    }

    @Override
    public Mono<Boolean> saveProfilePhoto(Part filePart, User user) {
        String prevAvatar = ObjectUtils.defaultIfNull(user.getAvatar(), "");
        Mono<Asset> newAvatarMono = assetService.upload(filePart, avatarMaxSizeInKb.get(), true);
        return newAvatarMono
                .flatMap(newAvatar -> {
                    Mono<Boolean> updateUserAvatarMono = updateUserAvatar(newAvatar, user.getId());
                    if (StringUtils.isEmpty(prevAvatar)) {
                        return updateUserAvatarMono;
                    }

                    return assetService.remove(prevAvatar).then(updateUserAvatarMono);
                });
    }

    private Mono<Boolean> updateUserAvatar(Asset newAvatar, String userId) {
        User user = new User();
        user.setAvatar(newAvatar.getId());
        return mongoUpsertHelper.updateById(user, userId);
    }

    public Mono<User> update(String id, User updatedUser) {
        return mongoUpsertHelper.updateById(updatedUser, id)
                .flatMap(updated -> {
                    if (!updated) {
                        return ofError(BizError.NO_RESOURCE_FOUND, "NO_USER_FOUND", id);
                    }
                    return findById(id);
                });
    }

    @Override
    public Mono<User> findByAuthUser(AuthorizedUser authorizedUser) {
        return findBySourceAndId(authorizedUser.getSource(), authorizedUser.getUid());
    }

    @Override
    public Mono<User> createNewUserByAuthUser(AuthorizedUser authUser) {
        User newUser = new User();
        newUser.setName(authUser.getUsername());
        newUser.setState(UserState.ACTIVATED);
        newUser.setIsEnabled(true);
        newUser.setTpAvatarLink(authUser.getAvatar());
        Set<Connection> connections = newHashSet();
        Connection connection = authUser.toAuthConnection();
        connections.add(connection);
        newUser.setConnections(connections);
        newUser.setIsNewUser(true);
        return create(newUser);
    }

    @Override
    public Mono<Void> getUserAvatar(ServerWebExchange exchange, String userId) {
        return findById(userId)
                .flatMap(user -> assetService.makeImageResponse(exchange, user.getAvatar()));
    }

    @Override
    public Mono<Boolean> bindEmail(User user, String email) {
        Connection connection = Connection.builder()
                .source(AuthSourceConstants.EMAIL)
                .name(email)
                .rawId(email)
                .build();
        user.getConnections().add(connection);
        return repository.save(user)
                .then(Mono.just(true));
    }

    @Override
    public Mono<Boolean> addNewConnection(String userId, Connection connection) {
        return findById(userId)
                .doOnNext(user -> user.getConnections().add(connection))
                .flatMap(repository::save)
                .then(Mono.just(true));
    }

    @Override
    public Mono<Void> deleteProfilePhoto(User visitor) {
        String userAvatar = visitor.getAvatar();
        visitor.setAvatar(null);
        return repository.save(visitor).thenReturn(userAvatar)
                .flatMap(assetService::remove);
    }

    @Override
    public Mono<User> register(String loginId, String password, String source) {
        return findBySourceAndId(source, loginId)
                .flatMap(user -> ofError(BizError.USER_LOGIN_ID_EXIST, "USER_LOGIN_ID_EXIST"))
                .then(createNewUser(loginId, password, source));
    }

    private Mono<User> createNewUser(String loginId, String password, String source) {
        User newUser = new User();
        newUser.setName(loginId);
        newUser.setState(UserState.ACTIVATED);
        newUser.setIsEnabled(true);
        newUser.setPassword(encryptionService.encryptPassword(password));
        Connection connection = Connection.builder()
                .source(source)
                .name(loginId)
                .rawId(loginId)
                .build();
        newUser.setConnections(ImmutableSet.of(connection));
        newUser.setIsNewUser(true);
        return repository.save(newUser);
    }

    @Override
    public Mono<Boolean> updatePassword(String userId, String oldPassword, String newPassword) {
        return findById(userId)
                .<User> handle((user, sink) -> {
                    String password = user.getPassword();
                    if (StringUtils.isBlank(password)) {
                        sink.error(ofException(BizError.INVALID_PASSWORD, "INVALID_PASSWORD"));
                        return;
                    }
                    String originalEncryptPassword = user.getPassword();
                    if (!encryptionService.matchPassword(oldPassword, originalEncryptPassword)) {
                        sink.error(ofException(BizError.INVALID_PASSWORD, "INVALID_PASSWORD"));
                        return;
                    }
                    user.setPassword(encryptionService.encryptPassword(newPassword));
                    sink.next(user);
                })
                .flatMap(repository::save)
                .thenReturn(true);
    }

    @Override
    public Mono<Boolean> setPassword(String userId, String password) {
        return findById(userId)
                .map(user -> {
                    user.setPassword(encryptionService.encryptPassword(password));
                    return user;
                })
                .flatMap(repository::save)
                .thenReturn(true);
    }


    @Override
    public Mono<UserDetail> buildUserDetail(User user, boolean withoutDynamicGroups) {
        if (user.isAnonymous()) {
            return Mono.just(ANONYMOUS_CURRENT_USER);
        }
        return Mono.deferContextual(contextView -> {
            String ip = contextView.getOrDefault(CLIENT_IP, "");
            Locale locale = LocaleUtils.getLocale(contextView);
            return orgMemberService.getCurrentOrgMember(user.getId())
                    .zipWhen(orgMember -> buildUserDetailGroups(user.getId(), orgMember, withoutDynamicGroups, locale))
                    .map(tuple2 -> {
                        OrgMember orgMember = tuple2.getT1();
                        List<Map<String, String>> groups = tuple2.getT2();
                        return UserDetail.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .avatarUrl(user.getAvatarUrl())
                                .email(convertEmail(user.getConnections()))
                                .ip(ip)
                                .groups(groups)
                                .extra(getUserDetailExtra(user, orgMember.getOrgId()))
                                .build();
                    });
        });
    }

    /**
     * In enterprise mode, user can be deleted and then related connections should be released here by appending a timestamp after the source field.
     */
    @Override
    public Mono<Boolean> markUserDeletedAndInvalidConnectionsAtEnterpriseMode(String userId) {
        if (commonConfig.getWorkspace().getMode() == WorkspaceMode.SAAS) {
            return Mono.just(false);
        }
        return repository.findById(userId)
                .flatMap(user -> {
                    user.markAsDeleted();
                    return mongoUpsertHelper.updateById(user, userId);
                });
    }

    protected Map<String, Object> getUserDetailExtra(User user, String orgId) {
        return Optional.ofNullable(user.getOrgTransformedUserInfo())
                .map(orgTransformedUserInfo -> orgTransformedUserInfo.get(orgId))
                .map(TransformedUserInfo::extra)
                .orElse(convertConnections(user.getConnections()));
    }

    protected Mono<List<Map<String, String>>> buildUserDetailGroups(String userId, OrgMember orgMember, boolean withoutDynamicGroups,
            Locale locale) {
        String orgId = orgMember.getOrgId();
        Flux<Group> groups;
        if (orgMember.isAdmin()) {
            groups = groupService.getByOrgId(orgId).sort();
        } else {
            if (withoutDynamicGroups) {
                groups = groupMemberService.getNonDynamicUserGroupIdsInOrg(orgId, userId).flatMapMany(l -> groupService.getByIds(l));
            } else {
                groups = groupMemberService.getUserGroupIdsInOrg(orgId, userId).flatMapMany(l -> groupService.getByIds(l));
            }
        }
        return groups.filter(group -> !group.isAllUsersGroup())
                .map(group -> Map.of("groupId", Objects.toString(group.getId(), ""), "groupName", group.getName(locale)))
                .collectList();
    }

    protected Map<String, Object> convertConnections(Set<Connection> connections) {
        return connections.stream()
                .filter(connection -> !AuthSourceConstants.EMAIL.equals(connection.getSource()) &&
                        !AuthSourceConstants.PHONE.equals(connection.getSource()))
                .collect(Collectors.toMap(Connection::getSource, Connection::getRawUserInfo));
    }

    protected String convertEmail(Set<Connection> connections) {
        return connections.stream().filter(connection -> AuthSourceConstants.EMAIL.equals(connection.getSource()))
                .findFirst()
                .map(Connection::getName)
                .orElse("");
    }
}
