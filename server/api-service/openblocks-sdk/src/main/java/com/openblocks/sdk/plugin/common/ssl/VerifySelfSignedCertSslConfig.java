package com.openblocks.sdk.plugin.common.ssl;

import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.util.function.Function;

import org.jetbrains.annotations.Nullable;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;

import lombok.Getter;

@Getter
public class VerifySelfSignedCertSslConfig extends SslConfig {

    @JsonView(JsonViews.Internal.class)
    private String selfSignedCert;

    @JsonCreator
    public VerifySelfSignedCertSslConfig(SslCertVerificationType sslCertVerificationType, String selfSignedCert) {
        super(sslCertVerificationType);
        this.selfSignedCert = selfSignedCert;
    }

    @Override
    public void doEncrypt(Function<String, String> encryptFunc) {
        this.selfSignedCert = encryptFunc.apply(this.selfSignedCert);
    }

    @Override
    public void doDecrypt(Function<String, String> decryptFunc) {
        this.selfSignedCert = decryptFunc.apply(this.selfSignedCert);
    }

    @Override
    public SslConfig mergeWithUpdatedConfig(@Nullable SslConfig updatedConfig) {
        if (!(updatedConfig instanceof VerifySelfSignedCertSslConfig verifySelfSignedCertSSLConfig)) {
            return updatedConfig;
        }
        return new VerifySelfSignedCertSslConfig(verifySelfSignedCertSSLConfig.getSslCertVerificationType(),
                firstNonNull(verifySelfSignedCertSSLConfig.selfSignedCert, this.selfSignedCert));
    }
}
