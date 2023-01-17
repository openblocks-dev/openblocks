package com.openblocks.sdk.plugin.common.ssl;

import com.fasterxml.jackson.annotation.JsonCreator;

public class VerifyCACertSslConfig extends SslConfig {

    @JsonCreator
    public VerifyCACertSslConfig(SslCertVerificationType sslCertVerificationType) {
        super(sslCertVerificationType);
    }
}
