package com.openblocks.plugin.googlesheets.model;

import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.Map;
import java.util.function.Function;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonView;
import com.google.common.base.MoreObjects;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.exception.PluginCommonError;
import com.openblocks.sdk.models.DatasourceConnectionConfig;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class GoogleSheetsDatasourceConfig implements DatasourceConnectionConfig {

    @JsonView(JsonViews.Internal.class)
    private String serviceAccount;

    @JsonCreator
    public GoogleSheetsDatasourceConfig(String serviceAccount) {
        this.serviceAccount = serviceAccount;
    }

    public static GoogleSheetsDatasourceConfig buildFrom(Map<String, Object> requestMap) {
        GoogleSheetsDatasourceConfig result = fromJson(toJson(requestMap), GoogleSheetsDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "GOOGLESHEETS_DATASOURCE_CONFIG_ERROR");
        }
        return result;
    }

    @Override
    public DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig detailConfig) {
        if (!(detailConfig instanceof GoogleSheetsDatasourceConfig updatedConfig)) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "GOOGLESHEETS_DATASOURCE_CONFIG_ERROR");
        }
        return new GoogleSheetsDatasourceConfig(MoreObjects.firstNonNull(updatedConfig.getServiceAccount(), serviceAccount));
    }

    @Override
    public DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        try {
            serviceAccount = encryptFunc.apply(serviceAccount);
            return this;
        } catch (Exception e) {
            log.error("fail to encrypt password: {}", serviceAccount, e);
            return this;
        }
    }

    @Override
    public DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        try {
            serviceAccount = decryptFunc.apply(serviceAccount);
            return this;
        } catch (Exception e) {
            log.error("fail to decrypt password: {}", serviceAccount, e);
            return this;
        }
    }
}
