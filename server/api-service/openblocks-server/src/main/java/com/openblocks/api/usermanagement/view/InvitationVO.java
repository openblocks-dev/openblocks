package com.openblocks.api.usermanagement.view;

import com.openblocks.domain.invitation.model.Invitation;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.user.model.User;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class InvitationVO {

    private final String inviteCode;

    private final String createUserName;

    private final String invitedOrganizationName;

    public static InvitationVO from(Invitation invitation, User createUser, Organization invitedOrganization) {
        return InvitationVO.builder()
                .inviteCode(invitation.getId())
                .createUserName(createUser.getName())
                .invitedOrganizationName(invitedOrganization.getName())
                .build();
    }

}
