package com.openblocks.domain.organization.model;

import static com.google.common.base.Strings.nullToEmpty;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.openblocks.infra.birelation.BiRelation;

public class OrgMember {

    private final String orgId;
    private final String userId;
    private final MemberRole role;
    private final String state;
    private final long joinTime;

    public static final OrgMember NOT_EXIST = new OrgMember("", "", MemberRole.MEMBER, "", 0);

    @JsonCreator
    public OrgMember(String orgId, String userId, MemberRole role, String state, long joinTime) {
        this.orgId = orgId;
        this.userId = userId;
        this.role = role;
        this.state = state;
        this.joinTime = joinTime;
    }

    @JsonIgnore
    public boolean isInvalid() {
        return this == NOT_EXIST || StringUtils.isBlank(orgId);
    }

    public static OrgMember from(BiRelation biRelation) {
        return new OrgMember(biRelation.getSourceId(),
                biRelation.getTargetId(),
                MemberRole.fromValue(biRelation.getRelation()),
                nullToEmpty(biRelation.getState()),
                biRelation.getCreatedAt().toEpochMilli());
    }

    public String getOrgId() {
        return orgId;
    }

    public String getUserId() {
        return userId;
    }

    public MemberRole getRole() {
        return role;
    }

    public boolean isAdmin() {
        return role == MemberRole.ADMIN;
    }

    public boolean isCurrentOrg() {
        return OrgMemberState.CURRENT.getValue().equals(state);
    }

    public long getJoinTime() {
        return joinTime;
    }
}
