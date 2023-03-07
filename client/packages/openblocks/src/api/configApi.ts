import Api from "./api";
import { AxiosPromise } from "axios";
import { ApiResponse } from "./apiResponses";
import { ConfigResponseData } from "constants/configConstants";

export interface ConfigResponse extends ApiResponse {
  data: ConfigResponseData;
}

class ConfigApi extends Api {
  static configURL = "/v1/configs";

  static fetchConfig(): AxiosPromise<ConfigResponse> {
    return Api.get(ConfigApi.configURL);
  }
}

export default ConfigApi;
