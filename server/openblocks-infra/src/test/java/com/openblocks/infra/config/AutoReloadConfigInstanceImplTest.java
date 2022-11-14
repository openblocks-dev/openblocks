package com.openblocks.infra.config;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.test.JsonFileReader;
import com.openblocks.sdk.util.JsonUtils;

public class AutoReloadConfigInstanceImplTest {

    private static final AutoReloadConfigInstanceImpl configInstance = new AutoReloadConfigInstanceImpl();

    @BeforeClass
    public static void init() throws NoSuchFieldException, IllegalAccessException {

        Map<String, Object> map = JsonFileReader.read(AutoReloadConfigInstanceImplTest.class, "$.configInstance");
        Field autoReloadConfigFactory = configInstance.getClass().getDeclaredField("autoReloadConfigFactory");
        autoReloadConfigFactory.setAccessible(true);
        autoReloadConfigFactory.set(configInstance, new AutoReloadConfigFactory() {

            @Nullable
            @Override
            public String getValue(String confKey) {
                Object o = map.get(confKey);
                if (o == null) {
                    return null;
                }
                return JsonUtils.toJson(o);
            }
        });
    }

    @Test
    public void ofInteger() {
        Conf<Integer> integer = configInstance.ofInteger("integer", 1);
        Assert.assertEquals(999L, integer.get().longValue());
        Conf<Integer> integerError = configInstance.ofInteger("integerError", 1);
        Assert.assertEquals(1L, integerError.get().longValue());
    }

    @Test
    public void ofString() {
        Conf<String> string = configInstance.ofString("string", "1");
        Assert.assertEquals("999", string.get());
    }

    @Test
    public void ofJson() {
        Conf<Json> json = configInstance.ofJson("json", Json.class, new Json("1"));
        Assert.assertEquals("999", json.get().json());
    }

    @Test
    public void ofList() {
        Conf<List<Integer>> list = configInstance.ofList("list", List.of(1), Integer.class);
        Assert.assertEquals(List.of(999), list.get());
    }

    @Test
    public void ofStringList() {
        Conf<List<String>> stringList = configInstance.ofStringList("stringList", List.of("1"));
        Assert.assertEquals(List.of("999"), stringList.get());
    }

    @Test
    public void ofIntList() {
        Conf<List<Integer>> list = configInstance.ofIntList("list", List.of(1));
        Assert.assertEquals(List.of(999), list.get());
    }

    @Test
    public void ofLongList() {
        Conf<List<Long>> list = configInstance.ofLongList("list", List.of(1L));
        Assert.assertEquals(List.of(999L), list.get());
    }

    @Test
    public void ofMap() {
        Conf<Map<String, Integer>> mapConf = configInstance.ofMap("map", String.class, Integer.class, Map.of("map", 1));
        Assert.assertEquals(Map.of("map", 999), mapConf.get());
    }

    public record Json(String json) {
    }
}