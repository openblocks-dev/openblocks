package com.openblocks.api.common;

import static org.pf4j.AbstractPluginManager.MODE_PROPERTY_NAME;
import static org.pf4j.RuntimeMode.DEVELOPMENT;

import java.nio.file.Path;

import org.pf4j.spring.SpringPluginManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class SpringPluginManagerConfiguration {

    @Bean
    @Primary
    public SpringPluginManager springPluginManager() {
        System.setProperty(MODE_PROPERTY_NAME, DEVELOPMENT.toString());
        Path path = Path.of("../openblocks-plugins");
        return new SpringPluginManager(path);
    }
}
