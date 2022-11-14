package com.openblocks.api.framework.configuration;


import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan(basePackages = "com.openblocks")
@Configuration
@ConditionalOnMissingClass("com.openblocks.api.framework.configuration.ComponentScanConfigurationEEVersion")
public class ComponentScanConfiguration {
}
