package com.openblocks.sdk.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "material")
public class MaterialProperties {

    private Mongodb mongodbGridFs = new Mongodb();

    @Data
    public static class Mongodb {
        private String bucketName;
    }
}
