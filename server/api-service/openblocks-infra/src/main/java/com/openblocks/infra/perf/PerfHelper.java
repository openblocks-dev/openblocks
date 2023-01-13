package com.openblocks.infra.perf;

import java.time.Duration;
import java.util.concurrent.Callable;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.ToDoubleFunction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Tag;
import io.micrometer.core.instrument.Timer;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class PerfHelper {

    @Autowired
    private MeterRegistry meterRegistry;

    public void count(PerfEvent event, Iterable<Tag> tags) {
        count(event.perfKey(), tags);
    }

    public void count(PerfEvent event, Iterable<Tag> tags, int count) {
        count(event.perfKey(), tags, count);
    }

    private void count(String name, Iterable<Tag> tags) {
        count(name, tags, 1);
    }

    private void count(String name, Iterable<Tag> tags, double count) {
        try {
            Counter counter = meterRegistry.counter(name, tags);
            counter.increment(count);
            counter.count();
        } catch (Exception e) {
            log.warn("count error.{},{},{}", name, tags, count, e);
        }
    }

    public <T> void gaugeSafely(PerfEvent event, Iterable<Tag> tags, T t, ToDoubleFunction<T> toDoubleFunction) {
        try {
            meterRegistry.gauge(event.perfKey(), tags, t, toDoubleFunction);
        } catch (Exception e) {
            log.warn("gauge error.{},{}", event, tags, e);
        }
    }

    public void gaugeInt(PerfEvent event, Iterable<Tag> tags, int number) {
        try {
            AtomicInteger gauge = meterRegistry.gauge(event.perfKey(), tags, new AtomicInteger(number));
            if (gauge != null) {
                gauge.set(number);
            }
        } catch (Exception e) {
            log.warn("gauge error.{},{}", event, tags, e);
        }
    }

    public void recordRunnableTime(String name, Iterable<Tag> tags, Runnable f) {
        Timer timer = Timer.builder(name)
                .tags(tags)
                .publishPercentiles(0.95)
                .register(meterRegistry);
        timer.record(f);
    }

    public void recordTime(String name, Iterable<Tag> tags, Duration cost) {
        Timer timer = Timer.builder(name)
                .tags(tags)
                .publishPercentiles(0.95)
                .register(meterRegistry);
        timer.record(cost);
    }

    public <T> T recordCallableTime(String name, Iterable<Tag> tags, Callable<T> callable) throws Exception {
        Timer timer = Timer.builder(name)
                .tags(tags)
                .publishPercentiles(0.95)
                .register(meterRegistry);
        return timer.recordCallable(callable);
    }


}
