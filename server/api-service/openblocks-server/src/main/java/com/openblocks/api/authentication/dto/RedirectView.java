package com.openblocks.api.authentication.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RedirectView {
    private String redirectUri;
}
