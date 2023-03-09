package com.openblocks.infra.birelation;

import java.util.Collection;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface BiRelationRepository extends ReactiveMongoRepository<BiRelation, String> {

    Flux<BiRelation> findByBizTypeAndSourceId(BiRelationBizType bizType, String sourceId);

    Flux<BiRelation> findByBizTypeAndSourceId(BiRelationBizType bizType, String sourceId, Pageable pageable);

    Flux<BiRelation> findByBizTypeAndSourceIdIn(BiRelationBizType bizType, Collection<String> sourceId);

    Flux<BiRelation> findByBizTypeAndTargetId(BiRelationBizType bizType, String targetId);

    Flux<BiRelation> findByBizTypeAndTargetIdIn(BiRelationBizType bizType, Collection<String> targetId);

    Mono<BiRelation> findByBizTypeAndSourceIdAndTargetId(BiRelationBizType bizType, String sourceId, String targetId);

    Flux<BiRelation> findByBizTypeAndTargetIdAndSourceIdIn(BiRelationBizType bizType, String targetId, Collection<String> sourceId);

    Flux<BiRelation> findByBizTypeAndSourceIdAndRelation(BiRelationBizType bizType, String sourceId, String relation);

    Mono<Long> countByBizTypeAndSourceId(BiRelationBizType bizType, String sourceId);

    Mono<Long> countByBizTypeAndTargetId(BiRelationBizType bizType, String targetId);
}
