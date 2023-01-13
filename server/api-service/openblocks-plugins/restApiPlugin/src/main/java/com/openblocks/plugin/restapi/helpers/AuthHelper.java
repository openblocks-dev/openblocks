package com.openblocks.plugin.restapi.helpers;

import static org.springframework.http.HttpHeaders.WWW_AUTHENTICATE;

import java.text.ParseException;
import java.util.Optional;
import java.util.function.Consumer;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.client.ClientResponse;

import com.google.common.collect.Iterables;
import com.openblocks.sdk.plugin.restapi.auth.BasicAuthConfig;

import me.vzhilin.auth.DigestAuthenticator;
import me.vzhilin.auth.parser.ChallengeResponse;

public final class AuthHelper {

    private AuthHelper() {
    }

    public static Consumer<HttpHeaders> basicAuth(BasicAuthConfig basicAuthConfig) {
        return httpHeaders -> httpHeaders.setBasicAuth(basicAuthConfig.getUsername(), basicAuthConfig.getPassword());
    }

    public static boolean shouldDigestAuth(ClientResponse response) {

        return response.statusCode() == HttpStatus.UNAUTHORIZED
                && Optional.ofNullable(Iterables.getFirst(response.headers().header(WWW_AUTHENTICATE), null))
                .map(header -> header.trim().toLowerCase())
                .map(header -> header.startsWith("digest"))
                .orElse(false);
    }

    public static Consumer<HttpHeaders> digestAuth(BasicAuthConfig basicAuthConfig, ClientResponse response, HttpMethod httpMethod,
            String requestPath) throws ParseException {
        DigestAuthenticator authenticator = new DigestAuthenticator(basicAuthConfig.getUsername(), basicAuthConfig.getPassword());
        String receivedAuthenticateHeader = response.headers().header(WWW_AUTHENTICATE).get(0);
        authenticator.onResponseReceived(ChallengeResponse.of(receivedAuthenticateHeader), response.statusCode().value());
        String authorizationHeader = authenticator.authorizationHeader(httpMethod.name(), requestPath);
        return httpHeaders -> httpHeaders.set(HttpHeaders.AUTHORIZATION, authorizationHeader);
    }
}
