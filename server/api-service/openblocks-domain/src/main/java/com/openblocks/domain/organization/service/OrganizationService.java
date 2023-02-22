package com.openblocks.domain.organization.service;

import java.util.Collection;

import org.springframework.http.codec.multipart.Part;

import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.model.Organization.OrganizationCommonSettings;
import com.openblocks.domain.user.model.User;
import com.openblocks.infra.annotation.NonEmptyMono;
import com.openblocks.infra.annotation.PossibleEmptyMono;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface OrganizationService {

    @PossibleEmptyMono
    Mono<Organization> getOrganizationInEnterpriseMode();

    Mono<Organization> create(Organization organization, String creatorUserId);

    Mono<Organization> createDefault(User user);

    Mono<Organization> getById(String id);

    @NonEmptyMono
    Flux<Organization> getByIds(Collection<String> ids);

    Mono<OrganizationCommonSettings> getOrgCommonSettings(String orgId);

    Mono<Boolean> uploadLogo(String organizationId, Part filePart);

    Mono<Boolean> deleteLogo(String organizationId);

    Mono<Boolean> update(String orgId, Organization updateOrg);

    Mono<Boolean> delete(String orgId);

    Mono<Organization> getBySourceAndTpCompanyId(String source, String companyId);

    @PossibleEmptyMono
    Mono<Organization> getByDomain();

    Mono<Boolean> updateCommonSettings(String orgId, String key, Object value);
}
