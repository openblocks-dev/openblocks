package com.openblocks.sdk.plugin.common.sql;

import static java.util.Collections.emptyList;
import static org.apache.commons.collections4.MapUtils.getString;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.openblocks.sdk.models.DatasourceStructure.Column;
import com.openblocks.sdk.models.DatasourceStructure.Table;
import com.openblocks.sdk.models.DatasourceStructure.TableType;

public class StructureParser {

    /**
     * oracle converts to uppercase automatically, using [as "table_name"] here can keep its case
     */
    public static final String QUERY_STRUCTURE_SQL = """
            SELECT
            	table_name as "table_name",
            	column_name as "column_name",
            	data_type as "data_type"
            FROM
            	user_tab_cols
            WHERE
                hidden_column = 'NO'
            """;

    public static List<Table> parseColumns(ResultSet resultSet) throws SQLException {

        List<Map<String, Object>> rows = ResultSetParser.parseRows(resultSet);

        Map<String, Table> tables = new HashMap<>();
        for (Map<String, Object> columnMap : rows) {
            String tableName = getString(columnMap, "table_name");
            Table table = tables.computeIfAbsent(tableName,
                    k -> new Table(TableType.TABLE, null, k, new ArrayList<>(), emptyList(), emptyList()));

            String columnName = getString(columnMap, "column_name");
            String dataType = getString(columnMap, "data_type");
            table.addColumn(new Column(columnName, dataType, null, null));
        }
        return new ArrayList<>(tables.values());
    }
}
