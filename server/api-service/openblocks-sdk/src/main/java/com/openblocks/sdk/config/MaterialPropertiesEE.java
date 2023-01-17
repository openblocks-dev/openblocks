package com.openblocks.sdk.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Primary
@Component
@ConfigurationProperties(prefix = "material")
public class MaterialPropertiesEE extends MaterialProperties {

    private Oss oss = new Oss();

    @Data
    public static class Oss {
        private String bucketName;
    }
}
