package com.openblocks.plugin.mysql.utils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.openblocks.sdk.models.DatasourceStructure.Column;
import com.openblocks.sdk.models.DatasourceStructure.ForeignKey;
import com.openblocks.sdk.models.DatasourceStructure.Key;
import com.openblocks.sdk.models.DatasourceStructure.PrimaryKey;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.models.DatasourceStructure.TableType;

@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
public class MysqlStructureParser {

    public static final String DATE_COLUMN_TYPE_NAME = "date";
    public static final String DATETIME_COLUMN_TYPE_NAME = "datetime";
    public static final String TIMESTAMP_COLUMN_TYPE_NAME = "timestamp";

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
            select tab.table_name as table_name,
                   col.ordinal_position as column_id,
                   col.column_name as column_name,
                   col.data_type as column_type,
                   col.is_nullable = 'YES' as is_nullable,
                   col.column_key,
                   col.extra
            from information_schema.tables as tab
                     inner join information_schema.columns as col
                                on col.table_schema = tab.table_schema
                                    and col.table_name = tab.table_name
            where tab.table_type = 'BASE TABLE'
              and tab.table_schema = database()
            order by tab.table_name,
                     col.ordinal_position;
                     """;


    // "  and i.enforced = 'YES'\n" +  // Looks like this is not available on all versions of MySQL.
    /**
     * Example output for KEYS_QUERY:
     * +-----------------+-------------+------------+-----------------+-------------+----------------+---------------+----------------+
     * | CONSTRAINT_NAME | self_schema | self_table | constraint_type | self_column | foreign_schema | foreign_table | foreign_column |
     * +-----------------+-------------+------------+-----------------+-------------+----------------+---------------+----------------+
     * | PRIMARY         | mytestdb    | test       | p               | id          | NULL           | NULL          | NULL           |
     * +-----------------+-------------+------------+-----------------+-------------+----------------+---------------+----------------+
     */
    public static final String KEYS_QUERY = """
            select i.constraint_name,
                   i.TABLE_SCHEMA as self_schema,
                   i.table_name as self_table,
                   if(i.constraint_type = 'FOREIGN KEY', 'f', 'p') as constraint_type,
                   k.column_name as self_column, -- k.ordinal_position, k.position_in_unique_constraint,
                   k.referenced_table_schema as foreign_schema,
                   k.referenced_table_name as foreign_table,
                   k.referenced_column_name as foreign_column
            from information_schema.table_constraints i
                     left join information_schema.key_column_usage k
                         on i.constraint_name = k.constraint_name and i.table_name = k.table_name
            where i.table_schema = database()
              and k.constraint_schema = database()
              and i.constraint_type in ('FOREIGN KEY', 'PRIMARY KEY')
            order by i.table_name, i.constraint_name, k.position_in_unique_constraint;
            """;

    public static void parseTableKeys(Map<String, Table> tablesByName, Statement statement) throws SQLException {
        try (ResultSet constraintsResultSet = statement.executeQuery(KEYS_QUERY)) {
            parseTableKeys(constraintsResultSet, tablesByName);
        }
    }

    private static void parseTableKeys(ResultSet constraintsResultSet, Map<String, Table> tablesByName) throws SQLException {

        Map<String, Key> keyRegistry = new HashMap<>();

        while (constraintsResultSet.next()) {
            final String constraintName = constraintsResultSet.getString("constraint_name");
            final char constraintType = constraintsResultSet.getString("constraint_type").charAt(0);
            final String selfSchema = constraintsResultSet.getString("self_schema");
            final String tableName = constraintsResultSet.getString("self_table");
            Table table = tablesByName.get(tableName);
            if (table == null) {
                continue;
            }

            String keyFullName = tableName + "." + constraintsResultSet.getString("constraint_name");

            if (constraintType == 'p') {
                handlePrimaryKey(constraintsResultSet, table, keyRegistry, constraintName, keyFullName);
            }

            if (constraintType == 'f') {
                handleForeignKey(constraintsResultSet, table, keyRegistry, constraintName, selfSchema, keyFullName);

            }
        }
    }

    private static void handlePrimaryKey(ResultSet constraintsResultSet, Table table, Map<String, Key> keyRegistry, String constraintName,
            String keyFullName)
            throws SQLException {
        if (!keyRegistry.containsKey(keyFullName)) {
            PrimaryKey key = new PrimaryKey(constraintName, new ArrayList<>());
            keyRegistry.put(keyFullName, key);
            table.addKey(key);
        }
        ((PrimaryKey) keyRegistry.get(keyFullName)).getColumnNames()
                .add(constraintsResultSet.getString("self_column"));
    }

    private static void handleForeignKey(ResultSet constraintsResultSet, Table table, Map<String, Key> keyRegistry, String constraintName,
            String selfSchema,
            String keyFullName) throws SQLException {
        String foreignSchema = constraintsResultSet.getString("foreign_schema");
        String prefix = (foreignSchema.equalsIgnoreCase(selfSchema) ? "" : foreignSchema + ".")
                + constraintsResultSet.getString("foreign_table")
                + ".";
        if (!keyRegistry.containsKey(keyFullName)) {
            ForeignKey key = new ForeignKey(
                    constraintName,
                    new ArrayList<>(),
                    new ArrayList<>()
            );
            keyRegistry.put(keyFullName, key);
            table.addKey(key);
        }
        ((ForeignKey) keyRegistry.get(keyFullName)).getFromColumns()
                .add(constraintsResultSet.getString("self_column"));
        ((ForeignKey) keyRegistry.get(keyFullName)).getToColumns()
                .add(prefix + constraintsResultSet.getString("foreign_column"));
    }

    public static void parseTableAndColumns(Map<String, Table> tablesByName, Statement statement) throws SQLException {
        try (ResultSet columnsResultSet = statement.executeQuery(COLUMNS_QUERY)) {
            while (columnsResultSet.next()) {
                String tableName = columnsResultSet.getString("table_name");
                String extra = columnsResultSet.getString("extra");

                Table table = tablesByName.computeIfAbsent(tableName, __ -> new Table(
                        TableType.TABLE, "", tableName,
                        new ArrayList<>(),
                        new ArrayList<>(),
                        new ArrayList<>()
                ));

                table.addColumn(new Column(
                        columnsResultSet.getString("column_name"),
                        columnsResultSet.getString("column_type"),
                        null,
                        extra.contains("DEFAULT_GENERATED") || extra.contains("auto_increment")
                ));
            }
        }
    }
}
