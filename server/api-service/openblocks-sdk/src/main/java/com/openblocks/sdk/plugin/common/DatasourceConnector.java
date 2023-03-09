package com.openblocks.sdk.plugin.common;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_TIMEOUT_ERROR;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;
import static com.openblocks.sdk.util.JsonUtils.fromJson;
import static com.openblocks.sdk.util.JsonUtils.toJson;

import java.time.Duration;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeoutException;

import javax.annotation.Nonnull;

import org.pf4j.ExtensionPoint;

import com.google.common.reflect.TypeToken;
import com.openblocks.sdk.exception.PluginCommonError;
import com.openblocks.sdk.exception.PluginException;
import com.openblocks.sdk.models.DatasourceConnectionConfig;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.models.TokenBasedConnectionDetail;

import reactor.core.publisher.Mono;

@SuppressWarnings("unchecked")
public interface DatasourceConnector<Connection, ConnectionConfig extends DatasourceConnectionConfig> extends ExtensionPoint {

    @SuppressWarnings("UnstableApiUsage")
    @Nonnull
    default ConnectionConfig resolveConfig(Map<String, Object> configMap) {
        TypeToken<ConnectionConfig> type = new TypeToken<>(getClass()) {
        };

        Class<? super ConnectionConfig> tClass = type.getRawType();
        Object result = fromJson(toJson(configMap), tClass);
        if (result == null) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "DATASOURCE_CONFIG_ERROR");
        }
        return (ConnectionConfig) result;
    }

    /**
     * should not override this method!
     *
     * @return datasource validation messages
     */
    default Set<String> doValidateConfig(DatasourceConnectionConfig config) {
        ConnectionConfig connectionConfig;
        try {
            connectionConfig = (ConnectionConfig) config;
        } catch (ClassCastException e) {
            throw ofPluginException(PluginCommonError.INVALID_QUERY_SETTINGS, "DATASOURCE_TYPE_ERROR", e.getMessage());
        }

        return validateConfig(connectionConfig);
    }

    /**
     * create connection with {@link #doCreateConnection}, and test its availability
     * <p>
     * should not override this method!
     */
    default Mono<DatasourceTestResult> doTestConnection(DatasourceConnectionConfig config) {
        ConnectionConfig connectionConfig;
        try {
            connectionConfig = (ConnectionConfig) config;
        } catch (ClassCastException e) {
            throw ofPluginException(PluginCommonError.DATASOURCE_ARGUMENT_ERROR, "DATASOURCE_TYPE_ERROR", e.getMessage());
        }
        return testConnection(connectionConfig);
    }

    /**
     * should not override this method!
     */
    default Mono<Connection> doCreateConnection(DatasourceConnectionConfig config) {
        ConnectionConfig connectionConfig;
        try {
            connectionConfig = (ConnectionConfig) config;
        } catch (ClassCastException e) {
            throw ofPluginException(PluginCommonError.INVALID_QUERY_SETTINGS, "DATASOURCE_TYPE_ERROR", e.getMessage());
        }

        return createConnection(connectionConfig)
                .timeout(Duration.ofSeconds(10))
                .onErrorMap(TimeoutException.class, error -> new PluginException(DATASOURCE_TIMEOUT_ERROR, "DATASOURCE_TIMEOUT_ERROR"))
                .onErrorMap(Throwable.class, error -> {
                    if (error instanceof PluginException) {
                        return error;
                    }
                    return new PluginException(QUERY_EXECUTION_ERROR, "PLUGIN_CREATE_CONNECTION_FAILED", error.getMessage());
                });
    }

    Set<String> validateConfig(ConnectionConfig config);

    Mono<DatasourceTestResult> testConnection(ConnectionConfig config);

    Mono<Connection> createConnection(ConnectionConfig connectionConfig);

    Mono<Void> destroyConnection(Connection connection);

    default TokenBasedConnectionDetail resolveTokenDetail(Map<String, Object> tokenDetail) {
        throw new UnsupportedOperationException();
    }
}
