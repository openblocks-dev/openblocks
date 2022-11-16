package com.openblocks.domain.template.repository;

import java.util.Collection;

import javax.annotation.Nonnull;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.template.model.Template;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface TemplateRepository extends ReactiveMongoRepository<Template, String> {

    @Nonnull
    Mono<Template> findById(@Nonnull String id);

    Flux<Template> findByApplicationIdIn(Collection<String> applicationId);

    Mono<Template> findByApplicationId(String applicationId);
}
