package com.openblocks.domain.user.model;

import static com.google.common.collect.Maps.newHashMap;
import static com.openblocks.domain.user.constant.UserStatusType.HAS_SHOW_NEW_USER_GUIDANCE;
import static org.apache.commons.lang3.BooleanUtils.isTrue;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.google.common.collect.ImmutableMap;

import lombok.Builder;

@Builder
@Document
public class UserStatus {

    @Id
    private final String id;

    private final Boolean hasShowNewUserGuidance;

    private final Boolean banned;

    private final Map<String, Object> statusMap;

    @JsonCreator
    public UserStatus(String id, Boolean hasShowNewUserGuidance, Boolean banned, Map<String, Object> statusMap) {
        this.id = id;
        this.hasShowNewUserGuidance = hasShowNewUserGuidance;
        this.banned = banned;
        this.statusMap = statusMap;
    }

    public String getId() {
        return id;
    }

    public Map<String, Object> getStatusMap() {
        if (statusMap == null) {
            return ImmutableMap.of(HAS_SHOW_NEW_USER_GUIDANCE.getValue(), isTrue(hasShowNewUserGuidance));
        }

        if (statusMap.containsKey(HAS_SHOW_NEW_USER_GUIDANCE.getValue())) {
            return statusMap;
        }

        Map<String, Object> result = newHashMap(statusMap);
        result.put(HAS_SHOW_NEW_USER_GUIDANCE.getValue(), isTrue(hasShowNewUserGuidance));
        return result;
    }

    public boolean hasShowNewUserGuidance() {
        return isTrue(hasShowNewUserGuidance);
    }

    public Boolean isBanned() {
        return isTrue(banned);
    }
}
