package com.openblocks.sdk.auth.constants;

public class Oauth2Constants {

    // placeholders
    public static final String CLIENT_ID_PLACEHOLDER = "$CLIENT_ID";
    public static final String REDIRECT_URL_PLACEHOLDER = "$REDIRECT_URL";
    public static final String STATE_PLACEHOLDER = "$STATE";

    // authorize url
    public static final String GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
            + "?response_type=code"
            + "&client_id=" + CLIENT_ID_PLACEHOLDER
            + "&redirect_uri=" + REDIRECT_URL_PLACEHOLDER
            + "&state=" + STATE_PLACEHOLDER
            + "&scope=";

    public static final String GOOGLE_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth"
            + "?response_type=code"
            + "&client_id=" + CLIENT_ID_PLACEHOLDER
            + "&redirect_uri=" + REDIRECT_URL_PLACEHOLDER
            + "&state=" + STATE_PLACEHOLDER
            + "&access_type=offline"
            + "&scope=openid email profile"
            + "&prompt=select_account";
}
