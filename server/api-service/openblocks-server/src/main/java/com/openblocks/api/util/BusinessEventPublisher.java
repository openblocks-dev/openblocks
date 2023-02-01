package com.openblocks.api.util;

import static com.openblocks.domain.permission.model.ResourceHolder.USER;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import com.openblocks.api.application.view.ApplicationInfoView;
import com.openblocks.api.application.view.ApplicationView;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.usermanagement.view.AddMemberRequest;
import com.openblocks.api.usermanagement.view.UpdateRoleRequest;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.folder.model.Folder;
import com.openblocks.domain.folder.service.FolderService;
import com.openblocks.domain.group.model.Group;
import com.openblocks.domain.group.model.GroupMember;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.permission.model.ResourceHolder;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.query.model.LibraryQuery;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.infra.event.ApplicationCommonEvent;
import com.openblocks.infra.event.EventType;
import com.openblocks.infra.event.FolderCommonEvent;
import com.openblocks.infra.event.LibraryQueryEvent;
import com.openblocks.infra.event.QueryExecutionEvent;
import com.openblocks.infra.event.datasource.DatasourceEvent;
import com.openblocks.infra.event.datasource.DatasourcePermissionEvent;
import com.openblocks.infra.event.group.GroupCreateEvent;
import com.openblocks.infra.event.group.GroupDeleteEvent;
import com.openblocks.infra.event.group.GroupUpdateEvent;
import com.openblocks.infra.event.groupmember.GroupMemberAddEvent;
import com.openblocks.infra.event.groupmember.GroupMemberLeaveEvent;
import com.openblocks.infra.event.groupmember.GroupMemberRemoveEvent;
import com.openblocks.infra.event.groupmember.GroupMemberRoleUpdateEvent;
import com.openblocks.infra.event.user.UserLoginEvent;
import com.openblocks.infra.event.user.UserLogoutEvent;
import com.openblocks.sdk.util.LocaleUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class BusinessEventPublisher {

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;
    @Autowired
    private SessionUserService sessionUserService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private UserService userService;
    @Autowired
    private FolderService folderService;
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private DatasourceService datasourceService;
    @Autowired
    private ResourcePermissionService resourcePermissionService;

    public Mono<Void> publishFolderCommonEvent(String folderId, String folderName, EventType eventType) {
        return sessionUserService.getVisitorOrgMemberCache()
                .doOnNext(orgMember -> {
                    FolderCommonEvent event = FolderCommonEvent.builder()
                            .id(folderId)
                            .name(folderName)
                            .userId(orgMember.getUserId())
                            .orgId(orgMember.getOrgId())
                            .type(eventType)
                            .build();
                    applicationEventPublisher.publishEvent(event);
                })
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishFolderCommonEvent error.{}, {}, {}", folderId, folderName, eventType, throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishApplicationCommonEvent(String applicationId, @Nullable String folderId, EventType eventType) {
        return applicationService.findByIdWithoutDsl(applicationId)
                .map(application -> {
                    ApplicationInfoView applicationInfoView = ApplicationInfoView.builder()
                            .applicationId(applicationId)
                            .name(application.getName())
                            .folderId(folderId)
                            .build();
                    return ApplicationView.builder()
                            .applicationInfoView(applicationInfoView)
                            .build();
                })
                .flatMap(applicationView -> publishApplicationCommonEvent(applicationView, eventType));
    }

    public Mono<Void> publishApplicationCommonEvent(ApplicationView applicationView, EventType eventType) {
        return sessionUserService.isAnonymousUser()
                .flatMap(anonymous -> {
                    if (anonymous) {
                        return Mono.empty();
                    }
                    return sessionUserService.getVisitorOrgMemberCache()
                            .zipWith(Mono.defer(() -> {
                                String folderId = applicationView.getApplicationInfoView().getFolderId();
                                if (StringUtils.isBlank(folderId)) {
                                    return Mono.just(Optional.<Folder> empty());
                                }
                                return folderService.findById(folderId)
                                        .map(Optional::of)
                                        .onErrorReturn(Optional.empty());
                            }))
                            .doOnNext(tuple -> {
                                OrgMember orgMember = tuple.getT1();
                                Optional<Folder> optional = tuple.getT2();
                                ApplicationInfoView applicationInfoView = applicationView.getApplicationInfoView();
                                ApplicationCommonEvent event = ApplicationCommonEvent.builder()
                                        .orgId(orgMember.getOrgId())
                                        .userId(orgMember.getUserId())
                                        .applicationId(applicationInfoView.getApplicationId())
                                        .applicationName(applicationInfoView.getName())
                                        .type(eventType)
                                        .folderId(optional.map(Folder::getId).orElse(null))
                                        .folderName(optional.map(Folder::getName).orElse(null))
                                        .build();
                                applicationEventPublisher.publishEvent(event);
                            })
                            .then()
                            .onErrorResume(throwable -> {
                                log.error("publishApplicationCommonEvent error. {}, {}", applicationView, eventType, throwable);
                                return Mono.empty();
                            });
                });
    }

    public Mono<Void> publishUserLoginEvent(String source) {
        return sessionUserService.getVisitorOrgMember()
                .doOnNext(orgMember -> {
                    UserLoginEvent event = UserLoginEvent.builder()
                            .orgId(orgMember.getOrgId())
                            .userId(orgMember.getUserId())
                            .source(source)
                            .build();
                    applicationEventPublisher.publishEvent(event);
                })
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishUserLoginEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishUserLogoutEvent() {
        return sessionUserService.getVisitorOrgMemberCache()
                .doOnNext(orgMember -> {
                    UserLogoutEvent event = UserLogoutEvent.builder()
                            .orgId(orgMember.getOrgId())
                            .userId(orgMember.getUserId())
                            .build();
                    applicationEventPublisher.publishEvent(event);
                })
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishUserLogoutEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishGroupCreateEvent(Group group) {
        return sessionUserService.getVisitorOrgMemberCache()
                .delayUntil(orgMember ->
                        Mono.deferContextual(contextView -> {
                            Locale locale = LocaleUtils.getLocale(contextView);
                            GroupCreateEvent event = GroupCreateEvent.builder()
                                    .orgId(orgMember.getOrgId())
                                    .userId(orgMember.getUserId())
                                    .groupId(group.getId())
                                    .groupName(group.getName(locale))
                                    .build();
                            applicationEventPublisher.publishEvent(event);
                            return Mono.empty();
                        }))
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishGroupCreateEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishGroupUpdateEvent(boolean publish, Group previousGroup, String newGroupName) {
        if (!publish) {
            return Mono.empty();
        }
        return sessionUserService.getVisitorOrgMemberCache()
                .delayUntil(orgMember ->
                        Mono.deferContextual(contextView -> {
                            Locale locale = LocaleUtils.getLocale(contextView);
                            GroupUpdateEvent event = GroupUpdateEvent.builder()
                                    .orgId(orgMember.getOrgId())
                                    .userId(orgMember.getUserId())
                                    .groupId(previousGroup.getId())
                                    .groupName(previousGroup.getName(locale) + " => " + newGroupName)
                                    .build();
                            applicationEventPublisher.publishEvent(event);
                            return Mono.empty();
                        }))
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishGroupUpdateEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishGroupDeleteEvent(boolean publish, Group previousGroup) {
        if (!publish) {
            return Mono.empty();
        }
        return sessionUserService.getVisitorOrgMemberCache()
                .delayUntil(orgMember ->
                        Mono.deferContextual(contextView -> {
                            Locale locale = LocaleUtils.getLocale(contextView);
                            GroupDeleteEvent event = GroupDeleteEvent.builder()
                                    .orgId(orgMember.getOrgId())
                                    .userId(orgMember.getUserId())
                                    .groupId(previousGroup.getId())
                                    .groupName(previousGroup.getName(locale))
                                    .build();
                            applicationEventPublisher.publishEvent(event);
                            return Mono.empty();
                        }))
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishGroupDeleteEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishGroupMemberAddEvent(boolean publish, String groupId, AddMemberRequest addMemberRequest) {
        if (!publish) {
            return Mono.empty();
        }
        return Mono.zip(groupService.getById(groupId),
                        sessionUserService.getVisitorOrgMemberCache(),
                        userService.findById(addMemberRequest.getUserId()))
                .delayUntil(tuple ->
                        Mono.deferContextual(contextView -> {
                            Locale locale = LocaleUtils.getLocale(contextView);
                            Group group = tuple.getT1();
                            OrgMember orgMember = tuple.getT2();
                            User member = tuple.getT3();
                            GroupMemberAddEvent event = GroupMemberAddEvent.builder()
                                    .orgId(orgMember.getOrgId())
                                    .userId(orgMember.getUserId())
                                    .groupId(groupId)
                                    .groupName(group.getName(locale))
                                    .memberId(member.getId())
                                    .memberName(member.getName())
                                    .memberRole(addMemberRequest.getRole())
                                    .build();
                            applicationEventPublisher.publishEvent(event);
                            return Mono.empty();
                        }))
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishGroupMemberAddEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishGroupMemberRoleUpdateEvent(boolean publish, String groupId, GroupMember previousGroupMember,
            UpdateRoleRequest updateRoleRequest) {
        if (!publish) {
            return Mono.empty();
        }
        return Mono.zip(groupService.getById(groupId),
                        sessionUserService.getVisitorOrgMemberCache(),
                        userService.findById(previousGroupMember.getUserId()))
                .delayUntil(tuple ->
                        Mono.deferContextual(contextView -> {
                            Locale locale = LocaleUtils.getLocale(contextView);
                            Group group = tuple.getT1();
                            OrgMember orgMember = tuple.getT2();
                            User member = tuple.getT3();
                            GroupMemberRoleUpdateEvent event = GroupMemberRoleUpdateEvent.builder()
                                    .orgId(orgMember.getOrgId())
                                    .userId(orgMember.getUserId())
                                    .groupId(groupId)
                                    .groupName(group.getName(locale))
                                    .memberId(member.getId())
                                    .memberName(member.getName())
                                    .memberRole(previousGroupMember.getRole().getValue() + " => " + updateRoleRequest.getRole())
                                    .build();
                            applicationEventPublisher.publishEvent(event);
                            return Mono.empty();
                        }))
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishGroupMemberRoleUpdateEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishGroupMemberLeaveEvent(boolean publish, GroupMember groupMember) {
        if (!publish) {
            return Mono.empty();
        }
        return Mono.zip(groupService.getById(groupMember.getGroupId()),
                        userService.findById(groupMember.getUserId()),
                        sessionUserService.getVisitorOrgMemberCache())
                .delayUntil(tuple ->
                        Mono.deferContextual(contextView -> {
                            Locale locale = LocaleUtils.getLocale(contextView);
                            Group group = tuple.getT1();
                            User user = tuple.getT2();
                            OrgMember orgMember = tuple.getT3();
                            GroupMemberLeaveEvent event = GroupMemberLeaveEvent.builder()
                                    .orgId(orgMember.getOrgId())
                                    .userId(orgMember.getUserId())
                                    .groupId(group.getId())
                                    .groupName(group.getName(locale))
                                    .memberId(user.getId())
                                    .memberName(user.getName())
                                    .memberRole(groupMember.getRole().getValue())
                                    .build();
                            applicationEventPublisher.publishEvent(event);
                            return Mono.empty();
                        }))
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishGroupMemberLeaveEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishGroupMemberRemoveEvent(boolean publish, GroupMember previousGroupMember) {
        if (!publish) {
            return Mono.empty();
        }
        return Mono.zip(sessionUserService.getVisitorOrgMemberCache(),
                        groupService.getById(previousGroupMember.getGroupId()),
                        userService.findById(previousGroupMember.getUserId()))
                .delayUntil(tuple ->
                        Mono.deferContextual(contextView -> {
                            Locale locale = LocaleUtils.getLocale(contextView);
                            OrgMember orgMember = tuple.getT1();
                            Group group = tuple.getT2();
                            User member = tuple.getT3();
                            GroupMemberRemoveEvent event = GroupMemberRemoveEvent.builder()
                                    .orgId(orgMember.getOrgId())
                                    .userId(orgMember.getUserId())
                                    .groupId(group.getId())
                                    .groupName(group.getName(locale))
                                    .memberId(member.getId())
                                    .memberName(member.getName())
                                    .memberRole(previousGroupMember.getRole().getValue())
                                    .build();
                            applicationEventPublisher.publishEvent(event);
                            return Mono.empty();
                        }))
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishGroupMemberRemoveEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public void publishQueryExecutionEvent(QueryExecutionEvent queryExecutionEvent) {
        applicationEventPublisher.publishEvent(queryExecutionEvent);
    }

    public Mono<Void> publishDatasourceEvent(String id, EventType eventType) {
        return datasourceService.getById(id)
                .flatMap(datasource -> publishDatasourceEvent(datasource, eventType))
                .onErrorResume(throwable -> {
                    log.error("publishDatasourceEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishDatasourceEvent(Datasource datasource, EventType eventType) {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMap(orgMember -> {
                    DatasourceEvent event = DatasourceEvent.builder()
                            .datasourceId(datasource.getId())
                            .name(datasource.getName())
                            .type(datasource.getType())
                            .eventType(eventType)
                            .userId(orgMember.getUserId())
                            .orgId(orgMember.getOrgId())
                            .build();
                    applicationEventPublisher.publishEvent(event);
                    return Mono.<Void> empty();
                })
                .onErrorResume(throwable -> {
                    log.error("publishDatasourceEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishDatasourcePermissionEvent(String permissionId, EventType eventType) {
        return resourcePermissionService.getById(permissionId)
                .zipWhen(resourcePermission -> datasourceService.getById(resourcePermission.getResourceId()))
                .flatMap(tuple -> {
                    ResourcePermission resourcePermission = tuple.getT1();
                    ResourceHolder holder = resourcePermission.getResourceHolder();
                    Datasource datasource = tuple.getT2();
                    return publishDatasourcePermissionEvent(datasource.getId(),
                            holder == USER ? List.of(resourcePermission.getResourceHolderId()) : Collections.emptyList(),
                            holder == USER ? Collections.emptyList() : List.of(resourcePermission.getResourceHolderId()),
                            resourcePermission.getResourceRole().getValue(),
                            eventType);
                })
                .onErrorResume(throwable -> {
                    log.error("publishDatasourcePermissionEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishDatasourcePermissionEvent(String datasourceId,
            Collection<String> userIds, Collection<String> groupIds, String role,
            EventType eventType) {
        return Mono.zip(sessionUserService.getVisitorOrgMemberCache(), datasourceService.getById(datasourceId))
                .flatMap(tuple -> {
                    OrgMember orgMember = tuple.getT1();
                    Datasource datasource = tuple.getT2();
                    DatasourcePermissionEvent datasourcePermissionEvent = DatasourcePermissionEvent.builder()
                            .datasourceId(datasourceId)
                            .name(datasource.getName())
                            .type(datasource.getType())
                            .userId(orgMember.getUserId())
                            .orgId(orgMember.getOrgId())
                            .userIds(userIds)
                            .groupIds(groupIds)
                            .role(role)
                            .eventType(eventType)
                            .build();
                    applicationEventPublisher.publishEvent(datasourcePermissionEvent);
                    return Mono.<Void> empty();
                })
                .onErrorResume(throwable -> {
                    log.error("publishDatasourcePermissionEvent error.", throwable);
                    return Mono.empty();
                });
    }

    public Mono<Void> publishLibraryQuery(LibraryQuery libraryQuery, EventType eventType) {
        return publishLibraryQueryEvent(libraryQuery.getId(), libraryQuery.getName(), eventType);
    }

    public Mono<Void> publishLibraryQueryEvent(String id, String name, EventType eventType) {
        return sessionUserService.getVisitorOrgMemberCache()
                .map(orgMember -> LibraryQueryEvent.builder()
                        .userId(orgMember.getUserId())
                        .orgId(orgMember.getOrgId())
                        .id(id)
                        .name(name)
                        .eventType(eventType)
                        .build())
                .doOnNext(applicationEventPublisher::publishEvent)
                .then()
                .onErrorResume(throwable -> {
                    log.error("publishLibraryQueryEvent error.", throwable);
                    return Mono.empty();
                });
    }
}
