package com.openblocks.infra.util;

import org.springframework.data.domain.Pageable;

import reactor.core.publisher.Flux;

public class FluxHelper {

    public static <T> Flux<T> getAllPageByPage(PageFetcher<T> pageFetcher, Pageable first) {
        Flux<T> currentFluxPage = pageFetcher.fetch(first).cache();
        return currentFluxPage.hasElements()
                .flatMapMany(hasElement -> {
                    if (hasElement) {
                        return currentFluxPage.concatWith(getAllPageByPage(pageFetcher, first.next()));
                    }
                    return currentFluxPage;
                });
    }

    public interface PageFetcher<T> {

        Flux<T> fetch(Pageable pageable);
    }
}
