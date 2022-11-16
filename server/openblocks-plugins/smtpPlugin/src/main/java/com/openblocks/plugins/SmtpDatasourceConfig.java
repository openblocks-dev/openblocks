package com.openblocks.plugins;

import static org.apache.commons.lang3.ObjectUtils.firstNonNull;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

import java.util.function.Function;

import javax.annotation.Nullable;

import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SmtpDatasourceConfig implements DatasourceConnectionConfig {

    private final String host;
    private final int port;

    @Nullable
    private final String username;
    @Nullable
    @JsonView(JsonViews.Internal.class)
    private String password;

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig detailConfig) {
        SmtpDatasourceConfig updateConfig = (SmtpDatasourceConfig) detailConfig;
        return SmtpDatasourceConfig.builder()
                .host(updateConfig.getHost())
                .port(updateConfig.getPort())
                .username(updateConfig.getUsername())
                .password(firstNonNull(updateConfig.getPassword(), this.getPassword()))
                .build();
    }

    @Override
    public DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        if (isNotBlank(this.password)) {
            this.password = encryptFunc.apply(this.password);
        }
        return this;
    }

    @Override
    public DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        if (isNotBlank(this.password)) {
            this.password = decryptFunc.apply(this.password);
        }
        return this;
    }
}
