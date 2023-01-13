package com.openblocks.domain.asset.service;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.openblocks.domain.asset.model.Asset;

public interface AssetRepository extends ReactiveMongoRepository<Asset, String> {
}
