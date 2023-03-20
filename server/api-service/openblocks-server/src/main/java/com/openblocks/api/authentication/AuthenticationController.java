package com.openblocks.api.authentication;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.api.authentication.dto.AuthConfigRequest;
import com.openblocks.api.authentication.service.AuthenticationApiService;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.usermanagement.UserController;
import com.openblocks.api.usermanagement.UserController.UpdatePasswordRequest;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.authentication.AuthenticationService;
import com.openblocks.domain.authentication.FindAuthConfig;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.constants.AuthSourceConstants;
import com.openblocks.sdk.util.CookieHelper;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping(value = {NewUrl.CUSTOM_AUTH})
public class AuthenticationController {

    @Autowired
    private AuthenticationApiService authenticationApiService;
    @Autowired
    private SessionUserService sessionUserService;
    @Autowired
    private CookieHelper cookieHelper;
    @Autowired
    private BusinessEventPublisher businessEventPublisher;
    @Autowired
    private AuthenticationService authenticationService;

    /**
     * login by email or phone with password; or register by email for now.
     *
     * @see UserController#updatePassword(UpdatePasswordRequest)
     */
    @PostMapping("/form/login")
    public Mono<ResponseView<Boolean>> formLogin(@RequestBody FormLoginRequest formLoginRequest,
            @RequestParam(required = false) String invitationId,
            ServerWebExchange exchange) {
        return authenticationApiService.authenticateByForm(formLoginRequest.loginId(), formLoginRequest.password(),
                        formLoginRequest.source(), formLoginRequest.register(), formLoginRequest.authId())
                .flatMap(user -> authenticationApiService.loginOrRegister(user, exchange, invitationId))
                .thenReturn(ResponseView.success(true));
    }

    /**
     * third party login api
     */
    @PostMapping("/tp/login")
    public Mono<ResponseView<Boolean>> loginWithThirdParty(
            @RequestParam(required = false) String authId,
            @RequestParam(required = false) String source,
            @RequestParam String code,
            @RequestParam(required = false) String invitationId,
            @RequestParam(required = false) String redirectUrl,
            ServerWebExchange exchange) {
        return authenticationApiService.authenticateByOauth2(authId, source, code, redirectUrl)
                .flatMap(authUser -> authenticationApiService.loginOrRegister(authUser, exchange, invitationId))
                .thenReturn(ResponseView.success(true));
    }

    @PostMapping("/logout")
    public Mono<ResponseView<Boolean>> logout(ServerWebExchange exchange) {
        String cookieToken = cookieHelper.getCookieToken(exchange);
        return sessionUserService.removeUserSession(cookieToken)
                .then(businessEventPublisher.publishUserLogoutEvent())
                .thenReturn(ResponseView.success(true));
    }

    @PostMapping("/config")
    public Mono<ResponseView<Void>> enableAuthConfig(@RequestBody AuthConfigRequest authConfigRequest) {
        return authenticationApiService.enableAuthConfig(authConfigRequest)
                .thenReturn(ResponseView.success(null));
    }

    @DeleteMapping("/config/{id}")
    public Mono<ResponseView<Void>> disableAuthConfig(@PathVariable("id") String id) {
        return authenticationApiService.disableAuthConfig(id)
                .thenReturn(ResponseView.success(null));
    }

    @JsonView(JsonViews.Public.class)
    @GetMapping("/configs")
    public Mono<ResponseView<List<AbstractAuthConfig>>> getAllConfigs() {
        return authenticationService.findAllAuthConfigs(false)
                .map(FindAuthConfig::authConfig)
                .collectList()
                .map(ResponseView::success);
    }

    /**
     * @param loginId phone number or email for now.
     * @param register register or login
     * @param source {@link AuthSourceConstants#PHONE} or {@link AuthSourceConstants#EMAIL}
     */
    public record FormLoginRequest(String loginId, String password, boolean register, String source, String authId) {
    }
}
