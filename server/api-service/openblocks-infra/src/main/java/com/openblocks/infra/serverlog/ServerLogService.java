package com.openblocks.infra.serverlog;

import static com.openblocks.infra.perf.PerfEvent.SERVER_LOG_BATCH_INSERT;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.TimeUnit;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.openblocks.infra.perf.PerfHelper;

import io.micrometer.core.instrument.Tags;

@Service
public class ServerLogService {

    @Autowired
    private ServerLogRepository serverLogRepository;

    @Autowired
    private PerfHelper perfHelper;

    private volatile Queue<ServerLog> serverLogs = new ConcurrentLinkedQueue<>();

    public void record(ServerLog serverLog) {
        serverLogs.add(serverLog);
    }

    @Scheduled(initialDelay = 1, fixedRate = 1, timeUnit = TimeUnit.SECONDS)
    private void scheduledInsert() {
        if (CollectionUtils.isEmpty(serverLogs)) {
            return;
        }
        var tmp = serverLogs;
        serverLogs = new ConcurrentLinkedQueue<>();
        serverLogRepository.saveAll(tmp)
                .collectList()
                .subscribe(result -> {
                    perfHelper.count(SERVER_LOG_BATCH_INSERT, Tags.of("size", String.valueOf(result.size())));
                });
    }
}
