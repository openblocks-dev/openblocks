package com.openblocks.domain.bizthreshold;

import static com.openblocks.sdk.util.ExceptionUtils.deferredError;

import java.util.Collections;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.config.dynamic.ConfigInstance;
import com.openblocks.sdk.exception.BizError;

import reactor.core.publisher.Mono;

@Component
public class BizThresholdChecker {

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private ConfigCenter configCenter;

    @Autowired
    private ApplicationService applicationService;

    private Conf<Integer> maxOrgPerUser;
    private Conf<Integer> maxOrgMemberCount;
    private Conf<Integer> maxOrgGroupCount;
    private Conf<Integer> maxOrgAppCount;
    private Conf<Map<String, Integer>> userOrgCountWhiteList;
    private Conf<Map<String, Integer>> orgMemberCountWhiteList;
    private Conf<Map<String, Integer>> orgAppCountWhiteList;

    @PostConstruct
    private void init() {
        ConfigInstance threshold = configCenter.threshold();
        maxOrgPerUser = threshold.ofInteger("maxOrgPerUser", 5);
        userOrgCountWhiteList = threshold.ofMap("userOrgCountWhiteList", String.class, Integer.class, Collections.emptyMap());

        maxOrgMemberCount = threshold.ofInteger("maxOrgMemberCount", 50);
        orgMemberCountWhiteList = threshold.ofMap("orgMemberCountWhiteList", String.class, Integer.class, Collections.emptyMap());

        maxOrgGroupCount = threshold.ofInteger("maxOrgGroupCount", 10);

        maxOrgAppCount = threshold.ofInteger("maxOrgAppCount", 50);
        orgAppCountWhiteList = threshold.ofMap("orgAppCountWhiteList", String.class, Integer.class, Collections.emptyMap());
    }

    public Mono<Void> checkMaxOrgCount(String userId) {
        return orgMemberService.countAllActiveOrgs(userId)
                .filter(userOrgCount -> userOrgCountBelowThreshold(userId, userOrgCount))
                .switchIfEmpty(deferredError(BizError.EXCEED_MAX_USER_ORG_COUNT, "EXCEED_MAX_USER_ORG_COUNT"))
                .then();
    }

    private boolean userOrgCountBelowThreshold(String userId, long userOrgCount) {
        return userOrgCount < Math.max(userOrgCountWhiteList.get().getOrDefault(userId, 0),
                maxOrgPerUser.get());
    }

    public Mono<Void> checkMaxOrgMemberCount(String orgId) {
        return orgMemberService.getOrgMemberCount(orgId)
                .filter(orgMemberCount -> orgMemberCountBelowThreshold(orgId, orgMemberCount))
                .switchIfEmpty(deferredError(BizError.EXCEED_MAX_ORG_MEMBER_COUNT, "EXCEED_MAX_ORG_MEMBER_COUNT"))
                .then();
    }

    private boolean orgMemberCountBelowThreshold(String orgId, Long orgMemberCount) {
        return orgMemberCount < Math.max(maxOrgMemberCount.get(), orgMemberCountWhiteList.get().getOrDefault(orgId, 0));
    }

    public Mono<OrgMember> checkMaxGroupCount(Mono<OrgMember> orgMemberMono) {
        return orgMemberMono
                .flatMap(it -> groupService.getOrgGroupCount(it.getOrgId()))
                .filter(it -> it < maxOrgGroupCount.get())
                .switchIfEmpty(deferredError(BizError.EXCEED_MAX_GROUP_COUNT, "EXCEED_MAX_GROUP_COUNT"))
                .then(orgMemberMono);
    }


    public Mono<Void> checkMaxOrgApplicationCount(OrgMember orgMember) {
        String orgId = orgMember.getOrgId();
        return applicationService.countByOrganizationId(orgId, ApplicationStatus.NORMAL)
                .filter(orgAppCount -> orgAppCountBelowThreshold(orgId, orgAppCount))
                .switchIfEmpty(deferredError(BizError.EXCEED_MAX_APP_COUNT, "EXCEED_MAX_APP_COUNT"))
                .then();
    }

    private boolean orgAppCountBelowThreshold(String orgId, long orgAppCount) {
        return orgAppCount < Math.max(maxOrgAppCount.get(), orgAppCountWhiteList.get().getOrDefault(orgId, 0));
    }

}
