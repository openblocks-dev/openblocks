package com.openblocks.api.infra;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.google.common.collect.ImmutableList;
import com.openblocks.infra.config.model.ServerConfig;
import com.openblocks.infra.config.repository.ServerConfigRepository;
import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigInstance;

import lombok.extern.slf4j.Slf4j;

@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class ServerConfigRepositoryTest {

    @Autowired
    ServerConfigRepository configRepository;

    @Autowired
    private ConfigInstance configInstance;

    @Test
    public void test() throws InterruptedException {

        Conf<Integer> test1 = configInstance.ofInteger("key1", 0);
        Conf<List<Integer>> test2 = configInstance.ofList("key2", ImmutableList.of(1), Integer.class);
        Conf<SomeClass> test3 = configInstance.ofJson("key3", SomeClass.class, new SomeClass(11, 22));

        assertEquals(0, test1.get());
        assertEquals(ImmutableList.of(1), test2.get());
        assertEquals(new SomeClass(11, 22), test3.get());

        configRepository.save(getNewConfig("key1", "123")).block();
        configRepository.save(getNewConfig("key2", List.of(1, 2))).block();
        configRepository.save(getNewConfig("key3", Map.of("x", 22, "y", 33))).block();
        Thread.sleep(3000);

        assertEquals(123, test1.get());
        assertEquals(ImmutableList.of(1, 2), test2.get());
        assertEquals(new SomeClass(22, 33), test3.get());

        configRepository.upsert("key1", "12345").block();
        configRepository.upsert("key2", List.of(1, 2, 3)).block();
        configRepository.upsert("key3", Map.of("x", 33, "y", 44)).block();

        Thread.sleep(3000);

        assertEquals(12345, test1.get());
        assertEquals(ImmutableList.of(1, 2, 3), test2.get());
        assertEquals(new SomeClass(33, 44), test3.get());

    }

    private ServerConfig getNewConfig(String key, Object value) {
        return ServerConfig.builder()
                .key(key)
                .value(value)
                .build();
    }

    private record SomeClass(int x, int y) {
    }
}