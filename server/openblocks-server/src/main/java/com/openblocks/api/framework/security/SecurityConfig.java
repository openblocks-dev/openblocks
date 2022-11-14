package com.openblocks.api.framework.security;


import static com.openblocks.infra.constant.Url.APPLICATION_URL;
import static com.openblocks.infra.constant.Url.CONFIG_URL;
import static com.openblocks.infra.constant.Url.CUSTOM_AUTH;
import static com.openblocks.infra.constant.Url.INVITATION_URL;
import static com.openblocks.infra.constant.Url.QUERY_URL;
import static com.openblocks.infra.constant.Url.STATE_URL;
import static com.openblocks.infra.constant.Url.USER_URL;
import static com.openblocks.sdk.constants.Authentication.ANONYMOUS_USER;
import static com.openblocks.sdk.constants.Authentication.ANONYMOUS_USER_ID;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.ServerAuthenticationEntryPoint;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.adapter.ForwardedHeaderTransformer;

import com.openblocks.api.framework.filter.UserSessionPersistenceFilter;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.domain.user.model.User;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.constant.Url;
import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.util.CookieHelper;

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    @Autowired
    private CommonConfig commonConfig;

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;

    @Autowired
    private ServerAuthenticationEntryPoint serverAuthenticationEntryPoint;

    @Autowired
    private CookieHelper cookieHelper;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        http.cors()
                .configurationSource(buildCorsConfigurationSource())
                .and()
                .csrf().disable()
                .anonymous().principal(createAnonymousUser())
                .and()
                .httpBasic()
                .and()
                .authorizeExchange()
                .matchers(
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, CUSTOM_AUTH + "/otp/send"), // sms verification
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, CUSTOM_AUTH + "/phone/login"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, CUSTOM_AUTH + "/tp/login/**"), // third party login
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, CUSTOM_AUTH + "/callback/tp/login/**"), // third party login callback
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, CUSTOM_AUTH + "/form/login"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, INVITATION_URL + "/**"), // invitation
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, CUSTOM_AUTH + "/logout"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, CONFIG_URL), // system config
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.HEAD, STATE_URL + "/healthCheck"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, APPLICATION_URL + "/*/view"), // application view
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, USER_URL + "/me"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, Url.GROUP_URL + "/list"), // application view
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, QUERY_URL + "/execute"), // application view
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, "/api/proxy"), // application view

                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, NewUrl.CUSTOM_AUTH + "/otp/send"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, NewUrl.CUSTOM_AUTH + "/phone/login"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, NewUrl.CUSTOM_AUTH + "/tp/login/**"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, NewUrl.CUSTOM_AUTH + "/callback/tp/login/**"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, NewUrl.CUSTOM_AUTH + "/form/login"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, NewUrl.CUSTOM_AUTH + "/cas/login"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, NewUrl.INVITATION_URL + "/**"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, NewUrl.CUSTOM_AUTH + "/logout"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, NewUrl.CONFIG_URL),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.HEAD, NewUrl.STATE_URL + "/healthCheck"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, NewUrl.APPLICATION_URL + "/*/view"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, NewUrl.USER_URL + "/me"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, NewUrl.GROUP_URL + "/list"),
                        ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, NewUrl.QUERY_URL + "/execute")
                )
                .permitAll()
                .pathMatchers("/api/**")
                .authenticated()
                .pathMatchers("/test/**")
                .authenticated()
                .pathMatchers("/**")
                .permitAll()
                .anyExchange()
                .authenticated();

        http.exceptionHandling()
                .authenticationEntryPoint(serverAuthenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler);

        http.addFilterBefore(new UserSessionPersistenceFilter(sessionUserService, cookieHelper), SecurityWebFiltersOrder.AUTHENTICATION);

        return http.build();
    }

    /**
     * enable CORS
     */
    private CorsConfigurationSource buildCorsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(commonConfig.getSecurity().getAllCorsAllowedDomains());
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public ForwardedHeaderTransformer forwardedHeaderTransformer() {
        return new ForwardedHeaderTransformer();
    }

    /**
     * provide a default user for unauthenticated cases
     */
    private User createAnonymousUser() {
        User user = new User();
        user.setId(ANONYMOUS_USER_ID);
        user.setName(ANONYMOUS_USER);
        user.setIsAnonymous(true);
        return user;
    }
}
