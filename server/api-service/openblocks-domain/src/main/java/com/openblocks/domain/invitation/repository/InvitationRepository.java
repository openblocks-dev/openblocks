package com.openblocks.domain.invitation.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.openblocks.domain.invitation.model.Invitation;

public interface InvitationRepository extends ReactiveMongoRepository<Invitation, String>, CustomInvitationRepository {

}
