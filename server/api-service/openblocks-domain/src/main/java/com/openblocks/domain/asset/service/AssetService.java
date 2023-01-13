package com.openblocks.domain.asset.service;

import org.springframework.http.codec.multipart.Part;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.domain.asset.model.Asset;

import reactor.core.publisher.Mono;

public interface AssetService {

    Mono<Asset> getById(String id);

    Mono<Asset> upload(Part filePart, int i, boolean isThumbnail);

    Mono<Void> remove(String assetId);

    Mono<Void> makeImageResponse(ServerWebExchange exchange, String assetId);

}
