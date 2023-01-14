package com.openblocks.api.material;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.domain.asset.service.AssetService;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.constant.Url;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = {Url.ASSET_URL, NewUrl.ASSET_URL})
public class AssetController {

    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public Mono<Void> getById(@PathVariable String id, ServerWebExchange exchange) {
        exchange.getResponse().getHeaders().set(HttpHeaders.CACHE_CONTROL, "public, max-age=7776000, immutable");
        return service.makeImageResponse(exchange, id);
    }
}
