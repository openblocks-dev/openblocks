package com.openblocks.domain.invitation.service;


import javax.annotation.Nonnull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.openblocks.domain.invitation.model.Invitation;
import com.openblocks.domain.invitation.repository.InvitationRepository;
import com.openblocks.domain.organization.model.MemberRole;
import com.openblocks.domain.organization.service.OrgMemberService;

import reactor.core.publisher.Mono;

@Lazy
@Service
public class InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private InvitationRepository repository;

    public Mono<Invitation> create(Invitation invitation) {
        return repository.save(invitation);
    }

    public Mono<Invitation> getById(@Nonnull String invitationId) {
        return invitationRepository.findById(invitationId);
    }

    public Mono<Boolean> inviteToOrg(String userId, String orgId) {
        return orgMemberService.addMember(orgId, userId, MemberRole.MEMBER);
    }

}
