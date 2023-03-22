import { trans } from "i18n";

export const DEFAULT_VERIFY_CODE_INTERVAL_SECONDS = 10;
export const REQUEST_TIMEOUT_MS = 20000;
export const DEFAULT_EXECUTE_ACTION_TIMEOUT_MS = 15000;
export const DEFAULT_TEST_DATA_SOURCE_TIMEOUT_MS = 30000;

export const SHARE_TITLE = trans("share.title");

export enum API_STATUS_CODES {
  SUCCESS = 200,
  REQUEST_NOT_AUTHORISED = 401,
  SERVER_FORBIDDEN = 403,
  RESOURCE_NOT_FOUND = 404,
  SERVER_ERROR = 502,
  SERVER_UNAVAILABLE = 503,
}

export enum SERVER_ERROR_CODES {
  EXCEED_MAX_USER_ORG_COUNT = 5103, // user's org count exceeds the limitation
  ALREADY_IN_ORGANIZATION = 5202, //
  INVITE_USER_NOT_LOGIN = 5205, // the invited user has not logged in
  NO_PERMISSION_TO_REQUEST_APP = 5308, //
  REDIRECT = 5011, //
  NEED_BIND = 5610, // need to bind a third-party account
  // current license doesn't support this feature, please contact the official team to upgrade your account
  CURRENT_EDITION_NOT_SUPPORT_THIS_FEATURE = 6252,
}

export enum ERROR_CODES {
  PAGE_NOT_FOUND = "PAGE_NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
  REQUEST_NOT_AUTHORISED = "REQUEST_NOT_AUTHORIZED",
  REQUEST_TIMEOUT = "REQUEST_TIMEOUT",
  FAILED_TO_CORRECT_BINDING = "FAILED_TO_CORRECT_BINDING",
}

export type ContentType = "application/json" | "application/x-www-form-urlencoded";

export interface APIHeaders {
  "Content-Type": ContentType;
  Accept?: string;
}

export type PaginationParam = {
  page: number;
  size: number;
};

export const API_REQUEST_HEADERS: APIHeaders = {
  "Content-Type": "application/json",
};
export const SERVER_HOST = `${REACT_APP_API_HOST ?? ""}`;
export const ASSETS_URI = (id: string) => `${SERVER_HOST}/api/v1/assets/${id}`;
export const USER_HEAD_UPLOAD_URL = `${SERVER_HOST}/api/v1/users/photo`;
export const ORG_ICON_UPLOAD_URL = (orgId: string) =>
  `${SERVER_HOST}/api/v1/organizations/${orgId}/logo`;

export type ApiRequestStatus = "init" | "requesting" | "success" | "error";
