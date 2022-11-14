package com.openblocks.api.usermanagement.view;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@Builder
public class OrgMemberListView {

    private String visitorRole;
    private List<OrgMemberView> members;

    @Getter
    @SuperBuilder
    public static class OrgMemberView {
        private String userId;
        private String name;
        private String avatarUrl;
        private String role;
        private long joinTime;
        // source - rawUserInfo
        private Map<String, Map<String, Object>> rawUserInfos;
    }
}
