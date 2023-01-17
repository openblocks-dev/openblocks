package com.openblocks.sdk.plugin.sqlcommand.command.mysql;

import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Test;

import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.KeyValuePairChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;

public class MysqlCommandTest {

    @Test
    public void testInsertCommand() {

        String id = "12312";
        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = Map.of("age", 35,
                "job", "sales");

        Map<String, Object> treeMap = new LinkedHashMap<>();
        treeMap.put("id", id);
        treeMap.put("name", name);
        treeMap.put("email", "{{ email }}");
        treeMap.put("info", " {{ info }}");
        var changeSet = KeyValuePairChangeSet.buildForTest(treeMap);
        var command = new MysqlInsertCommand("user", changeSet);
        var render = command.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals("insert into user (`id`,`name`,`email`,`info`) values (?,?,?,?);", render.sql());
        Assertions.assertThat(render.bindParams()).isEqualTo(List.of(Integer.parseInt(id), name, email, toJson(infoMap)));

    }

    @Test
    public void testUpdateCommand() {

        String id = "12312";
        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = Map.of("age", 35,
                "job", "sales");

        Map<String, Object> treeMap = new LinkedHashMap<>();
        treeMap.put("id", id);
        treeMap.put("name", name);
        treeMap.put("email", "{{ email }}");
        treeMap.put("info", " {{ info }}");
        var changeSet = KeyValuePairChangeSet.buildForTest(treeMap);

        var filterSet = new FilterSet();
        filterSet.addCondition("name", "=", "jack");
        filterSet.addCondition("status", ">", 1);
        filterSet.addCondition("id", "IN", "[1,2, 5]");
        filterSet.addCondition("phone", "IS", "null");

        var command = new MysqlUpdateCommand("user", changeSet, filterSet, false);
        var render = command.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals(
                "update user set `id`=?,`name`=?,`email`=?,`info`=? "
                        + "where `name` = ?  and `status` > ?  and `id` IN (1,2,5) and `phone` IS null  limit 1",
                render.sql());

        List<Object> expectedParams = new ArrayList<>();
        expectedParams.add(Integer.parseInt(id));
        expectedParams.add(name);
        expectedParams.add(email);
        expectedParams.add(toJson(infoMap));
        expectedParams.add("jack");
        expectedParams.add(1);
        Assertions.assertThat(render.bindParams()).isEqualTo(expectedParams);

    }

    @Test
    public void testUpsertCommand() {

        String id = "12312";
        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = Map.of("age", 35,
                "job", "sales");

        Map<String, Object> treeMap = new LinkedHashMap<>();
        treeMap.put("id", id);
        treeMap.put("name", name);
        treeMap.put("email", "{{ email }}");
        treeMap.put("info", " {{ info }}");
        var changeSet = KeyValuePairChangeSet.buildForTest(treeMap);

        var command = new MysqlUpsertCommand("user", changeSet, changeSet);
        var render = command.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals(
                "insert into user (`id`,`name`,`email`,`info`) values (?,?,?,?) on duplicate key update `id`=?,`name`=?,`email`=?,`info`=?",
                render.sql());

        List<Object> expectedParams = new ArrayList<>();
        // insert
        expectedParams.add(Integer.parseInt(id));
        expectedParams.add(name);
        expectedParams.add(email);
        expectedParams.add(toJson(infoMap));
        // update
        expectedParams.add(Integer.parseInt(id));
        expectedParams.add(name);
        expectedParams.add(email);
        expectedParams.add(toJson(infoMap));
        Assertions.assertThat(render.bindParams()).isEqualTo(expectedParams);

    }

    @Test
    public void testDeleteCommand() {

        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = Map.of("age", 35, "job", "sales");

        var filterSet = new FilterSet();
        filterSet.addCondition("name", "=", name);
        filterSet.addCondition("status", ">", 1);
        filterSet.addCondition("id", "IN", "[1,2, 5]");
        filterSet.addCondition("phone", "IS", "null");

        var command = new MysqlDeleteCommand("user", filterSet, false);
        var render = command.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals(
                "delete from user where `name` = ?  and `status` > ?  and `id` IN (1,2,5) and `phone` IS null  limit 1",
                render.sql());

        List<Object> expectedParams = new ArrayList<>();
        expectedParams.add("jack");
        expectedParams.add(1);
        Assertions.assertThat(render.bindParams()).isEqualTo(expectedParams);

    }

    @Test
    public void testBulkInsertCommand() {

        int id = 12312;
        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = Map.of("age", 35,
                "job", "sales");

        Map<String, Object> treeMap = new LinkedHashMap<>();
        treeMap.put("id", id);
        treeMap.put("name", name);
        treeMap.put("email", "{{ email }}");
        treeMap.put("info", " {{ info }}");

        List<Map<String, Object>> insertList = List.of(treeMap, treeMap);

        var command = new MysqlBulkInsertCommand("user", new BulkObjectChangeSet(toJson(insertList)));
        var render = command.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals(
                "insert into user (`id`,`name`,`email`,`info`) values (?,?,?,?),(?,?,?,?);",
                render.sql());

        List<Object> expectedParams = new ArrayList<>();
        // insert
        expectedParams.add(id);
        expectedParams.add(name);
        expectedParams.add(email);
        expectedParams.add(toJson(infoMap));
        // update
        expectedParams.add(id);
        expectedParams.add(name);
        expectedParams.add(email);
        expectedParams.add(toJson(infoMap));
        Assertions.assertThat(render.bindParams()).isEqualTo(expectedParams);

    }

    @Test
    public void testBulkUpdateCommand() {

        List<Map<String, Object>> updateList = List.of(Map.of("id", 1,
                        "name", "jack",
                        "email", "jack@jack.com"
                ),
                Map.of("id", 2,
                        "name", "rose",
                        "info", Map.of("age", 35, "job", "sales")
                )
        );

        var command = new MysqlBulkUpdateCommand("user",
                new BulkObjectChangeSet(toJson(updateList)), "id");
        var render = command.render(Map.of());

        Assert.assertEquals(
                """
                        UPDATE user set
                        `name` = CASE WHEN `id` = ? THEN ? WHEN `id` = ? THEN ? END,
                        `email` = CASE WHEN `id` = ? THEN ? END,
                        `info` = CASE WHEN `id` = ? THEN ? END
                        where id in (?,?)""",
                render.sql());

        /*
            [1, "jack", 2, "rose", 1, "jack@jack.com", 2, "{"job":"sales","age":35}", 1, 2]
         */
        List<Object> expectedParams = new ArrayList<>();
        expectedParams.add(1);
        expectedParams.add("jack");
        expectedParams.add(2);
        expectedParams.add("rose");
        expectedParams.add(1);
        expectedParams.add("jack@jack.com");
        expectedParams.add(2);
        expectedParams.add(toJson(Map.of("age", 35, "job", "sales")));
        expectedParams.add(1);
        expectedParams.add(2);
        Assertions.assertThat(render.bindParams()).isEqualTo(expectedParams);
    }

}