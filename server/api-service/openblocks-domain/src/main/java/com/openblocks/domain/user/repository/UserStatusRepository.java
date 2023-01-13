package com.openblocks.domain.user.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.openblocks.domain.user.model.UserStatus;

@Repository
public interface UserStatusRepository extends ReactiveMongoRepository<UserStatus, String> {

}
