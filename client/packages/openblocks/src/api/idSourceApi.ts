import Api from "api/api";
import { AxiosPromise } from "axios";
import { ApiResponse } from "api/apiResponses";
import { AuthType } from "@openblocks-ee/pages/setting/idSource/idSourceConstants";

export interface ConfigItem {
  id: string;
  authType: AuthType;
  enableRegister: boolean;
  enable?: boolean;
  clientId?: string;
  clientSecret?: string;
  publicKey?: string;
  agentId?: string;
  domainPrefix?: string;
  authServerId?: string;
  loginUri?: string;
  prefixUri?: string;
  source?: string;
  sourceName?: string;
  validator?: string;
  url?: string;
  distinguishedNameTemplate?: string;
  ifLocal?: boolean;
  searchBase?: string;
  filter?: string;
  bindDn?: string;
  password?: string;
  idAttribute?: string;
  subType?: string;
}

class IdSourceApi extends Api {
  static getConfigsURL = "/auth/configs";
  static saveConfigURL = "/auth/config";
  static deleteConfigURL = (id: string) => `/auth/config/${id}`;
  static syncManualURL = "/sync/manual";

  static getConfigs(): AxiosPromise<ApiResponse> {
    return Api.get(IdSourceApi.getConfigsURL);
  }

  static saveConfig(request: ConfigItem): AxiosPromise<ApiResponse> {
    return Api.post(IdSourceApi.saveConfigURL, request);
  }

  static deleteConfig(id: string): AxiosPromise<ApiResponse> {
    return Api.delete(IdSourceApi.deleteConfigURL(id));
  }

  static syncManual(authType: string): AxiosPromise<ApiResponse> {
    return Api.post(IdSourceApi.syncManualURL, undefined, { authSource: authType });
  }
}

export default IdSourceApi;
