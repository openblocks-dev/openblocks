import { isSafeRedirectURL } from "util/urlUtils";
import { BASE_URL, USER_INFO_COMPLETION } from "constants/routesURL";
import { AxiosResponse } from "axios";
import { ApiResponse } from "api/apiResponses";
import { doValidResponse } from "api/apiUtils";
import { SERVER_ERROR_CODES } from "constants/apiConstants";
import { message } from "antd";
import { trans } from "i18n";

export const getSafeAuthRedirectURL = (redirectUrl: string | null) => {
  if (redirectUrl && isSafeRedirectURL(redirectUrl)) {
    return redirectUrl;
  } else {
    return BASE_URL;
  }
};

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
  let replaceUrl = getSafeAuthRedirectURL(redirectUrl);
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
  if (!value || value.length < 8 || value.length > 20) {
    valid = false;
    messages.push(trans("userAuth.passwordCheckLength", { min: 8, max: 20 }));
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

export const getLoginTitle = (inviteUserName?: string) => {
  const productName = trans("productName");
  return inviteUserName
    ? trans("userAuth.inviteWelcomeTitle", { username: inviteUserName, productName })
    : trans("userAuth.welcomeTitle", { productName });
};
