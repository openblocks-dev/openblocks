package com.openblocks.runner.eventlistener;

import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.google.common.util.concurrent.ThreadFactoryBuilder;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.group.event.GroupDeletedEvent;
import com.openblocks.domain.group.service.GroupMemberService;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.organization.event.OrgDeletedEvent;
import com.openblocks.domain.organization.event.OrgMemberLeftEvent;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.permission.service.ResourcePermissionService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

@Slf4j
@Component
public class OrgAndGroupEventListener {

    private final ExecutorService executorService = Executors.newCachedThreadPool(new ThreadFactoryBuilder()
            .setDaemon(false)
            .setNameFormat("org-event-async-executor")
            .build());

    private final Scheduler orgEventScheduler = Schedulers.fromExecutor(executorService);
    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupMemberService groupMemberService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private DatasourceService datasourceService;

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    @EventListener
    public void onOrgDeleted(OrgDeletedEvent event) {

        log.info("org deleted event: {}", toJson(event));
        String orgId = event.getOrgId();
        orgMemberService.deleteOrgMembers(orgId)
                .then(deleteOrgGroups(orgId))
                .then(deleteOrgApplications())
                .then(deleteOrgDatasources())
                .retry(3)
                .doOnError(e -> log.error("fail to handle org deletion", e))
                .subscribeOn(orgEventScheduler)
                .subscribe();
    }

    @EventListener
    public void onUserLeaveOrg(OrgMemberLeftEvent orgMemberLeftEvent) {
        String orgId = orgMemberLeftEvent.getOrgId();
        String userId = orgMemberLeftEvent.getUserId();
        Mono<List<Boolean>> removeGroupMember = groupService.getByOrgId(orgId)
                .flatMap(group -> groupMemberService.removeMember(group.getId(), userId))
                .collectList()
                .retry(3)
                .subscribeOn(orgEventScheduler);

        Mono<List<Boolean>> removeAppPermissions = applicationService.findByOrganizationIdWithoutDsl(orgId)
                .flatMap(application -> resourcePermissionService.removeUserApplicationPermission(application.getId(), userId))
                .collectList()
                .retry(3)
                .subscribeOn(orgEventScheduler);

        Mono<List<Boolean>> removeDatasourcePermissions = datasourceService.getByOrgId(orgId)
                .flatMap(datasource -> resourcePermissionService.removeUserDatasourcePermission(datasource.getId(), userId))
                .collectList()
                .retry(3)
                .subscribeOn(orgEventScheduler);

        Mono.zip(removeGroupMember, removeAppPermissions, removeDatasourcePermissions)
                .subscribe();
    }

    private Mono<Void> deleteOrgDatasources() {
        return Mono.empty();
    }

    private Mono<Void> deleteOrgApplications() {
        return Mono.empty();
    }

    @EventListener
    public void onGroupDeleted(GroupDeletedEvent event) {
        log.info("group deleted event: {}", toJson(event));
        String groupId = event.getGroupId();
        groupMemberService.deleteGroupMembers(groupId)
                .doOnError(e -> log.error("fail to handle group deletion", e))
                .subscribeOn(orgEventScheduler)
                .subscribe();
    }

    private Mono<Boolean> deleteOrgGroups(String orgId) {
        return groupService.getByOrgId(orgId)
                .flatMap(group -> groupService.delete(group.getId()))
                .collectList()
                .thenReturn(true);
    }
}
