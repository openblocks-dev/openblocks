package com.openblocks.api.authentication.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthUserBindEndMessage {
    private boolean success;
    private String bindDomain;
}
