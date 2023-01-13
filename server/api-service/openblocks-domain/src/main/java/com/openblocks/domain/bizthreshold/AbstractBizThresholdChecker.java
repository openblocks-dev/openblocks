package com.openblocks.domain.bizthreshold;

import static com.openblocks.sdk.util.ExceptionUtils.deferredError;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.sdk.exception.BizError;

import reactor.core.publisher.Mono;

@Component
public abstract class AbstractBizThresholdChecker {

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private ApplicationService applicationService;

    protected abstract int getMaxOrgPerUser();

    protected abstract int getMaxOrgMemberCount();

    protected abstract int getMaxOrgGroupCount();

    protected abstract int getMaxOrgAppCount();

    protected abstract Map<String, Integer> getUserOrgCountWhiteList();

    protected abstract Map<String, Integer> getOrgMemberCountWhiteList();

    protected abstract Map<String, Integer> getOrgAppCountWhiteList();

    public Mono<Void> checkMaxOrgCount(String userId) {
        return orgMemberService.countAllActiveOrgs(userId)
                .filter(userOrgCount -> userOrgCountBelowThreshold(userId, userOrgCount))
                .switchIfEmpty(deferredError(BizError.EXCEED_MAX_USER_ORG_COUNT, "EXCEED_MAX_USER_ORG_COUNT"))
                .then();
    }

    private boolean userOrgCountBelowThreshold(String userId, long userOrgCount) {
        return userOrgCount < Math.max(getUserOrgCountWhiteList().getOrDefault(userId, 0),
                getMaxOrgPerUser());
    }

    public Mono<Void> checkMaxOrgMemberCount(String orgId) {
        return orgMemberService.getOrgMemberCount(orgId)
                .filter(orgMemberCount -> orgMemberCountBelowThreshold(orgId, orgMemberCount))
                .switchIfEmpty(deferredError(BizError.EXCEED_MAX_ORG_MEMBER_COUNT, "EXCEED_MAX_ORG_MEMBER_COUNT"))
                .then();
    }

    private boolean orgMemberCountBelowThreshold(String orgId, Long orgMemberCount) {
        return orgMemberCount < Math.max(getMaxOrgMemberCount(), getOrgMemberCountWhiteList().getOrDefault(orgId, 0));
    }

    public Mono<Void> checkMaxGroupCount(OrgMember orgMemberMono) {
        return groupService.getOrgGroupCount(orgMemberMono.getOrgId())
                .filter(it -> it < getMaxOrgGroupCount())
                .switchIfEmpty(deferredError(BizError.EXCEED_MAX_GROUP_COUNT, "EXCEED_MAX_GROUP_COUNT"))
                .then();
    }

    public Mono<Void> checkMaxOrgApplicationCount(OrgMember orgMember) {
        String orgId = orgMember.getOrgId();
        return applicationService.countByOrganizationId(orgId, ApplicationStatus.NORMAL)
                .filter(orgAppCount -> orgAppCountBelowThreshold(orgId, orgAppCount))
                .switchIfEmpty(deferredError(BizError.EXCEED_MAX_APP_COUNT, "EXCEED_MAX_APP_COUNT"))
                .then();
    }

    private boolean orgAppCountBelowThreshold(String orgId, long orgAppCount) {
        return orgAppCount < Math.max(getMaxOrgAppCount(), getOrgAppCountWhiteList().getOrDefault(orgId, 0));
    }

}
