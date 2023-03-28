import Api from "./api";
import { AxiosPromise } from "axios";
import { GenericApiResponse } from "api/apiResponses";
import { FetchJSLibraryMetasPayload } from "redux/reduxActions/jsLibraryActions";

export interface JSLibraryMeta {
  name: string;
  latestVersion: string;
  homepage?: string;
  description?: string;
}

export interface RecommendedJSLibraryMeta extends JSLibraryMeta {
  downloadUrl: string;
}

export class JSLibraryApi extends Api {
  static url = "/misc/js-library";

  static fetchMetas(
    request: FetchJSLibraryMetasPayload
  ): AxiosPromise<GenericApiResponse<JSLibraryMeta[]>> {
    return Api.get(JSLibraryApi.url + `/metas`, { name: request.names.join(",") });
  }

  static fetchRecommends(): AxiosPromise<GenericApiResponse<RecommendedJSLibraryMeta[]>> {
    return Api.get(JSLibraryApi.url + `/recommendations`);
  }
}
