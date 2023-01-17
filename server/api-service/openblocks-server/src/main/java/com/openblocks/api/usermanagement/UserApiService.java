package com.openblocks.api.usermanagement;

import static com.openblocks.sdk.exception.BizError.UNSUPPORTED_OPERATION;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.api.home.SessionUserService;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.user.model.UserDetail;
import com.openblocks.domain.user.service.UserService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class UserApiService {

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private UserService userService;

    public Mono<UserDetail> getUserDetailById(String userId) {
        return checkPermission(userId)
                .then(userService.findById(userId)
                        .flatMap(user -> userService.buildUserDetail(user, false)));
    }

    private Mono<Void> checkPermission(String userId) {
        return sessionUserService.getVisitorOrgMember()
                .flatMap(orgMember -> {
                    if (!orgMember.isAdmin()) {
                        return ofError(UNSUPPORTED_OPERATION, "BAD_REQUEST");
                    }
                    return orgMemberService.getOrgMember(orgMember.getOrgId(), userId)
                            .hasElement()
                            .flatMap(hasElement -> {
                                if (hasElement) {
                                    return Mono.empty();
                                }
                                return ofError(UNSUPPORTED_OPERATION, "BAD_REQUEST");
                            });
                });
    }

}
