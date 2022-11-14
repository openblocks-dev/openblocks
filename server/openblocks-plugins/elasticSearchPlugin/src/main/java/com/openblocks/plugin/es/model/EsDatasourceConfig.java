package com.openblocks.plugin.es.model;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_CONFIG_TYPE;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;

import java.util.function.Function;

import org.apache.commons.lang3.ObjectUtils;

import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Setter
@Getter
@Builder
public class EsDatasourceConfig implements DatasourceConnectionConfig {

    private String connectionString;

    private String username;

    @JsonView(JsonViews.Internal.class)
    private String password;

    private Boolean usingSsl;

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig updatedConfig) {
        if (!(updatedConfig instanceof EsDatasourceConfig esDatasourceConfig)) {
            throw ofException(INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_DATASOURCE_CONFIG_TYPE", updatedConfig.getClass().getSimpleName());
        }

        return EsDatasourceConfig.builder()
                .connectionString(esDatasourceConfig.getConnectionString())
                .username(esDatasourceConfig.getUsername())
                .password(ObjectUtils.firstNonNull(esDatasourceConfig.getPassword(), getPassword()))
                .usingSsl(esDatasourceConfig.getUsingSsl())
                .build();
    }

    @Override
    public DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        try {
            password = encryptFunc.apply(password);
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
            return this;
        } catch (Exception e) {
            log.error("fail to encrypt password: {}", password, e);
            return this;
        }
    }
}
