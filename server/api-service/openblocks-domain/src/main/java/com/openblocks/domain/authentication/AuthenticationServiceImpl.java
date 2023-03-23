package com.openblocks.domain.authentication;

import static com.openblocks.sdk.exception.BizError.LOG_IN_SOURCE_NOT_SUPPORTED;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.config.AuthProperties;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.constants.WorkspaceMode;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private CommonConfig commonConfig;
    @Autowired
    private AuthProperties authProperties;

    @Override
    public Mono<FindAuthConfig> findAuthConfigByAuthId(String authId) {
        return findAuthConfig(abstractAuthConfig -> Objects.equals(authId, abstractAuthConfig.getId()));
    }

    @Override
    @Deprecated
    public Mono<FindAuthConfig> findAuthConfigBySource(String source) {
        return findAuthConfig(abstractAuthConfig -> Objects.equals(source, abstractAuthConfig.getSource()));
    }

    private Mono<FindAuthConfig> findAuthConfig(Function<AbstractAuthConfig, Boolean> condition) {
        return findAllAuthConfigs(true)
                .filter(findAuthConfig -> condition.apply(findAuthConfig.authConfig()))
                .next()
                .switchIfEmpty(ofError(LOG_IN_SOURCE_NOT_SUPPORTED, "LOG_IN_SOURCE_NOT_SUPPORTED"));
    }

    @Override
    public Flux<FindAuthConfig> findAllAuthConfigs(boolean enableOnly) {
        return findAllAuthConfigsByDomain()
                .switchIfEmpty(findAllAuthConfigsForEnterpriseMode())
                .switchIfEmpty(findAllAuthConfigsForSaasMode())
                .filter(findAuthConfig -> {
                    if (enableOnly) {
                        return findAuthConfig.authConfig().isEnable();
                    }
                    return true;
                })
                .defaultIfEmpty(new FindAuthConfig(DEFAULT_AUTH_CONFIG, null));
    }

    private Flux<FindAuthConfig> findAllAuthConfigsByDomain() {
        return organizationService.getByDomain()
                .flatMapIterable(organization ->
                        organization.getAuthConfigs()
                                .stream()
                                .map(abstractAuthConfig -> new FindAuthConfig(abstractAuthConfig, organization))
                                .collect(Collectors.toList())
                );
    }

    protected Flux<FindAuthConfig> findAllAuthConfigsForEnterpriseMode() {
        if (commonConfig.getWorkspace().getMode() == WorkspaceMode.SAAS) {
            return Flux.empty();
        }
        return organizationService.getOrganizationInEnterpriseMode()
                .flatMapIterable(organization ->
                        organization.getAuthConfigs()
                                .stream()
                                .map(abstractAuthConfig -> new FindAuthConfig(abstractAuthConfig, organization))
                                .collect(Collectors.toList())
                );
    }

    private Flux<FindAuthConfig> findAllAuthConfigsForSaasMode() {
        if (commonConfig.getWorkspace().getMode() == WorkspaceMode.SAAS) {
            return Flux.fromIterable(authProperties.getAuthConfigs())
                    .map(abstractAuthConfig -> new FindAuthConfig(abstractAuthConfig, null));
        }
        return Flux.empty();
    }
}
