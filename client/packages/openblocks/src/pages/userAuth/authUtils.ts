import { isSafeRedirectURL } from "util/urlUtils";
import {
  BASE_URL,
  CAS_AUTH_REDIRECT,
  OAUTH_REDIRECT,
  USER_INFO_COMPLETION,
} from "constants/routesURL";
import { AxiosPromise, AxiosResponse } from "axios";
import { ApiResponse } from "api/apiResponses";
import { doValidResponse } from "api/apiUtils";
import { SERVER_ERROR_CODES } from "constants/apiConstants";
import { message } from "antd";
import { trans } from "i18n";
import { createContext, useState } from "react";
import { SystemConfig } from "constants/configConstants";
import {
  AuthInviteInfo,
  AuthSessionStoreParams,
  ThirdPartyAuthGoal,
  ThirdPartyAuthType,
  ThirdPartyConfigType,
} from "constants/authConstants";

export const AuthContext = createContext<{
  systemConfig: SystemConfig;
  inviteInfo?: AuthInviteInfo;
  thirdPartyAuthError?: boolean;
}>(undefined as any);

export const getSafeAuthRedirectURL = (redirectUrl: string | null) => {
  if (redirectUrl && isSafeRedirectURL(redirectUrl)) {
    return redirectUrl;
  } else {
    return BASE_URL;
  }
};

export function useAuthSubmit(
  requestFunc: () => AxiosPromise<ApiResponse>,
  infoCompleteCheck: boolean,
  redirectUrl: string | null
) {
  const [loading, setLoading] = useState(false);
  return {
    loading: loading,
    onSubmit: () => {
      setLoading(true);
      requestFunc()
        .then((resp) => authRespValidate(resp, infoCompleteCheck, redirectUrl))
        .catch((e) => {
          message.error(e.message);
        })
        .finally(() => setLoading(false));
    },
  };
}

/**
 * validate auth status
 *
 * @param resp response
 * @param infoCompleteCheck whether redirect to profile editing page when validated
 * @param redirectUrl
 */
export function authRespValidate(
  resp: AxiosResponse<ApiResponse>,
  infoCompleteCheck: boolean,
  redirectUrl: string | null
) {
  let replaceUrl = redirectUrl || BASE_URL;
  if (infoCompleteCheck) {
    // need complete info
    replaceUrl = redirectUrl
      ? `${USER_INFO_COMPLETION}?redirectUrl=${redirectUrl}`
      : USER_INFO_COMPLETION;
  }
  if (doValidResponse(resp)) {
    window.location.replace(replaceUrl);
  } else if (
    resp.data.code === SERVER_ERROR_CODES.EXCEED_MAX_USER_ORG_COUNT ||
    resp.data.code === SERVER_ERROR_CODES.ALREADY_IN_ORGANIZATION
  ) {
    message.error(resp.data.message);
    // redirect after displaying the message for a second
    setTimeout(() => window.location.replace(replaceUrl), 1500);
  } else {
    throw Error(resp.data.message);
  }
}

export const checkPassWithMsg = (value: string) => {
  const hasDigit = /\d/.test(value);
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasSpace = /\s/.test(value);
  const messages: string[] = [];
  let valid = true;
  if (!value || value.length < 8) {
    valid = false;
    messages.push(trans("userAuth.passwordCheckLength", { min: 8 }));
  }
  if (!hasDigit || !hasLetter) {
    valid = false;
    messages.push(trans("userAuth.passwordCheckContainsNumberAndLetter"));
  }
  if (hasSpace) {
    valid = false;
    messages.push(trans("userAuth.passwordCheckSpace"));
  }
  return [valid, messages.join(",")] as const;
};

export const getLoginTitle = (inviteUserName?: string, brandName?: string) => {
  const productName = brandName ?? trans("productName");
  return inviteUserName
    ? trans("userAuth.inviteWelcomeTitle", { username: inviteUserName, productName })
    : trans("userAuth.welcomeTitle", { productName });
};

/**
 * generate oauth state & save params which redirect back need
 */
const AuthParamStorageKey = "_temp_oauth_params_";
export const geneAuthStateAndSaveParam = (
  authGoal: ThirdPartyAuthGoal,
  config: ThirdPartyConfigType,
  afterLoginRedirect: string | null,
  invitationId?: string
) => {
  const state = Math.floor(Math.random() * 0xffffffff).toString(16);
  const params: AuthSessionStoreParams = {
    state: state,
    authGoal: authGoal,
    authType: config.authType,
    afterLoginRedirect: afterLoginRedirect || null,
    sourceType: config.sourceType,
    invitationId: invitationId,
    routeLink: config.routeLink,
    name: config.name,
    authId: config.id,
  };
  sessionStorage.setItem(AuthParamStorageKey, JSON.stringify(params));
  return state;
};
/**
 * load auth params from session storage
 */
export const loadAuthParams = (): AuthSessionStoreParams | null => {
  const localParam = sessionStorage.getItem(AuthParamStorageKey);
  sessionStorage.removeItem(AuthParamStorageKey);
  if (!localParam) {
    return null;
  }
  return JSON.parse(localParam);
};
export const getAuthUrl = (config: ThirdPartyConfigType, redirectUrl: string, state: string) => {
  let url;
  if (config.authType === "CAS") {
    url = config.url + "?service=" + redirectUrl;
  } else {
    url = config.url
      .replace(new RegExp("(\\$STATE)", "g"), state)
      .replace(new RegExp("(\\$REDIRECT_URL)", "g"), redirectUrl);
    if (config.clientId) {
      url = url.replace(new RegExp("(\\$CLIENT_ID)", "g"), config.clientId);
    }
  }
  return url;
};
export const getRedirectUrl = (authType: ThirdPartyAuthType) => {
  return encodeURIComponent(
    `${window.location.origin}${authType === "CAS" ? CAS_AUTH_REDIRECT : OAUTH_REDIRECT}`
  );
};
