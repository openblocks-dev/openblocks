package com.openblocks.sdk.destructor;

import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.commons.lang3.tuple.Pair;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DestructorUtil {

    private static final Queue<Pair<Runnable, String>> destroyCallbacks = new LinkedBlockingQueue<>();

    public static void register(Runnable destroyCallback, String des) {
        destroyCallbacks.add(Pair.of(destroyCallback, des));
    }

    public static void onDestroy() {
        for (Pair<Runnable, String> pair : destroyCallbacks) {
            try {
                log.info("Commencing graceful shutdown: {}", pair.getRight());
                pair.getLeft().run();
            } catch (Exception e) {
                log.error("destroy callback error", e);
            }
        }
    }
}
