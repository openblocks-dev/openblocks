package com.openblocks.infra.localcache;

import static com.google.common.base.MoreObjects.firstNonNull;
import static java.util.concurrent.Executors.newSingleThreadScheduledExecutor;

import java.time.Duration;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.CheckReturnValue;
import javax.annotation.Nonnull;

import com.google.common.base.Preconditions;
import com.google.common.util.concurrent.MoreExecutors;
import com.openblocks.sdk.destructor.DestructorUtil;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
public final class ReloadableCache<T> {

    private CacheValueMonoProvider<T> factory;
    private volatile T cachedValue;
    private String cacheName;

    private ReloadableCache() {
    }

    public T getCachedOrDefault(T defaultValue) {
        return firstNonNull(cachedValue, defaultValue);
    }

    public Mono<T> getMonoValue() {
        if (cachedValue == null) {
            return factory.getValue() // cache stampeding can be met here, but seems not a big problem here
                    .doOnNext(value -> cachedValue = value);
        }
        return Mono.just(cachedValue);
    }

    @CheckReturnValue
    public static <T> ReloadableCacheBuilder<T> newBuilder() {
        return new ReloadableCacheBuilder<>();
    }

    public static class ReloadableCacheBuilder<T> {

        private Duration interval;
        private CacheValueMonoProvider<T> factory;
        private String cacheName;

        @CheckReturnValue
        public ReloadableCacheBuilder<T> setInterval(Duration interval) {
            this.interval = interval;
            return this;
        }

        @CheckReturnValue
        public ReloadableCacheBuilder<T> setFactory(CacheValueMonoProvider<T> factory) {
            this.factory = factory;
            return this;
        }

        @CheckReturnValue
        public ReloadableCacheBuilder<T> setName(String name) {
            this.cacheName = name;
            return this;
        }

        @CheckReturnValue
        public ReloadableCache<T> build() {
            ensureParams();
            ReloadableCache<T> cache = new ReloadableCache<>();
            cache.factory = this.factory;
            cache.cacheName = this.cacheName;
            startScheduledReloadTask(cache);
            return cache;
        }

        @SuppressWarnings("UnstableApiUsage")
        private void startScheduledReloadTask(ReloadableCache<T> cache) {
            ScheduledExecutorService scheduledExecutor = newSingleThreadScheduledExecutor();
            scheduledExecutor.scheduleAtFixedRate(() -> {
                log.debug("{} scheduled reload...", cacheName);
                try {
                    cache.cachedValue = factory.getValue().block();
                } catch (Exception e) {
                    // do not update value in error cases
                    log.error("scheduled load error", e);
                }
            }, 0, interval.toMillis(), TimeUnit.MILLISECONDS);

            DestructorUtil.register(() -> MoreExecutors.shutdownAndAwaitTermination(scheduledExecutor, Duration.ofSeconds(10)),
                    "shutdown and await reload task executor termination.");
        }

        private void ensureParams() {
            Preconditions.checkNotNull(factory);
            Preconditions.checkNotNull(interval);
        }
    }

    @FunctionalInterface
    public interface CacheValueMonoProvider<T> {
        @Nonnull
        Mono<T> getValue();
    }
}
