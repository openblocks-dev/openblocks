package com.openblocks.api.usermanagement;

import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import java.util.List;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
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

import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.usermanagement.view.AddMemberRequest;
import com.openblocks.api.usermanagement.view.CreateGroupRequest;
import com.openblocks.api.usermanagement.view.GroupMemberAggregateView;
import com.openblocks.api.usermanagement.view.GroupView;
import com.openblocks.api.usermanagement.view.UpdateGroupRequest;
import com.openblocks.api.usermanagement.view.UpdateRoleRequest;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.group.service.GroupMemberService;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.organization.model.MemberRole;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.constant.Url;
import com.openblocks.sdk.exception.BizError;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

@Slf4j
@RestController
@RequestMapping(value = {Url.GROUP_URL, NewUrl.GROUP_URL})
public class GroupController {

    @Autowired
    private GroupApiService groupApiService;
    @Autowired
    private SessionUserService sessionUserService;
    @Autowired
    private GroupMemberService groupMemberService;
    @Autowired
    private BusinessEventPublisher businessEventPublisher;
    @Autowired
    private GroupService groupService;

    @PostMapping
    public Mono<ResponseView<GroupView>> create(@Valid @RequestBody CreateGroupRequest newGroup) {
        return groupApiService.create(newGroup)
                .delayUntil(group -> businessEventPublisher.publishGroupCreateEvent(group))
                .flatMap(group -> GroupView.from(group, MemberRole.ADMIN.getValue()))
                .map(ResponseView::success);
    }

    @PutMapping("{groupId}/update")
    public Mono<ResponseView<Boolean>> update(@PathVariable String groupId,
            @Valid @RequestBody UpdateGroupRequest updateGroupRequest) {
        return groupService.getById(groupId)
                .zipWhen(group -> groupApiService.update(groupId, updateGroupRequest))
                .delayUntil(tuple -> businessEventPublisher.publishGroupUpdateEvent(tuple.getT2(), tuple.getT1(), updateGroupRequest.getGroupName()))
                .map(tuple -> ResponseView.success(tuple.getT2()));
    }

    @DeleteMapping("/{groupId}")
    public Mono<ResponseView<Boolean>> delete(@PathVariable String groupId) {
        return groupService.getById(groupId)
                .zipWhen(group -> groupApiService.deleteGroup(groupId))
                .delayUntil(tuple -> businessEventPublisher.publishGroupDeleteEvent(tuple.getT2(), tuple.getT1()))
                .map(tuple -> ResponseView.success(tuple.getT2()));
    }

    @GetMapping("/list")
    public Mono<ResponseView<List<GroupView>>> getOrgGroups() {
        return groupApiService.getGroups()
                .map(ResponseView::success);
    }


    @GetMapping("/{groupId}/members")
    public Mono<ResponseView<GroupMemberAggregateView>> getGroupMembers(@PathVariable String groupId,
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "count", required = false, defaultValue = "100") int count) {
        return groupApiService.getGroupMembers(groupId, page, count)
                .map(ResponseView::success);
    }

    @PostMapping("/{groupId}/addMember")
    public Mono<ResponseView<Boolean>> addGroupMember(@PathVariable String groupId,
            @RequestBody AddMemberRequest addMemberRequest) {
        if (StringUtils.isBlank(groupId)) {
            return ofError(BizError.INVALID_PARAMETER, "INVALID_ORG_ID");
        }
        if (StringUtils.isBlank(addMemberRequest.getUserId())) {
            return ofError(BizError.INVALID_PARAMETER, "INVALID_USER_ID");
        }
        if (StringUtils.isBlank(addMemberRequest.getRole())) {
            return ofError(BizError.INVALID_PARAMETER, "INVALID_USER_ROLE");
        }
        return groupApiService.addGroupMember(groupId, addMemberRequest.getUserId(), addMemberRequest.getRole())
                .delayUntil(result -> businessEventPublisher.publishGroupMemberAddEvent(result, groupId, addMemberRequest))
                .map(ResponseView::success);
    }

    @PutMapping("/{groupId}/role")
    public Mono<ResponseView<Boolean>> updateRoleForMember(@RequestBody UpdateRoleRequest updateRoleRequest,
            @PathVariable String groupId) {
        return groupMemberService.getGroupMember(groupId, updateRoleRequest.getUserId())
                .zipWhen(tuple -> groupApiService.updateRoleForMember(groupId, updateRoleRequest))
                .delayUntil(
                        tuple -> businessEventPublisher.publishGroupMemberRoleUpdateEvent(tuple.getT2(), groupId, tuple.getT1(), updateRoleRequest))
                .map(Tuple2::getT2)
                .map(ResponseView::success);
    }

    @DeleteMapping("/{groupId}/leave")
    public Mono<ResponseView<Boolean>> leaveGroup(@PathVariable String groupId) {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMap(orgMember -> groupMemberService.getGroupMember(groupId, orgMember.getUserId()))
                .zipWhen(tuple -> groupApiService.leaveGroup(groupId))
                .delayUntil(tuple -> businessEventPublisher.publishGroupMemberLeaveEvent(tuple.getT2(), tuple.getT1()))
                .map(Tuple2::getT2)
                .map(ResponseView::success);
    }

    @DeleteMapping("/{groupId}/remove")
    public Mono<ResponseView<Boolean>> removeUser(@PathVariable String groupId,
            @RequestParam String userId) {
        if (StringUtils.isBlank(userId)) {
            return ofError(BizError.INVALID_PARAMETER, "INVALID_USER_ID");
        }
        return groupMemberService.getGroupMember(groupId, userId)
                .zipWhen(groupMember -> groupApiService.removeUser(groupId, userId))
                .delayUntil(tuple -> businessEventPublisher.publishGroupMemberRemoveEvent(tuple.getT2(), tuple.getT1()))
                .map(Tuple2::getT2)
                .map(ResponseView::success);
    }
}
