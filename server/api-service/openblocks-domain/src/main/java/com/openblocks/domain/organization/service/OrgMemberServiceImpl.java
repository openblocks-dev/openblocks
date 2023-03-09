package com.openblocks.domain.organization.service;

import static com.openblocks.infra.birelation.BiRelationBizType.ORG_MEMBER;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.openblocks.domain.group.model.GroupMember;
import com.openblocks.domain.group.service.GroupMemberService;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.organization.model.MemberRole;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.model.OrgMemberState;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.model.OrganizationState;
import com.openblocks.infra.annotation.PossibleEmptyMono;
import com.openblocks.infra.birelation.BiRelation;
import com.openblocks.infra.birelation.BiRelationService;
import com.openblocks.infra.mongo.MongoUpsertHelper;
import com.openblocks.infra.util.FluxHelper;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.config.CommonConfig.Workspace;
import com.openblocks.sdk.constants.WorkspaceMode;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class OrgMemberServiceImpl implements OrgMemberService {

    @Autowired
    private BiRelationService biRelationService;

    @Autowired
    private GroupMemberService groupMemberService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private CommonConfig commonConfig;

    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;

    @Override
    public Flux<OrgMember> getOrganizationMembers(String orgId) {
        return FluxHelper.getAllPageByPage(pageable -> biRelationService.getBySourceId(ORG_MEMBER, orgId, pageable), PageRequest.ofSize(100))
                .map(OrgMember::from);
    }

    @Override
    public Flux<OrgMember> getOrganizationMembers(String orgId, int page, int count) {
        return biRelationService.getBySourceId(ORG_MEMBER, orgId, PageRequest.of(page, count))
                .map(OrgMember::from);
    }

    /**
     * get all active organizations by user id.
     */
    @Override
    public Flux<OrgMember> getAllActiveOrgs(String userId) {
        // get all.
        Flux<OrgMember> orgMemberFlux = biRelationService.getByTargetId(ORG_MEMBER, userId)
                .map(OrgMember::from)
                .cache();

        // get all active org ids.
        Mono<HashSet<String>> activeOrgIds = orgMemberFlux.map(OrgMember::getOrgId)
                .collectList()
                .flatMapMany(organizationService::getByIds)
                .filter(organization -> organization.getState() != OrganizationState.DELETED)
                .map(Organization::getId)
                .collectList()
                // enterprise mode
                .flatMap(orgIds -> {
                    Workspace workspace = commonConfig.getWorkspace();
                    if (workspace.getMode() == WorkspaceMode.ENTERPRISE) {
                        String enterpriseOrgId = workspace.getEnterpriseOrgId();
                        if (StringUtils.isNotBlank(enterpriseOrgId)) {
                            if (orgIds.contains(enterpriseOrgId)) {
                                return Mono.just(List.of(enterpriseOrgId));
                            }
                            return addMember(enterpriseOrgId, userId, MemberRole.MEMBER)
                                    .thenReturn(List.of(enterpriseOrgId));
                        }
                        if (orgIds.size() > 1) {
                            return Mono.just(orgIds.subList(0, 1));
                        }
                    }
                    return Mono.just(orgIds);
                })
                .map(HashSet::new)
                .cache();

        // filter by activeOrgIds.
        return orgMemberFlux
                .filterWhen(orgMember -> activeOrgIds.map(orgIds -> orgIds.contains(orgMember.getOrgId())));
    }

    /**
     * count all active organizations.
     */
    @Override
    public Mono<Long> countAllActiveOrgs(String userId) {
        return getAllActiveOrgs(userId)
                .collectList()
                .map(list -> Long.valueOf(list.size()));
    }

    @Override
    public Mono<Long> getOrgMemberCount(String orgId) {
        return biRelationService.countBySourceId(ORG_MEMBER, orgId);
    }

    @Override
    public Mono<Boolean> addMember(String orgId, String userId, MemberRole memberRole) {
        return biRelationService.addBiRelation(ORG_MEMBER, orgId,
                        userId, memberRole.getValue(), OrgMemberState.NORMAL.getValue())
                .delayUntil(biRelation -> onOrgMemberAdded(orgId, userId))
                .hasElement();
    }

    private Mono<Void> onOrgMemberAdded(String orgId, String userId) {
        return addToAllUserGroup(orgId, userId)
                .then();
    }

    private Mono<Void> addToAllUserGroup(String orgId, String userId) {
        return groupService.getAllUsersGroup(orgId)
                .flatMap(group -> groupMemberService.addMember(orgId, group.getId(), userId, MemberRole.MEMBER))
                .then();
    }

    @Override
    public Mono<Boolean> updateMemberRole(String orgId, String userId, MemberRole memberRole) {
        return biRelationService.updateRelation(ORG_MEMBER, orgId, userId, memberRole.getValue())
                .hasElement();
    }

    @Override
    public Mono<Boolean> removeMember(String orgId, String userId) {
        return biRelationService.removeBiRelation(ORG_MEMBER, orgId, userId);
    }

    @Override
    public Mono<Boolean> deleteOrgMembers(String orgId) {
        return biRelationService.removeAllBiRelations(ORG_MEMBER, orgId);
    }

    @Override
    public Mono<OrgMember> getOrgMember(String orgId, String userId) {
        return biRelationService.getBiRelation(ORG_MEMBER, orgId, userId)
                .map(OrgMember::from);
    }

    @Override
    public Mono<Boolean> tryAddOrgMember(String orgId, String userId, MemberRole role) {
        return getOrgMember(orgId, userId)
                .hasElement()
                .flatMap(hasElement -> {
                    if (hasElement) {
                        return Mono.just(false);
                    }
                    return addMember(orgId, userId, role);
                });
    }

    @Override
    public Mono<Map<String, OrgMember>> getOrgMemberRoles(Collection<String> orgIds, String userId) {
        return biRelationService.getByTargetIdAndSourceIds(ORG_MEMBER, userId, orgIds)
                .collectMap(BiRelation::getSourceId, OrgMember::from);
    }

    @Override
    @PossibleEmptyMono
    public Mono<OrgMember> getCurrentOrgMember(String userId) {

        Flux<OrgMember> orgMemberFlux = getAllActiveOrgs(userId).cache();

        return orgMemberFlux
                .filter(OrgMember::isCurrentOrg)
                .next()
                .switchIfEmpty(orgMemberFlux.next().delayUntil(this::markAsUserCurrentOrgId));
    }

    @Override
    public Mono<UserOrgMemberInfo> getUserOrgMemberInfo(String userId) {

        Flux<OrgMember> orgMemberFlux = getAllActiveOrgs(userId).cache();

        return orgMemberFlux
                .filter(OrgMember::isCurrentOrg)
                .next()
                .switchIfEmpty(orgMemberFlux.next().delayUntil(this::markAsUserCurrentOrgId))
                .zipWith(orgMemberFlux.collectList())
                .flatMap(tuple -> {
                    OrgMember current = tuple.getT1();
                    List<OrgMember> orgMembers = tuple.getT2();
                    return Mono.just(new UserOrgMemberInfo(current, orgMembers));
                });
    }

    private Mono<Boolean> markAsUserCurrentOrgId(OrgMember orgMember) {
        return markAsUserCurrentOrgId(orgMember.getOrgId(), orgMember.getUserId());
    }

    @Override
    public Mono<Boolean> markAsUserCurrentOrgId(String orgId, String userId) {
        return biRelationService.updateState(ORG_MEMBER, orgId, userId, OrgMemberState.CURRENT.getValue());
    }

    @Override
    public Mono<Boolean> removeCurrentOrgMark(String previousCurrentOrgId, String userId) {
        return biRelationService.updateState(ORG_MEMBER, previousCurrentOrgId, userId, OrgMemberState.NORMAL.getValue());
    }

    @Override
    public Mono<List<OrgMember>> getAllOrgAdmins(String orgId) {
        return biRelationService.getBySourceIdAndRelation(ORG_MEMBER, orgId, MemberRole.ADMIN.getValue())
                .map(OrgMember::from)
                .collectList();
    }

    @Override
    public Mono<Void> bulkAddMember(String orgId, Collection<String> userIds, MemberRole memberRole) {
        List<BiRelation> biRelations = userIds.stream()
                .map(userId -> BiRelation.builder()
                        .bizType(ORG_MEMBER)
                        .sourceId(orgId)
                        .targetId(userId)
                        .relation(memberRole.getValue())
                        .state(OrgMemberState.NORMAL.getValue())
                        .build())
                .toList();
        return biRelationService.batchAddBiRelation(biRelations)
                .then(bulkAddToAllUserGroup(orgId, userIds));
    }

    private Mono<Void> bulkAddToAllUserGroup(String orgId, Collection<String> userIds) {
        return groupService.getAllUsersGroup(orgId)
                .map(group -> userIds.stream()
                        .map(userId -> new GroupMember(group.getId(), userId, MemberRole.MEMBER, orgId, System.currentTimeMillis()))
                        .toList())
                .flatMap(groupMemberService::bulkAddMember)
                .then();
    }

    @Override
    public Mono<Boolean> bulkRemoveMember(String orgId, Collection<String> userIds) {
        List<Document> filters = userIds.stream()
                .map(userId -> new Document(Map.of("bizType", ORG_MEMBER.name(), "sourceId", orgId, "targetId", userId)))
                .toList();
        return mongoUpsertHelper.bulkRemove(filters, BiRelation.class);
    }
}
