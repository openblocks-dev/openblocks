package com.openblocks.domain.plugin.service.impl;

import static com.openblocks.sdk.exception.BizError.INVALID_DATASOURCE_TYPE;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.pf4j.PluginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.domain.datasource.service.impl.ClientBasedConnectionPool;
import com.openblocks.domain.datasource.service.impl.StatelessConnectionPool;
import com.openblocks.domain.datasource.service.impl.TokenBasedConnectionPool;
import com.openblocks.domain.plugin.DatasourceMetaInfo;
import com.openblocks.domain.plugin.DatasourceMetaInfoConstants;
import com.openblocks.domain.plugin.client.DatasourcePluginClient;
import com.openblocks.domain.plugin.service.DatasourceMetaInfoService;
import com.openblocks.sdk.constants.ConfigTypes;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.plugin.common.DatasourceConnector;
import com.openblocks.sdk.plugin.common.QueryExecutor;
import com.openblocks.sdk.query.QueryExecutionContext;

import reactor.core.publisher.Flux;

@SuppressWarnings("unused")
@Component
public class DatasourceMetaInfoServiceImpl implements DatasourceMetaInfoService {

    private static final DatasourceMetaInfo POSTGRES = DatasourceMetaInfo.builder()
            .type("postgres")
            .displayName("PostgreSQL")
            .pluginExecutorKey("postgres-plugin")
            .hasStructureInfo(true)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo REST_API = DatasourceMetaInfo.builder()
            .type(DatasourceMetaInfoConstants.REST_API)
            .displayName("REST API")
            .pluginExecutorKey("restapi-plugin")
            .connectionPool(TokenBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo MONGODB = DatasourceMetaInfo.builder()
            .type("mongodb")
            .displayName("MongoDB")
            .pluginExecutorKey("mongo-plugin")
            .hasStructureInfo(true)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo MYSQL = DatasourceMetaInfo.builder()
            .type(DatasourceMetaInfoConstants.MYSQL)
            .displayName("MySQL")
            .pluginExecutorKey("mysql-plugin")
            .hasStructureInfo(true)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo OPENBLOCKS_API = DatasourceMetaInfo.builder()
            .type(DatasourceMetaInfoConstants.OPENBLOCKS_API)
            .displayName("Openblocks API")
            .pluginExecutorKey("openblocks-api-plugin")
            .connectionPool(StatelessConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo ES = DatasourceMetaInfo.builder()
            .type("es")
            .displayName("Elasticsearch")
            .pluginExecutorKey("es-plugin")
            .hasStructureInfo(false)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo REDIS = DatasourceMetaInfo.builder()
            .type("redis")
            .displayName("Redis")
            .pluginExecutorKey("redis-plugin")
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo SQL_SERVER = DatasourceMetaInfo.builder()
            .type("mssql")
            .displayName("Microsoft SQL Server")
            .pluginExecutorKey("mssql-plugin")
            .hasStructureInfo(true)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo ORACLE = DatasourceMetaInfo.builder()
            .type("oracle")
            .displayName("Oracle")
            .pluginExecutorKey("oracle-plugin")
            .hasStructureInfo(true)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo MARIA_DB = DatasourceMetaInfo.builder()
            .type("mariadb")
            .displayName("MariaDB")
            .pluginExecutorKey("mysql-plugin")
            .hasStructureInfo(true)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo SMTP = DatasourceMetaInfo.builder()
            .type(ConfigTypes.SMTP)
            .displayName("SMTP")
            .pluginExecutorKey("smtp-plugin")
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo CLICKHOUSE = DatasourceMetaInfo.builder()
            .type("clickHouse")
            .displayName("ClickHouse")
            .pluginExecutorKey("clickHouse-plugin")
            .hasStructureInfo(true)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();


    private static final DatasourceMetaInfo SNOWFLAKE = DatasourceMetaInfo.builder()
            .type("snowflake")
            .displayName("Snowflake")
            .pluginExecutorKey("snowflake-plugin")
            .hasStructureInfo(true)
            .connectionPool(ClientBasedConnectionPool.class)
            .build();

    private static final DatasourceMetaInfo GOOGLE_SHEETS = DatasourceMetaInfo.builder()
            .type("googleSheets")
            .displayName("Google Sheets")
            .pluginExecutorKey("googleSheets-plugin")
            .connectionPool(StatelessConnectionPool.class).build();

    private static final DatasourceMetaInfo GRAPHQL = DatasourceMetaInfo.builder()
            .type("graphql")
            .displayName("GraphQL")
            .pluginExecutorKey("graphql-plugin")
            .connectionPool(StatelessConnectionPool.class).build();
    private static final ArrayList<DatasourceMetaInfo> datasourceMetaInfos = new ArrayList<>();

    static {
        Field[] allFields = DatasourceMetaInfoServiceImpl.class.getDeclaredFields();
        for (Field field : allFields) {
            if (Modifier.isPrivate(field.getModifiers()) && field.getType() == DatasourceMetaInfo.class) {
                field.setAccessible(true);
                try {
                    DatasourceMetaInfo o = (DatasourceMetaInfo) field.get(null);
                    datasourceMetaInfos.add(o);
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    @Autowired
    private PluginManager pluginManager;

    @Autowired
    private DatasourcePluginClient datasourcePluginClient;

    @Override
    public List<DatasourceMetaInfo> getJavaBasedSupportedDatasourceMetaInfos() {
        return datasourceMetaInfos;
    }

    @Override
    public boolean isJavaDatasourcePlugin(String type) {
        return "openblocksApi".equals(type)
                || getJavaBasedSupportedDatasourceMetaInfos()
                .stream()
                .anyMatch(datasourceMetaInfo -> datasourceMetaInfo.getType().equals(type));
    }

    @Override
    public boolean isJsDatasourcePlugin(String type) {
        return !isJavaDatasourcePlugin(type);
    }

    @Override
    public Flux<DatasourceMetaInfo> getAllSupportedDatasourceMetaInfos() {
        Flux<DatasourceMetaInfo> datasourceMetaInfoFlux = datasourcePluginClient.getDatasourcePluginDefinitions()
                .map(datasourcePluginDTO -> DatasourceMetaInfo.builder()
                        .type(datasourcePluginDTO.getId())
                        .displayName(datasourcePluginDTO.getName())
                        .definition(datasourcePluginDTO)
                        .build());

        return Flux.fromIterable(getJavaBasedSupportedDatasourceMetaInfos())
                .concatWith(datasourceMetaInfoFlux);
    }

    @SuppressWarnings("unchecked")
    @Override
    public DatasourceConnector<Object, ? extends DatasourceConnectionConfig> getDatasourceConnector(String datasourceType) {
        DatasourceMetaInfo datasourceMetaInfo = getDatasourceMetaInfo(datasourceType);
        var executorList = pluginManager.getExtensions(DatasourceConnector.class, datasourceMetaInfo.getPluginExecutorKey());
        if (executorList.isEmpty()) {
            throw new BizException(BizError.NO_RESOURCE_FOUND, "PLUGIN_NOT_FOUND", datasourceMetaInfo.getPluginExecutorKey());
        }
        return executorList.get(0);
    }

    @Override
    public DatasourceMetaInfo getDatasourceMetaInfo(String datasourceType) {
        return getJavaBasedSupportedDatasourceMetaInfos()
                .stream()
                .filter(value -> value.getType().equalsIgnoreCase(datasourceType))
                .findFirst()
                .orElseThrow(() -> new BizException(INVALID_DATASOURCE_TYPE, "INVALID_DATASOURCE_TYPE", datasourceType));
    }

    @SuppressWarnings("unchecked")
    @Override
    public QueryExecutor<? extends DatasourceConnectionConfig, Object, ? extends QueryExecutionContext> getQueryExecutor(String datasourceType) {
        DatasourceMetaInfo datasourceMetaInfo = getDatasourceMetaInfo(datasourceType);
        var executorList = pluginManager.getExtensions(QueryExecutor.class, datasourceMetaInfo.getPluginExecutorKey());
        if (executorList.isEmpty()) {
            throw new BizException(BizError.NO_RESOURCE_FOUND, "PLUGIN_NOT_FOUND", datasourceMetaInfo.getPluginExecutorKey());
        }
        return executorList.get(0);
    }

    @Override
    public DatasourceConnectionConfig resolveDetailConfig(Map<String, Object> datasourceDetailMap, String datasourceType) {
        return getDatasourceConnector(datasourceType).resolveConfig(datasourceDetailMap);
    }

}
