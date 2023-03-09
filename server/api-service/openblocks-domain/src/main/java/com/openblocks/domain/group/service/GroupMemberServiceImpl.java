package com.openblocks.domain.group.service;

import static com.openblocks.infra.birelation.BiRelationBizType.GROUP_MEMBER;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.domain.group.model.Group;
import com.openblocks.domain.group.model.GroupMember;
import com.openblocks.domain.organization.model.MemberRole;
import com.openblocks.domain.organization.model.OrgMemberState;
import com.openblocks.infra.birelation.BiRelation;
import com.openblocks.infra.birelation.BiRelationService;
import com.openblocks.infra.mongo.MongoUpsertHelper;

import reactor.core.publisher.Mono;

@Service
public class GroupMemberServiceImpl implements GroupMemberService {

    @Autowired
    private BiRelationService biRelationService;

    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;

    @Override
    public Mono<List<GroupMember>> getGroupMembers(String groupId, int page, int count) {
        return biRelationService.getBySourceId(GROUP_MEMBER, groupId)
                .map(GroupMember::from)
                .collectList();
    }

    @Override
    public Mono<Boolean> addMember(String orgId, String groupId, String userId, MemberRole memberRole) {
        return biRelationService.addBiRelation(GROUP_MEMBER, groupId,
                        userId, memberRole.getValue(), OrgMemberState.NORMAL.getValue(), orgId)
                .hasElement();
    }

    @Override
    public Mono<Boolean> updateMemberRole(String groupId, String userId, MemberRole memberRole) {
        return biRelationService.updateRelation(GROUP_MEMBER, groupId, userId, memberRole.getValue())
                .hasElement();
    }

    @Override
    public Mono<Boolean> removeMember(String groupId, String userId) {
        return biRelationService.removeBiRelation(GROUP_MEMBER, groupId, userId);
    }

    @Override
    public Mono<List<String>> getUserGroupIdsInOrg(String orgId, String userId) {
        return getNonDynamicUserGroupIdsInOrg(orgId, userId);
    }

    @Override
    public Mono<List<GroupMember>> getUserGroupMembersInOrg(String orgId, String userId) {
        return biRelationService.getByTargetId(GROUP_MEMBER, userId)
                .map(GroupMember::from)
                .filter(it -> StringUtils.equals(it.getOrgId(), orgId))
                .collectList();
    }

    @Override
    public Mono<GroupMember> getGroupMember(String groupId, String userId) {
        return biRelationService.getBiRelation(GROUP_MEMBER, groupId, userId)
                .map(GroupMember::from);
    }

    @Override
    public Mono<List<GroupMember>> getAllGroupAdmin(String groupId) {
        return biRelationService.getBySourceIdAndRelation(GROUP_MEMBER, groupId, MemberRole.ADMIN.getValue())
                .map(GroupMember::from)
                .collectList();
    }

    @Override
    public Mono<Boolean> deleteGroupMembers(String groupId) {
        return biRelationService.removeAllBiRelations(GROUP_MEMBER, groupId);
    }

    @Override
    public Mono<Boolean> isMember(Group group, String userId) {
        return biRelationService.getBiRelation(GROUP_MEMBER, group.getId(), userId)
                .hasElement();
    }

    @Override
    public Mono<List<String>> getNonDynamicUserGroupIdsInOrg(String orgId, String userId) {
        return biRelationService.getByTargetId(GROUP_MEMBER, userId)
                .map(GroupMember::from)
                .filter(it -> StringUtils.equals(it.getOrgId(), orgId))
                .map(GroupMember::getGroupId)
                .collectList();
    }

    @Override
    public Mono<List<GroupMember>> bulkAddMember(Collection<GroupMember> groupMembers) {
        List<BiRelation> biRelations = groupMembers.stream()
                .map(groupMember -> BiRelation.builder()
                        .bizType(GROUP_MEMBER)
                        .sourceId(groupMember.getGroupId())
                        .targetId(groupMember.getUserId())
                        .relation(MemberRole.MEMBER.getValue())
                        .state(OrgMemberState.NORMAL.getValue())
                        .extParam1(groupMember.getOrgId())
                        .build())
                .toList();
        return biRelationService.batchAddBiRelation(biRelations)
                .map(r -> r.stream().map(GroupMember::from).toList());
    }

    @Override
    public Mono<Boolean> bulkRemoveMember(String groupId, Collection<String> userIds) {
        List<Document> filters = userIds.stream()
                .map(userId -> new Document(Map.of("bizType", GROUP_MEMBER.name(), "sourceId", groupId, "targetId", userId)))
                .toList();
        return mongoUpsertHelper.bulkRemove(filters, BiRelation.class);
    }
}
