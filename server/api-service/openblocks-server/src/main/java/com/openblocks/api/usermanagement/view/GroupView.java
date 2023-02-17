package com.openblocks.api.usermanagement.view;

import java.util.Locale;

import com.openblocks.domain.group.model.Group;
import com.openblocks.sdk.util.LocaleUtils;

import lombok.Builder;
import lombok.Getter;
import reactor.core.publisher.Mono;

@Getter
@Builder
public class GroupView {

    private String groupId;
    private String groupName;
    private boolean allUsersGroup;
    private boolean isDevGroup;
    private String visitorRole;
    private long createTime;
    private String dynamicRule;
    private boolean isSyncGroup;
    private boolean isSyncDelete;

    public static Mono<GroupView> from(Group group, String memberRole) {
        return Mono.deferContextual(contextView -> {
            Locale locale = LocaleUtils.getLocale(contextView);
            GroupView groupView = GroupView.builder()
                    .groupId(group.getId())
                    .groupName(group.getName(locale))
                    .allUsersGroup(group.isAllUsersGroup())
                    .isDevGroup(group.isDevGroup())
                    .createTime(group.getCreateTime())
                    .visitorRole(memberRole)
                    .dynamicRule(group.getDynamicRule())
                    .isSyncGroup(group.isSyncGroup())
                    .isSyncDelete(group.isSyncDeleted())
                    .build();
            return Mono.just(groupView);
        });
    }
}
