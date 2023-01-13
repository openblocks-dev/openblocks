package com.openblocks.infra.birelation;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.google.common.base.MoreObjects;
import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.Builder;

@Builder
@Document
public class BiRelation extends HasIdAndAuditing {

    private final BiRelationBizType bizType;
    private final String sourceId;
    private final String targetId;
    private final String relation;
    private final String state;

    private final String extParam1;
    private final String extParam2;
    private final String extParam3;

    @JsonCreator
    public BiRelation(BiRelationBizType bizType,
            String sourceId,
            String targetId,
            String relation,
            String state,
            String extParam1,
            String extParam2,
            String extParam3) {
        this.bizType = bizType;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.relation = relation;
        this.state = state;
        this.extParam1 = extParam1;
        this.extParam2 = extParam2;
        this.extParam3 = extParam3;
    }

    public BiRelationBizType getBizType() {
        return bizType;
    }

    public String getSourceId() {
        return sourceId;
    }

    public String getTargetId() {
        return targetId;
    }

    public String getRelation() {
        return relation;
    }

    public String getState() {
        return state;
    }

    public String getExtParam1() {
        return extParam1;
    }

    public String getExtParam2() {
        return extParam2;
    }

    public String getExtParam3() {
        return extParam3;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("bizType", bizType)
                .add("sourceId", sourceId)
                .add("targetId", targetId)
                .add("relation", relation)
                .add("state", state)
                .add("extParam1", extParam1)
                .add("extParam2", extParam2)
                .add("extParam3", extParam3)
                .toString();
    }

    public long getCreateTime() {
        return createdAt != null ? createdAt.toEpochMilli() : 0;
    }
}
