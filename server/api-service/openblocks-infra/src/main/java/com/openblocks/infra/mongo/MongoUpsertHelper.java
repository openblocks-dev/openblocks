package com.openblocks.infra.mongo;

import java.time.Instant;
import java.util.Collection;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.model.DeleteOneModel;
import com.mongodb.client.model.UpdateOneModel;
import com.mongodb.client.model.UpdateOptions;
import com.openblocks.sdk.constants.FieldName;
import com.openblocks.sdk.constants.GlobalContext;
import com.openblocks.sdk.event.BeforeSaveEvent;
import com.openblocks.sdk.models.HasIdAndAuditing;

import reactor.core.publisher.Mono;

@Component
public class MongoUpsertHelper {

    @Autowired
    private ReactiveMongoTemplate reactiveMongoTemplate;

    @Autowired
    private MongoConverter mongoConverter;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

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
                    applicationEventPublisher.publishEvent(new BeforeSaveEvent<>(partialResource));
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
     * reactiveMongoTemplate#upsert is not used because createdAt/createdBy/updatedAt/updatedBy params cannot be set here
     */
    @SuppressWarnings("unchecked")
    public <T extends HasIdAndAuditing> Mono<T> upsertWithAuditingParams(T newResource, Criteria criteria) {
        return reactiveMongoTemplate.findOne(new Query(criteria), (Class<T>) newResource.getClass())
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
        return upsert(newResource, Criteria.where(uniqueKeyName).is(uniqueKeyValue));
    }

    public Mono<Boolean> upsert(Update update, String uniqueKeyName, String uniqueKeyValue, Class<?> collection) {
        return upsert(update, Criteria.where(uniqueKeyName).is(uniqueKeyValue), collection);
    }

    public <T> Mono<Boolean> upsert(T newResource, Criteria criteria) {
        Update update = convertToUpdate(newResource);
        return upsert(update, criteria, newResource.getClass());
    }

    public Mono<Boolean> upsert(Update update, Criteria criteria, Class<?> collection) {
        return reactiveMongoTemplate.upsert(new Query(criteria), update, collection)
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

    public <T extends HasIdAndAuditing> Mono<Boolean> bulkUpdate(Collection<PartialResourceWithId<T>> partialResourceWithIds) {
        if (CollectionUtils.isEmpty(partialResourceWithIds)) {
            return Mono.empty();
        }
        var operations = partialResourceWithIds.stream().map(partialResourceWithId -> {
            BasicDBObject doc = new BasicDBObject();
            mongoConverter.write(partialResourceWithId.partialResource, doc);
            var filter = new Document("_id", new ObjectId(partialResourceWithId.id));
            return new UpdateOneModel<Document>(filter, new Document("$set", doc), new UpdateOptions().upsert(false));
        }).toList();
        return reactiveMongoTemplate.getCollection(reactiveMongoTemplate.getCollectionName(partialResourceWithIds.iterator().next().partialResource.getClass()))
                .flatMap(collection -> Mono.from(collection.bulkWrite(operations)))
                .map(bulkWriteResult -> bulkWriteResult.getModifiedCount() > 0);
    }

    public <T extends HasIdAndAuditing> Mono<Boolean> bulkRemove(Collection<Document> filters, Class<T> tClass) {
        if (CollectionUtils.isEmpty(filters)) {
            return Mono.empty();
        }
        var operations = filters.stream().map(filter -> new DeleteOneModel<Document>(filter)).toList();
        return reactiveMongoTemplate.getCollection(reactiveMongoTemplate.getCollectionName(tClass))
                .flatMap(collection -> Mono.from(collection.bulkWrite(operations)))
                .map(bulkWriteResult -> bulkWriteResult.getDeletedCount() > 0);
    }

    public record PartialResourceWithId<T>(T partialResource, String id) {
    }

}
