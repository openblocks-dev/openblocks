package com.openblocks.api.authentication.request;

import static com.openblocks.sdk.exception.BizError.AUTH_ERROR;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import com.openblocks.domain.authentication.context.AuthRequestContext;
import com.openblocks.sdk.exception.BizException;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Primary
@Component
@SuppressWarnings({"rawtypes", "unchecked"})
public class AuthRequestFactoryFacade implements AuthRequestFactory<AuthRequestContext> {

    @Autowired
    private List<AuthRequestFactory> authRequestFactories;

    private final Map<String, AuthRequestFactory<AuthRequestContext>> authRequestFactoryMap = new HashMap<>();

    @PostConstruct
    public void init() {
        for (AuthRequestFactory<AuthRequestContext> authRequestFactory : authRequestFactories) {
            if (authRequestFactory instanceof AuthRequestFactoryFacade) {
                continue;
            }
            for (String authType : authRequestFactory.supportedAuthTypes()) {
                if (authRequestFactoryMap.containsKey(authType)) {
                    throw new RuntimeException(String.format("duplicate authRequestFactory found for same authType: %s", authType));
                }
                authRequestFactoryMap.put(authType, authRequestFactory);
            }
        }
        log.info("find auth types:{}", authRequestFactoryMap.keySet());
    }

    @Override
    public Mono<AuthRequest> build(AuthRequestContext context) {
        return Mono.defer(() -> {
            AuthRequestFactory<AuthRequestContext> authRequestFactory = authRequestFactoryMap.get(context.getAuthConfig().getAuthType());
            if (authRequestFactory == null) {
                return Mono.error(new BizException(AUTH_ERROR, "AUTH_ERROR"));
            }
            return authRequestFactory.build(context);
        });
    }

    @Override
    public Set<String> supportedAuthTypes() {
        return new HashSet<>(0);
    }
}
