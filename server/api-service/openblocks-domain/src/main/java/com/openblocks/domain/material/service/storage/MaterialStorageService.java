package com.openblocks.domain.material.service.storage;

import org.reactivestreams.Publisher;
import org.springframework.core.io.buffer.DataBuffer;

import com.openblocks.domain.material.model.MaterialMeta;

import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

public interface MaterialStorageService {
    Scheduler SCHEDULER = Schedulers.newBoundedElastic(50,
            1000
            , "material-transport");

    Mono<Boolean> save(MaterialMeta materialMeta, byte[] content);

    Publisher<? extends DataBuffer> download(MaterialMeta materialMeta);

    Mono<Void> delete(MaterialMeta materialMeta);
}
