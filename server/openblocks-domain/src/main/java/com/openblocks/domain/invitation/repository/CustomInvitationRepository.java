package com.openblocks.domain.invitation.repository;

import com.mongodb.client.result.UpdateResult;

import reactor.core.publisher.Mono;

public interface CustomInvitationRepository {

    Mono<UpdateResult> addInvitedUser(String invitationId, String userId);
}
