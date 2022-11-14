package com.openblocks.sdk.config;

import static org.apache.commons.lang3.ObjectUtils.firstNonNull;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.auth.EmailAuthConfig;
import com.openblocks.sdk.auth.PhoneAuthConfig;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "auth")
public class AuthProperties {

    private Email email = new Email();
    private Mobile mobile = new Mobile();

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

    @Setter
    public static class Mobile {
        /**
         * enable login
         */
        @Getter
        private boolean enable = false;
    }

    public List<AbstractAuthConfig> getAuthConfigs() {
        List<AbstractAuthConfig> authConfigs = new ArrayList<>();
        if (email.isEnable() || email.isEnableRegister()) {
            EmailAuthConfig email = new EmailAuthConfig(this.email.isEnable(), this.email.isEnableRegister());
            authConfigs.add(email);
        }
        if (mobile.isEnable()) {
            PhoneAuthConfig phone = new PhoneAuthConfig(this.mobile.isEnable());
            authConfigs.add(phone);
        }
        return authConfigs;
    }
}
