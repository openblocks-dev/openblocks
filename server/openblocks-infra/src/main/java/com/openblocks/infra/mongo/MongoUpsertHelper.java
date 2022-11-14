package com.openblocks.infra.mongo;

import java.time.Instant;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.openblocks.sdk.constants.FieldName;
import com.openblocks.sdk.constants.GlobalContext;
import com.openblocks.sdk.models.HasIdAndAuditing;

import reactor.core.publisher.Mono;

@Component
public class MongoUpsertHelper {

    @Autowired
    private ReactiveMongoTemplate reactiveMongoTemplate;

    @Autowired
    private MongoConverter mongoConverter;

    public <T extends HasIdAndAuditing> Mono<Boolean> updateById(T partialResource, String id) {
        return update(partialResource, FieldName.ID, id);
    }

    public <T extends HasIdAndAuditing> Mono<Boolean> update(T partialResource, String uniqueKeyName, String uniqueKeyValue) {
        Query query = new Query(Criteria.where(uniqueKeyName).is(uniqueKeyValue));
        return update(partialResource, query);
    }

    public <T> Mono<Boolean> remove(Query query, Class<T> tClass) {
        return reactiveMongoTemplate.remove(query, tClass)
                .map(deleteResult -> deleteResult.getDeletedCount() > 0);
    }

    /**
     * Besides the input partialResource, we will update the UpdateAt, ModifiedBy fields of the resource.
     *
     * @see #updatePurely(HasIdAndAuditing, Query) for purely update.
     */
    public <T extends HasIdAndAuditing> Mono<Boolean> update(T partialResource, Query query) {
        return Mono.deferContextual(ctx -> {
                    partialResource.setUpdatedAt(Instant.now());
                    partialResource.setModifiedBy(ctx.getOrDefault(GlobalContext.VISITOR_ID, GlobalContext.SYSTEM_USER_ID));
                    return Mono.just(convertToUpdate(partialResource));
                })
                .flatMap(updateData -> reactiveMongoTemplate.updateFirst(query, updateData, partialResource.getClass()))
                .map(updateResult -> updateResult.getModifiedCount() > 0);
    }

    public <T extends HasIdAndAuditing> Mono<Boolean> updatePurely(T partialResource, String id) {
        Query query = new Query(Criteria.where(FieldName.ID).is(id));
        return updatePurely(partialResource, query);
    }

    /**
     * will only update the input partialResource by query.
     *
     * @see #update(HasIdAndAuditing, Query) for more update.
     */
    public <T extends HasIdAndAuditing> Mono<Boolean> updatePurely(T partialResource, Query query) {
        return Mono.just(convertToUpdate(partialResource))
                .flatMap(updateData -> reactiveMongoTemplate.updateFirst(query, updateData, partialResource.getClass()))
                .map(updateResult -> updateResult.getModifiedCount() > 0);
    }

    /**
     * reactiveMongoTemplate#upsert is not used because createdAt/createdBy/updatedAt/updatedBy params cannot be set here
     */
    @SuppressWarnings("unchecked")
    public <T extends HasIdAndAuditing> Mono<T> upsertWithAuditingParams(T newResource, String uniqueKeyName, String uniqueKeyValue) {
        Query query = new Query(Criteria.where(uniqueKeyName).is(uniqueKeyValue));
        return reactiveMongoTemplate.findOne(query, (Class<T>) newResource.getClass())
                .flatMap(existingResource -> {
                    newResource.setId(existingResource.getId());
                    newResource.setCreatedAt(existingResource.getCreatedAt());
                    newResource.setCreatedBy(existingResource.getCreatedBy());
                    return reactiveMongoTemplate.save(newResource);
                })
                .switchIfEmpty(Mono.defer(() -> reactiveMongoTemplate.save(newResource)));
    }

    /**
     * used for createdAt/createdBy/updatedAt/updatedBy is not required
     */
    public <T> Mono<Boolean> upsert(T newResource, String uniqueKeyName, String uniqueKeyValue) {
        Query query = new Query(Criteria.where(uniqueKeyName).is(uniqueKeyValue));
        return upsert(newResource, query);
    }

    public Mono<Boolean> upsert(Update update, String uniqueKeyName, String uniqueKeyValue, Class<?> collection) {
        Query query = new Query(Criteria.where(uniqueKeyName).is(uniqueKeyValue));
        return upsert(update, query, collection);
    }

    public <T> Mono<Boolean> upsert(T newResource, Query query) {
        Update update = convertToUpdate(newResource);
        return upsert(update, query, newResource.getClass());
    }

    public Mono<Boolean> upsert(Update update, Query query, Class<?> collection) {
        return reactiveMongoTemplate.upsert(query, update, collection)
                .map(updateResult -> updateResult.getModifiedCount() > 0);
    }

    @SuppressWarnings("unchecked")
    private Update convertToUpdate(Object resource) {
        Update updateObj = new Update();
        BasicDBObject basicDBObject = new BasicDBObject();
        mongoConverter.write(resource, basicDBObject);
        Map<String, Object> updateMap = ((DBObject) basicDBObject).toMap();
        updateMap.forEach(updateObj::set);
        return updateObj;
    }

}
