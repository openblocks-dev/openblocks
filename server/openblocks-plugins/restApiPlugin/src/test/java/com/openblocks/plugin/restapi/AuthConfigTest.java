package com.openblocks.plugin.restapi;

import static com.openblocks.sdk.plugin.restapi.auth.RestApiAuthType.BASIC_AUTH;
import static com.openblocks.sdk.plugin.restapi.auth.RestApiAuthType.BEARER_TOKEN_AUTH;
import static com.openblocks.sdk.plugin.restapi.auth.RestApiAuthType.DIGEST_AUTH;
import static com.openblocks.sdk.plugin.restapi.auth.RestApiAuthType.NO_AUTH;

import org.junit.Assert;
import org.junit.Test;

import com.openblocks.sdk.plugin.restapi.RestApiDatasourceConfig;
import com.openblocks.sdk.plugin.restapi.auth.BasicAuthConfig;
import com.openblocks.sdk.plugin.restapi.auth.DefaultAuthConfig;
import com.openblocks.sdk.plugin.restapi.auth.NoneAuthConfig;
import com.openblocks.sdk.util.JsonUtils;

public class AuthConfigTest {

    @Test
    public void testRestApiDatasourceConfigDeserialize4BasicAuthType() {
        String json = """
                {
                  "headers": [
                    {
                      "key": "Content-Type",
                      "value": "application/json"
                    }
                  ],
                  "authConfig": {
                    "type": "BASIC_AUTH",
                    "username": "jack",
                    "password": "123456"
                  },
                  "url": "http://localhost:8070"
                }
                """;
        RestApiDatasourceConfig restApiDatasourceConfig = JsonUtils.fromJson(json, RestApiDatasourceConfig.class);
        Assert.assertNotNull(restApiDatasourceConfig);
        BasicAuthConfig basicAuthConfig = (BasicAuthConfig) restApiDatasourceConfig.getAuthConfig();
        Assert.assertEquals(BASIC_AUTH, basicAuthConfig.getType());
        Assert.assertEquals("jack", basicAuthConfig.getUsername());
        Assert.assertEquals("123456", basicAuthConfig.getPassword());
    }

    @Test
    public void testRestApiDatasourceConfigDeserialize4DigestAuthType() {
        String json = """
                {
                  "headers": [
                    {
                      "key": "Content-Type",
                      "value": "application/json"
                    }
                  ],
                  "authConfig": {
                    "type": "DIGEST_AUTH",
                    "username": "jack",
                    "password": "123456"
                  },
                  "url": "http://localhost:8070"
                }
                """;
        RestApiDatasourceConfig restApiDatasourceConfig = JsonUtils.fromJson(json, RestApiDatasourceConfig.class);
        Assert.assertNotNull(restApiDatasourceConfig);
        BasicAuthConfig basicAuthConfig = (BasicAuthConfig) restApiDatasourceConfig.getAuthConfig();
        Assert.assertEquals(DIGEST_AUTH, basicAuthConfig.getType());
        Assert.assertEquals("jack", basicAuthConfig.getUsername());
        Assert.assertEquals("123456", basicAuthConfig.getPassword());
    }

    @Test
    public void testRestApiDatasourceConfigDeserialize4NoAuthType() {
        String json = """
                {
                  "headers": [
                    {
                      "key": "Content-Type",
                      "value": "application/json"
                    }
                  ],
                  "authConfig": {
                    "type": "NO_AUTH",
                    "username": "jack",
                    "password": "123456"
                  },
                  "url": "http://localhost:8070"
                }
                """;
        RestApiDatasourceConfig restApiDatasourceConfig = JsonUtils.fromJson(json, RestApiDatasourceConfig.class);
        Assert.assertNotNull(restApiDatasourceConfig);
        NoneAuthConfig noneAuthConfig = (NoneAuthConfig) restApiDatasourceConfig.getAuthConfig();
        Assert.assertEquals(NO_AUTH, noneAuthConfig.getType());
    }

    @Test
    public void testRestApiDatasourceConfigDeserialize4DefaultAuthType() {
        String json = """
                {
                  "headers": [
                    {
                      "key": "Content-Type",
                      "value": "application/json"
                    }
                  ],
                  "authConfig": {
                    "type": "BEARER_TOKEN_AUTH",
                    "username": "jack",
                    "password": "123456"
                  },
                  "url": "http://localhost:8070"
                }
                """;
        RestApiDatasourceConfig restApiDatasourceConfig = JsonUtils.fromJson(json, RestApiDatasourceConfig.class);
        Assert.assertNotNull(restApiDatasourceConfig);
        DefaultAuthConfig defaultAuthConfig = (DefaultAuthConfig) restApiDatasourceConfig.getAuthConfig();
        Assert.assertEquals(BEARER_TOKEN_AUTH, defaultAuthConfig.getType());
    }
}