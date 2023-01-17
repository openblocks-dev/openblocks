//package com.openblocks.api.authentication.service;
//
//import static com.openblocks.sdk.constants.AuthSourceConstants.EMAIL;
//
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import com.openblocks.domain.user.model.AuthorizedUser;
//
//import reactor.core.publisher.Mono;
//import reactor.test.StepVerifier;
//
//@SpringBootTest
//@RunWith(SpringRunner.class)
//public class AuthenticationApiServiceTest {
//
//    @Autowired
//    private AuthenticationApiService authenticationApiService;
//
//    @Test
//    public void testFormUserLogin() {
//        Mono<AuthorizedUser> formAuthUser =
//                authenticationApiService.getFormAuthUser("captain@avengers.com", "hail hydra", "avengers.com", EMAIL);
//
//        StepVerifier.create(formAuthUser)
//                .assertNext(authorizedUser -> {
//                    Assert.assertEquals(EMAIL, authorizedUser.getSource());
//                    Assert.assertEquals("captain@avengers.com", authorizedUser.getUid());
//                    Assert.assertEquals("org01", authorizedUser.getOrgId());
//                    Assert.assertNotNull(authorizedUser.getUser());
//                })
//                .verifyComplete();
//    }
//}