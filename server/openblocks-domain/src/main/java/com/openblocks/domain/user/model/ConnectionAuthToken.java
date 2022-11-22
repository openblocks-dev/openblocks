package com.openblocks.domain.user.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConnectionAuthToken {

    private String accessToken;
    // in seconds
    private Long expireAt;
    private String refreshToken;
    // in seconds
    private Long refreshTokenExpireAt;
    private String source;

    public boolean isAccessTokenExpired() {
        return expireAt == null || expireAt < System.currentTimeMillis() / 1000;
    }

    public boolean isRefreshTokenExpired() {
        return refreshTokenExpireAt == null || refreshTokenExpireAt < System.currentTimeMillis() / 1000;
    }
}
