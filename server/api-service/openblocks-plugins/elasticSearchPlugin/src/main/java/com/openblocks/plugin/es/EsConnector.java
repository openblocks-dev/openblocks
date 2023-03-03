package com.openblocks.plugin.es;

import static com.openblocks.sdk.exception.BizError.DATASOURCE_CLOSE_FAILED;
import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.util.ExceptionUtils.ofException;
import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;

import java.io.IOException;
import java.time.Duration;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.pf4j.Extension;
import org.springframework.http.HttpMethod;

import com.google.common.base.Joiner;
import com.openblocks.plugin.es.model.EsConnection;
import com.openblocks.plugin.es.model.EsDatasourceConfig;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.models.DatasourceTestResult;
import com.openblocks.sdk.plugin.common.DatasourceConnector;
import com.openblocks.sdk.plugin.common.QueryExecutionUtils;
import com.openblocks.sdk.util.ExceptionUtils;
import com.openblocks.sdk.util.JsonUtils;
import com.openblocks.sdk.util.Preconditions;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

/**
 * doc references:
 * restClient: <a href="https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/current/java-rest-low.html">...</a>
 * auth: <a href="https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/current/_basic_authentication.html">...</a>
 */
@Slf4j
@Extension
public class EsConnector implements DatasourceConnector<EsConnection, EsDatasourceConfig> {

    private static final Joiner JOINER = Joiner.on("/");

    private final Conf<Duration> datasourceValidateTimeout;
    private final CommonConfig commonConfig;

    public EsConnector(ConfigCenter configCenter, CommonConfig commonConfig) {
        datasourceValidateTimeout = configCenter.mongoPlugin().ofInteger("datasourceValidateTimeoutMillis", 6000)
                .then(Duration::ofMillis);
        this.commonConfig = commonConfig;
    }

    @Nonnull
    @Override
    public EsDatasourceConfig resolveConfig(Map<String, Object> configMap) {
        EsDatasourceConfig result = JsonUtils.fromJson(JsonUtils.toJson(configMap), EsDatasourceConfig.class);
        if (result == null) {
            throw ofPluginException(DATASOURCE_ARGUMENT_ERROR, "INVALID_ES_CONFIG");
        }
        return result;
    }

    @Override
    public Set<String> validateConfig(EsDatasourceConfig connectionConfig) {
        Set<String> invalids = new HashSet<>();
        if (StringUtils.isBlank(connectionConfig.getConnectionString())) {
            invalids.add("CONNECTION_STRING_EMPTY");
        }
        return invalids;
    }

    @Override
    public Mono<EsConnection> createConnection(EsDatasourceConfig connectionConfig) {
        return Mono.fromSupplier(() -> buildRestClient(connectionConfig))
                .map(ReactorRestClientAdaptor::new)
                .map(EsConnection::new)
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }

    /**
     * low level rest client
     * WARNING: this is a blocking method!
     */
    private RestClient buildRestClient(EsDatasourceConfig esDatasourceConfig) {
        ConnectionStringParseResult parseResult = parseConnectionString(esDatasourceConfig.getConnectionString());
        if (commonConfig.getDisallowedHosts().contains(parseResult.getHost())) {
            throw new BizException(BizError.INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_CONNECTION_STRING");
        }
        HttpHost httpHost = new HttpHost(parseResult.getHost(), parseResult.getPort(), parseResult.getSchema());

        RestClientBuilder restClientBuilder = RestClient.builder(httpHost);
        // authentication
        if (StringUtils.isNotBlank(esDatasourceConfig.getUsername()) && StringUtils.isNotBlank(esDatasourceConfig.getPassword())) {
            UsernamePasswordCredentials usernamePasswordCredentials =
                    new UsernamePasswordCredentials(esDatasourceConfig.getUsername(), esDatasourceConfig.getPassword());
            CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(AuthScope.ANY, usernamePasswordCredentials);
            restClientBuilder.setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider));
        }

        // https://github.com/elastic/elasticsearch/issues/71026
        // restClient will generate a Header "Host: {host}:{defaultPort}" when connecting to an 80(443) host,
        // and es server will return a "no such host" error. To solve this, we override Host header here.
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host
        if (parseResult.getPort() == -1) {
            restClientBuilder.setDefaultHeaders(new Header[] {new BasicHeader("Host", parseResult.getHost())});
        }

        //prefix
        if (StringUtils.isNotBlank(parseResult.getPrefix())) {
            restClientBuilder.setPathPrefix("/" + parseResult.getPrefix());
        }
        return restClientBuilder.build();
    }

    @Override
    public Mono<Void> destroyConnection(EsConnection esConnection) {
        return Mono.<Void> fromRunnable(() ->
                        Optional.ofNullable(esConnection)
                                .ifPresent(connection -> {
                                    try {
                                        connection.close();
                                    } catch (IOException e) {
                                        throw ofException(DATASOURCE_CLOSE_FAILED, "DATASOURCE_CLOSE_FAILED", e.getMessage());
                                    }
                                }))
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }

    @Override
    public Mono<DatasourceTestResult> testConnection(EsDatasourceConfig connectionConfig) {
        return Mono.from(doCreateConnection(connectionConfig))
                .zipWhen(esConnection -> {
                    Request request = new Request(HttpMethod.HEAD.name(), "");
                    return esConnection.reactorRestClientAdaptor().request(request);
                })
                .timeout(datasourceValidateTimeout.get())
                .map(zip -> {
                    //close
                    try {
                        zip.getT1().close();
                    } catch (IOException e) {
                        log.error("close rest client error.", e);
                    }
                    //parse response
                    Response response = zip.getT2();
                    if (response.getStatusLine().getStatusCode() == 200) {
                        return DatasourceTestResult.testSuccess();
                    }

                    log.error("test es fail.{},{}", JsonUtils.toJson(connectionConfig), response);
                    return DatasourceTestResult.testFail(response.getStatusLine().getReasonPhrase());
                })
                .onErrorResume(throwable -> {
                    log.error("test es error.{}", JsonUtils.toJson(connectionConfig), throwable);
                    return Mono.just(DatasourceTestResult.testFail(throwable));
                })
                .subscribeOn(QueryExecutionUtils.querySharedScheduler());
    }

    private ConnectionStringParseResult parseConnectionString(String connectionString) {

        ConnectionStringParseResult parseResult = new ConnectionStringParseResult();

        String[] connectionStrings = connectionString.split("://");
        Preconditions.check(connectionStrings.length == 1 || connectionStrings.length == 2, BizError.INVALID_DATASOURCE_CONFIG_TYPE,
                "INVALID_CONNECTION_STRING");
        //schema
        if (connectionStrings.length == 2) {
            parseResult.setSchema(connectionStrings[0].trim());
        }

        String hostPortAndPrefixString = connectionStrings[connectionStrings.length - 1];
        String[] hostPortAndPrefixes = hostPortAndPrefixString.split("/");
        //host & port
        String hostPortString = hostPortAndPrefixes[0];
        String[] hostPorts = hostPortString.split(":");

        Preconditions.check(hostPorts.length == 1 || hostPorts.length == 2, BizError.INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_CONNECTION_STRING");
        //host
        parseResult.setHost(hostPorts[0].trim());

        //connectionString might not contains port
        if (hostPorts.length == 2) {
            try {
                //port
                parseResult.setPort(Integer.parseInt(hostPorts[1].trim()));
            } catch (NumberFormatException e) {
                log.error("port parse error.{}", connectionString, e);
                throw ExceptionUtils.ofException(BizError.INVALID_DATASOURCE_CONFIG_TYPE, "INVALID_CONNECTION_STRING");
            }
        }
        //prefix
        if (hostPortAndPrefixes.length > 1) {
            List<String> prefixes = Arrays.stream(hostPortAndPrefixes)
                    .map(String::trim)
                    .toList()
                    .subList(1, hostPortAndPrefixes.length);
            parseResult.setPrefix(JOINER.join(prefixes));
        }
        return parseResult;
    }

    private static class ConnectionStringParseResult {

        private String schema = "http";//default
        private String host;
        private int port = -1;//default
        private String prefix = "";//default

        public String getSchema() {
            return schema;
        }

        public void setSchema(String schema) {
            this.schema = schema;
        }

        public String getHost() {
            return host;
        }

        public void setHost(String host) {
            this.host = host;
        }

        public int getPort() {
            return port;
        }

        public void setPort(int port) {
            this.port = port;
        }

        public String getPrefix() {
            return prefix;
        }

        public void setPrefix(String prefix) {
            this.prefix = prefix;
        }
    }
}
