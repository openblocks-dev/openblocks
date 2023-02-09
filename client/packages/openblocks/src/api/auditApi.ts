import Api from "./api";
import { AxiosPromise } from "axios";
import { ApiResponse } from "./apiResponses";

export interface EventType {
  event: string;
  desc: string;
}

export interface EventResponse extends ApiResponse {
  data: EventType[];
}

export interface QueryConfig {
  esMethod: string;
  httpMethod: string;
  prefix: string;
  path: string;
  suffix: string;
  dsl: string;
}

export interface LogDetail {
  datasourceType?: string;
  queryConfig?: QueryConfig;
  datasourceId?: string;
  queryName?: string;
  applicationId?: string;
  datasourceName?: string;
  viewMode?: boolean;
  applicationName?: string;
  queryId?: string;
  groupName?: string;
  memberName?: string;
  folderId?: string;
  folderName?: string;
  name?: string;
}

export interface UserType {
  name: string;
  id: string;
}

export interface LogItem {
  eventType: string;
  target: null;
  detail: LogDetail;
  orgId: string;
  id: string;
  user: UserType;
  createTime: string;
}

export interface LogResponse extends ApiResponse {
  data: LogItem[];
  total: number;
}

export type SearchLogPagination = {
  pageNum: number;
  pageSize: number;
};

export type SearchLogFilters = {
  startTime: string | null;
  endTime: string | null;
  userId: string | null;
  eventType: string | null;
  appId: string | null;
  queryName: string | null;
};

export type SearchLogListPayload = SearchLogPagination & SearchLogFilters;

class AuditApi extends Api {
  static eventURL = "/audit-logs/event-types";
  static searchLogURL = "/audit-logs/search";

  static getEventType(): AxiosPromise<EventResponse> {
    return Api.get(AuditApi.eventURL);
  }

  static searchLogList(request: SearchLogListPayload): AxiosPromise<LogResponse> {
    return Api.post(AuditApi.searchLogURL, request);
  }
}

export default AuditApi;
