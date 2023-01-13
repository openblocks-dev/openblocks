package com.openblocks.api.authentication.util;

import static java.util.Collections.emptyMap;
import static reactor.core.scheduler.Schedulers.newBoundedElastic;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import com.google.common.collect.ImmutableSet;
import com.openblocks.domain.user.model.User;

import reactor.core.scheduler.Scheduler;

public final class AuthenticationUtils {

    public static final int JUST_AUTH_THREAD_POOL_SIZE = 50;
    public static final Scheduler AUTH_REQUEST_THREAD_POOL = newBoundedElastic(JUST_AUTH_THREAD_POOL_SIZE, 5000, "auth-worker");

    public static Authentication toAuthentication(User user) {
        return new Authentication() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return ImmutableSet.of((GrantedAuthority) () -> "ROLE_USER"
                );
            }

            @Override
            public Object getCredentials() {
                return "";
            }

            @Override
            public Object getDetails() {
                return emptyMap();
            }

            @Override
            public Object getPrincipal() {
                return user;
            }

            @Override
            public boolean isAuthenticated() {
                return true;
            }

            @Override
            public void setAuthenticated(boolean isAuthenticated) {
            }

            @Override
            public String getName() {
                return user.getName();
            }
        };
    }

}
