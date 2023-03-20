package com.openblocks.runner.migrations.job;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.auth.EmailAuthConfig;
import com.openblocks.sdk.auth.constants.AuthTypeConstants;

@Component
public class CompleteAuthTypeImpl implements CompleteAuthType {

    @Autowired
    private ReactiveMongoTemplate reactiveMongoTemplate;
    @Autowired
    private OrganizationService organizationService;

    @Override
    public void complete() {
        Criteria criteria = Criteria.where("organizationDomain").ne(null);
        reactiveMongoTemplate.find(new Query(criteria), Organization.class)
                .filter(organization -> CollectionUtils.isNotEmpty(organization.getAuthConfigs()))
                .doOnNext(organization -> organization.getAuthConfigs().forEach(this::completeAuthType))
                .flatMap(organization -> organizationService.update(organization.getId(), organization))
                .blockLast();
    }

    protected void completeAuthType(AbstractAuthConfig abstractAuthConfig) {
        if (abstractAuthConfig instanceof EmailAuthConfig emailAuthConfig) {
            emailAuthConfig.setAuthType(AuthTypeConstants.FORM);
        }
    }
}
