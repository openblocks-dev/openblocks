import { AuthSessionStoreParams } from "constants/authConstants";
import { AuthRedirectUrlParams } from "./abstractAuthenticator";
import { OAuthAuthenticator } from "./oAuthAuthenticator";

export { OAuthAuthenticator };
export type { AuthRedirectUrlParams };

export function getAuthenticator(
  authParams: AuthSessionStoreParams,
  urlParam: AuthRedirectUrlParams
) {
  return new OAuthAuthenticator(authParams, urlParam);
}
