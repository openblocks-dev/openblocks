package com.openblocks.api.common;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Component;

import com.openblocks.sdk.util.MoreMapUtils;
import com.openblocks.sdk.models.HasIdAndAuditing;
import com.openblocks.sdk.test.JsonFileReader;
import com.openblocks.sdk.util.JsonUtils;

@Component
public class InitData {

    private static final AtomicInteger STATE = new AtomicInteger(0);

    @Autowired
    private ReactiveMongoTemplate mongoTemplate;

    @PostConstruct
    @SuppressWarnings("BusyWait")
    public void init() {
        try {
            while (true) {
                if (STATE.compareAndSet(0, 1)) {
                    // execute only once.
                    execute();
                    STATE.set(2);
                }
                if (STATE.get() == 1) {
                    // wait for executing success.
                    Thread.sleep(50);
                    continue;
                }
                if (STATE.get() == 2) {
                    // execute end, then break.
                    break;
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @SuppressWarnings({"ConstantConditions"})
    private void execute() {

        String currentDirPath = JsonFileReader.buildPath("com/openblocks/api/common/json");
        File dir = new File(currentDirPath);
        Stream.of(dir.listFiles())
                .filter(file -> file.isFile() && file.getName().endsWith(".json"))
                .forEach(file -> {
                    try {
                        String json = IOUtils.toString(new FileReader(file));
                        Map<String, Object> map = JsonUtils.fromJsonMap(json);
                        insert(map);
                    } catch (IOException | ClassNotFoundException e) {
                        throw new RuntimeException(e);
                    }
                });
    }

    @SuppressWarnings("ConstantConditions")
    private void insert(Map<String, Object> map) throws ClassNotFoundException {
        Class<?> clazz = Class.forName(MapUtils.getString(map, "class"));
        List<Object> data = MoreMapUtils.getList(map, "data");
        List<?> objects = JsonUtils.fromJsonList(JsonUtils.toJson(data), clazz);
        objects.forEach(object -> {
            if (object instanceof HasIdAndAuditing hasIdAndAuditing) {
                hasIdAndAuditing.setCreatedAt(Instant.now());
            }
        });
        mongoTemplate.insert(objects, clazz)
                .blockLast();
    }
}
