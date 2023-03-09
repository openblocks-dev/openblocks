package com.openblocks.api.authentication.request.form;

import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openblocks.api.authentication.request.AuthRequest;
import com.openblocks.domain.authentication.context.AuthRequestContext;
import com.openblocks.domain.authentication.context.FormAuthRequestContext;
import com.openblocks.domain.encryption.EncryptionService;
import com.openblocks.domain.user.model.AuthUser;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.auth.EmailAuthConfig;
import com.openblocks.sdk.constants.AuthSourceConstants;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;

import reactor.core.publisher.Mono;

@Component
public class FormAuthRequest implements AuthRequest {

    @Autowired
    private UserService userService;
    @Autowired
    private EncryptionService encryptionService;

    @Override
    public Mono<AuthUser> auth(AuthRequestContext authRequestContext) {
        FormAuthRequestContext context = (FormAuthRequestContext) authRequestContext;

        return Mono.defer(() -> {
                    AbstractAuthConfig authConfig = context.getAuthConfig();
                    // register
                    if (context.isRegister()) {
                        // register by email
                        if (AuthSourceConstants.EMAIL.equals(authConfig.getSource())
                                && authConfig instanceof EmailAuthConfig emailAuthConfig
                                && emailAuthConfig.isEnableRegister()) {
                            return userService.findBySourceAndId(authConfig.getSource(), context.getLoginId())
                                    .flatMap(user -> ofError(BizError.USER_LOGIN_ID_EXIST, "USER_LOGIN_ID_EXIST"));
                        }
                        // register not by email
                        return Mono.error(new BizException(BizError.UNSUPPORTED_OPERATION, "BAD_REQUEST"));
                    }
                    // login
                    return userService.findBySourceAndId(authConfig.getSource(), context.getLoginId())
                            .switchIfEmpty(ofError(BizError.INVALID_PASSWORD, "INVALID_EMAIL_OR_PASSWORD"))
                            .flatMap(user -> {
                                String raw = context.getPassword();
                                String encoded = user.getPassword();
                                if (!encryptionService.matchPassword(raw, encoded)) {
                                    return ofError(BizError.INVALID_PASSWORD, "INVALID_EMAIL_OR_PASSWORD");
                                }
                                return Mono.empty();
                            });
                })
                .thenReturn(AuthUser.builder().uid(context.getLoginId()).username(context.getLoginId()).build());
    }
}
