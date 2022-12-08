package com.openblocks.api.usermanagement;

import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import javax.annotation.Nonnull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.domain.group.service.GroupMemberService;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.sdk.exception.BizError;

import reactor.core.publisher.Mono;

@Component
public class OrgDevChecker {

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupMemberService groupMemberService;

    /**
     * check whether current user is org admin or dev
     */
    public Mono<Void> checkCurrentOrgDev() {
        return isCurrentOrgDev()
                .flatMap(result -> {
                    if (result) {
                        return Mono.empty();
                    }
                    return ofError(BizError.NEED_DEV_TO_CREATE_RESOURCE, "NEED_DEV_TO_CREATE_RESOURCE");
                });
    }

    /**
     * check whether current user is org admin or dev
     */
    public Mono<Boolean> isCurrentOrgDev() {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMap(orgMember -> {
                    if (orgMember.isAdmin()) {
                        return Mono.just(true);
                    }
                    return inDevGroup(orgMember.getOrgId(), orgMember.getUserId());
                });
    }

    @Nonnull
    private Mono<Boolean> inDevGroup(String orgId, String userId) {
        return groupService.getDevGroup(orgId)
                .flatMap(group -> groupMemberService.isMember(group, userId))
                .defaultIfEmpty(false);
    }
}
