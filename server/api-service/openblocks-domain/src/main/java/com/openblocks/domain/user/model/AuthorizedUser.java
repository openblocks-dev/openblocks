package com.openblocks.domain.user.model;

import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class AuthorizedUser {

    private String source;
    private String uid;
    private String username;
    private String avatar;
    private Map<String, Object> rawUserInfo;
    private Map<String, Object> extra;

    private String orgId;

    /**
     * while user login by email or phone with password, we authenticated it by self-db which return a user directly.
     * we store it here to avoid querying it from db again.
     */
    @Nullable
    private User user;

    /**
     * While user is authenticated by oauth 2.0, we store the token information which may be used in the future datasource or query.
     */
    private ConnectionAuthToken authConnectionAuthToken;

    public Connection toAuthConnection() {
        return Connection.builder()
                .source(getSource())
                .name(getUsername())
                .rawId(getUid())
                .avatar(getAvatar())
                .orgIds(StringUtils.isBlank(getOrgId()) ? Set.of() : Set.of(getOrgId()))
                .authConnectionAuthToken(authConnectionAuthToken)
                .rawUserInfo(getRawUserInfo())
                .build();
    }
}
