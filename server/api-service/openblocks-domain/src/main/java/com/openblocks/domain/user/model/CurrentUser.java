package com.openblocks.domain.user.model;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CurrentUser {
    public static final CurrentUser ANONYMOUS_CURRENT_USER = CurrentUser.builder()
            .id("")
            .name("ANONYMOUS")
            .avatarUrl("")
            .email("")
            .ip("")
            .groups(Collections.emptyList())
            .extra(Collections.emptyMap())
            .build();

    private String id;
    private String name;
    private String avatarUrl;
    private String email;
    private String ip;
    private List<Map<String, String>> groups;
    private Map<String, Object> extra;
}
