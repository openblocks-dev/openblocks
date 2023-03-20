package com.openblocks.domain.mongodb;

public interface AfterMongodbRead {

    void afterMongodbRead(MongodbInterceptorContext context);
}
