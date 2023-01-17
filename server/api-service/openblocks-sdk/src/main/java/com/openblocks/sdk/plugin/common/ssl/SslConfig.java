package com.openblocks.sdk.plugin.common.ssl;

import javax.annotation.Nullable;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import com.openblocks.sdk.models.Encrypt;

import lombok.Getter;

@Getter
@JsonTypeInfo(use = Id.NAME, property = "sslCertVerificationType", visible = true, defaultImpl = VerifyCACertSslConfig.class)
@JsonSubTypes({
        @Type(value = DisableVerifySslConfig.class, name = "DISABLED"),
        @Type(value = VerifySelfSignedCertSslConfig.class, name = "VERIFY_SELF_SIGNED_CERT")
})
public abstract class SslConfig implements Encrypt {

    protected final SslCertVerificationType sslCertVerificationType;

    protected SslConfig(SslCertVerificationType sslCertVerificationType) {
        this.sslCertVerificationType = sslCertVerificationType;
    }

    public SslConfig mergeWithUpdatedConfig(@Nullable SslConfig updatedConfig) {
        return updatedConfig;
    }

}
