package com.openblocks.domain.interaction;

import java.time.Instant;

import org.apache.commons.lang3.math.NumberUtils;

import com.google.common.base.Preconditions;
import com.openblocks.infra.birelation.BiRelation;
import com.openblocks.infra.birelation.BiRelationBizType;

public record UserApplicationInteraction(String userId, String applicationId, Instant lastViewTime) {

    public BiRelation toBiRelation() {
        return BiRelation.builder()
                .bizType(BiRelationBizType.USER_APP_INTERACTION)
                .sourceId(userId)
                .targetId(applicationId)
                .extParam1(lastViewTime.toEpochMilli() + "")
                .build();
    }

    public static UserApplicationInteraction of(BiRelation biRelation) {
        Preconditions.checkArgument(biRelation.getBizType() == BiRelationBizType.USER_APP_INTERACTION);
        return new UserApplicationInteraction(biRelation.getSourceId(),
                biRelation.getTargetId(),
                Instant.ofEpochMilli(NumberUtils.toLong(biRelation.getExtParam1())));
    }
}
