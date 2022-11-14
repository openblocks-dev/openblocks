package com.openblocks.sdk.models;

import java.util.function.Function;

public interface DatasourceConnectionConfig {

    DatasourceConnectionConfig mergeWithUpdatedConfig(DatasourceConnectionConfig detailConfig);

    default DatasourceConnectionConfig doEncrypt(Function<String, String> encryptFunc) {
        return this;
    }

    default DatasourceConnectionConfig doDecrypt(Function<String, String> decryptFunc) {
        return this;
    }

}
