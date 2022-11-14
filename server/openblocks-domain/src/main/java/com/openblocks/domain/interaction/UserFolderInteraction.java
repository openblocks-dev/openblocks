package com.openblocks.domain.interaction;

import static com.openblocks.infra.birelation.BiRelationBizType.USER_FOLDER_INTERACTION;

import java.time.Instant;

import org.apache.commons.lang3.math.NumberUtils;

import com.google.common.base.Preconditions;
import com.openblocks.infra.birelation.BiRelation;

public record UserFolderInteraction(String userId, String folderId, Instant lastViewTime) {

    public BiRelation toBiRelation() {
        return BiRelation.builder()
                .bizType(USER_FOLDER_INTERACTION)
                .sourceId(userId)
                .targetId(folderId)
                .extParam1(lastViewTime.toEpochMilli() + "")
                .build();
    }

    public static UserFolderInteraction of(BiRelation biRelation) {
        Preconditions.checkArgument(biRelation.getBizType() == USER_FOLDER_INTERACTION);
        return new UserFolderInteraction(biRelation.getSourceId(),
                biRelation.getTargetId(),
                Instant.ofEpochMilli(NumberUtils.toLong(biRelation.getExtParam1())));
    }
}
