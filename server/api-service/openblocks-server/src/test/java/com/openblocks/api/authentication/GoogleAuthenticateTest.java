package com.openblocks.api.authentication;

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
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.MultiValueMap;

import com.google.common.collect.Iterables;
import com.openblocks.api.authentication.AuthenticationController.FormLoginRequest;
import com.openblocks.domain.authentication.AuthenticationService;
import com.openblocks.domain.authentication.FindAuthConfig;
import com.openblocks.domain.encryption.EncryptionService;
import com.openblocks.domain.user.model.Connection;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.model.UserState;
import com.openblocks.domain.user.repository.UserRepository;
import com.openblocks.sdk.auth.AbstractAuthConfig;
import com.openblocks.sdk.constants.AuthSourceConstants;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@SpringBootTest
@RunWith(SpringRunner.class)
public class GoogleAuthenticateTest {

    @Autowired
    private AuthenticationController authenticationController;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private AuthenticationService authenticationService;

    @Test
    public void testGoogleRegisterSuccess() {
        String email = "test_register@ob.dev";
        String password = "openblocks";
        String source = AuthSourceConstants.EMAIL;

        String authId = getGoogleAuthConfigId();
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

    private String getGoogleAuthConfigId() {
        return authenticationService.findAuthConfigBySource(AuthSourceConstants.GOOGLE)
                .map(FindAuthConfig::authConfig)
                .map(AbstractAuthConfig::getId)
                .block();
    }
}
