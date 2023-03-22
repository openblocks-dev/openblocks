/**
 * Copyright 2021 Appsmith Inc.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * <p>
 */
// copied for postgres result parsing
package com.openblocks.plugin.postgres.utils;

import static com.openblocks.sdk.util.DateTimeUtils.DATE_TIME_FORMAT;
import static com.openblocks.sdk.util.JsonUtils.readTree;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.apache.commons.lang3.StringUtils;
import org.postgresql.util.PGobject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceStructure.Table;

@SuppressWarnings({"SqlNoDataSourceInspection", "SqlDialectInspection"})
public class PostgresResultParser {

    private static final String DATE_COLUMN_TYPE_NAME = "date";
    private static final String TIMESTAMP_TYPE_NAME = "timestamp";
    private static final String TIMESTAMPTZ_TYPE_NAME = "timestamptz";
    private static final String TIME_TYPE_NAME = "time";
    private static final String TIMETZ_TYPE_NAME = "timetz";
    private static final String INTERVAL_TYPE_NAME = "interval";
    private static final String JSON_TYPE_NAME = "json";
    private static final String JSONB_TYPE_NAME = "jsonb";

    public static final String CONSTRAINT_QUERY =
            """
                    select c.conname                                         as constraint_name,
                           c.contype                                         as constraint_type,
                           sch.nspname                                       as self_schema,
                           tbl.relname                                       as self_table,
                           array_agg(col.attname order by u.attposition)     as self_columns,
                           f_sch.nspname                                     as foreign_schema,
                           f_tbl.relname                                     as foreign_table,
                           array_agg(f_col.attname order by f_u.attposition) as foreign_columns,
                           pg_get_constraintdef(c.oid)                       as definition
                    from pg_constraint c
                             left join lateral unnest(c.conkey) with ordinality as u(attnum, attposition) on true
                             left join lateral unnest(c.confkey) with ordinality as f_u(attnum, attposition)
                                       on f_u.attposition = u.attposition
                             join pg_class tbl on tbl.oid = c.conrelid
                             join pg_namespace sch on sch.oid = tbl.relnamespace
                             left join pg_attribute col on (col.attrelid = tbl.oid and col.attnum = u.attnum)
                             left join pg_class f_tbl on f_tbl.oid = c.confrelid
                             left join pg_namespace f_sch on f_sch.oid = f_tbl.relnamespace
                             left join pg_attribute f_col on (f_col.attrelid = f_tbl.oid and f_col.attnum = f_u.attnum)
                    group by constraint_name, constraint_type, self_schema, self_table, definition, foreign_schema, foreign_table
                    order by self_schema, self_table;""";
    public static final String TABLES_QUERY =
            """
                    select a.attname                                                      as name,
                           t1.typname                                                     as column_type,
                           case when a.atthasdef then pg_get_expr(d.adbin, d.adrelid) end as default_expr,
                           c.relkind                                                      as kind,
                           c.relname                                                      as table_name,
                           n.nspname                                                      as schema_name
                    from pg_catalog.pg_attribute a
                             left join pg_catalog.pg_type t1 on t1.oid = a.atttypid
                             inner join pg_catalog.pg_class c on a.attrelid = c.oid
                             left join pg_catalog.pg_namespace n on c.relnamespace = n.oid
                             left join pg_catalog.pg_attrdef d on d.adrelid = c.oid and d.adnum = a.attnum
                    where a.attnum > 0
                      and not a.attisdropped
                      and n.nspname not in ('information_schema', 'pg_catalog')
                      and c.relkind in ('r', 'v')
                    order by c.relname, a.attnum;""";

    public static void parseDatabaseStructure(Map<String, Table> tablesByName, Statement statement) throws SQLException {
        parseTableAndColumns(tablesByName, statement);
        parseConstraints(tablesByName, statement);
    }

    private static void parseConstraints(Map<String, Table> tablesByName, Statement statement) throws SQLException {
        try (ResultSet constraintsResultSet = statement.executeQuery(CONSTRAINT_QUERY)) {
            while (constraintsResultSet.next()) {
                final String constraintName = constraintsResultSet.getString("constraint_name");
                final char constraintType = constraintsResultSet.getString("constraint_type").charAt(0);
                final String selfSchema = constraintsResultSet.getString("self_schema");
                final String tableName = constraintsResultSet.getString("self_table");
                final String fullTableName = selfSchema + "." + tableName;
                if (!tablesByName.containsKey(fullTableName)) {
                    continue;
                }

                final Table table = tablesByName.get(fullTableName);

                if (constraintType == 'p') {
                    final DatasourceStructure.PrimaryKey key = new DatasourceStructure.PrimaryKey(
                            constraintName,
                            List.of((String[]) constraintsResultSet.getArray("self_columns").getArray())
                    );
                    table.getKeys().add(key);

                } else if (constraintType == 'f') {
                    final String foreignSchema = constraintsResultSet.getString("foreign_schema");
                    final String prefix = (foreignSchema.equalsIgnoreCase(selfSchema) ? "" : foreignSchema + ".")
                            + constraintsResultSet.getString("foreign_table")
                            + ".";

                    final DatasourceStructure.ForeignKey key = new DatasourceStructure.ForeignKey(
                            constraintName,
                            List.of((String[]) constraintsResultSet.getArray("self_columns").getArray()),
                            Stream.of((String[]) constraintsResultSet.getArray("foreign_columns").getArray())
                                    .map(name -> prefix + name)
                                    .toList()
                    );

                    table.getKeys().add(key);

                }
            }
        }
    }

    private static void parseTableAndColumns(Map<String, Table> tablesByName, Statement statement) throws SQLException {
        try (ResultSet columnsResultSet = statement.executeQuery(TABLES_QUERY)) {
            while (columnsResultSet.next()) {
                final char kind = columnsResultSet.getString("kind").charAt(0);
                final String schemaName = columnsResultSet.getString("schema_name");
                final String tableName = columnsResultSet.getString("table_name");
                final String fullTableName = schemaName + "." + tableName;
                if (!tablesByName.containsKey(fullTableName)) {
                    tablesByName.put(fullTableName, new Table(
                            kind == 'r' ? DatasourceStructure.TableType.TABLE : DatasourceStructure.TableType.VIEW,
                            schemaName,
                            fullTableName,
                            new ArrayList<>(),
                            new ArrayList<>(),
                            new ArrayList<>()
                    ));
                }
                final Table table = tablesByName.get(fullTableName);
                final String defaultExpr = columnsResultSet.getString("default_expr");
                boolean isAutogenerated = StringUtils.isNotEmpty(defaultExpr) && defaultExpr.toLowerCase().contains("nextval");

                table.getColumns().add(new DatasourceStructure.Column(
                                columnsResultSet.getString("name"),
                                columnsResultSet.getString("column_type"),
                                defaultExpr,
                                isAutogenerated
                        )
                );
            }
        }
    }

    public static List<Map<String, Object>> parseRows(ResultSet resultSet) throws SQLException, JsonProcessingException {
        ResultSetMetaData metaData = resultSet.getMetaData();
        int columnCount = metaData.getColumnCount();
        List<Map<String, Object>> result = new ArrayList<>();
        while (resultSet.next()) {
            Map<String, Object> row = parseRowValue(resultSet, metaData, columnCount);
            result.add(row);
        }
        return result;
    }


    private static Map<String, Object> parseRowValue(ResultSet resultSet, ResultSetMetaData metaData, int colCount)
            throws SQLException, JsonProcessingException {
        Map<String, Object> row = new LinkedHashMap<>(colCount);
        for (int i = 1; i <= colCount; i++) {
            final String typeName = metaData.getColumnTypeName(i);

            Object value = parseValue(resultSet, i, typeName);
            row.put(metaData.getColumnName(i), value);
        }
        return row;
    }

    private static Object parseValue(ResultSet resultSet, int i, String typeName) throws SQLException, JsonProcessingException {
        if (resultSet.getObject(i) == null) {
            return null;
        }
        if (DATE_COLUMN_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return DateTimeFormatter.ISO_DATE.format(resultSet.getDate(i).toLocalDate());
        }
        if (TIMESTAMP_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return DATE_TIME_FORMAT.format(
                    LocalDateTime.of(
                            resultSet.getDate(i).toLocalDate(),
                            resultSet.getTime(i).toLocalTime()
                    )
            );
        }
        if (TIMESTAMPTZ_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return DateTimeFormatter.ISO_DATE_TIME.format(
                    resultSet.getObject(i, OffsetDateTime.class)
            );
        }
        if (TIME_TYPE_NAME.equalsIgnoreCase(typeName) || TIMETZ_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return resultSet.getString(i);
        }
        if (INTERVAL_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return resultSet.getObject(i).toString();
        }
        if (typeName.startsWith("_")) {
            return resultSet.getArray(i).getArray();
        }
        if (JSON_TYPE_NAME.equalsIgnoreCase(typeName)
                || JSONB_TYPE_NAME.equalsIgnoreCase(typeName)) {
            return readTree(resultSet.getString(i));
        }

        /*
          Any type that JDBC does not understand gets mapped to PGobject. PGobject has
          two attributes: type and value. Hence, when PGobject gets serialized, it gets
          converted into a JSON like {"type":"citext", "value":"someText"}. Since we are
          only interested in the value and not the type, it makes sense to extract out
          the value as a string.
          Reference: https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/util/PGobject.html
         */
        Object value = resultSet.getObject(i);
        if (value instanceof PGobject pgObject) {
            return pgObject.getValue();
        }
        return value;
    }
}
