package com.openblocks.sdk.plugin.sqlcommand.command.mssql;

import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Test;

import com.openblocks.sdk.plugin.sqlcommand.GuiSqlCommand.GuiSqlCommandRenderResult;
import com.openblocks.sdk.plugin.sqlcommand.changeset.KeyValuePairChangeSet;

public class MssqlInsertCommandTest {
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

        MssqlInsertCommand insertCommand = new MssqlInsertCommand("user", changeSet);

        GuiSqlCommandRenderResult render = insertCommand.render(Map.of("email", email, "info", infoMap));

        Assert.assertEquals("insert into user ([id],[name],[email],[info]) values (?,?,?,?);", render.sql());
        Assertions.assertThat(render.bindParams()).isEqualTo(List.of(Integer.parseInt(id), name, email, toJson(infoMap)));

    }
}