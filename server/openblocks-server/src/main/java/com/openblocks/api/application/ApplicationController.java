package com.openblocks.api.application;

import static com.openblocks.infra.event.EventType.APPLICATION_CREATE;
import static com.openblocks.infra.event.EventType.APPLICATION_DELETE;
import static com.openblocks.infra.event.EventType.APPLICATION_RECYCLED;
import static com.openblocks.infra.event.EventType.APPLICATION_RESTORE;
import static com.openblocks.infra.event.EventType.APPLICATION_UPDATE;
import static com.openblocks.infra.event.EventType.VIEW;
import static com.openblocks.sdk.exception.BizError.INVALID_PARAMETER;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static org.apache.commons.collections4.SetUtils.emptyIfNull;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;

import org.apache.commons.lang3.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.openblocks.api.application.view.ApplicationInfoView;
import com.openblocks.api.application.view.ApplicationPermissionView;
import com.openblocks.api.application.view.ApplicationView;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.home.UserHomeApiService;
import com.openblocks.api.home.UserHomepageView;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.model.ApplicationType;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.constant.Url;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping(value = {Url.APPLICATION_URL, NewUrl.APPLICATION_URL})
public class ApplicationController {

    @Autowired
    private UserHomeApiService userHomeApiService;

    @Autowired
    private ApplicationApiService applicationApiService;
    @Autowired
    private BusinessEventPublisher businessEventPublisher;

    @PostMapping
    public Mono<ResponseView<ApplicationView>> create(@RequestBody CreateApplicationRequest createApplicationRequest) {
        return applicationApiService.create(createApplicationRequest)
                .delayUntil(applicationView -> businessEventPublisher.publishApplicationCommonEvent(applicationView, APPLICATION_CREATE))
                .map(ResponseView::success);
    }

    @PostMapping("/createFromTemplate")
    public Mono<ResponseView<ApplicationView>> createFromTemplate(@RequestParam String templateId) {
        return applicationApiService.createFromTemplate(templateId)
                .delayUntil(applicationView -> businessEventPublisher.publishApplicationCommonEvent(applicationView, APPLICATION_CREATE))
                .map(ResponseView::success);
    }

    @PutMapping("/recycle/{applicationId}")
    public Mono<ResponseView<Boolean>> recycle(@PathVariable String applicationId) {
        return applicationApiService.recycle(applicationId)
                .delayUntil(__ -> businessEventPublisher.publishApplicationCommonEvent(applicationId, null, APPLICATION_RECYCLED))
                .map(ResponseView::success);
    }

    @PutMapping("/restore/{applicationId}")
    public Mono<ResponseView<Boolean>> restore(@PathVariable String applicationId) {
        return applicationApiService.restore(applicationId)
                .delayUntil(__ -> businessEventPublisher.publishApplicationCommonEvent(applicationId, null, APPLICATION_RESTORE))
                .map(ResponseView::success);
    }

    @GetMapping("/recycle/list")
    public Mono<ResponseView<List<ApplicationInfoView>>> getRecycledApplications() {
        return applicationApiService.getRecycledApplications()
                .collectList()
                .map(ResponseView::success);
    }

    @DeleteMapping("/{applicationId}")
    public Mono<ResponseView<ApplicationView>> delete(@PathVariable String applicationId) {
        return applicationApiService.delete(applicationId)
                .delayUntil(applicationView -> businessEventPublisher.publishApplicationCommonEvent(applicationView, APPLICATION_DELETE))
                .map(ResponseView::success);
    }

    @GetMapping("/{applicationId}")
    public Mono<ResponseView<ApplicationView>> getEditingApplication(@PathVariable String applicationId) {
        return applicationApiService.getEditingApplication(applicationId)
                .delayUntil(__ -> applicationApiService.updateUserApplicationLastViewTime(applicationId))
                .map(ResponseView::success);
    }

    @GetMapping("/{applicationId}/view")
    public Mono<ResponseView<ApplicationView>> getPublishedApplication(@PathVariable String applicationId) {
        return applicationApiService.getPublishedApplication(applicationId)
                .delayUntil(applicationView -> applicationApiService.updateUserApplicationLastViewTime(applicationId))
                .delayUntil(applicationView -> businessEventPublisher.publishApplicationCommonEvent(applicationView, VIEW))
                .map(ResponseView::success);
    }

    @PutMapping("/{applicationId}")
    public Mono<ResponseView<ApplicationView>> update(@PathVariable String applicationId,
            @RequestBody Application newApplication) {
        return applicationApiService.update(applicationId, newApplication)
                .delayUntil(applicationView -> businessEventPublisher.publishApplicationCommonEvent(applicationView, APPLICATION_UPDATE))
                .map(ResponseView::success);
    }

    @PostMapping("/{applicationId}/publish")
    public Mono<ResponseView<ApplicationView>> publish(@PathVariable String applicationId) {
        return applicationApiService.publish(applicationId)
                .map(ResponseView::success);
    }

    @GetMapping("/home")
    public Mono<ResponseView<UserHomepageView>> getUserHomePage(@RequestParam(required = false, defaultValue = "0") int applicationType) {
        ApplicationType type = ApplicationType.fromValue(applicationType);
        return userHomeApiService.getUserHomePageView(type)
                .map(ResponseView::success);
    }

    @GetMapping("/list")
    public Mono<ResponseView<List<ApplicationInfoView>>> getApplications(@RequestParam(required = false) Integer applicationType,
            @RequestParam(required = false) ApplicationStatus applicationStatus,
            @RequestParam(defaultValue = "true") boolean withContainerSize) {
        ApplicationType applicationTypeEnum = applicationType == null ? null : ApplicationType.fromValue(applicationType);
        return userHomeApiService.getAllAuthorisedApplications4CurrentOrgMember(applicationTypeEnum, applicationStatus, withContainerSize)
                .collectList()
                .map(ResponseView::success);
    }

    @PutMapping("/{applicationId}/permissions/{permissionId}")
    public Mono<ResponseView<Boolean>> updatePermission(@PathVariable String applicationId,
            @PathVariable String permissionId,
            @RequestBody UpdatePermissionRequest updatePermissionRequest) {
        ResourceRole role = ResourceRole.fromValue(updatePermissionRequest.role());
        if (role == null) {
            return ofError(INVALID_PARAMETER, "INVALID_PARAMETER", updatePermissionRequest);
        }

        return applicationApiService.updatePermission(applicationId, permissionId, role)
                .map(ResponseView::success);
    }

    @DeleteMapping("/{applicationId}/permissions/{permissionId}")
    public Mono<ResponseView<Boolean>> removePermission(
            @PathVariable String applicationId,
            @PathVariable String permissionId) {

        return applicationApiService.removePermission(applicationId, permissionId)
                .map(ResponseView::success);
    }

    @PutMapping("/{applicationId}/permissions")
    public Mono<ResponseView<Boolean>> grantPermission(
            @PathVariable String applicationId,
            @RequestBody BatchAddPermissionRequest request) {
        ResourceRole role = ResourceRole.fromValue(request.role());
        if (role == null) {
            return ofError(INVALID_PARAMETER, "INVALID_PARAMETER", request.role());
        }
        return applicationApiService.grantPermission(applicationId,
                        emptyIfNull(request.userIds()),
                        emptyIfNull(request.groupIds()),
                        role)
                .map(ResponseView::success);
    }


    @GetMapping("/{applicationId}/permissions")
    public Mono<ResponseView<ApplicationPermissionView>> getApplicationPermissions(@PathVariable String applicationId) {
        return applicationApiService.getApplicationPermissions(applicationId)
                .map(ResponseView::success);
    }

    @PutMapping("/{applicationId}/public-to-all")
    public Mono<ResponseView<Boolean>> setApplicationPublicToAll(@PathVariable String applicationId,
            @RequestBody ApplicationPublicToAllRequest request) {
        return applicationApiService.setApplicationPublicToAll(applicationId, request.publicToAll())
                .map(ResponseView::success);
    }

    private record BatchAddPermissionRequest(String role, Set<String> userIds, Set<String> groupIds) {
    }

    private record ApplicationPublicToAllRequest(Boolean publicToAll) {
        @Override
        public Boolean publicToAll() {
            return BooleanUtils.isTrue(publicToAll);
        }
    }

    private record UpdatePermissionRequest(String role) {
    }

    public record CreateApplicationRequest(@JsonProperty("orgId") String organizationId,
                                           String name,
                                           Integer applicationType,
                                           Map<String, Object> publishedApplicationDSL,
                                           Map<String, Object> editingApplicationDSL,
                                           @Nullable String folderId) {
    }
}
