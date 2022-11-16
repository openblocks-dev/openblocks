package com.openblocks.domain.user.model;

import static org.apache.commons.collections4.MapUtils.emptyIfNull;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;
import javax.validation.constraints.NotEmpty;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Connection {

    private static final long serialVersionUID = -9218373922209100577L;

    @NotEmpty
    private final String source;

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

    @JsonCreator
    private Connection(String source, String rawId, String name, String avatar, Set<String> orgIds, @Nullable
    ConnectionAuthToken authConnectionAuthToken, Map<String, Object> rawUserInfo) {
        this.source = source;
        this.rawId = rawId;
        this.name = name;
        this.avatar = avatar;
        this.orgIds = CollectionUtils.isEmpty(orgIds) ? new HashSet<>() : orgIds;
        this.authConnectionAuthToken = authConnectionAuthToken;
        this.rawUserInfo = rawUserInfo;
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
        return emptyIfNull(rawUserInfo);
    }

    public boolean matchThirdPartyLoginSourceInSelfHost(String sourceType) {
        return StringUtils.equals(sourceType, source);
    }
}
