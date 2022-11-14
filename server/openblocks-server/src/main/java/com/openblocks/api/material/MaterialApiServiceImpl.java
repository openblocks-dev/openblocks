package com.openblocks.api.material;

import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static org.apache.commons.io.FileUtils.ONE_GB;
import static org.apache.commons.io.FileUtils.ONE_MB;
import static org.apache.commons.io.FileUtils.byteCountToDisplaySize;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.math.NumberUtils;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.stereotype.Service;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.material.MaterialController.MaterialView;
import com.openblocks.api.usermanagement.OrgDevChecker;
import com.openblocks.domain.material.model.MaterialMeta;
import com.openblocks.domain.material.service.meta.MaterialMetaService;
import com.openblocks.domain.material.service.storage.MaterialStorageService;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.config.dynamic.ConfigInstanceHelper;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.util.DateTimeUtils;

import reactor.core.publisher.Mono;

@Service
public class MaterialApiServiceImpl implements MaterialApiService {

    private static final long DEFAULT_SINGLE_FILE_SIZE_LIMIT = 2 * ONE_MB;
    private static final long DEFAULT_TOTAL_STORAGE_SIZE_LIMIT = 100 * ONE_MB;
    private static final long DEFAULT_TOTAL_NETFLOW_SIZE_LIMIT = ONE_GB;

    @Autowired
    private MaterialMetaService materialMetaService;
    @Autowired
    private MaterialStorageService materialStorageService;
    @Autowired
    private SessionUserService sessionUserService;
    @Autowired
    private OrgDevChecker orgDevChecker;
    @Autowired
    private ConfigCenter configCenter;
    @Autowired
    private ReactiveRedisTemplate<String, String> reactiveRedisTemplate;

    private ConfigInstanceHelper configInstance;

    @PostConstruct
    public void init() {
        configInstance = new ConfigInstanceHelper(configCenter.threshold());
    }

    /**
     * @param content base64
     */
    @Override
    public Mono<MaterialMeta> upload(String filename, String content) {

        byte[] decode = Base64.getDecoder().decode(content);

        return checkSingleFileSize(decode.length)
                .then(sessionUserService.getVisitorOrgMemberCache())
                .delayUntil(__ -> orgDevChecker.checkCurrentOrgDev())
                .delayUntil(orgMember -> checkNameUnique(orgMember.getOrgId(), filename))
                .delayUntil(orgMember -> checkTotalSize(orgMember.getOrgId(), decode.length))
                .delayUntil(orgMember -> checkNetflowSize(orgMember.getOrgId(), decode.length))
                .flatMap(orgMember -> {
                    MaterialMeta materialMeta = MaterialMeta.builder()
                            .orgId(orgMember.getOrgId())
                            .filename(filename)
                            .size(decode.length)
                            .build();
                    return materialMetaService.create(materialMeta);
                })
                .delayUntil(materialMeta -> materialStorageService.save(materialMeta, decode))
                .delayUntil(this::updateNetflowSize);
    }

    @Override
    public Publisher<? extends DataBuffer> download(MaterialMeta materialMeta) {
        return checkMaterialOrg(materialMeta.getOrgId())
                .then(checkNetflowSize(materialMeta.getOrgId(), materialMeta.getSize()))
                .thenMany(materialStorageService.download(materialMeta))
                .delayUntil(__ -> updateNetflowSize(materialMeta));
    }

    @Override
    public Mono<List<MaterialView>> list() {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMapMany(orgMember -> materialMetaService.getByOrgId(orgMember.getOrgId()))
                .map(materialMeta -> MaterialView.builder()
                        .id(materialMeta.getId())
                        .filename(materialMeta.getFilename())
                        .build()
                )
                .collectList();
    }

    @Override
    public Mono<Void> delete(String id) {
        return materialMetaService.findById(id)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new BizException(BizError.INVALID_PARAMETER, "10095"))))
                .delayUntil(materialMeta -> checkMaterialOrg(materialMeta.getOrgId()))
                .delayUntil(__ -> orgDevChecker.checkCurrentOrgDev())
                .delayUntil(__ -> materialMetaService.deleteById(id))
                .flatMap(materialMeta -> materialStorageService.delete(materialMeta));
    }

    private Mono<Void> checkMaterialOrg(String materialOrgId) {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMap(orgMember -> {
                    if (orgMember.getOrgId().equals(materialOrgId)) {
                        return Mono.empty();
                    }
                    return Mono.error(new BizException(BizError.INVALID_MATERIAL_REQUEST, "FILE_ORG_NOT_MATCH"));
                });
    }

    private Mono<Void> checkSingleFileSize(long size) {
        long sizeLimit = configInstance.ofLong("material.single-size-limit", DEFAULT_SINGLE_FILE_SIZE_LIMIT);
        if (size > sizeLimit) {
            return Mono.error(new BizException(BizError.INVALID_MATERIAL_REQUEST, "EXCEEDS_FILE_SIZE_LIMIT", byteCountToDisplaySize(sizeLimit)));
        }
        return Mono.empty();
    }

    private Mono<Void> checkTotalSize(String orgId, long newSize) {
        return materialMetaService.totalSize(orgId)
                .flatMap(size -> {
                    long totalSizeLimit = configInstance.ofLong("material.total-size-limit", DEFAULT_TOTAL_STORAGE_SIZE_LIMIT);
                    if ((size + newSize) > totalSizeLimit) {
                        return Mono.error(
                                new BizException(BizError.INVALID_MATERIAL_REQUEST, "EXCEEDS_ORG_SIZE_LIMIT",
                                        byteCountToDisplaySize(totalSizeLimit)));
                    }
                    return Mono.empty();
                });
    }

    private Mono<Void> checkNetflowSize(String orgId, long newSize) {
        ReactiveValueOperations<String, String> opsForValue = reactiveRedisTemplate.opsForValue();
        return opsForValue.get(buildRedisKey(orgId))
                .map(o -> NumberUtils.toLong(Objects.toString(o), 0L))
                .defaultIfEmpty(0L)
                .flatMap(size -> {
                    long limit = configInstance.ofLong("material.total-netflow-size-limit", DEFAULT_TOTAL_NETFLOW_SIZE_LIMIT);
                    if (size + newSize > limit) {
                        return ofError(BizError.INVALID_MATERIAL_REQUEST, "EXCEEDS_DAILY_SIZE_LIMIT", byteCountToDisplaySize(limit));
                    }
                    return Mono.empty();
                });
    }

    private Mono<Void> updateNetflowSize(MaterialMeta materialMeta) {
        ReactiveValueOperations<String, String> opsForValue = reactiveRedisTemplate.opsForValue();
        String key = buildRedisKey(materialMeta.getOrgId());
        return opsForValue.setIfAbsent(key, materialMeta.getSize() + "", Duration.ofDays(2))
                .flatMap(set -> {
                    if (set) {
                        return Mono.empty();
                    }
                    return opsForValue.increment(key, materialMeta.getSize()).then();
                });
    }

    private String buildRedisKey(String orgId) {
        return String.format("material_netflow_%s_%s", orgId, DateTimeUtils.format(new Date()));
    }

    private Mono<Void> checkNameUnique(String orgId, String filename) {
        return materialMetaService.existsByOrgIdAndFilename(orgId, filename)
                .flatMap(exist -> {
                    if (exist) {
                        return Mono.error(new BizException(BizError.INVALID_PARAMETER, "DUPLICATE_MATERIAL_NAME"));
                    }
                    return Mono.empty();
                });
    }
}
