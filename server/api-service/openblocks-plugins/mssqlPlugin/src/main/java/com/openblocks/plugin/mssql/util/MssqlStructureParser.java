package com.openblocks.plugin.mssql.util;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Map;

import com.openblocks.sdk.models.DatasourceStructure.Column;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.models.DatasourceStructure.TableType;

@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
public class MssqlStructureParser {

    /**
     * Example output for COLUMNS_QUERY:
     * +------------+-----------+-------------+-------------+-------------+------------+----------------+
     * | table_name | column_id | column_name | column_type | is_nullable | COLUMN_KEY | EXTRA          |
     * +------------+-----------+-------------+-------------+-------------+------------+----------------+
     * | test       |         1 | id          | int         |           0 | PRI        | auto_increment |
     * | test       |         2 | firstname   | varchar     |           1 |            |                |
     * | test       |         3 | middlename  | varchar     |           1 |            |                |
     * | test       |         4 | lastname    | varchar     |           1 |            |                |
     * +------------+-----------+-------------+-------------+-------------+------------+----------------+
     */
    public static final String COLUMNS_QUERY = """
            SELECT
              table_schema as "table_schema",
              table_schema + '.' + table_name as "table_name",
              column_name as "column_name",
              data_type as "column_type",
              ordinal_position as "ordinal_position",
              column_default as "column_default",
              is_nullable as "is_nullable"
              FROM INFORMATION_SCHEMA.COLUMNS
              ORDER BY table_name, ordinal_position
            """;

    public static void parseTableAndColumns(Map<String, Table> tablesByName, Statement statement) throws SQLException {
        try (ResultSet columnsResultSet = statement.executeQuery(COLUMNS_QUERY)) {
            while (columnsResultSet.next()) {
                String tableName = columnsResultSet.getString("table_name");
                String schema = columnsResultSet.getString("table_schema");

                Table table = tablesByName.computeIfAbsent(tableName, __ -> new Table(
                        TableType.TABLE, schema, tableName,
                        new ArrayList<>(),
                        new ArrayList<>(),
                        new ArrayList<>()
                ));

                table.addColumn(new Column(
                        columnsResultSet.getString("column_name"),
                        columnsResultSet.getString("column_type"),
                        null,
                        false
                ));
            }
        }
    }
}
