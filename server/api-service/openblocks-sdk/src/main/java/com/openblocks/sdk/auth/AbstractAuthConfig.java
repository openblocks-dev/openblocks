package com.openblocks.sdk.auth;

import java.util.function.Function;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractAuthConfig {

    /**
     * here source should be unique for every authentication source. e.g., the google oauth2, the gitHub oauth2, or cas-sso of an org.
     */
    protected String source;
    protected String sourceName;

    protected AbstractAuthConfig(String source, String sourceName) {
        this.source = source;
        this.sourceName = sourceName;
    }

    public abstract String getAuthType();

    public boolean enableAuth() {
        return true;
    }

    public void doEncrypt(Function<String, String> encryptFunc) {
    }

    public void doDecrypt(Function<String, String> decryptFunc) {
    }
}
