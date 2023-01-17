package com.openblocks.api.authentication.request.form;

import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.api.authentication.request.AuthRequest;
import com.openblocks.api.authentication.request.AuthRequestContext;
import com.openblocks.domain.encryption.EncryptionService;
import com.openblocks.domain.user.model.AuthorizedUser;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.exception.BizError;

import reactor.core.publisher.Mono;

@Component
public class FormAuthRequest implements AuthRequest {

    @Autowired
    private UserService userService;
    @Autowired
    private EncryptionService encryptionService;

    @Override
    public Mono<AuthorizedUser> auth(AuthRequestContext authRequestContext) {
        FormAuthRequestContext context = (FormAuthRequestContext) authRequestContext;
        return userService.findBySourceAndId(context.getSource(), context.getLoginId())
                .switchIfEmpty(ofError(BizError.INVALID_PASSWORD, "INVALID_EMAIL_OR_PASSWORD"))
                .flatMap(user -> {
                    String raw = context.getPassword();
                    String encoded = user.getPassword();
                    if (!encryptionService.matchPassword(raw, encoded)) {
                        return ofError(BizError.INVALID_PASSWORD, "INVALID_EMAIL_OR_PASSWORD");
                    }
                    AuthorizedUser authorizedUser = AuthorizedUser.builder()
                            .source(context.getSource())
                            .uid(context.getLoginId())
                            .username(context.getLoginId())
                            .user(user)
                            .build();
                    return Mono.just(authorizedUser);
                });
    }
}
