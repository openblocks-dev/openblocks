package com.openblocks.domain.interaction;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.infra.birelation.BiRelation;
import com.openblocks.infra.birelation.BiRelationBizType;
import com.openblocks.infra.birelation.BiRelationService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UserApplicationInteractionService {

    @Autowired
    private BiRelationService biRelationService;

    public Mono<Void> upsert(String userId, String applicationId, Instant lastViewTime) {
        BiRelation biRelation = new UserApplicationInteraction(userId, applicationId, lastViewTime).toBiRelation();

        return biRelationService.upsert(biRelation).then();
    }

    public Flux<UserApplicationInteraction> findByUserId(String userId) {
        return biRelationService.getBySourceId(BiRelationBizType.USER_APP_INTERACTION, userId)
                .map(UserApplicationInteraction::of);
    }
}
