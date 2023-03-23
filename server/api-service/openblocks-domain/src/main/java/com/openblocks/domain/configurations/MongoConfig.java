package com.openblocks.domain.configurations;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.ReactiveAuditorAware;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsTemplate;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;

import com.github.cloudyrock.mongock.driver.mongodb.springdata.v3.SpringDataMongoV3Driver;
import com.github.cloudyrock.spring.v5.MongockSpring5;
import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.WriteConcern;
import com.openblocks.domain.user.model.User;
import com.openblocks.sdk.config.MaterialProperties;
import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableReactiveMongoAuditing
@EnableReactiveMongoRepositories(basePackages = {"com.openblocks.infra", "com.openblocks.domain"})
public class MongoConfig {

    @Autowired
    private MaterialProperties materialProperties;

    @Autowired
    private MappingMongoConverter mappingMongoConverter;

    @PostConstruct
    public void init() {
        mappingMongoConverter.setMapKeyDotReplacement("##OB_REPLACE##");
    }

    @Bean
    public MongockSpring5.MongockApplicationRunner mongockApplicationRunner(ApplicationContext springContext, MongoTemplate mongoTemplate) {
        SpringDataMongoV3Driver springDataMongoV3Driver = SpringDataMongoV3Driver.withDefaultLock(mongoTemplate);
        springDataMongoV3Driver.setWriteConcern(WriteConcern.JOURNALED.withJournal(false));
        springDataMongoV3Driver.setReadConcern(ReadConcern.LOCAL);

        return MongockSpring5.builder()
                .setDriver(springDataMongoV3Driver)
                .addChangeLogsScanPackages(List.of("com.openblocks.runner.migrations"))
                .setSpringContext(springContext)
                .buildApplicationRunner();
    }

    /**
     * inject {@link HasIdAndAuditing#setCreatedBy}}/{@link HasIdAndAuditing#setModifiedBy}} for JPA
     */
    @SuppressWarnings("ReactiveStreamsNullableInLambdaInTransform")
    @Bean
    public ReactiveAuditorAware<String> auditorProvider() {
        return () -> ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> (User) securityContext.getAuthentication().getPrincipal())
                .map(User::getId);
    }

    @Bean
    @Primary
    public ReactiveMongoTemplate reactiveMongoTemplate(ReactiveMongoDatabaseFactory mongoDbFactory, MappingMongoConverter
            mappingMongoConverter) {
        return new ReactiveMongoTemplate(mongoDbFactory, mappingMongoConverter);
    }

    /**
     * secondaryPreferred
     */
    @Bean("reactiveMongoSlaveTemplate")
    public ReactiveMongoTemplate reactiveMongoSlaveTemplate(ReactiveMongoDatabaseFactory mongoDbFactory,
            MappingMongoConverter mappingMongoConverter) {
        ReactiveMongoTemplate mongoTemplate = new ReactiveMongoTemplate(mongoDbFactory, mappingMongoConverter);
        mongoTemplate.setReadPreference(ReadPreference.secondaryPreferred());
        return mongoTemplate;
    }

    @Bean("materialGridFsTemplate")
    public ReactiveGridFsTemplate reactiveGridFsTemplate(ReactiveMongoDatabaseFactory factory, MappingMongoConverter converter) {
        return new ReactiveGridFsTemplate(factory, converter, materialProperties.getMongodbGridFs().getBucketName());
    }

    /**
     * used by mongock
     */
    @Bean
    public MongoTemplate mongoTemplate(MongoDatabaseFactory mongoDbFactory, MappingMongoConverter mappingMongoConverter) {
        return new MongoTemplate(mongoDbFactory, mappingMongoConverter);
    }
}
