package com.openblocks.runner.eventlistener;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.openblocks.sdk.exception.BizError;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class AppEventListener {

    @EventListener
    public void onApplicationEvent(ApplicationReadyEvent event) {
        System.out.println(
                """             
                        ████████  █████   ██████  ██████      ███████ ████████  █████  ██████  ████████ ███████ ██████ \s
                           ██    ██   ██ ██      ██    ██     ██         ██    ██   ██ ██   ██    ██    ██      ██   ██\s
                           ██    ███████ ██      ██    ██     ███████    ██    ███████ ██████     ██    █████   ██   ██\s
                           ██    ██   ██ ██      ██    ██          ██    ██    ██   ██ ██   ██    ██    ██      ██   ██\s
                           ██    ██   ██  ██████  ██████      ███████    ██    ██   ██ ██   ██    ██    ███████ ██████ \s
                                            
                                """
        );
        log.info("check BizError duplicates: {}", BizError.values().length);
    }
}
