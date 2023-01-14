package com.openblocks.api.material;

import java.util.List;

import org.reactivestreams.Publisher;
import org.springframework.core.io.buffer.DataBuffer;

import com.openblocks.api.material.MaterialController.MaterialView;
import com.openblocks.domain.material.model.MaterialMeta;
import com.openblocks.domain.material.model.MaterialType;

import reactor.core.publisher.Mono;

public interface MaterialApiService {

    /**
     * @param content base64
     */
    Mono<MaterialMeta> upload(String filename, String content, MaterialType type);

    Publisher<? extends DataBuffer> download(MaterialMeta materialMeta);

    Mono<List<MaterialView>> list();

    Mono<Void> delete(String id);
}
