package com.openblocks.api.framework.exception;

import static com.openblocks.sdk.util.ExceptionUtils.ofException;
import static org.springframework.web.reactive.function.server.RequestPredicates.all;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.autoconfigure.web.WebProperties.Resources;
import org.springframework.boot.autoconfigure.web.reactive.error.DefaultErrorWebExceptionHandler;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.result.view.ViewResolver;

import com.mongodb.MongoExecutionTimeoutException;
import com.mongodb.MongoSocketReadTimeoutException;
import com.mongodb.MongoTimeoutException;
import com.openblocks.api.framework.service.GlobalContextService;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.util.LocaleUtils;

import io.lettuce.core.RedisCommandTimeoutException;
import reactor.core.publisher.Mono;

@Component
@Order(-2)
public class CustomErrorWebExceptionHandler extends DefaultErrorWebExceptionHandler {

    private final Logger errorFileLog = LoggerFactory.getLogger("errorFile");

    @Autowired
    private ApiPerfHelper apiPerfHelper;

    @Autowired
    private GlobalContextService globalContextService;

    @Autowired
    public CustomErrorWebExceptionHandler(ErrorAttributes errorAttributes, Resources resources,
            ServerProperties serverProperties, ApplicationContext applicationContext,
            ObjectProvider<ViewResolver> viewResolvers,
            ServerCodecConfigurer serverCodecConfigurer) {
        super(errorAttributes, resources, serverProperties.getError(), applicationContext);
        this.setViewResolvers(viewResolvers.orderedStream().collect(Collectors.toList()));
        this.setMessageWriters(serverCodecConfigurer.getWriters());
        this.setMessageReaders(serverCodecConfigurer.getReaders());
    }

    @SuppressWarnings("NullableProblems")
    @Override
    protected RouterFunction<ServerResponse> getRoutingFunction(ErrorAttributes errorAttributes) {
        return route(all(), this::render);
    }

    /**
     * can't use {@link Mono#deferContextual} in this method!
     */
    private Mono<ServerResponse> render(ServerRequest request) {
        Map<String, Object> error = getErrorAttributes(request, ErrorAttributeOptions.defaults());
        int httpErrorCode = getHttpStatus(error);

        HttpStatus resolve = HttpStatus.resolve(httpErrorCode);
        if (resolve == null || !resolve.is5xxServerError()) {
            String errorMsg = String.valueOf(error.get("error"));
            return ServerResponse.status(httpErrorCode)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(ResponseView.error(httpErrorCode, errorMsg)));
        }

        Throwable throwable = getError(request);
        BizException bizException = parseBizException(throwable);
        apiPerfHelper.perf(bizException.getError(), request.requestPath());
        if (throwable != null) {
            errorFileLog.error("oops {}, {}", throwable.getClass(), throwable.getMessage());
        }

        Locale locale = globalContextService.getClientLocale(request);
        return ServerResponse.status(bizException.getError().getHttpErrorCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(ResponseView.error(bizException.getError().getBizErrorCode(),
                        LocaleUtils.getMessage(locale, bizException.getMessageKey(), bizException.getArgs()))));
    }

    private BizException parseBizException(Throwable error) {
        if (error instanceof RedisCommandTimeoutException) {
            return ofException(BizError.INFRA_REDIS_TIMEOUT, "INFRA_REDIS_TIMEOUT");
        }
        if (error instanceof MongoTimeoutException) {
            return ofException(BizError.INFRA_MONGO_TIMEOUT, "INFRA_MONGODB_TIMEOUT");
        }
        if (error instanceof MongoExecutionTimeoutException) {
            return ofException(BizError.INFRA_MONGO_TIMEOUT, "INFRA_MONGODB_TIMEOUT");
        }
        if (error instanceof MongoSocketReadTimeoutException) {
            return ofException(BizError.INFRA_MONGO_TIMEOUT, "INFRA_MONGODB_TIMEOUT");
        }
        if (error instanceof BizException bizException) {
            return bizException;
        }
        return ofException(BizError.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
    }

}
