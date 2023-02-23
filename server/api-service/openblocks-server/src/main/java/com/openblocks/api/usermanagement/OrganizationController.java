package com.openblocks.api.usermanagement;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.multipart.Part;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.authentication.dto.OrganizationDomainCheckResult;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.usermanagement.view.OrgMemberListView;
import com.openblocks.api.usermanagement.view.OrgView;
import com.openblocks.api.usermanagement.view.UpdateOrgRequest;
import com.openblocks.api.usermanagement.view.UpdateRoleRequest;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.model.Organization.OrganizationCommonSettings;
import com.openblocks.domain.plugin.DatasourceMetaInfo;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.constant.Url;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = {Url.ORGANIZATION_URL, NewUrl.ORGANIZATION_URL})
public class OrganizationController {

    @Autowired
    private OrgApiService orgApiService;
    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;
    @Autowired
    private BusinessEventPublisher businessEventPublisher;

    @PostMapping
    public Mono<ResponseView<OrgView>> create(@Valid @RequestBody Organization organization) {
        return orgApiService.create(organization)
                .map(ResponseView::success);
    }

    @PutMapping("{orgId}/update")
    public Mono<ResponseView<Boolean>> update(@PathVariable String orgId,
            @Valid @RequestBody UpdateOrgRequest updateOrgRequest) {
        return orgApiService.update(orgId, updateOrgRequest)
                .map(ResponseView::success);
    }

    @PostMapping("/{orgId}/logo")
    public Mono<ResponseView<Boolean>> uploadLogo(@PathVariable String orgId,
            @RequestPart("file") Mono<Part> fileMono) {
        return orgApiService.uploadLogo(orgId, fileMono)
                .map(ResponseView::success);
    }

    @DeleteMapping("/{orgId}/logo")
    public Mono<ResponseView<Boolean>> deleteLogo(@PathVariable String orgId) {
        return orgApiService.deleteLogo(orgId)
                .map(ResponseView::success);
    }

    @GetMapping("/{orgId}/members")
    public Mono<ResponseView<OrgMemberListView>> getOrgMembers(@PathVariable String orgId,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "count", required = false, defaultValue = "1000") int count) {
        return orgApiService.getOrganizationMembers(orgId, page, count)
                .map(ResponseView::success);
    }

    @PutMapping("/{orgId}/role")
    public Mono<ResponseView<Boolean>> updateRoleForMember(@RequestBody UpdateRoleRequest updateRoleRequest,
            @PathVariable String orgId) {
        return orgApiService.updateRoleForMember(orgId, updateRoleRequest)
                .map(ResponseView::success);
    }

    @PutMapping("/switchOrganization/{orgId}")
    public Mono<ResponseView<?>> setCurrentOrganization(@PathVariable String orgId, ServerWebExchange serverWebExchange) {
        return businessEventPublisher.publishUserLogoutEvent()
                .then(orgApiService.switchCurrentOrganizationTo(orgId))
                .delayUntil(result -> businessEventPublisher.publishUserLoginEvent(null))
                .flatMap(result -> orgApiService.checkOrganizationDomain()
                        .flatMap(OrganizationDomainCheckResult::buildOrganizationDomainCheckView)
                        .defaultIfEmpty(ResponseView.success(result)));
    }

    @DeleteMapping("/{orgId}")
    public Mono<ResponseView<Boolean>> removeOrg(@PathVariable String orgId) {
        return orgApiService.removeOrg(orgId)
                .map(ResponseView::success);
    }

    @DeleteMapping("/{orgId}/leave")
    public Mono<ResponseView<Boolean>> leaveOrganization(@PathVariable String orgId) {
        return orgApiService.leaveOrganization(orgId)
                .map(ResponseView::success);
    }

    @DeleteMapping("/{orgId}/remove")
    public Mono<ResponseView<Boolean>> removeUserFromOrg(@PathVariable String orgId,
            @RequestParam String userId) {
        return orgApiService.removeUserFromOrg(orgId, userId)
                .map(ResponseView::success);
    }

    @GetMapping("/{orgId}/datasourceTypes")
    public Mono<ResponseView<List<DatasourceMetaInfo>>> getSupportedDatasourceTypes(@PathVariable String orgId) {
        return datasourceMetaInfoService.getAllSupportedDatasourceMetaInfos()
                .collectList()
                .map(ResponseView::success);
    }

    @GetMapping("/{orgId}/common-settings")
    public Mono<ResponseView<OrganizationCommonSettings>> getOrgCommonSettings(@PathVariable String orgId) {
        return orgApiService.getOrgCommonSettings(orgId)
                .map(ResponseView::success);
    }

    @PutMapping("/{orgId}/common-settings")
    public Mono<ResponseView<Boolean>> updateOrgCommonSettings(@PathVariable String orgId, @RequestBody UpdateOrgCommonSettingsRequest request) {
        return orgApiService.updateOrgCommonSettings(orgId, request.key(), request.value())
                .map(ResponseView::success);
    }

    private record UpdateOrgCommonSettingsRequest(String key, Object value) {

    }

}