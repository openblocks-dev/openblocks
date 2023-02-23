import { ApiResponse } from "api/apiResponses";
import { API_STATUS_CODES, ERROR_CODES, SERVER_ERROR_CODES } from "constants/apiConstants";
import {
  createMessage,
  ERROR_0,
  ERROR_401,
  ERROR_500,
  SERVER_API_TIMEOUT_ERROR,
} from "constants/messages";
import { AUTH_BIND_URL, OAUTH_REDIRECT } from "constants/routesURL";
import log from "loglevel";
import history from "util/history";
import { message } from "antd";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { trans } from "i18n";
import StoreRegistry from "redux/store/storeRegistry";
import { logoutAction } from "redux/reduxActions/userActions";

const executeActionRegex = /query\/execute/;
const timeoutErrorRegex = /timeout of (\d+)ms exceeded/;
export const axiosConnectionAbortedCode = "ECONNABORTED";

type AxiosRequestConfigWithTimer = AxiosRequestConfig & { timer: number };

export type AxiosResponseWithTimer = AxiosResponse<ApiResponse> & {
  config: AxiosRequestConfigWithTimer;
};

function isAxiosResponseWithTimer(
  response: AxiosResponse<ApiResponse>
): response is AxiosResponseWithTimer {
  return response?.config && "timer" in response.config;
}

export type AxiosErrorWithTimer = AxiosError<ApiResponse> & {
  config: AxiosRequestConfigWithTimer;
};

function isAxiosErrorWithTimer(error: any): error is AxiosErrorWithTimer {
  return axios.isAxiosError(error) && error?.config && "timer" in error.config;
}

const makeExecuteActionResponse = (response: any) => {
  if (isAxiosResponseWithTimer(response)) {
    return {
      ...response,
      data: {
        ...(response?.data ?? {}),
        runTime: Number((performance.now() - response?.config.timer).toFixed()),
      },
    };
  }
  return response;
};

const notAuthRequiredPath = (requestUrl: string | undefined) => {
  const pathName = window.location.pathname;
  return (
    /^\/404/.test(pathName) ||
    /^\/user\/auth\/\w+/.test(pathName) ||
    /^\/invite\/\w+/.test(pathName) ||
    (requestUrl && /^\/auth\/logout\w*/.test(requestUrl))
  );
};

const notNeedBindPath = () => {
  const pathName = window.location.pathname;
  return pathName === AUTH_BIND_URL || pathName === OAUTH_REDIRECT;
};

export const apiRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfigWithTimer => ({
  ...config,
  timer: performance.now(),
});

export const apiSuccessResponseInterceptor = (response: AxiosResponse): AxiosResponse => {
  if (response?.config?.url?.match(executeActionRegex)) {
    return makeExecuteActionResponse(response);
  }
  return response;
};

export const apiFailureResponseInterceptor = (error: any) => {
  if (!window.navigator.onLine) {
    return Promise.reject({
      ...error,
      message: createMessage(ERROR_0),
    });
  }

  if (!error) {
    return Promise.reject(error);
  }

  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }

  if (
    error.code === axiosConnectionAbortedCode &&
    error.message &&
    error.message.match(timeoutErrorRegex)
  ) {
    return Promise.reject({
      ...error,
      message: createMessage(SERVER_API_TIMEOUT_ERROR),
      code: ERROR_CODES.REQUEST_TIMEOUT,
    });
  }

  if (isAxiosErrorWithTimer(error)) {
    if (error.response) {
      if (error.response.status === API_STATUS_CODES.SERVER_ERROR) {
        return Promise.reject({
          ...error,
          code: ERROR_CODES.SERVER_ERROR,
          message: createMessage(ERROR_500),
        });
      }

      // Need authorization
      if (!notAuthRequiredPath(error.config?.url)) {
        if (error.response.status === API_STATUS_CODES.REQUEST_NOT_AUTHORISED) {
          // Redirect to login and set a redirect url.
          StoreRegistry.getStore().dispatch(
            logoutAction({
              notAuthorised: true,
            })
          );
          return Promise.reject({
            code: ERROR_CODES.REQUEST_NOT_AUTHORISED,
            message: trans("apiMessage.authenticationFail"),
            show: false,
          });
        }
      }
      if (error.response?.data?.code === SERVER_ERROR_CODES.NEED_BIND && !notNeedBindPath()) {
        history.push(AUTH_BIND_URL);
        return Promise.reject({
          code: ERROR_CODES.SERVER_ERROR,
          message: trans("apiMessage.verifyAccount"),
          show: false,
        });
      }
      if (
        error.response?.data?.code === SERVER_ERROR_CODES.CURRENT_EDITION_NOT_SUPPORT_THIS_FEATURE
      ) {
        const errMsg = error.response.data?.message ?? trans("apiMessage.functionNotSupported");
        message.destroy();
        message.error(errMsg);
        return Promise.reject({ message: errMsg });
      }

      if (error.config && error.config?.url?.match(executeActionRegex)) {
        return makeExecuteActionResponse(error.response);
      }

      return Promise.resolve(error.response);
    } else if (error.request) {
      log.error(error.request);
    } else {
      log.error("Error", error.message);
    }
  }
  log.debug(error.config);
  return Promise.resolve(error);
};

/**
 * transforn server errors to client error codes
 */
const getErrorMessage = (code: number) => {
  switch (code) {
    case 401:
      return createMessage(ERROR_401);
    case 500:
      return createMessage(ERROR_500);
    case 0:
      return createMessage(ERROR_0);
  }
};

/**
 * validates if response does have any errors
 * throw an error if no valid response is recieved
 */
export function validateResponse(response: AxiosResponse<ApiResponse>): true | never {
  if (doValidResponse(response)) {
    return true;
  } else {
    throw Error(response.data.message);
  }
}

export function doValidResponse(response: AxiosResponse<ApiResponse>) {
  if (!response) {
    throw Error(getErrorMessage(0));
  }
  if (!response.data && !response.status) {
    throw Error(getErrorMessage(0));
  }
  if (!response.data && response.status) {
    throw Error(getErrorMessage(response.status));
  }
  return response.data.success;
}
