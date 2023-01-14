package com.openblocks.api.framework.exception;

import static java.util.Optional.ofNullable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.PathContainer;
import org.springframework.http.server.RequestPath;
import org.springframework.stereotype.Component;

import com.openblocks.infra.perf.PerfEvent;
import com.openblocks.infra.perf.PerfHelper;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.PluginError;

import io.micrometer.core.instrument.Tags;

@Component
public class ApiPerfHelper {

    private static final String URL_TAG = "url";
    private static final String ERROR_CODE_TAG = "errorCode";

    @Autowired
    private PerfHelper perfHelper;

    public void perf(BizError error, RequestPath requestPath) {
        perfHelper.count(PerfEvent.API_ERROR_CODE,
                Tags.of(ERROR_CODE_TAG, String.valueOf(error.getBizErrorCode()),
                        URL_TAG, ofNullable(requestPath).map(RequestPath::pathWithinApplication).map(PathContainer::value).orElse("unknownUrl"))
        );
    }

    public void perf(PluginError error, RequestPath requestPath) {
        perfHelper.count(PerfEvent.PLUGIN_ERROR_CODE,
                Tags.of(ERROR_CODE_TAG, error.name(),
                        URL_TAG, ofNullable(requestPath).map(RequestPath::pathWithinApplication).map(PathContainer::value).orElse("unknownUrl"))
        );
    }

}
