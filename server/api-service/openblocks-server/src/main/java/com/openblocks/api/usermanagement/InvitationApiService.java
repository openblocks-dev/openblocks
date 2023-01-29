package com.openblocks.api.usermanagement;

import static com.openblocks.sdk.exception.BizError.INVITED_ORG_DELETED;
import static com.openblocks.sdk.exception.BizError.INVITER_NOT_FOUND;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;

import javax.annotation.Nonnull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.usermanagement.view.InvitationVO;
import com.openblocks.api.bizthreshold.AbstractBizThresholdChecker;
import com.openblocks.domain.invitation.model.Invitation;
import com.openblocks.domain.invitation.service.InvitationService;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;

import reactor.core.publisher.Mono;

@Service
public class InvitationApiService {

    @Autowired
    private InvitationService invitationService;

    @Autowired
    private OrgApiService orgApiService;

    @Autowired
    private UserService userService;

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private AbstractBizThresholdChecker bizThresholdChecker;

    public Mono<Boolean> inviteUser(String invitationId) {
        return sessionUserService.getVisitorId()
                .zipWith(invitationService.getById(invitationId)
                        .switchIfEmpty(deferredError(BizError.INVALID_INVITATION_CODE, "INVALID_INVITATION_CODE", invitationId)))
                .flatMap(tuple -> {
                    String visitorId = tuple.getT1();
                    Invitation invitation = tuple.getT2();
                    String orgId = invitation.getInvitedOrganizationId();

                    return tryJoinOrg(visitorId, orgId)
                            .handle((joinOrgResult, sink) -> {
                                if (joinOrgResult.alreadyInOrg()) {
                                    sink.error(ofException(BizError.ALREADY_IN_ORGANIZATION, "ALREADY_IN_ORGANIZATION"));
                                    return;
                                }
                                sink.next(joinOrgResult);
                            })
                            .then(orgApiService.switchCurrentOrganizationTo(orgId));
                });
    }

    private Mono<JoinOrgResult> tryJoinOrg(String visitorId, String orgId) {
        return organizationService.getById(orgId)
                .switchIfEmpty(deferredError(INVITED_ORG_DELETED, "INVITED_ORG_DELETED"))
                .then(orgMemberService.getOrgMember(orgId, visitorId)
                        .hasElement()
                        .flatMap(inOrg -> {
                            if (inOrg) {
                                return Mono.just(new JoinOrgResult(true, false));
                            }

                            return bizThresholdChecker.checkMaxOrgCount(visitorId)
                                    .then(bizThresholdChecker.checkMaxOrgMemberCount(orgId))
                                    .then(invitationService.inviteToOrg(visitorId, orgId))
                                    .map(result -> new JoinOrgResult(false, result));
                        }));
    }

    public Mono<InvitationVO> getInvitationView(String invitationId) {
        return invitationService.getById(invitationId)
                .switchIfEmpty(deferredError(BizError.INVALID_INVITATION_CODE, "INVALID_INVITATION_CODE", invitationId))
                .flatMap(invitation -> Mono.zip(getUserMono(invitation), getOrgMono(invitation))
                        .map(tuple -> InvitationVO.from(invitation, tuple.getT1(), tuple.getT2())));
    }

    @Nonnull
    private Mono<Organization> getOrgMono(Invitation invitation) {
        return organizationService.getById(invitation.getInvitedOrganizationId())
                .switchIfEmpty(deferredError(INVITED_ORG_DELETED, "INVITED_ORG_DELETED"));
    }

    @Nonnull
    private Mono<User> getUserMono(Invitation invitation) {
        return userService.findById(invitation.getCreateUserId())
                .switchIfEmpty(deferredError(INVITER_NOT_FOUND, "INVITED_ORG_DELETED"));
    }

    public Mono<InvitationVO> create(String orgId) {
        return sessionUserService.getVisitor()
                .zipWith(organizationService.getById(orgId)
                        .switchIfEmpty(Mono.error(new BizException(BizError.INVALID_ORG_ID, "INVALID_ORG_ID"))))
                .flatMap(tuple2 -> {
                    User user = tuple2.getT1();
                    Organization org = tuple2.getT2();
                    Invitation invitation = Invitation
                            .builder()
                            .createUserId(user.getId())
                            .invitedOrganizationId(orgId)
                            .build();
                    return invitationService.create(invitation)
                            .flatMap(i -> Mono.just(InvitationVO.from(i, user, org)));
                });
    }

    private record JoinOrgResult(boolean alreadyInOrg, boolean success) {

    }
}
