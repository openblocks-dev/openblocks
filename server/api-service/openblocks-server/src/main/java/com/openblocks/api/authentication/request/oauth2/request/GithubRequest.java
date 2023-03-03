package com.openblocks.api.authentication.request.oauth2.request;

import static java.net.URLDecoder.decode;
import static java.nio.charset.StandardCharsets.UTF_8;

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.utils.URIBuilder;
import org.json.JSONObject;

import com.openblocks.api.authentication.request.oauth2.OAuth2RequestContext;
import com.openblocks.api.authentication.request.oauth2.Oauth2DefaultSource;
import com.openblocks.sdk.util.HttpUtils;
import com.openblocks.api.authentication.request.AuthException;
import com.openblocks.domain.user.model.AuthToken;
import com.openblocks.domain.user.model.AuthUser;
import com.openblocks.sdk.auth.Oauth2SimpleAuthConfig;

public class GithubRequest extends AbstractOauth2Request<Oauth2SimpleAuthConfig> {

    public GithubRequest(Oauth2SimpleAuthConfig config, OAuth2RequestContext context) {
        super(config, Oauth2DefaultSource.GITHUB, context);
    }

    @Override
    protected AuthToken getAuthToken(OAuth2RequestContext context) {
        String result;

        try {
            result = new URIBuilder(source.accessToken())
                    .addParameter("code", context.getCode())
                    .addParameter("client_id", config.getClientId())
                    .addParameter("client_secret", config.getClientSecret())
                    .addParameter("grant_type", "authorization_code")
                    .addParameter("redirect_uri", GithubRequest.this.context.getRedirectUrl())
                    .toString();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
        String response = HttpUtils.post(result, null, null, null);
        Map<String, String> res = parseStringToMap(response);

        this.checkResponse(new JSONObject(res));

        return AuthToken.builder()
                .accessToken(res.get("access_token"))
                .build();
    }

    private Map<String, String> parseStringToMap(String s) {
        if (StringUtils.isBlank(s)) {
            return new HashMap<>();
        }

        Map<String, String> result = new HashMap<>();
        for (String item : s.split("&")) {
            if (StringUtils.isNotBlank(item)) {
                String[] kv = item.split("=");
                result.put(decode(kv[0], UTF_8), kv.length == 2 ? decode(kv[1], UTF_8) : null);
            }
        }
        return result;
    }

    @Override
    protected AuthUser getAuthUser(AuthToken authToken) {
        String response = HttpUtils.get(source.userInfo(), null, Map.of("Authorization", "token " + authToken.getAccessToken()));

        JSONObject object = new JSONObject(response);

        this.checkResponse(object);

        return AuthUser.builder()
                .uid(object.get("id").toString())
                .username(object.getString("login"))
                .avatar(object.getString("avatar_url"))
                .rawUserInfo(object.toMap())
                .build();
    }

    private void checkResponse(JSONObject object) {
        if (object.has("error")) {
            throw new AuthException(object);
        }
    }
}
