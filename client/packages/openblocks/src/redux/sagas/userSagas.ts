import { ApiResponse } from "api/apiResponses";
import UserApi, { GetUserResponse } from "api/userApi";
import { AxiosResponse } from "axios";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import { AUTH_LOGIN_URL } from "constants/routesURL";
import log from "loglevel";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import {
  LogoutActionType,
  logoutSuccess,
  MarkUserStatusPayload,
  UpdateUserPayload,
  updateUserSuccess,
} from "redux/reduxActions/userActions";
import history from "util/history";
import { validateResponse } from "api/apiUtils";
import { Org } from "constants/orgConstants";
import { SERVER_ERROR_CODES } from "constants/apiConstants";
import { DefaultCurrentUserDetails } from "constants/userConstants";

function validResponseData(response: AxiosResponse<ApiResponse>) {
  return response && response.data && response.data.data;
}

export function* getCurrentUserSaga() {
  try {
    const response: AxiosResponse<GetUserResponse> = yield call(UserApi.getCurrentUser);
    if (
      validResponseData(response) &&
      response.data.code === SERVER_ERROR_CODES.REDIRECT &&
      (response.data.data as any).redirectUri
    ) {
      // request illegal, redirect to other url
      const redirectUri = (response.data.data as any).redirectUri;
      const currentUrl = new URL(window.location.href);
      const redirectUrl = new URL(redirectUri);
      redirectUrl.pathname = currentUrl.pathname;
      redirectUrl.search = currentUrl.search;
      window.location.replace(redirectUrl);
      return;
    }
    if (validateResponse(response)) {
      if (response.data.data.isAnonymous) {
        // unlogin user, use default value
        yield put({
          type: ReduxActionTypes.FETCH_USER_DETAILS_SUCCESS,
          payload: DefaultCurrentUserDetails,
        });
        return;
      }
      const { orgAndRoles, ...restField } = response.data.data;
      const orgs = orgAndRoles
        ? orgAndRoles.map((org): Org => {
            return org.org;
          })
        : [];
      const orgRoleMap = orgAndRoles
        ? new Map(orgAndRoles.map((orgAndRole) => [orgAndRole.org.id, orgAndRole.role]))
        : new Map();

      const currentUser = {
        ...restField,
        orgs: orgs,
        orgRoleMap: orgRoleMap,
      };
      yield put({
        type: ReduxActionTypes.FETCH_USER_DETAILS_SUCCESS,
        payload: currentUser,
      });
    }
  } catch (error: any) {
    yield put({
      type: ReduxActionErrorTypes.FETCH_USER_DETAILS_ERROR,
    });
  }
}

export function* updateUserSaga(action: ReduxAction<UpdateUserPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(UserApi.updateUser, action.payload);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put(updateUserSuccess(action.payload));
    }
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.UPDATE_USER_PROFILE_ERROR,
    });
    log.error("update user error:", error);
  }
}

export function* logoutSaga(action: LogoutActionType) {
  try {
    const redirectURL = action.payload.redirectURL;
    let isValidResponse = true;
    if (!action.payload.noLogoutReq) {
      const response: AxiosResponse<ApiResponse> = yield call(UserApi.userLogout);
      isValidResponse = validateResponse(response);
    }
    if (isValidResponse) {
      yield put(logoutSuccess());
      localStorage.clear();
      history.push(redirectURL || AUTH_LOGIN_URL);
    }
  } catch (error) {
    log.error(error);
  }
}

function* markUserStatusSaga(action: ReduxAction<MarkUserStatusPayload>) {
  try {
    // debounce 500ms
    yield delay(500);
    const response: AxiosResponse<ApiResponse> = yield call(UserApi.markUserStatus, action.payload);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
    }
  } catch (error) {
    log.error(error);
  }
}

export default function* userSagas() {
  yield all([
    takeLatest(ReduxActionTypes.LOGOUT_USER_INIT, logoutSaga),
    takeLatest(ReduxActionTypes.FETCH_USER_INIT, getCurrentUserSaga),
    takeLatest(ReduxActionTypes.UPDATE_USER_PROFILE, updateUserSaga),
    takeLatest(ReduxActionTypes.MARK_USER_STATUS, markUserStatusSaga),
  ]);
}
