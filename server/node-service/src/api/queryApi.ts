import { AxiosPromise } from "axios";
import { ApiResponse } from "./apiResponse";
import Api from "./api";

const QUERY_TIMEOUT_BUFFER_MS = 5000;
const DEFAULT_EXECUTE_ACTION_TIMEOUT_MS = 15000;

type QueryExecuteRequest = {
  libraryQueryName: string;
  params?: { key: string; value: any }[];
};

export class QueryApi extends Api {
  static executeQuery(
    request: QueryExecuteRequest,
    cookie?: string,
    timeout?: number
  ): AxiosPromise<ApiResponse> {
    return Api.post("query/execute-from-node", request, undefined, {
      headers: { Cookie: cookie },
      timeout: timeout ? timeout + QUERY_TIMEOUT_BUFFER_MS : DEFAULT_EXECUTE_ACTION_TIMEOUT_MS,
    });
  }
}
