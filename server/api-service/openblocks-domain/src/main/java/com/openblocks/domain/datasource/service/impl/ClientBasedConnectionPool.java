package com.openblocks.domain.datasource.service.impl;

import static com.openblocks.infra.perf.PerfEvent.CLIENT_BASED_CONNECTION_CREATE;
import static com.openblocks.infra.perf.PerfEvent.CLIENT_BASED_CONNECTION_REMOVE;
import static com.openblocks.infra.perf.PerfEvent.CLIENT_BASED_CONNECTION_SIZE;
import static com.openblocks.infra.perf.PerfEvent.HIKARI_POOL_ACTIVE_CONNECTIONS;
import static com.openblocks.infra.perf.PerfEvent.HIKARI_POOL_IDLE_CONNECTIONS;
import static com.openblocks.infra.perf.PerfEvent.HIKARI_POOL_TOTAL_CONNECTIONS;
import static com.openblocks.infra.perf.PerfEvent.HIKARI_POOL_WAITING_CONNECTIONS;
import static com.openblocks.sdk.exception.BizError.PLUGIN_CREATE_CONNECTION_FAILED;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.querySharedScheduler;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.RemovalListener;
import com.google.common.cache.RemovalNotification;
import com.google.common.collect.ImmutableList;
import com.openblocks.domain.datasource.model.ClientBasedDatasourceConnectionHolder;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceConnectionHolder;
import com.openblocks.domain.datasource.service.DatasourceConnectionPool;
import com.openblocks.domain.plugin.DatasourceMetaInfo;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.infra.perf.PerfEvent;
import com.openblocks.infra.perf.PerfHelper;
import com.openblocks.sdk.exception.BaseException;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.plugin.common.QueryExecutionUtils;
import com.openblocks.sdk.plugin.common.sql.HikariPerfWrapper;

import io.micrometer.core.instrument.Tags;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

/**
 * for hikari pool/redis client/es client/..., these clients has taken over underlying connections
 * and their status management, so these clients will be cached and invalidated once datasource is updated.
 */
@Slf4j
@Service
public class ClientBasedConnectionPool implements DatasourceConnectionPool {

    private static final int DEFAULT_RETRIEVE_CONNECTION_TIMES = 5;

    private static final List<PerfEvent> HIKARI_PERF_CONFIG = ImmutableList.of(
            HIKARI_POOL_ACTIVE_CONNECTIONS,
            HIKARI_POOL_IDLE_CONNECTIONS,
            HIKARI_POOL_WAITING_CONNECTIONS,
            HIKARI_POOL_TOTAL_CONNECTIONS
    );
    private static final Map<ClientBasedDatasourceCacheKey, HikariPerfWrapper> HIKARI_PERF_WRAPPER_MAP = new ConcurrentHashMap<>();

    @Autowired
    private DatasourceMetaInfoService datasourceMetaInfoService;
    @Autowired
    private PerfHelper perfHelper;

    @PostConstruct
    public void init() {
        List<DatasourceMetaInfo> supportedDatasourceTypes = datasourceMetaInfoService.getJavaBasedSupportedDatasourceMetaInfos();
        supportedDatasourceTypes.stream()
                .filter(datasourceMetaInfo -> datasourceMetaInfo.getConnectionPool() == ClientBasedConnectionPool.class)
                .forEach(datasourceMetaInfo ->
                        perfHelper.gaugeSafely(CLIENT_BASED_CONNECTION_SIZE, Tags.of("type", datasourceMetaInfo.getType()), cache,
                                value -> value.asMap().keySet()
                                        .stream()
                                        .filter(cacheKey -> cacheKey.datasource().getType().equals(datasourceMetaInfo.getType()))
                                        .toList()
                                        .size()));

        for (DatasourceMetaInfo metaInfo : supportedDatasourceTypes) {
            String datasourceType = metaInfo.getType();
            for (var perfEvent : HIKARI_PERF_CONFIG) {
                perfHelper.gaugeSafely(perfEvent, Tags.of("datasourceType", datasourceType), HIKARI_PERF_WRAPPER_MAP,
                        perfWrapperMap -> perfWrapperMap.entrySet()
                                .stream()
                                .filter(entry -> StringUtils.equals(entry.getKey().datasource().getType(), datasourceType))
                                .map(Entry::getValue)
                                .mapToInt(hikariPerfWrapper -> switch (perfEvent) {
                                    case HIKARI_POOL_ACTIVE_CONNECTIONS -> hikariPerfWrapper.getActiveConnections();
                                    case HIKARI_POOL_IDLE_CONNECTIONS -> hikariPerfWrapper.getIdleConnections();
                                    case HIKARI_POOL_WAITING_CONNECTIONS -> hikariPerfWrapper.getWaitingConnections();
                                    case HIKARI_POOL_TOTAL_CONNECTIONS -> hikariPerfWrapper.getTotalConnections();
                                    default -> 0;
                                })
                                .sum());
            }
        }
    }


    private final LoadingCache<ClientBasedDatasourceCacheKey, Mono<ClientBasedDatasourceConnectionHolder>> cache = CacheBuilder.newBuilder()
            .expireAfterAccess(Duration.ofHours(1L))
            .maximumSize(1000)
            .removalListener(new RemovalListener<ClientBasedDatasourceCacheKey, Mono<ClientBasedDatasourceConnectionHolder>>() {
                @Override
                public void onRemoval(
                        @Nonnull RemovalNotification<ClientBasedDatasourceCacheKey, Mono<ClientBasedDatasourceConnectionHolder>> notification) {

                    ClientBasedDatasourceCacheKey key = notification.getKey();
                    String type = key.datasource().getType();
                    perfHelper.count(CLIENT_BASED_CONNECTION_REMOVE, Tags.of("type", type, "cause", notification.getCause().name()));

                    HIKARI_PERF_WRAPPER_MAP.remove(key);
                    Mono.just(datasourceMetaInfoService.getDatasourceConnector(key.datasource().getType()))
                            .flatMap(factory -> notification.getValue().flatMap(connection -> factory.destroyConnection(connection.connection())))
                            .subscribeOn(querySharedScheduler())
                            .subscribe();
                }
            })
            .build(new CacheLoader<>() {
                @Override
                public Mono<ClientBasedDatasourceConnectionHolder> load(@Nonnull ClientBasedDatasourceCacheKey key) {
                    Datasource datasource = key.datasource();
                    perfHelper.count(CLIENT_BASED_CONNECTION_CREATE, Tags.of("type", datasource.getType()));

                    releasePreviousConnection(datasource); // datasource is updated, so release previous connections

                    return create(datasource)
                            .doOnNext(connection -> {
                                if (connection.connection() instanceof HikariPerfWrapper wrapper) {
                                    HIKARI_PERF_WRAPPER_MAP.put(key, wrapper);
                                }
                            })
                            .cache();
                }
            });

    private void releasePreviousConnection(Datasource datasource) {
        cache.asMap().keySet()
                .stream()
                .filter(cacheKey -> StringUtils.equals(datasource.getId(), cacheKey.datasource().getId()))
                .forEach(cache::invalidate);
    }

    @Override
    public Mono<? extends DatasourceConnectionHolder> getOrCreateConnection(Datasource datasource) {
        ClientBasedDatasourceCacheKey clientBasedDatasourceCacheKey = ClientBasedDatasourceCacheKey.of(datasource);
        return Mono.defer(() -> cache.getUnchecked(clientBasedDatasourceCacheKey))
                .flatMap(clientBasedDatasourceConnection -> {
                    if (clientBasedDatasourceConnection.isStale()) {
                        cache.invalidate(clientBasedDatasourceCacheKey);
                        return Mono.error(new RuntimeException("stale datasource")); // by retry
                    }
                    return Mono.just(clientBasedDatasourceConnection);
                })
                .retry(DEFAULT_RETRIEVE_CONNECTION_TIMES)
                .onErrorMap(throwable -> {
                    if (throwable instanceof BaseException) {
                        return throwable;
                    }
                    log.error("get connection error.", throwable);
                    return new BizException(PLUGIN_CREATE_CONNECTION_FAILED, "PLUGIN_CREATE_CONNECTION_FAILED", throwable.getMessage());
                })
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }

    @Override
    public Object info(@Nullable String datasourceId) {
        return HIKARI_PERF_WRAPPER_MAP.entrySet()
                .stream()
                .filter(entry -> {
                    if (StringUtils.isBlank(datasourceId)) {
                        return true;
                    }
                    return datasourceId.equals(entry.getKey().id());
                })
                .limit(100)
                .map(entry -> {
                    HikariPerfWrapper wrapper = entry.getValue();
                    Map<String, Integer> connections = Map.of("total", wrapper.getTotalConnections(),
                            "idle", wrapper.getIdleConnections(),
                            "active", wrapper.getActiveConnections(),
                            "waiting", wrapper.getWaitingConnections());
                    return Map.of("connections", connections,
                            "datasource", wrapper.getDatasourceProperties(),
                            "healthCheck", wrapper.getHealthCheckProperties());
                })
                .collect(Collectors.toList());
    }

    private Mono<ClientBasedDatasourceConnectionHolder> create(Datasource datasource) {
        return datasourceMetaInfoService.getDatasourceConnector(datasource.getType())
                .doCreateConnection(datasource.getDetailConfig())
                .map(ClientBasedDatasourceConnectionHolder::new);
    }

    /**
     * datasource {@link #id} and {@link #updateTime} are used for equals & hashcode methods
     */
    public record ClientBasedDatasourceCacheKey(String id, Instant updateTime, Datasource datasource) {

        public static ClientBasedDatasourceCacheKey of(Datasource datasource) {
            return new ClientBasedDatasourceCacheKey(datasource.getId(), datasource.getUpdatedAt(), datasource);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) {
                return true;
            }
            if (o == null || getClass() != o.getClass()) {
                return false;
            }
            ClientBasedDatasourceCacheKey that = (ClientBasedDatasourceCacheKey) o;
            return Objects.equals(id, that.id) && Objects.equals(updateTime, that.updateTime);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id, updateTime);
        }
    }
}