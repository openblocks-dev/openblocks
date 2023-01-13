package com.openblocks.plugin.mongo.model;

import org.bson.Document;

import com.google.common.base.Preconditions;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoDatabase;

import reactor.core.publisher.Mono;

public class MongoConnection {

    private static final String TEST_CONNECTION_QUERY = "ping";
    private final MongoClient mongoClient;
    private final String database;

    public MongoConnection(MongoClient mongoClient, String database) {
        Preconditions.checkNotNull(mongoClient);
        this.mongoClient = mongoClient;
        this.database = database;
    }

    public MongoDatabase getDatabase() {
        return mongoClient.getDatabase(database);
    }

    public Mono<Document> ping() {
        return Mono.from(mongoClient.getDatabase(database).runCommand(new Document(TEST_CONNECTION_QUERY, 1)));
    }

    public Mono<Void> close() {
        return Mono.fromRunnable(mongoClient::close);
    }
}
