package com.openblocks.api.usermanagement;


import static com.openblocks.sdk.constants.Authentication.isAnonymousUser;
import static com.openblocks.sdk.exception.BizError.INVITED_USER_NOT_LOGIN;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.usermanagement.view.InvitationVO;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.constant.Url;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = {Url.INVITATION_URL, NewUrl.INVITATION_URL})
@Slf4j
public class InvitationController {

    @Autowired
    private InvitationApiService invitationApiService;

    @Autowired
    private SessionUserService sessionUserService;

    @PostMapping
    public Mono<ResponseView<InvitationVO>> create(@RequestParam String orgId) {
        return invitationApiService.create(orgId)
                .map(ResponseView::success);
    }

    @GetMapping("/{invitationId}")
    public Mono<ResponseView<InvitationVO>> get(@PathVariable String invitationId) {
        return invitationApiService.getInvitationView(invitationId)
                .map(ResponseView::success);
    }

    @GetMapping("/{invitationId}/invite")
    public Mono<ResponseView<?>> inviteUser(@PathVariable String invitationId) {
        return sessionUserService.getVisitorId()
                .flatMap(visitorId -> {
                            if (isAnonymousUser(visitorId)) {
                                return invitationApiService.getInvitationView(invitationId)
                                        .map(invitationVO -> ResponseView.error(INVITED_USER_NOT_LOGIN.getBizErrorCode(), "", invitationVO));
                            }
                            return invitationApiService.inviteUser(invitationId)
                                    .map(ResponseView::success);
                        }
                );
    }

}
