package com.openblocks.api.usermanagement;

import org.springframework.http.codec.multipart.Part;

import com.openblocks.api.authentication.dto.OrganizationDomainCheckResult;
import com.openblocks.api.config.ConfigView;
import com.openblocks.api.usermanagement.view.OrgMemberListView;
import com.openblocks.api.usermanagement.view.OrgView;
import com.openblocks.api.usermanagement.view.UpdateOrgRequest;
import com.openblocks.api.usermanagement.view.UpdateRoleRequest;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.model.Organization.OrganizationCommonSettings;
import com.openblocks.infra.annotation.NonEmptyMono;

import reactor.core.publisher.Mono;

public interface OrgApiService {

    Mono<Boolean> leaveOrganization(String orgId);

    @NonEmptyMono
    Mono<OrgMemberListView> getOrganizationMembers(String orgId, int page, int count);

    Mono<Boolean> updateRoleForMember(String orgId, UpdateRoleRequest updateRoleRequest);

    Mono<Boolean> switchCurrentOrganizationTo(String orgId);

    Mono<Boolean> deleteLogo(String orgId);

    Mono<Boolean> uploadLogo(String orgId, Mono<Part> fileMono);

    Mono<Boolean> removeUserFromOrg(String orgId, String userId);

    Mono<Boolean> removeOrg(String orgId);

    Mono<OrgView> create(Organization organization);

    Mono<Boolean> update(String orgId, UpdateOrgRequest updateOrgRequest);

    Mono<OrganizationDomainCheckResult> checkOrganizationDomain();

    Mono<OrganizationCommonSettings> getOrgCommonSettings(String orgId);

    Mono<Boolean> updateOrgCommonSettings(String orgId, String key, Object value);

    Mono<Boolean> tryAddUserToOrgAndSwitchOrg(String orgId, String userId);

    Mono<ConfigView> getOrganizationConfigs();
}

