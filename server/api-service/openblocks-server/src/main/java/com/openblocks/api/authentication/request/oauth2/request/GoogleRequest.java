package com.openblocks.api.authentication.request.oauth2.request;

import java.net.URISyntaxException;
import java.util.Map;

import org.apache.http.client.utils.URIBuilder;
import org.json.JSONObject;

import com.openblocks.api.authentication.request.oauth2.OAuth2RequestContext;
import com.openblocks.api.authentication.request.oauth2.Oauth2DefaultSource;
import com.openblocks.sdk.util.HttpUtils;
import com.openblocks.api.authentication.request.AuthException;
import com.openblocks.domain.user.model.AuthToken;
import com.openblocks.domain.user.model.AuthenticationUser;
import com.openblocks.sdk.auth.Oauth2SimpleAuthConfig;

public class GoogleRequest extends AbstractOauth2Request<Oauth2SimpleAuthConfig> {

    public GoogleRequest(Oauth2SimpleAuthConfig config, OAuth2RequestContext context) {
        super(config, Oauth2DefaultSource.GOOGLE, context);
    }

    @Override
    protected AuthToken getAccessToken(OAuth2RequestContext context) {
        String result;

        try {
            result = new URIBuilder(source.accessToken())
                    .addParameter("code", context.getCode())
                    .addParameter("client_id", config.getClientId())
                    .addParameter("client_secret", config.getClientSecret())
                    .addParameter("grant_type", "authorization_code")
                    .addParameter("redirect_uri", GoogleRequest.this.context.getRedirectUrl())
                    .toString();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
        String response = HttpUtils.post(result, null, null, null);
        JSONObject accessTokenObject = new JSONObject(response);
        this.checkResponse(accessTokenObject);
        return AuthToken.builder()
                .accessToken(accessTokenObject.getString("access_token"))
                .expireIn(accessTokenObject.getInt("expires_in"))
                .build();
    }

    @Override
    protected AuthenticationUser getUserInfo(AuthToken authToken) {
        String userInfo = HttpUtils.post(userInfoUrl(authToken), null, Map.of("Authorization", "Bearer " + authToken.getAccessToken()), null);

        JSONObject object = new JSONObject(userInfo);
        this.checkResponse(object);

        return AuthenticationUser.builder()
                .uid(object.getString("sub"))
                .username(object.getString("name"))
                .avatar(object.getString("picture"))
                .rawUserInfo(object.toMap())
                .build();
    }

    private String userInfoUrl(AuthToken authToken) {
        try {
            return new URIBuilder(source.userInfo())
                    .addParameter("access_token", authToken.getAccessToken())
                    .toString();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    private void checkResponse(JSONObject object) {
        if (object.has("error") || object.has("error_description")) {
            throw new AuthException(object);
        }
    }
}
