import Api from "./api";
import { AxiosPromise } from "axios";
import { GenericApiResponse } from "./apiResponses";

interface UploadResponse {
  id: string;
  filename: string;
}

export enum MaterialUploadTypeEnum {
  LOGO = "LOGO",
  FAVICON = "FAVICON",
}

class MaterialApi extends Api {
  static configURL = "/materials";

  static upload(
    filename: string,
    type: MaterialUploadTypeEnum,
    content: string
  ): AxiosPromise<GenericApiResponse<UploadResponse>> {
    return Api.post(MaterialApi.configURL, {
      content: content,
      filename: filename,
      type: type,
    });
  }
}

export default MaterialApi;
