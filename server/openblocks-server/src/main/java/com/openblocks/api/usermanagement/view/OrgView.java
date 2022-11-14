package com.openblocks.api.usermanagement.view;

import javax.annotation.Nonnull;

import com.openblocks.domain.organization.model.Organization;

public class OrgView {

    private final Organization organization;

    public OrgView(@Nonnull Organization organization) {
        this.organization = organization;
    }

    public String getOrgId() {
        return organization.getId();
    }

    public String getOrgName() {
        return organization.getName();
    }


}
