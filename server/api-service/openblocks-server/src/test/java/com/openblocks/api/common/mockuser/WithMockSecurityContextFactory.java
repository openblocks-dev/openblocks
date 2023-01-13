package com.openblocks.api.common.mockuser;

import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;

import com.openblocks.domain.user.model.User;

/**
 * @see WithSecurityContextTestExecutionListener
 */
public class WithMockSecurityContextFactory implements WithSecurityContextFactory<WithMockUser> {

    @Override
    public SecurityContext createSecurityContext(WithMockUser mockUser) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        User principal = new User();
        principal.setId(mockUser.id());
        principal.setName(mockUser.name());
        Authentication auth = new UsernamePasswordAuthenticationToken(principal, "password", Collections.emptyList());
        context.setAuthentication(auth);
        return context;
    }
}
