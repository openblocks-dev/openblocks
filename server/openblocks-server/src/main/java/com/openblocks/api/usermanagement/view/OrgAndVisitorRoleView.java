package com.openblocks.api.usermanagement.view;

import com.openblocks.domain.organization.model.Organization;

public class OrgAndVisitorRoleView {

    private final Organization org;
    private final String role;

    public OrgAndVisitorRoleView(Organization org, String role) {
        this.org = org;
        this.role = role;
    }

    public Organization getOrg() {
        return org;
    }

    public String getRole() {
        return role;
    }
}