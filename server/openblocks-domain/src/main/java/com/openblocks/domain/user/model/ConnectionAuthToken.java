package com.openblocks.domain.user.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConnectionAuthToken {

    private String accessToken;
    // in seconds
    private long expireAt;
    private String refreshToken;
    // in seconds
    private long refreshTokenExpireAt;
    private String source;

    public boolean isAccessTokenExpired() {
        return expireAt < System.currentTimeMillis() / 1000;
    }

    public boolean isRefreshTokenExpired() {
        return refreshTokenExpireAt < System.currentTimeMillis() / 1000;
    }
}
