import { useLocation } from "react-router-dom";
import { AuthSessionStoreParams } from "constants/authConstants";
import { message } from "antd";
import { AUTH_LOGIN_URL, BASE_URL } from "constants/routesURL";
import history from "util/history";
import PageSkeleton from "components/PageSkeleton";
import { trans } from "i18n";
import { useEffect, useState } from "react";
import { getAuthenticator } from "@openblocks-ee/pages/userAuth/thirdParty/authenticator";
import { AuthRedirectUrlParams } from "pages/userAuth/thirdParty/authenticator";
import { loadAuthParams } from "pages/userAuth/authUtils";

function getUrlParams(queryParams: URLSearchParams): AuthRedirectUrlParams {
  const ticket = queryParams.get("ticket");
  const state = queryParams.get("state");
  const code = queryParams.get("code") || queryParams.get("authCode");
  return {
    code: code,
    state: state,
    ticket: ticket,
  };
}

function validateParam(authParams: AuthSessionStoreParams, urlParam: AuthRedirectUrlParams) {
  let valid = false;
  if (authParams.authType === "CAS") {
    valid = !!urlParam.ticket;
  } else if (authParams.authType === "JWT") {
    valid = true;
  } else {
    valid = !!urlParam.code && !!urlParam.state && urlParam.state === authParams.state;
  }
  if (valid) {
    return true;
  } else {
    message.error(trans("userAuth.invalidThirdPartyParam"));
    history.push(authParams.authGoal === "login" ? AUTH_LOGIN_URL : BASE_URL, {
      thirdPartyAuthError: true,
    });
    return false;
  }
}

export function AuthRedirect() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlParam = getUrlParams(queryParams);
  const [authParams, setAuthParam] = useState<AuthSessionStoreParams>();
  useEffect(() => {
    const localAuthParams = loadAuthParams();
    if (!localAuthParams) {
      history.push(AUTH_LOGIN_URL);
    } else {
      setAuthParam(localAuthParams);
    }
  }, []);
  if (authParams && validateParam(authParams, urlParam)) {
    getAuthenticator(authParams, urlParam).doAuth();
  }
  return <PageSkeleton hideSideBar />;
}
