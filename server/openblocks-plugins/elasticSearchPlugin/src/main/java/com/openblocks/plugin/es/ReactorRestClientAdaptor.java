package com.openblocks.plugin.es;

import java.io.Closeable;
import java.io.IOException;

import javax.validation.constraints.NotNull;

import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.ResponseListener;
import org.elasticsearch.client.RestClient;

import com.google.common.base.Preconditions;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

/**
 * adapt restClient's callback to reactor mono
 */
@Slf4j
public record ReactorRestClientAdaptor(@NotNull RestClient restClient) implements Closeable {

    public ReactorRestClientAdaptor(@NotNull RestClient restClient) {
        Preconditions.checkArgument(restClient != null);
        this.restClient = restClient;
    }

    public Mono<Response> request(Request request) {
        return Mono.create(sink -> restClient.performRequestAsync(request, new ResponseListener() {
            @Override
            public void onSuccess(Response response) {
                sink.success(response);
            }

            @Override
            public void onFailure(Exception exception) {
                log.error("request es error.", exception);
                sink.error(exception);
            }
        }));
    }

    @Override
    public void close() throws IOException {
        this.restClient.close();
    }
}
