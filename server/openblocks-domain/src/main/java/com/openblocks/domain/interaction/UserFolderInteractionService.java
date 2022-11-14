package com.openblocks.domain.interaction;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.infra.birelation.BiRelation;
import com.openblocks.infra.birelation.BiRelationBizType;
import com.openblocks.infra.birelation.BiRelationService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * relation service of user-folder
 */
@Service
public class UserFolderInteractionService {

    @Autowired
    private BiRelationService biRelationService;

    public Mono<Void> upsert(String userId, String folderId, Instant lastViewTime) {
        BiRelation biRelation = new UserFolderInteraction(userId, folderId, lastViewTime).toBiRelation();
        return biRelationService.upsert(biRelation).then();
    }

    public Flux<UserFolderInteraction> findByUserId(String userId) {
        return biRelationService.getBySourceId(BiRelationBizType.USER_FOLDER_INTERACTION, userId)
                .map(UserFolderInteraction::of);
    }
}
