package com.openblocks.domain.user.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthToken implements Serializable {
    private String accessToken;
    private int expireIn;
    private String refreshToken;
    private int refreshTokenExpireIn;

    private String openId;
    private String code;
}
