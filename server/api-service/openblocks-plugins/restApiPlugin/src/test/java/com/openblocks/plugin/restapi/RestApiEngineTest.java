package com.openblocks.plugin.restapi;

import static com.openblocks.sdk.plugin.restapi.auth.RestApiAuthType.BASIC_AUTH;
import static com.openblocks.sdk.plugin.restapi.auth.RestApiAuthType.DIGEST_AUTH;
import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import com.google.common.collect.ImmutableMap;
import com.openblocks.plugin.restapi.model.RestApiQueryExecutionContext;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.models.Property;
import com.openblocks.sdk.models.QueryExecutionResult;
import com.openblocks.sdk.plugin.common.RestApiUriBuilder;
import com.openblocks.sdk.plugin.restapi.RestApiDatasourceConfig;
import com.openblocks.sdk.plugin.restapi.auth.BasicAuthConfig;
import com.openblocks.sdk.query.QueryExecutionContext;
import com.openblocks.sdk.query.QueryVisitorContext;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

public class RestApiEngineTest {

    private final RestApiExecutor executor = new RestApiExecutor(new CommonConfig());
    private static final RestApiConnector connector = new RestApiConnector();

    private final QueryVisitorContext queryVisitorContext = new QueryVisitorContext("userId1",
            "workspace1", 8080, null, null, null);

    @Test
    public void testUrlConcatenationWithUriBuilder() {
        URI test1 = RestApiUriBuilder.buildUri("http://google.com", "test", emptyMap(), emptyMap());
        assertEquals("http://google.com/test", test1.toString());

        URI test2 = RestApiUriBuilder.buildUri("http://google.com", "/test", emptyMap(), emptyMap());
        assertEquals("http://google.com/test", test2.toString());

        URI test3 = RestApiUriBuilder.buildUri("http://google.com/", "/test", emptyMap(), emptyMap());
        assertEquals("http://google.com/test", test3.toString());

        URI test4 = RestApiUriBuilder.buildUri("http://google.com", "//test", emptyMap(), emptyMap());
        assertEquals("http://google.com/test", test4.toString());

        URI test5 = RestApiUriBuilder.buildUri("http://google.com/", "//test", emptyMap(), emptyMap());
        assertEquals("http://google.com/test", test5.toString());

        URI test6 = RestApiUriBuilder.buildUri(" ", "http://google.com/test", emptyMap(), emptyMap());
        assertEquals("http://google.com/test", test6.toString());

        URI test7 = RestApiUriBuilder.buildUri("http://google.com/test", " ", emptyMap(), emptyMap());
        assertEquals("http://google.com/test", test7.toString());
    }

    @Test
    public void testPostWithApplicationJson() {
        RestApiDatasourceConfig datasourceConfig = RestApiDatasourceConfig.builder()
                .url("https://postman-echo.com/post")
                .build();
        Map<String, Object> queryConfig = ImmutableMap.of(
                "httpMethod", "POST",
                "headers", List.of(new Property("content-type", "application/json")),
                "body", "{\"key\":\"value\"}",
                "params", emptyList(),
                "encodeParams", false
        );

        StepVerifier.create(execute(datasourceConfig, queryConfig, emptyMap()))
                .assertNext(result -> {
                    assertTrue(result.isSuccess());
                    JsonNode data = ((ObjectNode) result.getData()).get("data");
                    assertTrue(data instanceof ObjectNode);
                    assertEquals("{\"key\":\"value\"}", data.toString());
                })
                .verifyComplete();

    }

    @Test
    public void testPostWithTextPlain() {
        RestApiDatasourceConfig dsConfig = RestApiDatasourceConfig.builder()
                .url("https://postman-echo.com/post")
                .build();
        Map<String, Object> queryConfig = ImmutableMap.of(
                "httpMethod", "POST",
                "headers", List.of(new Property("content-type", "text/plain;charset=UTF-8")),
                "body", "{\"key\":\"value\"}",
                "params", emptyList(),
                "encodeParams", false
        );

        StepVerifier.create(execute(dsConfig, queryConfig, emptyMap()))
                .assertNext(result -> {
                    assertTrue(result.isSuccess());
                    JsonNode data = ((ObjectNode) result.getData()).get("data");
                    assertTrue(data instanceof TextNode);
                    assertEquals("{\"key\":\"value\"}", data.asText());
                })
                .verifyComplete();
    }

    @Test
    public void testMultipartFormDataWithTextType() {
        RestApiDatasourceConfig dsConfig = RestApiDatasourceConfig.builder()
                .url("https://postman-echo.com/post")
                .build();
        Map<String, Object> queryConfig = ImmutableMap.of(
                "httpMethod", "POST",
                "headers", List.of(new Property("content-type", "application/x-www-form-urlencoded")),
                "bodyFormData", List.of(new Property("key1", "value1"), new Property("key2", "value2")),
                "params", emptyList(),
                "encodeParams", false
        );
        StepVerifier.create(execute(dsConfig, queryConfig, emptyMap()))
                .assertNext(result -> {
                    assertTrue(result.isSuccess());
                    assertNotNull(result.getData());
                    JsonNode data = ((ObjectNode) result.getData()).get("form");
                    assertEquals("{\"key1\":\"value1\",\"key2\":\"value2\"}", data.toString());
                })
                .verifyComplete();
    }

    @Test
    public void testMultipartFormDataWithFileType() {

        Property property = new Property("key1", """
                {"data":"iVBORw0KGgoAAAANSUhEUgAAA5wAAAEcCAYAAACrnbsgAAAACXBIWXMAAAsSAAALEgHS3X78AAAfxElEQVR4nO3d3XHcxrouYPiU76l7XIhO4IiOQHQE4opAdACnTEcgKgLLtQMwFcGiIjAZgcmdwCIvcC9GwFMtf7M3zOHP/HQDDczzVLGW1wxFDjFAT7/9Nbq/u7+/bwAAACC3/+OIAgAAUILACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEV877ACADyubdvDB09cdV339dFvBmDJd/f390sPAgDsqgiZJ03TvHviEFw3TfOp67qzpWcA+AeBEwDg76D5qmmas2eC5kMpeB51XXez9AwA3wicAMDOi7B50TTNmzWPxV3TNIdd110tPQOAwAkA7LYtwuZCCp37U7m3s23b/fR6l55Y382UqrsZ/+6vBhhgdRYNAgB23ekWYTPZi6m4R0vP1Om4aZoPGV7Zxzh2U5Hr775MVe2lR4FH2RYFANhZUfX6JcPf/+6RFW0Bdp7ACQDsspOMf/vx0iMAO07gBAB2Wc6qpAonwAMCJwCwy7a5d/Oh10uPAOw4gRMAAIAiBE4AAACKEDgBAAAoQuAEAHbZZca/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","name":"test.png"}
                  """, "FILE");

        RestApiDatasourceConfig datasourceConfig = RestApiDatasourceConfig.builder()
                .url("https://postman-echo.com/post")
                .build();
        Map<String, Object> queryConfig = ImmutableMap.of(
                "httpMethod", "POST",
                "headers", List.of(new Property("content-type", "multipart/form-data")),
                "bodyFormData", List.of(property),
                "params", emptyList()
        );

        StepVerifier.create(execute(datasourceConfig, queryConfig, emptyMap()))
                .assertNext(result -> {
                    assertTrue(result.isSuccess());
                    assertNotNull(result.getData());
                    JsonNode filesResponse = ((ObjectNode) result.getData()).get("files");
                    assertEquals(1, filesResponse.size());
                    JsonNode fileValue = filesResponse.get("test.png");
                    assertEquals("data:application/octet-stream;base64,"
                                    +
                                    "iVBORw0KGgoAAAANSUhEUgAAA5wAAAEcCAYAAACrnbsgAAAACXBIWXMAAAsSAAALEgHS3X78AAAfxElEQVR4nO3d3XHcxrouYPiU76l7XIhO4IiOQHQE4opAdACnTEcgKgLLtQMwFcGiIjAZgcmdwCIvcC9GwFMtf7M3zOHP/HQDDczzVLGW1wxFDjFAT7/9Nbq/u7+/bwAAACC3/+OIAgAAUILACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFCFwAgAAUITACQAAQBECJwAAAEV877ACADyubdvDB09cdV339dFvBmDJd/f390sPAgDsqgiZJ03TvHviEFw3TfOp67qzpWcA+AeBEwDg76D5qmmas2eC5kMpeB51XXez9AwA3wicAMDOi7B50TTNmzWPxV3TNIdd110tPQOAwAkA7LYtwuZCCp37U7m3s23b/fR6l55Y382UqrsZ/+6vBhhgdRYNAgB23ekWYTPZi6m4R0vP1Om4aZoPGV7Zxzh2U5Hr775MVe2lR4FH2RYFANhZUfX6JcPf/+6RFW0Bdp7ACQDsspOMf/vx0iMAO07gBAB2Wc6qpAonwAMCJwCwy7a5d/Oh10uPAOw4gRMAAIAiBE4AAACKEDgBAAAoQuAEAHbZZca//XrpEYAdJ3ACALvsPOPffrb0CMCOEzgBgF2WQuJdhr//TuAEWCZwAgA7q+u6r03THGf4+0/jZwHQI3ACADut67o0rfbzFsfgc9d1n5YeBUDgBADoui5VOX/f4ED8Hv8WgEcInAAAf4fOk6Zpfmqa5naF45G+51/xbwB4wvePPwwAsHu6rrtomma/bdvDpmmOmqY5eHAQrpqmuYhpuAC8QOAEAHgggufF0hMArMWUWgAAAIoQOAEAAChC4AQAAKAIgRMAAIAiBE4AAACKsEptxWJJ9pdcdV339YXvYUNt26bl8F899q9jBUMye+a8/9p13dXSo/xD27b7aUuHF47KTdd1N0uPspVnzt1q2+m2bV89su3HN9o4GMYzbYe2mlkQOEcUYWY/PuwXwebtuq+obdvFf16nTnnsEXYTnRwdhhVEp+swvhbvx95z//LBcb/p7c3mmK8gzv/+8X7z0r/qHfPLB8d8p4JoHLuDB23Hi8fvwc9Y/Kd2YwPRQey3Gau0F4u24mKM8zbauaPea372nHniejvXAYbNbNHXuIvr76rXfig2MBnf3d/fe7cGEpWHw94H/rONTEbX0UCd1dox73XettJ13ekav3PR+TpZt7O+gi+pYxads1orG8crVMJekkZfz174nv7v3I/jnY7766Vv2NxdHO+zOYalOG5HvY7KEG3Hde8crrXdyHEOr9xu9M7f40zvwW0c408lQ1wcp+NNBjSfkF73WVxvo4TPXO99AcUHHeM8PF56Yj2Hmc6Hy4J7la71+bKKtm3Ttf4hw4+67Lpu5T5L27ZH8Z69W3pyc1+ifc56jKAEgbOwwqFmE4N0cNaV60Og67rvlh58IN6Tk/gq3XFfBKHT2qoCbdteZOhwrPShGwMKJ5k/bJ+SzvFP0Rme9AhwgaCwqVrbjRzn8IvtRrQZ6Zx6v/RkPqnjfpIz3Mf5c5p5cOehz2O0b7ne+wI+rjPwuYloT/+s8G/Pba1Qt4qhA+dA1+BdtE+fVD2plUWDCkkdlGjY0ofwH5WEzSYavV+apvlP27ZnMVK6M3rvyYeBqkR70UldHO9H7wedq3R+tW17Hp2jIcJmE+f4b+l9btv2ZOnZCUidlLZtF21HDZ3qnW034hy6KRw2m3if/2rb9tO27USact227VWcPyU7uk2vfTvdtfYNnpIGBXpteOlrcC/6NDdRSYXqCJwF9DooQ4WaTS06Clt3cGrX64CN+Z68n3IIWleM7F4NGDQfSu/zb+l9f2ZBhqoM3EnZ1E4MoMSg4XkMXgzZZqRgfxX36a4tBtX+GmGQM7WtF5u+bpiL1KeKQdah2/DUTv07tVsGf6iNwJlRVHOuRuigbGurDk7tIvhcVFJlXoSgi5l31s8iNNVwHaT3/c/oiFcpws3ZSJ2UTb2f64h6XJsXIw6WvI7wtvJ9er2AnGO64KbexOtWZWHnxDV4FX2qMb0z+ENtBM5M4gP2qqKps+tau4MzBREyagk+fW+jsz6rD4TeB27p6Yeb+FBj0I/pqReVHrOXLEbUP73wfZMR50cNbXk6tn+s0iZXEJD7FufErD5L4DnxWX5TUR/wjdBJTQTODOKD9d8Tq2o+ZuUOzhRExWjM0f6X7M0p5Pc6vTUPuryNY15F6IzOwJQHqhZ+iett0nrncE1V5j+e6zRWfN39odLJLojr86LCPuCe0EktBM4tRVj4Y9J/xLJnOzhTEPdJTqFiNKeQX3vYXHhTQ3W5V9mc+kDVwvsZhM5az+HnBklqvu7OdHaZs4rD5sJeXIdPtR8wCIFzCzF6O7ewufBcB6dq8b78NrGXPelqQASNKVXpRv0Qjt97PqOwufC+5ntlnxPTgms9h/di38t/mMB19+jrhjmYUDv+xnXI2ATODUV1Ys4X8F7s6zQpE39fJlkNiOrsFO8/fDPiwMrpDKbRPuXDVFYFXojBnrEX+njJu/6g1ISuuzdTHYSAF5xPaJG3d6a4MyaBc3NnM6xOPPR+gvvtTblqlF731JYz35/iwETPm6Fff4Sx2sPNtqY2hWsqg1TfztVol6d03X3YtT2fmb23leyRvI7ZLO7G9AicG4iR5ak1NJua2sj01KtGrydWoX09g4GX9wOP/A59TV03TXO79GhZ6byY0n6zUzmHX8fnzxQHPFU5YVyvrR7NWL535DcyxAfnZdM0X2MFy6ek6ZevCoff1Bk/6bru69IzlPJt6kvXdeeO8GBSRW6/9Hke1c0S1+tdVPfT4hU3XdddLH3H8utIFafD+CoxLewk3Rep7chuqusGfLu/t+u6m6VngKGcup+TMQica4rRoRKds+toBC66rnsuZD4qOpCpSnNcYOT7aEcbqOsRK6aDBKDK3MYAyhiVm8U9y6VHf3P//HTMUid+reuzF0i//btoP3LfE7gXP9M0LhaOVTphVK8NaDMGgXN9uaeJpQ7j8UsViZfEv7+IxRlOMu8/OefAuVJlKO5HO4ivwwE2WN+L93GOnbPb3jG/eqriEfd8HfSqcKXD/7dtPZ46B3L9jqVHNvc5nSM5BiV67cdZXOu5BtVOZho4b2OT98XXq96Mk5qn9T/1upuBbhPJGTjPog3JpeY9mx9K793HpUfXk2u2xWXm96Hv0c+GibuMl784ZvvxNWTbcRSfwTCY7+7v7x3tFUUH+D8Zf+SXCJvZq1iZ9we967qu6AIgEZSH/MDfqDK0EAH0JDpQJVep++GpQLattm0vBr4XOQWkjQNdXH+nhVfmvOy6rsgKq1FF/HPpic187rquSDU2zu2cezv+uMmsjVUMfA7fRng+f+majHuCjypZRba2113sfNhG27a5OkMfu66rfqAw42fuJP7ehRH6GotB7fNVqoq9a/Co4Gyf4n06eMiiQevJubDIdamw2fxdsUhB6velJzazN6MVBlPj/2vXdfubhs3m7+P7NT5kDzKMND9nDhXOdK7/lALSNtXD1FmOkPVDb5Q4t7cFt/TI9XPvSi7IE23SYfyeHKa+FH86Dj9Hm/FplQGg1LEc4Fx9yW2lr3tSW+bAFlLfYD8++1aqKPauwf2CfYu9qW1dxfQJnOvJ2XE6GuD+vNOMncY5BM4UfA5S52vpmQ31guePGY9139HEtpd4KFXiDnJOU43gmT4sf116Mo9SIT/XHqtnpduO+Pm5Qu2UOzaX0WHcaHCqd65+XnqyrC/R1tX4unV0mbvrqOSfbtpW9/oWPxXqW0xuz2+mTeBcT66pW5+HWKkvGrpc8/SnPv0ifQAcljruMUVsP35PTnsDLGRTyq+lpn02fx/zNHDw89IT23tbqKKf6xoa5N6bCCs5tlOZ6hZSqZ0+zHSP7PGAoTO97iwDmoVet8DJnH2OvkaWaeMxWJtzxsmC65BBCZwryjz9YMhFNHLdKzPl0bBF2ByiKlTig2FK+xku/J6zkvyUCEUlQmeJY54rxA65kEaW97Bt26m1H5e5B0vi5+UekHqoxL29J5n3cd2b+KwNeMrnmD6bta8R4TX3Z5JrkEEJnKvL1Vm8HXjBhOoWZxjY3RBhc6EXOnN6PbEO+5eu6wYLyRE6c9/rUuK+wyyLSw28j2GuqdBT6tzcFrzvtOR1cVvi50eblnuauel8zM114Rk9Z5nvq57qzBMmSuBcXa7AWXLLBZYVW5jpKTGgkDsATWVa7d0YrzXudclZPao25A/5ujIOjk1p+laWrWYeE9PjclYL+0ovQlfqdcPU3Q3UxtnTmMkSOFeXq5M3x32lavVlrM2NIwDl7KBNpcNerLO+yu9eemQ7uYNzrqnWQwfhsVZZHcPlAG1GiT2NLwvvH9tkvnfY/WPMySCfe9E2ZetXTPBWByZM4FxdrilhQ1c4d/mDfex7H3NOQ3szga1pbrfZamZb0eHOGY5yXzu5qoVTXURqCoaoIJT4DBhi+ySzc2DZ0J97Oa9D93EymO8d6pWdZLo4h76ncup74G3qy8D3ui1JH0Jt237KuHnzYaHqSC417BmaXsOfS49uJoX8VyNWbJ+SVtE9GWJRpubv83hXBq1uh5gRkQZG2rZdenwLtwNUNxuBEx419Ode6kO+X3oUKidwrmjghX6yiJV130ztdWdSSzBLr+OXpUc3U/P0l7uhtut4TnTmb3Mt0BPHPFdH+yrjQg2/tW37dcyK8gwNef7mPEeH2ibna+agDHMw9Oferi8EyUSZUjtTsez86AFgJHdj3bv5iJyBoObAeV5RJbDWe81ydxT+aNv2bAJTradiyApeztkXQ7Z1pbd1gSn5MsLnXm0zbmAlAucMRWXzJuNUzqmpJmhHZTzXYjE1L2Ne0+BGzteSM+SXCDRpatV/InhaiGU7k5wyOtB02gWdXfhfg1cbpzjbDhqBcz5SRbNt2+O2bS/iHrZdDZtNhR3HbK+n4mpWNcc8cwc826IKcU9xqQpRCp5/tm17E+HzWOVzLXcV3qu7ChVHGI/7mmFF7uGcoFjK+lXsDXoQXzbx/V+1fQikEcl3S49uZr/CrXWuK+ysX2a6JnJfV2mK9W9Lj+bzOsLnt0Ul2ra9i/PvJr7StfHVKPmSqR4PFUcYj3YUViRwVqIXIpvefWOvelP69jMuMjFrY69O+4jUyf+w/PBGci5ik0uNH7o5F+jJ6SxWNRxqBsJeHIfFsfh2HsbiL9cRWC4WgXTg6Zk1mWpwU2GBkUx0VgSMQuAcWNxndfCgOrnL019zq3GT+pwfSjXum1VbwG9yHvN0zeYKYrHS56eMAxDbWKxg/T/BPILoZQT29Ddf7EinSqUCAAoROAuLgLn4Mu21vOo6x2n64sy3E6i1wlmlrutO0z2WFc9YWFREv23n07btdSzEdG4qLsA37p+GNQicBUTITB3KI9XLwc29Q1zj1ig1VsBqr8qltuGvpUfr9Ca+PsQep2la8FmFU9cBhmI6LazBKrWZ9FaJvYlVYt8Lm/TcZjoYNU6pnbvsIT8qhT8vPVG/1zEdOG3Fcm4rFgDgJQJnBm3bnsR9bH9Y2IcnzLkaNPeqcpGQ33Xd2URD58K72IrlQvAEAJ4icG4hrSzbtu1VbHOgmslOqnRRmUmE4BmEzibu9/wz9v9UgQcA/kHg3FDbtqdxD9abIr8A2AkROn/MOO16LOk2gqvY4gkA4BuBc01xr+ZZJdsaAI+bVOiJezrTa/596clpSbcU/BWr8AIACJzriOliFzGSPwWfm6b510Re69ztz/XvM40yjzQ1ueu6k6h21rif7Dr+EDoBgEbgXNunCUyhvY0qyQ9d1x1bursac15Mau5TKAe9hlK1s+u6tAjPTzFoNFUpdB5N+PUDABnYh3NFcc9mTZXN21j5dPGVpuRd2Rtv9gwgrCZn1XWUBYi6rkuzKS5iFezj+JraPeNpIaH9SheWAgAGIHCuIBbBGPqezcWUuov436sIG1c6b8+qrtqWeRGVGldfrXFK7WyqrnG9p9kVn1J4a5rmsPdVe+U8rd6d7nlX6QSAHSVwruZT4Z9/HcHyQpVyazWGn7nf45jC3fnSo+Oa5TGPtuEsvpoIoAe9r/0Kq6Dv0j6dUbEFAHaMwPmC2ND87fPftZHbRcdRwMyqxHu1rZyb4td4rtS4IFK2CmfNQSnajpuHgT+q6oswehj/PWY19KQ3WwMA2CEC58tOCvzMj6lqampsGXHPWE3BLOf0zhoDZ43TV2sceBhMbLNy9UgQXYTPw3jfhqqGvqvwugQABiBwPiO2e3j39Hes7S519KIzSDmHiymHlZh74HyTrpVaBlAy3zM79e1J/qFXrV1MyX0V91cexv/uLf2jfGq7LgGAAdgW5Xm5F7o4GiFs7uIeiTmnsG4lwk+2qYwVV4iqOeaZr9tZV+Ri7880rf+467rUVvxcMGRbOAgAdpDA+bycnejPI90LNvc9Eh9TU8c25+b3NVfbajrmAueGInymdu9fMSMjp11siwBg5wmcz8vZQTpdemQYNS7oUtpeRRvO53wdNU/FPorpmaOKinLO+xJ3cqGbruvOo+24Xnpyc7Vv4QIAFOAezufl6rjejjgVsqapjkM6GXurjgi9OTvZNYefvQjXY9+jl3WRrxyzEmLrkhwDP4PuwZt+V5zDV7nu7bQ9CgDsHoFzGKNUpqKju6tVhbcVdG5zr3Bce0f9dMzAGef7+6UnNpdrCnOaVv1h6dH1fRx6pkQaKGvb9lOm1w8A7CBTap8Q2wfkMtZUyF1fpGOsacyL6mbOrTmuJ7CNzuu2bUc75gXe71wBP9fshrGmLFtZFgDYmMA5byX2EJ2SVOUc/BjEvYyflp7YzqjTg9dwEpXGQcUAUc7qZpPxmOcKnKNMj7d3JgCwDYFzGINXJtq2PbZIxzenmfdlXMVZgWM/lSpTutfvfMgFhOJ35Q7ktxm3MMoV2N6MuDDTrPYjBQCGI3AOY9DAU6jCNlWDBqCYUvpu6YntXE+syvRmqPMv3teLXIva9GQL+Jnfu7Gmye/iatfAy3Z1YUJgDQLnEzIvNvN24MrEWYEO+JSlauNF6fcgpu+WWFxlioMH79u2LVqV7YXNnNugLOR+7TkXIBpUHOdcFXvTc2FeDEYBLxI4hzNIZSI6+bkrbHPwJkJnkWpzHPfflp7Y3t2E7t986FvoLBH04z7RUmHzc4GKcq7puW8zL2i2imxtl/tBYXZej9AmARMjcD4v56bnnwaosJ0VWDhlThahM9tCQumDtm3bq4LH/dMEVqd9TjouVzk7JPH+XRUKm02h+2VzDhoUCfHPyFVVdR8ozFPx/g0wbQLn83JuZ7JXauGX1NC3bXshbK4kvQ+/tW17EwsrbSSCZno//ywYfO5mci9umo75ZzpHtwme6f1K71tUkktNGb8ssXdr/My7pSc283rAe2RPM27vM9b2UMCynLMN3sTA4q5vxQY84fvHHybkDnHv2rZNlY7jXFWrqPacumdzbanT/kdsan8e7/XNU2EjpnAexAIJRwOtADz16uZDbyN43vaO+dVT0yxj+nP/mA9xjpe8R/I8Y3vyPs7Jo1LnSITNnPckT3VqOBWKAcMa7x88zLwf8dlTbeSWcv/M9Jn477Zt72Jw6dHP0jWU+ruBEQicz8te6Yj7K9NI4GnXdRtVPGPqynHss2nrk+3sRQj4FgTatu3/sNsRj2/aliNnp6Um6Zj+El/9Y76oAI41ePJ74Q7OaeYBrBTgb2LQJNvgRFShc1Y2mzifS7Sn7K7jzOdoLm8zv66LQottlZpxsJfpGJT6u4ERCJzPSJ3Ptm0vC3yoLaprpytWevZjJPcwvmr8kJ2jMcP84KuRVmDMKv1thKxiCrUne1GFPInZE6ktuXiqLXlKhMyjgtX7qewjCzshDVDFbBOD1kBxAufLzgoGvKcqPelD4JVpsjvrd9WgwWWb5v6CNCvhr+e/ZSOPVer7i/T0z6f93lTEgwHambnciwxzY+0HYBAC5wvStNeoRA45CljjiKO9toZx3XVdtlV0WcnHoQJ+13VpOv3vi0GmwvoDZWPOipjbvcgwFznvKwd4klVqV7OL0xsfmkrgvM24GujQ7obarzWznNsHDe3LCPfKnsZ5uguuZ3wvMkxa13XnO9QWASMSOFcQ1Y/P1b/Qx33JtP/dVPbYupnoAEEKm4cTXZXvfKLXx/UY50pU+44mPDCyqqkOoMAuMSAEFCdwru5kgpWcRYc6x2p0pfaazC5GbX+eyuvthc3J7lPYdd3xxDb2v45jPspUz3iv5zxzYsoDKLAzYrX8Kc9SASZA4FxRdEwPJ1SVuOt1qHNtl3Cw9GCl4kN0ClW3yYfNnqOJdFxGDZsLExwYWdWczmnYBbsw4wIYkcC5huigHkygU51e30GvQ51rQZTDpUcqFlW3jxW/xOs5dcx7gzI1Xx+fawibCzEw8uOMOnu3wiZMS8xEmNKAOjAxAueaeg1zrdMHLx+Zypar8zepwNn8/X6dVlpF+jLHjnkKcl3XHVRaXf41DULUtmJqnAMHE5uS/JgvMdAlbMLExHUrdAJFCJwbiE71YYXVs7S9w1L1Jv5/jpXo3rVtO5XFg/5Hr4pUQ+UtfZj/q+u6ozlvFRHV5Z8r6bykIPdj13XV7gWZBoiiTfl1gh2+2104p2HuInTux+ARQDYC5xaievZDBZWJ9Pt/eGH7gVzTaie50En6II3K28cRO/Tpd+/HvXuzF0H/YMTOSwpCP8cgzCSqbhGK90c+T1d1G4NcO3NOw9zFgHq6p/OnGcy6ACohcG6pV5n4aYSOdfp9P0WH+qXVIHN1CE+nWOVciFC+mPI5RIf+LsLDtwGBXasAxfUxdOdlETT3I/ROSnT4TiN4/lrhPnmXveP73CAXMFFpO7jo26RB9d+tZAts43tHL4/Yq/Oibdv9WPHtuNBWIqnRT53o83W2HEgViLZtc00B3s94X+jg4rgdR3A+ii1vcr5Xd1FRPp9i4Ckhro/DuD5O4ri/zvirbmNQ5WxmizCliuenWCH6OO6xGmOLoss4vmu1OwM4yzR7I9cMkFV53fW8ltqNer3F9Z7a7CY+Mw9j0PYg9udO/7u39A9Xd/3ISvpXBf/uXOfMmO9Lrr6cbasYzHf39/eOdiEPGufDCGrrdLJvo0G4iAb4Yq4VsrZtU6Xkw9IT67uMUdl1f/8ifB70vlb9EL2O92nxHk2iE9S2bXqdb5eeWN/HTSpdEaL6nZd1gtTlg2O+MwvVZGhXXjLJ8xkAqJMKZ0ERDs8fTmeNDuNze1peWXxjWHG8l6qREYoenUKsI76dCIlLQbFt26cGDL5aAfXZdmU/wmfTqz685KY3yq3dAQCyEzhHEJ06YWUCBJzhCfKbialvi/DoGAIAVbBoEAAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhH04AQCAF93/v/972jTNB0fqUT9991//bR/sR6hwAgAAUITACQAAQBECJwAAAEUInAAAABQhcAIAAFCEwAkAAEARAicAAABFCJwAAAAUIXACAABQhMAJAABAEQInAAAARQicAAAAFPG9wwoAAKzgpmmaSwfqUV8fexCBEwAAWMF3//XfZ03TnDlWrMOUWgAAAIoQOAEAACjClFpqcZHpddwsPcJTzjId91zvHQAAM/Pd/f299xQAAIDsTKkFAACgCIETAACAIgROAAAAihA4AQAAKELgBAAAoAiBEwAAgCIETgAAAIoQOAEAAChC4AQAAKAIgRMAAIAiBE4AAACKEDgBAAAoQuAEAACgCIETAACAIgROAAAAihA4AQAAKELgBAAAoAiBEwAAgCIETgAAAIoQOAEAAChC4AQAAKAIgRMAAIAiBE4AAACKEDgBAAAoQuAEAACgCIETAACAIgROAAAAihA4AQAAKELgBAAAoAiBEwAAgCIETgAAAIoQOAEAAChC4AQAAKAIgRMAAIAiBE4AAACKEDgBAAAoQuAEAACgCIETAACAIgROAAAAihA4AQAAKELgBAAAoAiBEwAAgCIETgAAAIoQOAEAAChC4AQAAKAIgRMAAIAiBE4AAACKEDgBAAAoQuAEAACgCIETAACAIgROAAAAihA4AQAAKELgBAAAoAiBEwAAgCIETgAAAIoQOAEAAChC4AQAAKAIgRMAAIAiBE4AAACKEDgBAAAoQuAEAACgCIETAACAIgROAAAAihA4AQAAKELgBAAAoAiBEwAAgCIETgAAAIoQOAEAAChC4AQAAKAIgRMAAIAiBE4AAACKEDgBAAAoQuAEAACgCIETAACAIgROAAAA8mua5v8DhCQidUReNJIAAAAASUVORK5CYII=",
                            fileValue.asText());
                })
                .verifyComplete();
    }

    @Test
    public void testEncodingParams() {
        RestApiDatasourceConfig datasourceConfig = RestApiDatasourceConfig.builder()
                .url("https://postman-echo.com/post")
                .build();
        Map<String, Object> queryConfig = ImmutableMap.of(
                "httpMethod", "POST",
                "headers", List.of(new Property("content-type", "application/json")),
                "body", "body",
                "params", List.of(new Property("param", "value with blank")),
                "encodeParams", true
        );

        Mono<QueryExecutionResult> resultMono = execute(datasourceConfig, queryConfig, emptyMap());
        StepVerifier.create(resultMono)
                .assertNext(result -> {
                    assertTrue(result.isSuccess());
                    assertNotNull(result.getData());
                    JsonNode url = ((ObjectNode) result.getData()).get("url");
                    assertEquals("\"https://postman-echo.com/post?param=value+with+blank\"", url.toString());
                })
                .verifyComplete();
    }

    @Test
    public void testParamBinding() {
        RestApiDatasourceConfig datasourceConfig = RestApiDatasourceConfig.builder()
                .url("https://postman-echo.com/post")
                .build();

        Map<String, Object> queryConfig = ImmutableMap.of(
                "httpMethod", "POST",
                "headers", List.of(new Property("content-type", "application/json")),
                "body", """
                        {
                            "name" : {{name}},
                            "email" : {{email}},
                            "age" : {{age}},
                        }"""
        );

        Map<String, Object> params = ImmutableMap.<String, Object> builder()
                .put("name", "jack")
                .put("email", "jack@jack.com")
                .put("age", 30)
                .build();

        StepVerifier.create(execute(datasourceConfig, queryConfig, params))
                .assertNext(result -> {
                    assertTrue(result.isSuccess());
                    assertNotNull(result.getData());
                    ObjectNode data = (ObjectNode) result.getData();
                    ObjectNode postBody = (ObjectNode) data.get("data");
                    assertEquals(3, postBody.size());
                    assertEquals("jack", postBody.get("name").textValue());
                    assertEquals("jack@jack.com", postBody.get("email").textValue());
                    assertEquals(30, postBody.get("age").asInt());

                })
                .verifyComplete();
    }

    @Test
    public void testBasicAuth() {
        RestApiDatasourceConfig datasourceConfig = RestApiDatasourceConfig.builder()
                .headers(List.of(new Property("Content-Type", "application/json")))
                .authConfig(new BasicAuthConfig("postman", "password", BASIC_AUTH))
                .url("https://postman-echo.com/basic-auth")
                .build();

        RestApiQueryExecutionContext context = executor.doBuildQueryExecutionContext(datasourceConfig,
                Map.of("httpMethod", "GET"), emptyMap(), queryVisitorContext);
        StepVerifier.create(connector.doCreateConnection(datasourceConfig)
                        .flatMap(apiConnection -> executor.doExecuteQuery(apiConnection, context)))
                .assertNext(result -> {
                    Assert.assertNotNull(result);
                    Assert.assertTrue(result.isSuccess());
                    Assert.assertTrue(result.getData() instanceof ObjectNode);
                    Assert.assertEquals("{\"authenticated\":true}", result.getData().toString());
                })
                .verifyComplete();
    }

    @Test
    public void testDigestAuth() {
        RestApiDatasourceConfig datasourceConfig = RestApiDatasourceConfig.builder()
                .headers(List.of(new Property("Content-Type", "application/json")))
                .authConfig(new BasicAuthConfig("postman", "password", DIGEST_AUTH))
                .url("https://postman-echo.com/digest-auth")
                .build();

        RestApiQueryExecutionContext context = executor.doBuildQueryExecutionContext(datasourceConfig,
                Map.of("httpMethod", "GET"), emptyMap(), queryVisitorContext);
        StepVerifier.create(connector.doCreateConnection(datasourceConfig)
                        .flatMap(apiConnection -> executor.doExecuteQuery(apiConnection, context)))
                .assertNext(result -> {
                    Assert.assertNotNull(result);
                    Assert.assertTrue(result.isSuccess());
                    Assert.assertTrue(result.getData() instanceof ObjectNode);
                    Assert.assertEquals("{\"authenticated\":true}", result.getData().toString());
                })
                .verifyComplete();
    }

    @Test
    public void responseJsonTypeTest() {
        RestApiDatasourceConfig datasourceConfig = RestApiDatasourceConfig.builder()
                .url("https://postman-echo.com/response-headers?key=value")
                .build();
        for (String contentType : List.of("application/hal+json",
                "application/problem+json",
                "application/json",
                "application/json;charset=UTF-8",
                "application/graphql+json",
                "application/stream+json"
        )) {
            Map<String, Object> queryConfig = ImmutableMap.of("httpMethod", "GET",
                    "params", List.of(new Property("Content-Type", contentType))
            );
            StepVerifier.create(execute(datasourceConfig, queryConfig, emptyMap()))
                    .assertNext(result -> {
                        assertTrue(result.isSuccess());
                        assertNotNull(result.getData());
                        JsonNode value = ((ObjectNode) result.getData()).get("key");
                        assertEquals("value", value.asText());
                    })
                    .verifyComplete();
        }
    }

    private Mono<QueryExecutionResult> execute(RestApiDatasourceConfig datasourceConfig, Map<String, Object> queryConfig,
            Map<String, Object> params) {
        QueryExecutionContext context = executor.doBuildQueryExecutionContext(datasourceConfig,
                queryConfig, params, queryVisitorContext);
        return executor.doExecuteQuery(null, context);
    }
}
