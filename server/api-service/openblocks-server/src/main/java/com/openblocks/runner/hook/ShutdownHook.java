package com.openblocks.runner.hook;

import javax.annotation.PreDestroy;

import org.springframework.stereotype.Component;

import com.openblocks.sdk.destructor.DestructorUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ShutdownHook {

    /**
     * execute after active requests completing.
     */
    @PreDestroy
    public void preDestroy() {
        DestructorUtil.onDestroy();
    }
}
