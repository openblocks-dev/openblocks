package com.openblocks.api;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.openblocks.sdk.config.CommonConfig;

import lombok.extern.slf4j.Slf4j;
import reactor.blockhound.BlockHound;
import reactor.core.publisher.Hooks;
import reactor.core.scheduler.Schedulers;
import reactor.tools.agent.ReactorDebugAgent;

@Slf4j
@SpringBootApplication
@ComponentScan(basePackages = "com.openblocks.api.framework.configuration")
@EnableScheduling
@EnableConfigurationProperties
public class ServerApplication {

    @Autowired
    private CommonConfig commonConfig;

    @PostConstruct
    public void init() {
        if (commonConfig.isBlockHoundEnable()) {
            log.info("enable block hound.");
            BlockHound.builder()
                    .allowBlockingCallsInside("com.mongodb.internal.connection.DefaultAuthenticator", "authenticateAsync")
                    .install();

            ReactorDebugAgent.init();
            Hooks.onOperatorDebug();

        }
    }

    public static void main(String[] args) {

        Schedulers.enableMetrics();

        new SpringApplicationBuilder(ServerApplication.class)
                .bannerMode(Banner.Mode.OFF)
                .run(args);
    }

}
