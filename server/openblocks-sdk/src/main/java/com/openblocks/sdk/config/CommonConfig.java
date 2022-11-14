package com.openblocks.sdk.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "common")
public class CommonConfig {

    private Domain domain = new Domain();
    private Encrypt encrypt = new Encrypt();
    private boolean cloud;
    private Security security = new Security();
    private String version;
    private boolean blockHoundEnable;
    private String cookieName;

    public boolean isSelfHost() {
        return !isCloud();
    }

    @Data
    public static class Domain {
        private String defaultValue;
    }

    @Data
    public static class Encrypt {
        private String password = "abcd";
        private String salt = "abcd";
    }

    @Setter
    public static class Security {
        private List<String> corsAllowedDomains;
        // support of docker env file.
        private String corsAllowedDomainString;

        public List<String> getAllCorsAllowedDomains() {
            List<String> all = new ArrayList<>();
            if (CollectionUtils.isNotEmpty(corsAllowedDomains)) {
                all.addAll(corsAllowedDomains);
            }
            if (StringUtils.isNotBlank(corsAllowedDomainString)) {
                List<String> domains = Arrays.stream(corsAllowedDomainString.split(",")).toList();
                all.addAll(domains);
            }
            return all;
        }
    }
}
