package com.openblocks.domain.group.model;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.openblocks.domain.organization.model.MemberRole;
import com.openblocks.infra.birelation.BiRelation;

public class GroupMember {

    private final String groupId;
    private final String userId;
    private final MemberRole role;
    private final String orgId;
    private final long joinTime;

    public static final GroupMember NOT_EXIST = new GroupMember("", "", MemberRole.MEMBER, "", 0);

    @JsonCreator
    public GroupMember(String groupId, String userId, MemberRole role, String orgId, long joinTime) {
        this.groupId = groupId;
        this.userId = userId;
        this.role = role;
        this.orgId = orgId;
        this.joinTime = joinTime;
    }

    public static GroupMember from(BiRelation biRelation) {
        return new GroupMember(biRelation.getSourceId(), biRelation.getTargetId(),
                MemberRole.fromValue(biRelation.getRelation()), biRelation.getExtParam1(),
                biRelation.getCreateTime());
    }

    public boolean isAdmin() {
        return role == MemberRole.ADMIN;
    }

    @JsonIgnore
    public boolean isInvalid() {
        return this == NOT_EXIST || StringUtils.isBlank(groupId);
    }

    @JsonIgnore
    public boolean isValid() {
        return !isInvalid();
    }

    public String getOrgId() {
        return orgId;
    }

    public String getGroupId() {
        return groupId;
    }

    public String getUserId() {
        return userId;
    }

    public MemberRole getRole() {
        return role;
    }

    public long getJoinTime() {
        return joinTime;
    }
}
