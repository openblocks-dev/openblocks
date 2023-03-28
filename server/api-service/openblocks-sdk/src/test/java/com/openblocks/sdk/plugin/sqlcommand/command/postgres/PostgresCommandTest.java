package com.openblocks.sdk.plugin.sqlcommand.command.postgres;

import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Test;

import com.google.common.collect.ImmutableMap;
import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.changeset.BulkObjectChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.changeset.KeyValuePairChangeSet;
import com.openblocks.sdk.plugin.sqlcommand.command.UpdateOrDeleteSingleCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.filter.FilterSet;
import com.openblocks.sdk.util.SqlGuiUtils.GuiSqlValue.EscapeSql;

public class PostgresCommandTest {

    private final EscapeSql testEscaper = s -> "$$" + s + "$$";

    @Test
    public void testInsertCommand() {

        String id = "12312";
        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = ImmutableMap.of("age", 35, "job", "sales");

        LinkedHashMap<String, Object> treeMap = new LinkedHashMap<>();
        treeMap.put("id", id);
        treeMap.put("name", name);
        treeMap.put("email", "{{ email }}");
        treeMap.put("info", " {{ info }}");
        KeyValuePairChangeSet changeSet = KeyValuePairChangeSet.buildForTest(treeMap);

        PostgresInsertCommand insertCommand = new PostgresInsertCommand("user", changeSet) {
            @Override
            public EscapeSql escapeStrFunc() {
                return testEscaper;
            }
        };

        GuiSqlCommandRenderResult render = insertCommand.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals("""
                        insert into user ("id","name","email","info") values (12312,$$jack$$,$$jack@gmail.com$$,$${"age":35,"job":"sales"}$$)""",
                render.sql());
        Assertions.assertThat(render.bindParams()).isEqualTo(List.of());

    }

    @Test
    public void testUpdateCommand() {

        String id = "12312";
        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = ImmutableMap.of("age", 35, "job", "sales");

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

        var command = new PostgresUpdateCommand("user", changeSet, filterSet, false) {
            @Override
            public EscapeSql escapeStrFunc() {
                return testEscaper;
            }
        };
        var renderResult = command.render(Map.of("email", email, "info", infoMap));

        String updateSql = renderResult.sql();
        List<Object> updateBindParams = renderResult.bindParams();
        Assert.assertEquals(
                """
                        update user set "id"=12312,"name"=$$jack$$,"email"=$$jack@gmail.com$$,"info"=$${"age":35,"job":"sales"}$$ where "name" = $$jack$$ and "status" > 1 and "id" IN (1,2,5) and "phone" IS null\s""",
                updateSql);
        Assertions.assertThat(updateBindParams).isEqualTo(List.of());

        Assert.assertTrue(renderResult instanceof UpdateOrDeleteSingleCommandRenderResult);
        var pgUpdateRenderResult = (UpdateOrDeleteSingleCommandRenderResult) renderResult;
        String selectQuery = pgUpdateRenderResult.getSelectQuery();
        List<Object> selectBindParams = pgUpdateRenderResult.getSelectBindParams();

        Assert.assertEquals("""
                        select count(1) as count from user where "name" = $$jack$$ and "status" > 1 and "id" IN (1,2,5) and "phone" IS null\s""",
                selectQuery);
        Assertions.assertThat(selectBindParams).isEqualTo(List.of());

    }


    @Test
    public void testDeleteCommand() {

        String name = "jack";
        var filterSet = new FilterSet();
        filterSet.addCondition("name", "=", name);
        filterSet.addCondition("status", ">", 1);
        filterSet.addCondition("id", "IN", "{{list}}");
        filterSet.addCondition("phone", "IS", "null");

        var command = new PostgresDeleteCommand("user", filterSet, false) {
            @Override
            public EscapeSql escapeStrFunc() {
                return testEscaper;
            }
        };
        var renderResult = command.render(Map.of("list", List.of(1, 2, 3)));

        String sql = renderResult.sql();
        Assert.assertEquals(
                """
                        delete from user where "name" = $$jack$$ and "status" > 1 and "id" IN (1,2,3) and "phone" IS null\s""",
                sql);

        Assert.assertTrue(renderResult instanceof UpdateOrDeleteSingleCommandRenderResult);
        var pgUpdateRenderResult = (UpdateOrDeleteSingleCommandRenderResult) renderResult;
        String selectQuery = pgUpdateRenderResult.getSelectQuery();
        List<Object> selectBindParams = pgUpdateRenderResult.getSelectBindParams();

        Assert.assertEquals("""
                        select count(1) as count from user where "name" = $$jack$$ and "status" > 1 and "id" IN (1,2,3) and "phone" IS null\s""",
                selectQuery);
        Assertions.assertThat(selectBindParams).isEqualTo(List.of());

    }

    @Test
    public void testBulkInsertCommand() {

        int id = 12312;
        String name = "jack";
        String email = "jack@gmail.com";
        Map<String, ?> infoMap = ImmutableMap.of("age", 35, "job", "sales");

        Map<String, Object> treeMap = new LinkedHashMap<>();
        treeMap.put("id", id);
        treeMap.put("name", name);
        treeMap.put("email", "{{ email }}");
        treeMap.put("info", " {{ info }}");

        List<Map<String, Object>> insertList = List.of(treeMap, treeMap);
        ;
        var command = new PostgresBulkInsertCommand("user", new BulkObjectChangeSet(toJson(insertList))) {
            @Override
            public EscapeSql escapeStrFunc() {
                return testEscaper;
            }
        };
        var render = command.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals(
                """
                        insert into user ("id","name","email","info") values (12312,$$jack$$,$$jack@gmail.com$$,$${"age":35,"job":"sales"}$$),(12312,$$jack$$,$$jack@gmail.com$$,$${"age":35,"job":"sales"}$$)""",
                render.sql());

        Assertions.assertThat(render.bindParams()).isEqualTo(List.of());
    }


    @Test
    public void testBulkUpdateCommand() {

        List<Map<String, Object>> updateList = List.of(Map.of("id", 1,
                        "name", "jack",
                        "email", "jack@jack.com"
                ),
                Map.of("id", 2,
                        "name", "rose",
                        "info", ImmutableMap.of("age", 35, "job", "sales")
                )
        );

        var command = new PostgresBulkUpdateCommand("user",
                new BulkObjectChangeSet(toJson(updateList)), "id") {
            @Override
            public EscapeSql escapeStrFunc() {
                return testEscaper;
            }
        };
        var render = command.render(Map.of());

        Assert.assertEquals(
                """
                        UPDATE user set
                        "name" = CASE WHEN "id" = 1 THEN $$jack$$ WHEN "id" = 2 THEN $$rose$$ ELSE "name" END,
                        "email" = CASE WHEN "id" = 1 THEN $$jack@jack.com$$ ELSE "email" END,
                        "info" = CASE WHEN "id" = 2 THEN $${"age":35,"job":"sales"}$$ ELSE "info" END
                        where id in (1,2)""",
                render.sql());
        Assertions.assertThat(render.bindParams()).isEqualTo(List.of());
    }


}