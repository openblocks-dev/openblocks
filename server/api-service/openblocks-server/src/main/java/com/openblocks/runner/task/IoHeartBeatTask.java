package com.openblocks.runner.task;

import static com.openblocks.infra.perf.PerfEvent.IO_HEART_BEAT;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.openblocks.infra.perf.PerfHelper;

import io.micrometer.core.instrument.Tags;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class IoHeartBeatTask {

    @Autowired
    private ReactiveRedisTemplate<String, String> reactiveRedisTemplate;

    @Autowired
    private PerfHelper perfHelper;

    @Scheduled(initialDelay = 1, fixedRate = 2, timeUnit = TimeUnit.MINUTES)
    public void ping() {
        reactiveRedisTemplate.opsForValue().set("#warmup", "1", Duration.ofSeconds(1))
                .subscribe(result -> {
                    perfHelper.count(IO_HEART_BEAT, Tags.of("redis", String.valueOf(result)));
                    log.info("schedule ping executed, result: {}", result);
                });
    }

}
