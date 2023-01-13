package com.openblocks.domain.material.service.storage;

import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsResource;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsTemplate;
import org.springframework.stereotype.Service;

import com.openblocks.domain.material.model.MaterialMeta;

import reactor.core.publisher.Mono;

@Service
public class GridFsStorageServiceImpl implements MaterialStorageService {

    @Autowired
    @Qualifier("materialGridFsTemplate")
    private ReactiveGridFsTemplate reactiveGridFsTemplate;

    @Override
    public Mono<Boolean> save(MaterialMeta materialMeta, byte[] content) {
        return reactiveGridFsTemplate.store(Mono.just(new DefaultDataBufferFactory().wrap(content)), buildFilename(materialMeta))
                .thenReturn(true);
    }

    @Override
    public Publisher<? extends DataBuffer> download(MaterialMeta materialMeta) {
        return reactiveGridFsTemplate.findFirst(queryByFilename(materialMeta))
                .flatMap(reactiveGridFsTemplate::getResource)
                .flatMapMany(ReactiveGridFsResource::getContent);
    }

    @Override
    public Mono<Void> delete(MaterialMeta materialMeta) {
        return reactiveGridFsTemplate.delete(queryByFilename(materialMeta));
    }

    private Query queryByFilename(MaterialMeta materialMeta) {
        Criteria criteria = Criteria.where("filename").is(buildFilename(materialMeta));
        return new Query(criteria);
    }

    private String buildFilename(MaterialMeta materialMeta) {
        return materialMeta.getOrgId() + "/" + materialMeta.getFilename();
    }
}
