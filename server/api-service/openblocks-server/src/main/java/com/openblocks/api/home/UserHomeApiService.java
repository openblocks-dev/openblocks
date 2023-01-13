package com.openblocks.api.home;

import javax.annotation.Nullable;

import com.openblocks.api.application.view.ApplicationInfoView;
import com.openblocks.api.usermanagement.view.UserProfileView;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.model.ApplicationType;
import com.openblocks.domain.user.model.User;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.web.server.ServerWebExchange;

public interface UserHomeApiService {

    Mono<UserProfileView> buildUserProfileView(User user, ServerWebExchange exchange);

    Mono<Boolean> markNewUserGuidanceShown(String userId);

    Mono<UserHomepageView> getUserHomePageView(ApplicationType applicationType);

    Flux<ApplicationInfoView> getAllAuthorisedApplications4CurrentOrgMember(@Nullable ApplicationType applicationType,
            @Nullable ApplicationStatus applicationStatus, boolean withContainerSize);
}
