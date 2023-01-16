package com.openblocks.sdk.plugin.common.ssl;

import com.fasterxml.jackson.annotation.JsonCreator;

public class DisableVerifySslConfig extends SslConfig {

    @JsonCreator
    public DisableVerifySslConfig(SslCertVerificationType sslCertVerificationType) {
        super(sslCertVerificationType);
    }
}
