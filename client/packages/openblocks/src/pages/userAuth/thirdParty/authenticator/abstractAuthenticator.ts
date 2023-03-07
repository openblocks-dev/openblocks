import { AuthSessionStoreParams } from "constants/authConstants";
import { authRespValidate, getRedirectUrl, getSafeAuthRedirectURL } from "pages/userAuth/authUtils";
import { AxiosPromise } from "axios";
import { ApiResponse } from "api/apiResponses";
import history from "util/history";
import { AUTH_BIND_URL, AUTH_LOGIN_URL } from "constants/routesURL";
import { message } from "antd";
import { WindowMessageTypes } from "constants/messages";
import { validateResponse } from "api/apiUtils";

export type AuthRedirectUrlParams = {
  code: string | null;
  state: string | null;
  ticket: string | null;
};

export abstract class AbstractAuthenticator {
  protected authParams: AuthSessionStoreParams;
  protected urlParam: AuthRedirectUrlParams;
  protected redirectUrl: string;

  constructor(authParams: AuthSessionStoreParams, urlParam: AuthRedirectUrlParams) {
    this.authParams = authParams;
    this.urlParam = urlParam;
    this.redirectUrl = decodeURIComponent(getRedirectUrl(authParams.authType));
  }

  doAuth() {
    const { authParams } = this;
    authParams.authGoal === "login" ? this.doLogin() : this.doBind();
  }

  protected doLogin() {
    this.login()
      .then((resp) => {
        authRespValidate(
          resp,
          this.needInfoCheck(this.authParams.sourceType),
          this.authParams.afterLoginRedirect
        );
      })
      .catch((e) => {
        history.push(AUTH_LOGIN_URL, {
          thirdPartyAuthError: true,
        });
        message.error(e.message);
      });
  }

  protected doBind() {
    const { authParams } = this;
    // login type of the redirection within the site
    // send message to parent window via iframe
    const receiveWidowMsgObj = authParams.routeLink ? window.parent : window.opener;
    const onSuccess = () => {
      if (authParams.authGoal === "innerBind") {
        receiveWidowMsgObj.postMessage({
          type: WindowMessageTypes.THIRD_PARTY_BIND,
          success: true,
          sourceName: authParams.name,
        });
        window.close();
      } else {
        window.location.href = getSafeAuthRedirectURL(authParams.afterLoginRedirect);
      }
    };

    const onFail = (errorMsg: string) => {
      if (authParams.authGoal === "innerBind") {
        receiveWidowMsgObj.postMessage({
          type: WindowMessageTypes.THIRD_PARTY_BIND,
          success: false,
          sourceName: authParams.name,
          message: errorMsg,
        });
        window.close();
      } else {
        message.error(errorMsg);
        history.push(AUTH_BIND_URL);
      }
    };

    this.bind()
      .then((resp) => {
        if (validateResponse(resp)) {
          onSuccess();
        }
      })
      .catch((e) => {
        onFail(e.message);
      });
  }

  protected needInfoCheck(sourceType: string) {
    return false;
  }

  protected abstract login(): AxiosPromise<ApiResponse>;

  protected abstract bind(): AxiosPromise<ApiResponse>;
}
