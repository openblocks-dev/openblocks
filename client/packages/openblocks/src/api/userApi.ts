import Api from "api/api";
import { AxiosPromise } from "axios";
import { OrgAndRole } from "constants/orgConstants";
import { BaseUserInfo, CurrentUser } from "constants/userConstants";
import { MarkUserStatusPayload, UpdateUserPayload } from "redux/reduxActions/userActions";
import { ApiResponse, GenericApiResponse } from "./apiResponses";

interface CommonLoginParam {
  invitationId?: string;
}

interface FormLoginRequest extends CommonLoginParam {
  loginId: string;
  password: string;
  register: boolean;
  source: string;
}

export interface GetUserResponse extends ApiResponse {
  data: {
    orgAndRoles: OrgAndRole[];
  } & BaseUserInfo;
}

export type GetCurrentUserResponse = GenericApiResponse<CurrentUser>;

class UserApi extends Api {
  static usersURL = "/v1/users";
  static sendVerifyCodeURL = "/auth/otp/send";
  static logoutURL = "/auth/logout";
  static userURL = "/v1/users/me";
  static currentUserURL = "/users/currentUser";
  static rawCurrentUserURL = "/users/rawCurrentUser";
  static emailBindURL = "/auth/email/bind";
  static passwordURL = "/v1/users/password";
  static formLoginURL = "/auth/form/login";
  static markUserStatusURL = "/users/mark-status";
  static userDetailURL = (id: string) => `/users/userDetail/${id}`;

  static formLogin(request: FormLoginRequest): AxiosPromise<ApiResponse> {
    const { invitationId, ...reqBody } = request;
    const queryParam = invitationId ? { invitationId: invitationId } : undefined;
    return Api.post(UserApi.formLoginURL, reqBody, queryParam);
  }

  static bindEmail(request: { email: string }): AxiosPromise<ApiResponse> {
    return Api.post(UserApi.emailBindURL, undefined, request);
  }

  static setPassword(request: { password: string }): AxiosPromise<ApiResponse> {
    return Api.post(UserApi.passwordURL, undefined, request);
  }

  static updatePassword(request: {
    oldPassword: string;
    newPassword: string;
  }): AxiosPromise<ApiResponse> {
    return Api.put(UserApi.passwordURL, request);
  }

  static getUser(): AxiosPromise<GetUserResponse> {
    return Api.get(UserApi.userURL);
  }

  static getCurrentUser(): AxiosPromise<GetCurrentUserResponse> {
    return Api.get(UserApi.currentUserURL);
  }

  static getRawCurrentUser(): AxiosPromise<GetCurrentUserResponse> {
    return Api.get(UserApi.rawCurrentUserURL);
  }

  static userLogout(): AxiosPromise<ApiResponse> {
    return Api.post(UserApi.logoutURL);
  }

  static updateUser(request: UpdateUserPayload): AxiosPromise<ApiResponse> {
    return Api.put(UserApi.usersURL, request);
  }

  static markUserStatus(request: MarkUserStatusPayload): AxiosPromise<ApiResponse> {
    return Api.put(UserApi.markUserStatusURL, request);
  }

  static getUserDetail(userId: string): AxiosPromise<ApiResponse> {
    return Api.get(UserApi.userDetailURL(userId));
  }
}

export default UserApi;
