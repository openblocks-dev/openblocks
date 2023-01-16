package com.openblocks.sdk.webclient;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.SSLException;

import com.openblocks.sdk.plugin.common.ssl.DisableVerifySslConfig;
import com.openblocks.sdk.plugin.common.ssl.SslConfig;
import com.openblocks.sdk.plugin.common.ssl.SslHelper;
import com.openblocks.sdk.plugin.common.ssl.VerifySelfSignedCertSslConfig;

import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import lombok.extern.slf4j.Slf4j;
import reactor.netty.http.client.HttpClient;
import reactor.netty.tcp.SslProvider;

@Slf4j
public class HttpClients {

    public static HttpClient httpClient() {
        return HttpClient.create();
    }

    public static HttpClient withSafeHost(HttpClient httpClient) {
        return httpClient.resolver(ResolverGroup.INSTANCE);
    }

    public static HttpClient withSecure(HttpClient httpClient, SslConfig sslConfig) {
        if (sslConfig instanceof DisableVerifySslConfig) {
            return httpClient.secure(disableSslCertificateVerificationWebClientBuilder());
        }
        if (sslConfig instanceof VerifySelfSignedCertSslConfig verifySelfSignedCertSslConfig) {
            return httpClient.secure(getSelfSignedCertWebClient(verifySelfSignedCertSslConfig));
        }
        return httpClient;
    }

    private static SslProvider getSelfSignedCertWebClient(VerifySelfSignedCertSslConfig verifySelfSignedCertSslConfig) {
        try {
            X509Certificate x509Certificate = SslHelper.parseCertificate(verifySelfSignedCertSslConfig.getSelfSignedCert());
            SslContext sslContext = SslContextBuilder.forClient()
                    .trustManager(x509Certificate)
                    .build();
            return SslProvider.builder()
                    .sslContext(sslContext)
                    .build();
        } catch (CertificateException | SSLException e) {
            log.error("parse certificate error", e);
            return SslProvider.defaultClientProvider();
        }
    }

    private static SslProvider disableSslCertificateVerificationWebClientBuilder() {
        try {
            SslContext sslContext = SslContextBuilder.forClient()
                    .trustManager(InsecureTrustManagerFactory.INSTANCE)
                    .build();
            return SslProvider.builder()
                    .sslContext(sslContext)
                    .build();
        } catch (SSLException e) {
            return SslProvider.defaultClientProvider();
        }
    }

}
