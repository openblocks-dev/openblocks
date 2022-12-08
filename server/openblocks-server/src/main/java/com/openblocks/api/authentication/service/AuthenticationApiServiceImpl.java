package com.openblocks.api.authentication.service;

import static com.openblocks.sdk.exception.BizError.AUTH_ERROR;
import static com.openblocks.sdk.exception.BizError.LOG_IN_SOURCE_NOT_SUPPORTED;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.api.authentication.config.EnvAuthConfig;
import com.openblocks.api.authentication.request.AuthRequestContext;
import com.openblocks.api.authentication.request.AuthRequestFactory;
import com.openblocks.api.authentication.request.form.FormAuthRequestContext;
import com.openblocks.api.usermanagement.OrgApiService;
import com.openblocks.domain.organization.model.EnterpriseConnectionConfig;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.domain.user.model.AuthorizedUser;
import com.openblocks.domain.user.model.User;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.exception.BizException;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
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
    private EnvAuthConfig envAuthConfig;

    @Override
    public Mono<AuthorizedUser> getFormAuthUser(String loginId, String password, String domain, String source) {
        return getAuthUser(source, new FormAuthRequestContext(loginId, password, source), domain);
    }

    protected Mono<AuthorizedUser> getAuthUser(String source, AuthRequestContext context, String domain) {
        return findAuthConfig(source, context, domain)
                .doOnNext(context::setAuthConfig)
                .then(authRequestFactory.build(context))
                .flatMap(authRequest -> authRequest.auth(context))
                .doOnNext(authorizedUser -> {
                    authorizedUser.setSource(source);
                    authorizedUser.setOrgId(context.getOrgId());
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
    public Mono<AbstractAuthConfig> findAuthConfig(String source, AuthRequestContext context, String domain) {
        return organizationService.getByDomain(domain)
                .flatMapIterable(organization -> {
                    context.setOrgId(organization.getId());
                    return organization.getOrganizationDomain().getAuthConfigs();
                })
                .switchIfEmpty(Flux.fromIterable(envAuthConfig.getAuthConfigs()))
                .filter(AbstractAuthConfig::enableAuth)
                .filter(customAuthConfig -> source.equalsIgnoreCase(customAuthConfig.getSource()))
                .next()
                .switchIfEmpty(ofError(LOG_IN_SOURCE_NOT_SUPPORTED, "LOG_IN_SOURCE_NOT_SUPPORTED"));
    }

    @Override
    public Mono<EnterpriseConnectionConfig> getEnterpriseConnectionConfigMono(String domain) {
        return organizationService.getByDomain(domain)
                .map(Organization::getOrganizationDomain)
                .cast(EnterpriseConnectionConfig.class)
                .defaultIfEmpty(envAuthConfig);
    }

    @Override
    public Mono<Void> onUserRegister(User user) {
        return organizationService.createDefault(user).then();
    }

    @Override
    public Mono<Void> onUserLogin(String orgId, User user, String source) {
        if (StringUtils.isEmpty(orgId)) {
            return Mono.empty();
        }
        return orgApiService.tryAddUserToOrgAndSwitchOrg(orgId, user.getId()).then();
    }

    protected record FindByAuthUser(boolean userExist, User user) {
    }

    protected record VisitorBindAuthConnectionResult(@Nullable String orgId, String visitorId) {
    }
}
