package com.openblocks.api.application;


import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.openblocks.api.application.ApplicationController.CreateApplicationRequest;
import com.openblocks.api.application.view.ApplicationPermissionView;
import com.openblocks.api.application.view.ApplicationPermissionView.PermissionItemView;
import com.openblocks.api.application.view.ApplicationView;
import com.openblocks.api.common.mockuser.WithMockUser;
import com.openblocks.api.home.FolderApiService;
import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.model.ApplicationType;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.permission.model.ResourceHolder;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ApplicationApiServiceTest {

    @Autowired
    private ApplicationApiService applicationApiService;
    @Autowired
    private FolderApiService folderApiService;
    @Autowired
    private ApplicationService applicationService;

    @Test
    @WithMockUser
    public void testCreateSuccess() {

        Mono<ApplicationView> applicationViewMono = createApplication("app01", "folder01");
        StepVerifier.create(applicationViewMono)
                .assertNext(applicationView -> Assert.assertNotNull(applicationView.getApplicationInfoView().getApplicationId()))
                .verifyComplete();

        StepVerifier.create(applicationViewMono
                        .flatMap(applicationView -> applicationService.findById(applicationView.getApplicationInfoView().getApplicationId())))
                .assertNext(Assert::assertNotNull)
                .verifyComplete();
    }

    @Test
    @WithMockUser
    public void testAutoInheritFoldersPermissionsOnAppCreate() {
        Mono<ApplicationPermissionView> permissionViewMono =
                folderApiService.grantPermission("folder01", Set.of("user02"), Set.of("group01"), ResourceRole.EDITOR)
                        .then(createApplication("test", "folder01"))
                        .flatMap(applicationView -> applicationApiService.getApplicationPermissions(
                                applicationView.getApplicationInfoView().getApplicationId()));

        StepVerifier.create(permissionViewMono)
                .assertNext(applicationPermissionView -> {
                    Assert.assertTrue(applicationPermissionView.getPermissions().stream()
                            .anyMatch(permissionItemView ->
                                    equals(permissionItemView, PermissionItemView.builder()
                                            .type(ResourceHolder.GROUP)
                                            .id("group01")
                                            .role(ResourceRole.EDITOR.getValue())
                                            .build())
                            ));
                    Assert.assertTrue(applicationPermissionView.getPermissions().stream()
                            .anyMatch(permissionItemView ->
                                    equals(permissionItemView, PermissionItemView.builder()
                                            .type(ResourceHolder.USER)
                                            .id("user01")
                                            .role(ResourceRole.OWNER.getValue())
                                            .build())
                            ));
                    Assert.assertTrue(applicationPermissionView.getPermissions().stream()
                            .anyMatch(permissionItemView ->
                                    equals(permissionItemView, PermissionItemView.builder()
                                            .type(ResourceHolder.USER)
                                            .id("user02")
                                            .role(ResourceRole.EDITOR.getValue())
                                            .build())
                            ));
                })
                .verifyComplete();
    }

    private boolean equals(PermissionItemView p1, PermissionItemView p2) {
        return p1.getType() == p2.getType()
                && p1.getId().equals(p2.getId())
                && p1.getRole().equals(p2.getRole());
    }

    @Test
    @WithMockUser
    public void testRecycleAndDeleteApplicationSuccess() {

        Mono<Application> applicationMono = createApplication("app02", null)
                .map(applicationView -> applicationView.getApplicationInfoView().getApplicationId())
                .delayUntil(applicationId -> applicationApiService.recycle(applicationId))
                .delayUntil(applicationId -> applicationApiService.delete(applicationId))
                .flatMap(applicationId -> applicationService.findById(applicationId));
        StepVerifier.create(applicationMono)
                .assertNext(application -> Assert.assertSame(application.getApplicationStatus(), ApplicationStatus.DELETED))
                .verifyComplete();
    }

    @Test
    @WithMockUser
    public void testDeleteNormalApplicationWithError() {

        StepVerifier.create(applicationApiService.delete("app02"))
                .expectErrorMatches(throwable -> throwable instanceof BizException bizException
                        && bizException.getError() == BizError.UNSUPPORTED_OPERATION)
                .verify();
    }

    private Mono<ApplicationView> createApplication(String name, String folderId) {
        CreateApplicationRequest createApplicationRequest =
                new CreateApplicationRequest("org01", name, ApplicationType.APPLICATION.getValue(),
                        Map.of("comp", "table"), Map.of("comp", "list"), folderId);
        return applicationApiService.create(createApplicationRequest);
    }

    @Test
    @WithMockUser
    public void testPublishApplication() {
        Mono<String> applicationIdMono = createApplication("test", null)
                .map(applicationView -> applicationView.getApplicationInfoView().getApplicationId())
                .cache();

        // edit dsl before publish
        StepVerifier.create(applicationIdMono.flatMap(id -> applicationApiService.getEditingApplication(id)))
                .assertNext(applicationView -> Assert.assertEquals(Map.of("comp", "list"), applicationView.getApplicationDSL()))
                .verifyComplete();

        // published dsl before publish
        StepVerifier.create(applicationIdMono.flatMap(id -> applicationApiService.getPublishedApplication(id)))
                .assertNext(applicationView -> Assert.assertEquals(Map.of("comp", "table"), applicationView.getApplicationDSL()))
                .verifyComplete();

        // publish
        applicationIdMono = applicationIdMono
                .delayUntil(id -> applicationApiService.publish(id));

        // edit dsl after publish
        StepVerifier.create(applicationIdMono.flatMap(id -> applicationApiService.getEditingApplication(id)))
                .assertNext(applicationView -> Assert.assertEquals(Map.of("comp", "list"), applicationView.getApplicationDSL()))
                .verifyComplete();

        // published dsl after publish
        StepVerifier.create(applicationIdMono.flatMap(id -> applicationApiService.getPublishedApplication(id)))
                .assertNext(applicationView -> Assert.assertEquals(Map.of("comp", "list"), applicationView.getApplicationDSL()))
                .verifyComplete();
    }

    @Test
    @WithMockUser
    public void testPermissions() {
        // test grant permissions.
        Mono<ApplicationPermissionView> applicationPermissionViewMono =
                applicationApiService.grantPermission("app01", Set.of("user02"), Set.of("group01"), ResourceRole.EDITOR)
                        .then(applicationApiService.getApplicationPermissions("app01"));
        StepVerifier.create(applicationPermissionViewMono)
                .assertNext(applicationPermissionView -> {
                    List<PermissionItemView> permissions = applicationPermissionView.getPermissions();
                    Assert.assertEquals(2, permissions.size());
                    Assert.assertTrue(permissions.stream()
                            .anyMatch(permissionItemView -> {
                                PermissionItemView other = PermissionItemView.builder()
                                        .type(ResourceHolder.USER)
                                        .id("user02")
                                        .role(ResourceRole.EDITOR.getValue())
                                        .build();
                                return equals(permissionItemView, other);
                            }));
                    Assert.assertTrue(permissions.stream()
                            .anyMatch(permissionItemView -> {
                                PermissionItemView other = PermissionItemView.builder()
                                        .type(ResourceHolder.GROUP)
                                        .id("group01")
                                        .role(ResourceRole.EDITOR.getValue())
                                        .build();
                                return equals(permissionItemView, other);
                            }));
                })
                .verifyComplete();

        // test update permissions.
        applicationPermissionViewMono = applicationApiService.getApplicationPermissions("app01")
                .flatMap(applicationPermissionView -> {
                    List<PermissionItemView> permissionItemViews = applicationPermissionView.getPermissions()
                            .stream()
                            .filter(permissionItemView -> {
                                PermissionItemView other = PermissionItemView.builder()
                                        .type(ResourceHolder.USER)
                                        .id("user02")
                                        .role(ResourceRole.EDITOR.getValue())
                                        .build();
                                return equals(permissionItemView, other);
                            })
                            .toList();
                    Assert.assertEquals(1, permissionItemViews.size());
                    String permissionId = permissionItemViews.get(0).getPermissionId();
                    return applicationApiService.updatePermission("app01", permissionId, ResourceRole.VIEWER);
                })
                .then(applicationApiService.getApplicationPermissions("app01"));
        StepVerifier.create(applicationPermissionViewMono)
                .assertNext(applicationPermissionView -> {
                    List<PermissionItemView> permissions = applicationPermissionView.getPermissions();
                    Assert.assertEquals(2, permissions.size());
                    Assert.assertTrue(permissions.stream()
                            .anyMatch(permissionItemView -> {
                                PermissionItemView other = PermissionItemView.builder()
                                        .type(ResourceHolder.USER)
                                        .id("user02")
                                        .role(ResourceRole.VIEWER.getValue())// updated
                                        .build();
                                return equals(permissionItemView, other);
                            }));
                    Assert.assertTrue(permissions.stream()
                            .anyMatch(permissionItemView -> {
                                PermissionItemView other = PermissionItemView.builder()
                                        .type(ResourceHolder.GROUP)
                                        .id("group01")
                                        .role(ResourceRole.EDITOR.getValue())
                                        .build();
                                return equals(permissionItemView, other);
                            }));
                })
                .verifyComplete();

        // test remove permissions.
        applicationPermissionViewMono = applicationApiService.getApplicationPermissions("app01")
                .flatMap(applicationPermissionView -> {
                    List<PermissionItemView> permissionItemViews = applicationPermissionView.getPermissions()
                            .stream()
                            .filter(permissionItemView -> {
                                PermissionItemView other = PermissionItemView.builder()
                                        .type(ResourceHolder.USER)
                                        .id("user02")
                                        .role(ResourceRole.VIEWER.getValue())
                                        .build();
                                return equals(permissionItemView, other);
                            })
                            .toList();
                    Assert.assertEquals(1, permissionItemViews.size());
                    String permissionId = permissionItemViews.get(0).getPermissionId();
                    return applicationApiService.removePermission("app01", permissionId);
                })
                .then(applicationApiService.getApplicationPermissions("app01"));

        StepVerifier.create(applicationPermissionViewMono)
                .assertNext(applicationPermissionView -> {
                    List<PermissionItemView> permissions = applicationPermissionView.getPermissions();
                    Assert.assertEquals(1, permissions.size());
                    Assert.assertTrue(permissions.stream()
                            .anyMatch(permissionItemView -> {
                                PermissionItemView other = PermissionItemView.builder()
                                        .type(ResourceHolder.GROUP)
                                        .id("group01")
                                        .role(ResourceRole.EDITOR.getValue())
                                        .build();
                                return equals(permissionItemView, other);
                            }));
                })
                .verifyComplete();
    }
}