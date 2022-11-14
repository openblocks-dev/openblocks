package com.openblocks.domain.invitation.repository;

import static com.openblocks.domain.util.QueryDslUtils.fieldName;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;
import com.openblocks.domain.invitation.model.Invitation;
import com.openblocks.domain.invitation.model.QInvitation;
import com.openblocks.sdk.constants.FieldName;

import reactor.core.publisher.Mono;

@Repository
public class CustomInvitationRepositoryImpl implements CustomInvitationRepository {

    @Autowired
    private ReactiveMongoTemplate mongoTemplate;

    @Override
    public Mono<UpdateResult> addInvitedUser(String invitationId, String userId) {
        final String reactionsField = fieldName(QInvitation.invitation.invitedUserIds);

        Query query = Query.query(Criteria.where(FieldName.ID).is(invitationId));
        return mongoTemplate.updateFirst(query, new Update().addToSet(reactionsField, userId), Invitation.class);
    }
}
