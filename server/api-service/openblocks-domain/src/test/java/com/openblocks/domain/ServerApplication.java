package com.openblocks.domain;

import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Hooks;
import reactor.core.scheduler.Schedulers;

@Slf4j
@SpringBootApplication(scanBasePackages = "com.openblocks")
public class ServerApplication {

    public static void main(String[] args) {

        Hooks.onOperatorDebug();
        Schedulers.enableMetrics();

        new SpringApplicationBuilder(ServerApplication.class)
                .bannerMode(Banner.Mode.OFF)
                .run(args);
    }
}
