package com.openblocks.domain.user.model;

import static org.apache.commons.collections4.MapUtils.emptyIfNull;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;
import javax.validation.constraints.NotEmpty;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.SetUtils;
import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.openblocks.sdk.constants.AuthSourceConstants;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Connection {

    private static final long serialVersionUID = -9218373922209100577L;

    private String authId;

    @NotEmpty
    private String source;

    @NotEmpty
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private final String rawId;

    private final String name;

    private final String avatar;

    private Set<String> orgIds;

    @Nullable
    @JsonProperty(access = Access.WRITE_ONLY)
    private ConnectionAuthToken authConnectionAuthToken;

    private Map<String, Object> rawUserInfo;

    private Set<String> tokens;

    @JsonCreator
    private Connection(String authId, String source, String rawId, String name, String avatar, Set<String> orgIds, @Nullable
    ConnectionAuthToken authConnectionAuthToken, Map<String, Object> rawUserInfo, Set<String> tokens) {
        this.authId = authId;
        this.source = source;
        this.rawId = rawId;
        this.name = name;
        this.avatar = avatar;
        this.orgIds = CollectionUtils.isEmpty(orgIds) ? new HashSet<>() : orgIds;
        this.authConnectionAuthToken = authConnectionAuthToken;
        this.rawUserInfo = rawUserInfo;
        this.tokens = tokens;
    }

    public static Connection.ConnectionBuilder builder() {
        return new ConnectionBuilder();
    }

    public Set<String> getTokens() {
        return SetUtils.emptyIfNull(this.tokens);
    }

    public void addToken(String token) {
        if (this.tokens == null) {
            this.tokens = new HashSet<>();
        }
        this.tokens.add(token);
    }

    public void removeToken(String token) {
        if (this.tokens == null) {
            this.tokens = new HashSet<>();
        }
        this.tokens.remove(token);
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    @JsonIgnore
    public Set<String> getOrgIds() {
        return orgIds;
    }

    public void addOrg(String orgId) {
        orgIds.add(orgId);
    }

    public boolean containOrg(String orgId) {
        return orgIds.contains(orgId);
    }

    public boolean matchThirdPartyLoginSourceInCloud(String sourceType, String orgId) {
        return StringUtils.equals(sourceType, source) && containOrg(orgId);
    }

    public Map<String, Object> getRawUserInfo() {
        if (AuthSourceConstants.EMAIL.equals(this.getSource())) {
            return Map.of("email", this.getRawId());
        }
        return emptyIfNull(rawUserInfo);
    }

    public boolean matchThirdPartyLoginSourceInSelfHost(String sourceType) {
        return StringUtils.equals(sourceType, source);
    }
}
