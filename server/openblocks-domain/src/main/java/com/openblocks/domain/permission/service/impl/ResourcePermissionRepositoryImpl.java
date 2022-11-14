package com.openblocks.domain.permission.service.impl;

import static com.openblocks.infra.birelation.BiRelationBizType.RESOURCE;
import static com.openblocks.sdk.util.StreamUtils.collectList;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.google.common.collect.Multimap;
import com.openblocks.domain.permission.model.ResourceHolder;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.domain.permission.service.ResourcePermissionRepository;
import com.openblocks.infra.birelation.BiRelation;
import com.openblocks.infra.birelation.BiRelationService;
import com.openblocks.infra.mongo.MongoUpsertHelper;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Lazy
@Service
public class ResourcePermissionRepositoryImpl implements ResourcePermissionRepository {

    @Autowired
    private MongoUpsertHelper mongoUpsertHelper;

    @Autowired
    private BiRelationService biRelationService;

    @Override
    public Mono<Map<String, Collection<ResourcePermission>>> getByResourceTypeAndResourceIds(ResourceType resourceType,
            Collection<String> resourceIds) {
        return biRelationService.getBySourceIds(RESOURCE, collectList(resourceIds, resourceType::join))
                .collectMultimap(it -> ResourcePermission.parseId(it.getSourceId()), ResourcePermission::fromBiRelation);
    }

    @Override
    public Mono<List<ResourcePermission>> getByResourceTypeAndResourceId(ResourceType resourceType, String resourceId) {
        return biRelationService.getBySourceId(RESOURCE, resourceType.join(resourceId))
                .map(ResourcePermission::fromBiRelation)
                .collectList();
    }

    @Override
    public Mono<Void> insertBatchPermission(ResourceType resourceType, String resourceId, Multimap<ResourceHolder, String> resourceHolderMap,
            ResourceRole role) {
        List<BiRelation> biRelations = resourceHolderMap.entries().stream()
                .map(entry -> ResourcePermission.builder()
                        .resourceType(resourceType)
                        .resourceId(resourceId)
                        .resourceHolder(entry.getKey())
                        .resourceHolderId(entry.getValue())
                        .resourceRole(role)
                        .build())
                .map(ResourcePermission::toBiRelation)
                .collect(Collectors.toList());
        return biRelationService.batchAddBiRelation(biRelations)
                .then();
    }

    @Override
    public Mono<Boolean> updatePermissionRoleById(String permissionId,
            ResourceRole role) {
        BiRelation biRelation = BiRelation.builder()
                .relation(role.getValue())
                .build();
        return mongoUpsertHelper.updateById(biRelation, permissionId);
    }

    @Override
    public Mono<Boolean> removePermissionById(String permissionId) {
        return biRelationService.removeBiRelationById(permissionId);
    }

    @Override
    public Mono<Boolean> removePermissionBy(ResourceType resourceType, String resourceId,
            ResourceHolder resourceHolder,
            String resourceHolderId) {
        BiRelation biRelation = ResourcePermission.builder()
                .resourceType(resourceType)
                .resourceId(resourceId)
                .resourceHolder(resourceHolder)
                .resourceHolderId(resourceHolderId)
                .build()
                .toBiRelation();
        return biRelationService.removeBiRelation(RESOURCE, biRelation.getSourceId(), biRelation.getTargetId());
    }

    @Override
    public Mono<ResourcePermission> getById(String permissionId) {
        return biRelationService.getById(permissionId)
                .map(ResourcePermission::fromBiRelation);
    }

    @Override
    public Mono<ResourcePermission> getByResourceTypeAndResourceIdAndTargetId(ResourceType resourceType, String resourceId,
            ResourceHolder resourceHolder,
            String resourceHolderId) {
        BiRelation biRelation = ResourcePermission.builder()
                .resourceType(resourceType)
                .resourceId(resourceId)
                .resourceHolder(resourceHolder)
                .resourceHolderId(resourceHolderId)
                .build()
                .toBiRelation();
        return biRelationService.getBiRelation(RESOURCE, biRelation.getSourceId(), biRelation.getTargetId())
                .map(ResourcePermission::fromBiRelation);
    }

    @Override
    public Mono<Boolean> addPermission(ResourceType resourceType, String resourceId,
            ResourceHolder holderType, String holderId,
            ResourceRole resourceRole) {

        ResourcePermission resourcePermission = ResourcePermission.builder()
                .resourceType(resourceType)
                .resourceId(resourceId)
                .resourceHolder(holderType)
                .resourceHolderId(holderId)
                .resourceRole(resourceRole)
                .build();

        return biRelationService.addBiRelation(resourcePermission.toBiRelation())
                .thenReturn(true)
                .onErrorResume(ex -> {
                    log.error("", ex);
                    return Mono.just(false);
                });
    }

}
