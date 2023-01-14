package com.openblocks.api.common.mockuser;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.test.context.support.WithSecurityContext;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockSecurityContextFactory.class)
public @interface WithMockUser {

    String DEFAULT_CURRENT_USER_ID = "user01";
    String DEFAULT_CURRENT_USERNAME = "Iron Man";
    String DEFAULT_CURRENT_ORG_ID = "org01";

    String id() default DEFAULT_CURRENT_USER_ID;

    String name() default DEFAULT_CURRENT_USERNAME;
}
