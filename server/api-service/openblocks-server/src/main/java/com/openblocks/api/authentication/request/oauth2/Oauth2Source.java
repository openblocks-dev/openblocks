package com.openblocks.api.authentication.request.oauth2;

public interface Oauth2Source {

    String accessToken();

    String userInfo();

    default String refresh() {
        throw new UnsupportedOperationException(getName());
    }

    default String getName() {
        if (this instanceof Enum) {
            return String.valueOf(this);
        }
        return this.getClass().getSimpleName();
    }
}
