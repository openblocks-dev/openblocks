package com.openblocks.api.authentication;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.authentication.service.AuthenticationApiService;
import com.openblocks.api.authentication.util.AuthenticationUtils;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.usermanagement.InvitationApiService;
import com.openblocks.api.usermanagement.UserController;
import com.openblocks.api.usermanagement.UserController.UpdatePasswordRequest;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.user.model.AuthorizedUser;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.sdk.config.AuthProperties;
import com.openblocks.sdk.constants.AuthSourceConstants;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.util.CookieHelper;
import com.openblocks.sdk.util.UriUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping(value = {NewUrl.CUSTOM_AUTH})
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationApiService authenticationApiService;
    @Autowired
    private SessionUserService sessionUserService;
    @Autowired
    private CookieHelper cookieHelper;
    @Autowired
    private InvitationApiService invitationAPiService;
    @Autowired
    private BusinessEventPublisher businessEventPublisher;
    @Autowired
    private AuthProperties authProperties;

    /**
     * login by email or phone with password; or register by email for now.
     *
     * @see UserController#updatePassword(UpdatePasswordRequest)
     */
    @PostMapping("/form/login")
    public Mono<ResponseView<Boolean>> formLogin(@RequestBody FormLoginRequest formLoginRequest,
            @RequestParam(required = false) String invitationId,
            ServerWebExchange exchange) {
        String domain = UriUtils.getRefererDomain(exchange);

        return Mono.defer(() -> {
                    if (formLoginRequest.register()) {
                        if (!authProperties.getEmail().isEnableRegister()) {
                            throw new BizException(BizError.UNSUPPORTED_OPERATION, "BAD_REQUEST");
                        }
                        return userService.register(formLoginRequest.loginId(), formLoginRequest.password(), formLoginRequest.source());
                    }
                    return authenticationApiService.getFormAuthUser(formLoginRequest.loginId(), formLoginRequest.password(), domain,
                                    formLoginRequest.source())
                            .map(AuthorizedUser::getUser);
                })
                .flatMap(user -> loginWithAuthUser(user, exchange, invitationId, formLoginRequest.source(), null))
                .thenReturn(ResponseView.success(true));
    }

    protected Mono<Void> loginWithAuthUser(User user, ServerWebExchange exchange, String invitationId,
            String source, @Nullable String orgId) {
        return setSecurityContext(user)
                .then(saveSessionAndCookie(user, exchange))
                .then(Mono.defer(() -> {
                    if (user.getIsNewUser()) {
                        return authenticationApiService.onUserRegister(user);
                    }
                    return Mono.empty();
                }))
                .then(authenticationApiService.onUserLogin(orgId, user, source))
                .then(Mono.defer(() -> {
                    if (StringUtils.isBlank(invitationId)) {
                        return Mono.empty();
                    }
                    return invitationAPiService.inviteUser(invitationId);
                }))
                .then(businessEventPublisher.publishUserLoginEvent(source));
    }

    private Mono<Void> saveSessionAndCookie(User user, ServerWebExchange exchange) {
        String token = CookieHelper.generateCookieToken();
        return sessionUserService.saveUserSession(token, user)
                .then(Mono.fromRunnable(() -> cookieHelper.saveCookie(token, exchange)))
                .then();
    }

    private Mono<Void> setSecurityContext(User user) {
        return ReactiveSecurityContextHolder.getContext().flatMap(context -> {
            context.setAuthentication(AuthenticationUtils.toAuthentication(user));
            return Mono.empty();
        });
    }

    @PostMapping("/logout")
    public Mono<ResponseView<Boolean>> logout(ServerWebExchange exchange) {
        String cookieToken = cookieHelper.getCookieToken(exchange);
        return sessionUserService.removeUserSession(cookieToken)
                .then(businessEventPublisher.publishUserLogoutEvent())
                .thenReturn(ResponseView.success(true));
    }

    /**
     * @param loginId phone number or email for now.
     * @param register register or login
     * @param source {@link AuthSourceConstants#PHONE} or {@link AuthSourceConstants#EMAIL}
     */
    private record FormLoginRequest(String loginId, String password, boolean register, String source) {
    }
}
