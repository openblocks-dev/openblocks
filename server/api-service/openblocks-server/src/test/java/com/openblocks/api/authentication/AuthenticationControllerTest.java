package com.openblocks.api.authentication;

import static com.openblocks.sdk.exception.BizError.INVALID_PASSWORD;
import static com.openblocks.sdk.exception.BizError.USER_LOGIN_ID_EXIST;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.Objects;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseCookie;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.MultiValueMap;

import com.google.common.collect.Iterables;
import com.openblocks.api.authentication.AuthenticationController.FormLoginRequest;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.domain.authentication.AuthenticationService;
import com.openblocks.domain.authentication.FindAuthConfig;
import com.openblocks.domain.encryption.EncryptionService;
import com.openblocks.domain.user.model.Connection;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.model.UserState;
import com.openblocks.domain.user.repository.UserRepository;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.constants.AuthSourceConstants;
import com.openblocks.sdk.exception.BizException;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles("AuthenticationControllerTest")
public class AuthenticationControllerTest {

    @Autowired
    private AuthenticationController authenticationController;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private AuthenticationService authenticationService;

    @Test
    public void testFormRegisterSuccess() {
        String email = "test_register@ob.dev";
        String password = "openblocks";
        String source = AuthSourceConstants.EMAIL;

        String authId = getEmailAuthConfigId();
        FormLoginRequest formLoginRequest = new FormLoginRequest(email, password, true, source, authId);
        MockServerHttpRequest request = MockServerHttpRequest.post("").build();
        MockServerWebExchange exchange = MockServerWebExchange.builder(request).build();

        Mono<User> userMono = authenticationController.formLogin(formLoginRequest, null, exchange)
                .then(userRepository.findByConnections_SourceAndConnections_RawId(source, email));

        StepVerifier.create(userMono)
                .assertNext(user -> {
                    assertEquals(email, user.getName());
                    assertNull(user.getAvatar());
                    assertNull(user.getTpAvatarLink());
                    assertEquals(UserState.ACTIVATED, user.getState());
                    assertTrue(user.getIsEnabled());
                    assertTrue(encryptionService.matchPassword(password, user.getPassword()));
                    assertFalse(user.getIsAnonymous());
                    assertFalse(user.getIsNewUser());//
                    assertFalse(user.isHasSetNickname());
                    assertNotNull(user.getId());
                    //connections
                    assertEquals(1, user.getConnections().size());
                    Connection connection = Iterables.getFirst(user.getConnections(), null);
                    assertNotNull(connection);
                    assertEquals(authId, connection.getAuthId());
                    assertEquals(source, connection.getSource());
                    assertEquals(email, connection.getRawId());
                    assertEquals(email, connection.getName());
                    assertNull(connection.getAvatar());
                    assertEquals(1, connection.getOrgIds().size());
                    assertNull(connection.getAuthConnectionAuthToken());
                    assertEquals(Map.of("email", email), connection.getRawUserInfo());
                    //exchange
                    MultiValueMap<String, ResponseCookie> cookies = exchange.getResponse().getCookies();
                    assertEquals(1, cookies.size());
                    assertTrue(cookies.containsKey("UT-TACO-TOKEN"));
                    assertTrue(connection.getTokens().contains(Objects.requireNonNull(cookies.getFirst("UT-TACO-TOKEN")).getValue()));
                })
                .verifyComplete();
    }

    @Test
    public void testFormLoginSuccess() {
        String email = "test_login@ob.dev";
        String password = "openblocks";
        String source = AuthSourceConstants.EMAIL;

        String authId = getEmailAuthConfigId();

        FormLoginRequest formRegisterRequest = new FormLoginRequest(email, password, true, source, authId);
        MockServerHttpRequest registerRequest = MockServerHttpRequest.post("").build();
        MockServerWebExchange registerExchange = MockServerWebExchange.builder(registerRequest).build();

        FormLoginRequest formLoginRequest = new FormLoginRequest(email, password, false, source, authId);
        MockServerHttpRequest loginRequest = MockServerHttpRequest.post("").build();
        MockServerWebExchange loginExchange = MockServerWebExchange.builder(loginRequest).build();

        Mono<User> userMono = authenticationController.formLogin(formRegisterRequest, null, registerExchange)
                .then(authenticationController.formLogin(formLoginRequest, null, loginExchange))
                .then(userRepository.findByConnections_SourceAndConnections_RawId(source, email));

        StepVerifier.create(userMono)
                .assertNext(user -> {
                    assertEquals(email, user.getName());
                    assertNull(user.getAvatar());
                    assertNull(user.getTpAvatarLink());
                    assertEquals(UserState.ACTIVATED, user.getState());
                    assertTrue(user.getIsEnabled());
                    assertTrue(encryptionService.matchPassword(password, user.getPassword()));
                    assertFalse(user.getIsAnonymous());
                    assertFalse(user.getIsNewUser());//
                    assertFalse(user.isHasSetNickname());
                    assertNotNull(user.getId());
                    //connections
                    assertEquals(1, user.getConnections().size());
                    Connection connection = Iterables.getFirst(user.getConnections(), null);
                    assertNotNull(connection);
                    assertEquals(authId, connection.getAuthId());
                    assertEquals(source, connection.getSource());
                    assertEquals(email, connection.getRawId());
                    assertEquals(email, connection.getName());
                    assertNull(connection.getAvatar());
                    assertEquals(1, connection.getOrgIds().size());
                    assertNull(connection.getAuthConnectionAuthToken());
                    assertEquals(Map.of("email", email), connection.getRawUserInfo());
                    //exchange
                    MultiValueMap<String, ResponseCookie> cookies = loginExchange.getResponse().getCookies();
                    assertEquals(1, cookies.size());
                    assertTrue(cookies.containsKey("UT-TACO-TOKEN"));
                    assertTrue(connection.getTokens().contains(Objects.requireNonNull(cookies.getFirst("UT-TACO-TOKEN")).getValue()));
                })
                .verifyComplete();
    }

    @Test
    public void testRegisterFailByLoginIdExist() {

        String email = "test_register_fail@ob.dev";
        String password = "openblocks";
        String source = AuthSourceConstants.EMAIL;

        FormLoginRequest formLoginRequest = new FormLoginRequest(email, password, true, source, getEmailAuthConfigId());
        MockServerHttpRequest request = MockServerHttpRequest.post("").build();
        MockServerWebExchange exchange = MockServerWebExchange.builder(request).build();

        Mono<ResponseView<Boolean>> loginMono = authenticationController.formLogin(formLoginRequest, null, exchange)
                .then(authenticationController.formLogin(formLoginRequest, null, exchange));
        StepVerifier.create(loginMono)
                .verifyErrorMatches(throwable -> {
                    BizException bizException = (BizException) throwable;
                    assertEquals(USER_LOGIN_ID_EXIST, bizException.getError());
                    assertEquals("USER_LOGIN_ID_EXIST", bizException.getMessageKey());
                    return true;
                });
    }

    @Test
    public void testLoginFailByLoginIdNotExist() {
        String email = "test_login_fail@ob.dev";
        String password = "openblocks";
        String source = AuthSourceConstants.EMAIL;

        FormLoginRequest formLoginRequest = new FormLoginRequest(email, password, false, source, getEmailAuthConfigId());
        MockServerHttpRequest request = MockServerHttpRequest.post("").build();
        MockServerWebExchange exchange = MockServerWebExchange.builder(request).build();

        Mono<ResponseView<Boolean>> loginMono = authenticationController.formLogin(formLoginRequest, null, exchange);
        StepVerifier.create(loginMono)
                .verifyErrorMatches(throwable -> {
                    BizException bizException = (BizException) throwable;
                    assertEquals(INVALID_PASSWORD, bizException.getError());
                    assertEquals("INVALID_EMAIL_OR_PASSWORD", bizException.getMessageKey());
                    return true;
                });
    }

    private String getEmailAuthConfigId() {
        return authenticationService.findAuthConfigBySource(AuthSourceConstants.EMAIL)
                .map(FindAuthConfig::authConfig)
                .map(AbstractAuthConfig::getId)
                .block();
    }

    @Test
    public void logout() {
    }
}