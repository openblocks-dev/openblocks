package com.openblocks.domain.mongodb;

public interface BeforeMongodbWrite {

    void beforeMongodbWrite(MongodbInterceptorContext context);
}
