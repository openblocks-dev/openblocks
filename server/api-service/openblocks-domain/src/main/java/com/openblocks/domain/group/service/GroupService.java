package com.openblocks.domain.group.service;

import java.util.Collection;

import com.openblocks.domain.group.model.Group;
import com.openblocks.infra.mongo.MongoUpsertHelper.PartialResourceWithId;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface GroupService {

    Mono<Group> getById(String groupId);

    Flux<Group> getByIds(Collection<String> groupIds);

    Flux<Group> getByOrgId(String organizationId);

    default Mono<Long> getOrgGroupCount(String organizationId) {
        return getByOrgId(organizationId)
                .count();
    }

    Mono<Void> delete(String id);

    Mono<Group> create(Group newGroup, String userId, String orgId);

    Mono<Boolean> updateGroup(Group updateGroup);

    Mono<Group> getAllUsersGroup(String organizationId);

    Mono<Group> getDevGroup(String orgId);

    Mono<Group> createDevGroup(String orgId);

    Mono<Group> createAllUserGroup(String orgId);

    Flux<Group> getAllGroupsBySource(String orgId, String source);

    Mono<Boolean> bulkCreateSyncGroup(Collection<Group> groups);

    Mono<Boolean> bulkUpdateGroup(Collection<PartialResourceWithId<Group>> groups);


}
