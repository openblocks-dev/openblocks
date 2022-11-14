import Api from "./api";
import { AxiosPromise } from "axios";
import { GenericApiResponse } from "./apiResponses";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";

export interface LibraryQuery {
  id: string;
  organizationId?: string;
  name: string;
  libraryQueryDSL: Record<string, any>;
  creatorName?: string;
  createTime?: number;
}

export interface LibraryQueryMeta {
  id: string;
  datasourceType: DatasourceType;
  organizationId: string;
  name: string;
  creatorName: string;
  createTime: number;
}

export interface LibraryQueryRecordMeta {
  id: string;
  libraryQueryId: string;
  tag: string;
  commitMessage: string;
  createTime: number;
  creatorName: string;
  datasourceType: DatasourceType;
}

export interface LibraryQueryDropdownInfo {
  libraryQueryMetaView: LibraryQueryMeta;
  recordMetaViewList?: LibraryQueryRecordMeta[];
}

export interface LibraryQueryPublishRequest {
  commitMessage?: string;
  tag: string;
}

export class QueryLibraryApi extends Api {
  static url = "/library-queries";
  static recordUrl = "/library-query-records";

  static fetchQueryLibraryByOrg(): AxiosPromise<GenericApiResponse<Array<LibraryQuery>>> {
    return Api.get(QueryLibraryApi.url + `/listByOrg`);
  }

  static fetchQueryLibraryDropdown(): AxiosPromise<
    GenericApiResponse<Array<LibraryQueryDropdownInfo>>
  > {
    return Api.get(QueryLibraryApi.url + `/dropDownList`);
  }

  static fetchQueryLibraryRecordDSL(
    libraryQueryId: string,
    libraryQueryRecordId: string
  ): AxiosPromise<GenericApiResponse<any>> {
    return Api.get(
      QueryLibraryApi.recordUrl +
        `?libraryQueryId=${libraryQueryId}&libraryQueryRecordId=${libraryQueryRecordId}`
    );
  }

  static fetchQueryLibraryRecords(
    libraryQueryId: string
  ): AxiosPromise<GenericApiResponse<LibraryQueryRecordMeta[]>> {
    return Api.get(
      QueryLibraryApi.recordUrl + `/listByLibraryQueryId?libraryQueryId=${libraryQueryId}`
    );
  }

  static publishQueryLibrary(
    libraryQueryId: string,
    request: LibraryQueryPublishRequest
  ): AxiosPromise<GenericApiResponse<LibraryQueryRecordMeta>> {
    return Api.post(QueryLibraryApi.url + `/${libraryQueryId}/publish`, request);
  }

  static createQueryLibrary(
    libraryQuery: LibraryQuery
  ): AxiosPromise<GenericApiResponse<LibraryQuery>> {
    return Api.post(QueryLibraryApi.url, libraryQuery);
  }

  static updateQueryLibrary(
    id: string,
    libraryQuery: LibraryQuery
  ): AxiosPromise<GenericApiResponse<Boolean>> {
    return Api.put(QueryLibraryApi.url + `/${id}`, libraryQuery);
  }

  static deleteQueryLibrary(id: string): AxiosPromise<GenericApiResponse<Boolean>> {
    return Api.delete(QueryLibraryApi.url + `/${id}`);
  }
}
