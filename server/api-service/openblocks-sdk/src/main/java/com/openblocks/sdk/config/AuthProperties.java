package com.openblocks.sdk.config;

import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.auth.EmailAuthConfig;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "auth")
public class AuthProperties {

    private Email email = new Email();

    @Setter
    public static class Email {
        /**
         * enable login
         */
        @Getter
        private boolean enable = false;
        private Boolean enableRegister;

        public boolean isEnableRegister() {
            // compatible
            return firstNonNull(enableRegister, enable);
        }
    }

    public List<AbstractAuthConfig> getAuthConfigs() {
        List<AbstractAuthConfig> authConfigs = new ArrayList<>();
        if (email.isEnable() || email.isEnableRegister()) {
            EmailAuthConfig email = new EmailAuthConfig(this.email.isEnable(), this.email.isEnableRegister());
            authConfigs.add(email);
        }
        return authConfigs;
    }
}
