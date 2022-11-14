package com.openblocks.infra.serverlog;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface ServerLogRepository extends ReactiveMongoRepository<ServerLog, String> {

}

