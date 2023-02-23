//package com.openblocks.api.authentication.mock;
//
//import static com.openblocks.api.authentication.request.ee.common.JustAuthBasedOAuth2Request.wrap;
//
//import org.springframework.context.annotation.Primary;
//
//import com.openblocks.api.authentication.request.AuthRequest;
//import com.openblocks.api.authentication.request.ee.common.OAuth2RequestContext;
//import com.openblocks.api.authentication.request.ee.google.GoogleOauth2AuthRequestFactory;
//
//import me.zhyd.oauth.model.AuthCallback;
//import me.zhyd.oauth.model.AuthResponse;
//import me.zhyd.oauth.model.AuthToken;
//import me.zhyd.oauth.model.AuthUser;
//import reactor.core.publisher.Mono;
//
//@Primary
//public class MockGoogleOauth2AuthRequestFactory extends GoogleOauth2AuthRequestFactory {
//
//    @Override
//    public Mono<AuthRequest> build(OAuth2RequestContext context) {
//        return Mono.fromSupplier(() -> wrap(new MockGoogleOauth2AuthRequest()));
//    }
//
//    public static class MockGoogleOauth2AuthRequest implements me.zhyd.oauth.request.AuthRequest {
//
//        @Override
//        public AuthResponse<AuthUser> login(AuthCallback authCallback) {
//            AuthUser authUser = AuthUser.builder()
//                    .uuid("001")
//                    .username("lex")
//                    .avatar("https://example.com/avatar")
//                    .token(new AuthToken())
//                    .build();
//            return AuthResponse.<AuthUser> builder()
//                    .code(2000)
//                    .data(authUser)
//                    .build();
//        }
//    }
//}
