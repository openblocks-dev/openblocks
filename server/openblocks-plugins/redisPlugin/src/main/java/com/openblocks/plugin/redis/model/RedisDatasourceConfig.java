package com.openblocks.plugin.redis.model;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIG_TYPE;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;
import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.util.Map;
import java.util.function.Function;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class RedisDatasourceConfig implements DatasourceConnectionConfig {

    private final String host;
    private final Long port;
    private final boolean usingSsl;
    private final String username;
    @JsonView(JsonViews.Internal.class)
    private String password;
    private final boolean usingUri;
    @JsonView(JsonViews.Internal.class)
    private String uri;

    @JsonCreator
    public RedisDatasourceConfig(String host, Long port, boolean usingSsl, String username, String password, boolean usingUri, String uri) {
        this.host = host;
        this.port = port;
        this.usingSsl = usingSsl;
        this.username = username;
        this.password = password;
        this.usingUri = usingUri;
        this.uri = uri;
    }

    public static RedisDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        RedisDatasourceConfig result = fromJson(toJson(requestMap), RedisDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(DATASOURCE_ARGUMENT_ERROR, "INVALID_REDIS_CONFIG");
        }
        return result;
    }

    @Override
    public DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        try {
            password = encryptFunc.apply(password);
            uri = encryptFunc.apply(uri);
            return this;
        } catch (Exception e) {
            log.error("fail to encrypt password: {}", password, e);
            return this;
        }
    }

    @Override
    public DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        try {
            password = decryptFunc.apply(password);
            uri = decryptFunc.apply(uri);
            return this;
        } catch (Exception e) {
            log.error("fail to encrypt password: {}", password, e);
            return this;
        }
    }

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig updatedConfig) {

        if (!(updatedConfig instanceof RedisDatasourceConfig updatedRedisConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE", updatedConfig.getClass().getSimpleName());
        }

        if (updatedRedisConfig.isUsingUri()) {
            return RedisDatasourceConfig.builder()
                    .usingUri(true)
                    .uri(firstNonNull(updatedRedisConfig.getUri(), getUri()))
                    .build();
        }

        return RedisDatasourceConfig.builder()
                .usingUri(false)
                .usingSsl(updatedRedisConfig.isUsingSsl())
                .host(updatedRedisConfig.getHost())
                .port(updatedRedisConfig.getPort())
                .username(updatedRedisConfig.getUsername())
                .password(firstNonNull(updatedRedisConfig.getPassword(), this.getPassword()))
                .build();
    }
}
