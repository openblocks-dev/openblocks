package com.openblocks.api.usermanagement.view;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.openblocks.domain.user.model.Connection;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserProfileView {

    private String id;

    private List<OrgAndVisitorRoleView> orgAndRoles;

    private String currentOrgId;

    private String username;

    private Set<Connection> connections;

    @JsonProperty(value = "isAnonymous")
    private boolean isAnonymous;

    @JsonProperty(value = "isEnabled")
    private boolean isEnabled;

    private String avatar;

    private String avatarUrl;

    private boolean hasPassword;

    private boolean hasSetNickname;

    private boolean hasShownNewUserGuidance;

    private Map<String, Object> userStatus;

    private boolean isOrgDev;

    private long createdTimeMs;

    private String ip;
}
