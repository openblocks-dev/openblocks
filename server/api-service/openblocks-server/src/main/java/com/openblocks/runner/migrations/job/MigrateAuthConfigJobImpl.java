package com.openblocks.runner.migrations.job;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.model.OrganizationDomain;
import com.openblocks.domain.organization.repository.OrganizationRepository;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.config.AuthProperties;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.constants.WorkspaceMode;
import com.openblocks.sdk.util.IDUtils;

@Component
public class MigrateAuthConfigJobImpl implements MigrateAuthConfigJob {

    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private CommonConfig commonConfig;
    @Autowired
    private AuthProperties authProperties;
    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public void migrateAuthConfig() {
        if (commonConfig.getWorkspace().getMode() == WorkspaceMode.SAAS) {
            organizationRepository.findByOrganizationDomainIsNotNull()
                    .doOnNext(organization -> organization.getAuthConfigs()
                            .forEach(abstractAuthConfig -> {
                                abstractAuthConfig.setId(IDUtils.generate());
                                abstractAuthConfig.setEnable(true);
                                abstractAuthConfig.setEnableRegister(true);
                            }))
                    .flatMap(organization -> organizationService.update(organization.getId(), organization))
                    .blockLast();
        } else {
            organizationService.getOrganizationInEnterpriseMode()
                    .doOnNext(organization -> setAuthConfigs2OrganizationDomain(organization, authProperties.getAuthConfigs()))
                    .flatMap(organization -> organizationService.update(organization.getId(), organization))
                    .block();
        }
    }

    protected void setAuthConfigs2OrganizationDomain(Organization organization, List<AbstractAuthConfig> authConfigs) {
        if (CollectionUtils.isEmpty(authConfigs)) {
            return;
        }
        OrganizationDomain domain = organization.getOrganizationDomain();
        if (domain == null) {
            domain = new OrganizationDomain();
            organization.setOrganizationDomain(domain);
        }
        authConfigs.forEach(abstractAuthConfig -> abstractAuthConfig.setId(IDUtils.generate()));
        domain.setConfigs(authConfigs);
    }
}
