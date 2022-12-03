import Api from "./api";
import { AxiosPromise } from "axios";
import { GenericApiResponse } from "./apiResponses";
import { PermissionItem } from "../components/PermissionDialog/PermissionList";
import {
  GrantDatasourcePermissionPayload,
  UpdateDatasourcePermissionPayload,
} from "../redux/reduxActions/datasourcePermissionActions";
import { omit } from "lodash";

export interface DatasourcePermissionInfo {
  orgName: string;
  creatorId: string;
  userPermissions: PermissionItem[];
  groupPermissions: PermissionItem[];
}

export enum DatasourceRole {
  Viewer = "viewer",
  Owner = "owner",
}

export class DatasourcePermissionApi extends Api {
  static url = "datasources";

  static fetchPermissions(
    datasourceId: string
  ): AxiosPromise<GenericApiResponse<DatasourcePermissionInfo>> {
    return Api.get(DatasourcePermissionApi.url + `/${datasourceId}/permissions`);
  }

  static grantPermission(
    payload: GrantDatasourcePermissionPayload
  ): AxiosPromise<GenericApiResponse<boolean>> {
    return Api.put(
      DatasourcePermissionApi.url + `/${payload.datasourceId}/permissions`,
      omit(payload, ["datasourceId"])
    );
  }

  static updatePermission(
    payload: UpdateDatasourcePermissionPayload
  ): AxiosPromise<GenericApiResponse<boolean>> {
    return Api.put(
      DatasourcePermissionApi.url + `/permissions/${payload.permissionId}`,
      omit(payload, ["permissionId"])
    );
  }

  static deletePermission(permissionId: string): AxiosPromise<GenericApiResponse<boolean>> {
    return Api.delete(DatasourcePermissionApi.url + `/permissions/${permissionId}`);
  }
}
