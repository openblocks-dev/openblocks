package com.openblocks.sdk.plugin.sqlcommand.command.postgres;

import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Test;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.KeyValuePairChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateOrDeleteSingleCommandResult;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;

public class PostgresCommandTest {

    @Test
    public void testInsertCommand() {

        String id = "12312";
        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = Map.of("age", 35,
                "job", "sales");

        LinkedHashMap<String, Object> treeMap = new LinkedHashMap<>();
        treeMap.put("id", id);
        treeMap.put("name", name);
        treeMap.put("email", "{{ email }}");
        treeMap.put("info", " {{ info }}");
        KeyValuePairChangeSet changeSet = KeyValuePairChangeSet.buildForTest(treeMap);

        PostgresInsertCommand insertCommand = new PostgresInsertCommand("user", changeSet);

        GuiSqlCommandRenderResult render = insertCommand.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals("""
                insert into user ("id","name","email","info") values (?,?,?,?);""", render.sql());
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
        filterSet.addCondition("name", "=", name);
        filterSet.addCondition("status", ">", 1);
        filterSet.addCondition("id", "IN", "[1,2, 5]");
        filterSet.addCondition("phone", "IS", "null");

        var command = new PostgresUpdateCommand("user", changeSet, filterSet, false);
        var renderResult = command.render(Map.of("email", email, "info", infoMap));

        String updateSql = renderResult.sql();
        List<Object> updateBindParams = renderResult.bindParams();
        Assert.assertEquals(
                """
                        update user set "id"=?,"name"=?,"email"=?,"info"=? where "name" = ?  and "status" > ?  and "id" IN (1,2,5) and "phone" IS null\s""",
                updateSql);
        List<Object> expectedUpdateBindParams = new ArrayList<>();
        expectedUpdateBindParams.add(Integer.parseInt(id));
        expectedUpdateBindParams.add(name);
        expectedUpdateBindParams.add(email);
        expectedUpdateBindParams.add(toJson(infoMap));
        expectedUpdateBindParams.add(name);
        expectedUpdateBindParams.add(1);
        Assertions.assertThat(updateBindParams).isEqualTo(expectedUpdateBindParams);

        Assert.assertTrue(renderResult instanceof UpdateOrDeleteSingleCommandResult);
        var pgUpdateRenderResult = (UpdateOrDeleteSingleCommandResult) renderResult;
        String selectQuery = pgUpdateRenderResult.getSelectQuery();
        List<Object> selectBindParams = pgUpdateRenderResult.getSelectBindParams();

        Assert.assertEquals("""
                select count(1) as count from user where "name" = ?  and "status" > ?  and "id" IN (1,2,5) and "phone" IS null\s""", selectQuery);
        List<Object> expectedSelectBindParams = new ArrayList<>();
        expectedSelectBindParams.add(name);
        expectedSelectBindParams.add(1);
        Assertions.assertThat(selectBindParams).isEqualTo(expectedSelectBindParams);

    }


    @Test
    public void testDeleteCommand() {

        String name = "jack";
        var filterSet = new FilterSet();
        filterSet.addCondition("name", "=", name);
        filterSet.addCondition("status", ">", 1);
        filterSet.addCondition("id", "IN", "{{list}}");
        filterSet.addCondition("phone", "IS", "null");

        var command = new PostgresDeleteCommand("user", filterSet, false);
        var renderResult = command.render(Map.of("list", List.of(1, 2, 3)));

        String sql = renderResult.sql();
        Assert.assertEquals(
                """
                        delete from user where "name" = ?  and "status" > ?  and "id" IN (1,2,3) and "phone" IS null\s""",
                sql);

        Assert.assertTrue(renderResult instanceof UpdateOrDeleteSingleCommandResult);
        var pgUpdateRenderResult = (UpdateOrDeleteSingleCommandResult) renderResult;
        String selectQuery = pgUpdateRenderResult.getSelectQuery();
        List<Object> selectBindParams = pgUpdateRenderResult.getSelectBindParams();

        Assert.assertEquals("""
                select count(1) as count from user where "name" = ?  and "status" > ?  and "id" IN (1,2,3) and "phone" IS null\s""", selectQuery);
        List<Object> expectedSelectBindParams = new ArrayList<>();
        expectedSelectBindParams.add(name);
        expectedSelectBindParams.add(1);
        Assertions.assertThat(selectBindParams).isEqualTo(expectedSelectBindParams);

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
        ;
        var command = new PostgresBulkInsertCommand("user", new BulkObjectChangeSet(toJson(insertList)));
        var render = command.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals(
                "insert into user (\"id\",\"name\",\"email\",\"info\") values (?,?,?,?),(?,?,?,?);",
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

        var command = new PostgresBulkUpdateCommand("user",
                new BulkObjectChangeSet(toJson(updateList)), "id");
        var render = command.render(Map.of());

        Assert.assertEquals(
                """
                        UPDATE user set
                        "name" = CASE WHEN "id" = ? THEN ? WHEN "id" = ? THEN ? END,
                        "email" = CASE WHEN "id" = ? THEN ? END,
                        "info" = CASE WHEN "id" = ? THEN ? END
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