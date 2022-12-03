import {
  ReduxAction,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";
import { DatasourceRole } from "../../api/datasourcePermissionApi";

export interface FetchDatasourcePermissionsPayload {
  datasourceId: string;
}

export const fetchDatasourcePermissions = (
  payload: FetchDatasourcePermissionsPayload
): ReduxAction<FetchDatasourcePermissionsPayload> => {
  return {
    type: ReduxActionTypes.FETCH_DATASOURCE_PERMISSION_INIT,
    payload: payload,
  };
};

export interface GrantDatasourcePermissionPayload {
  datasourceId: string;
  userIds: string[];
  groupIds: string[];
  role: DatasourceRole;
}

export const grantDatasourcePermission = (
  payload: GrantDatasourcePermissionPayload,
  onSuccessCallback: (response: any) => void
  // onErrorCallback: () => void
): ReduxActionWithCallbacks<GrantDatasourcePermissionPayload, any, any> => {
  return {
    type: ReduxActionTypes.GRANT_DATASOURCE_PERMISSION_INIT,
    payload: payload,
    onSuccessCallback: onSuccessCallback,
    // onErrorCallback: onErrorCallback,
  };
};

export interface UpdateDatasourcePermissionPayload {
  datasourceId: string;
  permissionId: string;
  role: DatasourceRole;
}

export const updateDatasourcePermission = (
  payload: UpdateDatasourcePermissionPayload
): ReduxAction<UpdateDatasourcePermissionPayload> => {
  return {
    type: ReduxActionTypes.UPDATE_DATASOURCE_PERMISSION_INIT,
    payload: payload,
  };
};

export interface DeleteDatasourcePermissionPayload {
  datasourceId: string;
  permissionId: string;
}

export const deleteDatasourcePermission = (payload: DeleteDatasourcePermissionPayload) => {
  return {
    type: ReduxActionTypes.DELETE_DATASOURCE_PERMISSION_INIT,
    payload: payload,
  };
};
