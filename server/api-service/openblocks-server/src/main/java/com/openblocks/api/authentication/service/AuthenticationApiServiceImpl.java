package com.openblocks.api.authentication.service;

import static com.openblocks.sdk.exception.BizError.AUTH_ERROR;
import static com.openblocks.sdk.exception.BizError.DISABLE_AUTH_CONFIG_FORBIDDEN;
import static com.openblocks.sdk.exception.BizError.USER_NOT_EXIST;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.Nullable;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.authentication.dto.AuthConfigRequest;
import com.openblocks.api.authentication.request.AuthRequestFactory;
import com.openblocks.api.authentication.request.oauth2.OAuth2RequestContext;
import com.openblocks.api.authentication.service.factory.AuthConfigFactory;
import com.openblocks.api.authentication.util.AuthenticationUtils;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.usermanagement.InvitationApiService;
import com.openblocks.api.usermanagement.OrgApiService;
import com.openblocks.api.usermanagement.UserApiService;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.authentication.AuthenticationService;
import com.openblocks.domain.authentication.FindAuthConfig;
import com.openblocks.domain.authentication.context.AuthRequestContext;
import com.openblocks.domain.authentication.context.FormAuthRequestContext;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.model.OrganizationDomain;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.domain.user.model.AuthUser;
import com.openblocks.domain.user.model.Connection;
import com.openblocks.domain.user.model.ConnectionAuthToken;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.util.CookieHelper;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class AuthenticationApiServiceImpl implements AuthenticationApiService {

    @Autowired
    private OrgApiService orgApiService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private AuthRequestFactory<AuthRequestContext> authRequestFactory;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;
    @Autowired
    private InvitationApiService invitationApiService;
    @Autowired
    private BusinessEventPublisher businessEventPublisher;
    @Autowired
    private SessionUserService sessionUserService;
    @Autowired
    private CookieHelper cookieHelper;
    @Autowired
    private AuthConfigFactory authConfigFactory;
    @Autowired
    private UserApiService userApiService;
    @Autowired
    private OrgMemberService orgMemberService;

    @Override
    public Mono<AuthUser> authenticateByForm(String loginId, String password, String source, boolean register, String authId) {
        return authenticate(authId, source, new FormAuthRequestContext(loginId, password, register));
    }

    @Override
    public Mono<AuthUser> authenticateByOauth2(String authId, String source, String code, String redirectUrl) {
        return authenticate(authId, source, new OAuth2RequestContext(code, redirectUrl));
    }

    protected Mono<AuthUser> authenticate(String authId, @Deprecated String source, AuthRequestContext context) {
        return Mono.defer(() -> {
                    if (StringUtils.isNotBlank(authId)) {
                        return authenticationService.findAuthConfigByAuthId(authId);
                    }
                    log.warn("source is deprecated and will be removed in the future, please use authId instead. {}", source);
                    return authenticationService.findAuthConfigBySource(source);
                })
                .doOnNext(findAuthConfig -> {
                    context.setAuthConfig(findAuthConfig.authConfig());
                    context.setOrgId(Optional.ofNullable(findAuthConfig.organization()).map(Organization::getId).orElse(null));
                })
                .then(authRequestFactory.build(context))
                .flatMap(authRequest -> authRequest.auth(context))
                .doOnNext(authorizedUser -> {
                    authorizedUser.setOrgId(context.getOrgId());
                    authorizedUser.setAuthContext(context);
                })
                .onErrorResume(throwable -> {
                    if (throwable instanceof BizException) {
                        return Mono.error(throwable);
                    }
                    log.error("user auth error.", throwable);
                    return ofError(AUTH_ERROR, "AUTH_ERROR");
                });
    }

    @Override
    public Mono<Void> loginOrRegister(AuthUser authUser, ServerWebExchange exchange,
            String invitationId) {
        return updateOrCreateUser(authUser)
                .delayUntil(user -> ReactiveSecurityContextHolder.getContext()
                        .doOnNext(securityContext -> securityContext.setAuthentication(AuthenticationUtils.toAuthentication(user))))
                // save token and set cookie
                .delayUntil(user -> {
                    String token = CookieHelper.generateCookieToken();
                    return sessionUserService.saveUserSession(token, user, authUser.getSource())
                            .then(Mono.fromRunnable(() -> cookieHelper.saveCookie(token, exchange)));
                })
                // after register
                .delayUntil(user -> {
                    if (user.getIsNewUser()) {
                        return onUserRegister(user);
                    }
                    return Mono.empty();
                })
                // after login
                .delayUntil(user -> onUserLogin(authUser.getOrgId(), user, authUser.getSource()))
                // process invite
                .delayUntil(__ -> {
                    if (StringUtils.isBlank(invitationId)) {
                        return Mono.empty();
                    }
                    return invitationApiService.inviteUser(invitationId);
                })
                // publish event
                .then(businessEventPublisher.publishUserLoginEvent(authUser.getSource()));
    }

    private Mono<User> updateOrCreateUser(AuthUser authUser) {
        return findByAuthUser(authUser)
                .flatMap(findByAuthUser -> {
                    if (findByAuthUser.userExist()) {
                        User user = findByAuthUser.user();
                        updateConnection(authUser, user);
                        return userService.update(user.getId(), user);
                    }

                    if (authUser.getAuthContext().getAuthConfig().isEnableRegister()) {
                        return userService.createNewUserByAuthUser(authUser);
                    }
                    return Mono.error(new BizException(USER_NOT_EXIST, "USER_NOT_EXIST"));
                });
    }

    protected Mono<FindByAuthUser> findByAuthUser(AuthUser authUser) {
        return userService.findByAuthUser(authUser)
                .map(user -> new FindByAuthUser(true, user))
                .defaultIfEmpty(new FindByAuthUser(false, null));
    }

    /**
     * Update the connection after re-authenticating
     */
    private void updateConnection(AuthUser authUser, User user) {

        String orgId = authUser.getOrgId();
        Connection oldConnection = getAuthConnection(authUser, user);
        if (StringUtils.isNotBlank(orgId) && !oldConnection.containOrg(orgId)) {  // already exist in user auth connection
            oldConnection.addOrg(orgId);
        }
        // clean old data
        oldConnection.setAuthId(authUser.getAuthContext().getAuthConfig().getId());

        // Save the auth token which may be used in the future datasource or query.
        oldConnection.setAuthConnectionAuthToken(
                Optional.ofNullable(authUser.getAuthToken()).map(ConnectionAuthToken::of).orElse(null));
        oldConnection.setRawUserInfo(authUser.getRawUserInfo());
    }

    @SuppressWarnings("OptionalGetWithoutIsPresent")
    protected Connection getAuthConnection(AuthUser authUser, User user) {
        return user.getConnections()
                .stream()
                .filter(connection -> authUser.getSource().equals(connection.getSource())
                        && connection.getRawId().equals(authUser.getUid()))
                .findFirst()
                .get();
    }

    protected Mono<Void> onUserRegister(User user) {
        return organizationService.createDefault(user).then();
    }

    protected Mono<Void> onUserLogin(String orgId, User user, String source) {
        if (StringUtils.isEmpty(orgId)) {
            return Mono.empty();
        }
        return orgApiService.tryAddUserToOrgAndSwitchOrg(orgId, user.getId()).then();
    }

    @Override
    public Mono<Boolean> enableAuthConfig(AuthConfigRequest authConfigRequest) {
        return checkIfAdmin()
                .then(sessionUserService.getVisitorOrgMemberCache())
                .flatMap(orgMember -> organizationService.getById(orgMember.getOrgId()))
                .doOnNext(organization -> addOrUpdateNewAuthConfig(organization, authConfigFactory.build(authConfigRequest, true)))
                .flatMap(organization -> organizationService.update(organization.getId(), organization));
    }

    @Override
    public Mono<Boolean> disableAuthConfig(String authId) {
        return checkIfAdmin()
                .then(checkIfOnlyEffectiveCurrentUserConnections(authId))
                .then(sessionUserService.getVisitorOrgMemberCache())
                .flatMap(orgMember -> organizationService.getById(orgMember.getOrgId()))
                .doOnNext(organization -> disableAuthConfig(organization, authId))
                .flatMap(organization -> organizationService.update(organization.getId(), organization))
                .delayUntil(result -> {
                    if (result) {
                        return removeTokensByAuthId(authId);
                    }
                    return Mono.empty();
                });
    }

    private Mono<Void> removeTokensByAuthId(String authId) {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMapMany(orgMember -> orgMemberService.getOrganizationMembers(orgMember.getOrgId()))
                .map(OrgMember::getUserId)
                .flatMap(userId -> userApiService.getTokensByAuthId(userId, authId))
                .delayUntil(token -> sessionUserService.removeUserSession(token))
                .then();
    }

    private Mono<Void> checkIfAdmin() {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMap(orgMember -> {
                    if (orgMember.isAdmin()) {
                        return Mono.empty();
                    }
                    return deferredError(BizError.NOT_AUTHORIZED, "NOT_AUTHORIZED");
                });
    }

    /**
     * Check if the auth config identified by the source means the only effective connection for the current user whom should be an administrator.
     * If true, throw an exception to avoid disabling the last effective connection way.
     */
    private Mono<Void> checkIfOnlyEffectiveCurrentUserConnections(String authId) {
        Mono<List<String>> userConnectionAuthConfigIdListMono = sessionUserService.getVisitor()
                .flatMapIterable(User::getConnections)
                .filter(connection -> StringUtils.isNotBlank(connection.getAuthId()))
                .map(Connection::getAuthId)
                .collectList();
        Mono<List<String>> orgAuthIdListMono = authenticationService.findAllAuthConfigs(true)
                .map(FindAuthConfig::authConfig)
                .map(AbstractAuthConfig::getId)
                .collectList();
        return Mono.zip(userConnectionAuthConfigIdListMono, orgAuthIdListMono)
                .delayUntil(tuple -> {
                    List<String> userConnectionAuthConfigIds = tuple.getT1();
                    List<String> orgAuthConfigIds = tuple.getT2();
                    userConnectionAuthConfigIds.retainAll(orgAuthConfigIds);
                    userConnectionAuthConfigIds.remove(authId);
                    if (CollectionUtils.isEmpty(userConnectionAuthConfigIds)) {
                        return Mono.error(new BizException(DISABLE_AUTH_CONFIG_FORBIDDEN, "DISABLE_AUTH_CONFIG_FORBIDDEN"));
                    }
                    return Mono.empty();
                })
                .then();
    }

    private void disableAuthConfig(Organization organization, String authId) {
        Optional.of(organization)
                .map(Organization::getAuthConfigs)
                .orElse(Collections.emptyList())
                .stream()
                .filter(abstractAuthConfig -> Objects.equals(abstractAuthConfig.getId(), authId))
                .forEach(abstractAuthConfig -> abstractAuthConfig.setEnable(false));
    }

    /**
     * If the source of the newAuthConfig exists in the auth configs of the organization, update it. Otherwise, add it.
     */
    private void addOrUpdateNewAuthConfig(Organization organization, AbstractAuthConfig newAuthConfig) {
        OrganizationDomain organizationDomain = organization.getOrganizationDomain();
        if (organizationDomain == null) {
            organizationDomain = new OrganizationDomain();
            organization.setOrganizationDomain(organizationDomain);
        }

        Map<String, AbstractAuthConfig> authConfigMap = organizationDomain.getConfigs()
                .stream()
                .collect(Collectors.toMap(AbstractAuthConfig::getId, Function.identity()));
        // Under the organization, the source can uniquely identify the whole auth config.
        AbstractAuthConfig old = authConfigMap.get(newAuthConfig.getId());
        if (old != null) {
            newAuthConfig.merge(old);
        }
        authConfigMap.put(newAuthConfig.getId(), newAuthConfig);
        organizationDomain.setConfigs(new ArrayList<>(authConfigMap.values()));
    }

    // static inner class

    protected record FindByAuthUser(boolean userExist, User user) {
    }

    protected record VisitorBindAuthConnectionResult(@Nullable String orgId, String visitorId) {
    }
}
