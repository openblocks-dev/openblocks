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

import com.openblocks.sdk.auth.AbstractAuthConfig.AuthType;
import com.openblocks.sdk.exception.BizException;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Primary
@Component
public class AuthRequestFactoryFacade implements AuthRequestFactory {

    @Autowired
    private List<AuthRequestFactory> authRequestFactories;

    private final Map<AuthType, AuthRequestFactory> authRequestFactoryMap = new HashMap<>();

    @PostConstruct
    public void init() {
        for (AuthRequestFactory authRequestFactory : authRequestFactories) {
            if (authRequestFactory instanceof AuthRequestFactoryFacade) {
                continue;
            }
            for (AuthType authType : authRequestFactory.supportedAuthTypes()) {
                if (authRequestFactoryMap.containsKey(authType)) {
                    throw new RuntimeException(String.format("duplicate authRequestFactory found for same authType: %s", authType));
                }
                authRequestFactoryMap.put(authType, authRequestFactory);
            }
        }
        //
        for (AuthType authType : AuthType.values()) {
            if (!authRequestFactoryMap.containsKey(authType)) {
                log.warn("can not find authRequestFactory for authType: {}", authType);
            }
        }
    }

    @Override
    public Mono<AuthRequest> build(AuthRequestContext context) {
        return Mono.defer(() -> {
            AuthRequestFactory authRequestFactory = authRequestFactoryMap.get(context.getAuthConfig().getAuthType());
            if (authRequestFactory == null) {
                return Mono.error(new BizException(AUTH_ERROR, "AUTH_ERROR"));
            }
            return authRequestFactory.build(context);
        });
    }

    @Override
    public Set<AuthType> supportedAuthTypes() {
        return new HashSet<>(0);
    }
}
