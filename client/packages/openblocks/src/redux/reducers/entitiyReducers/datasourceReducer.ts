import { createReducer } from "util/reducerUtils";
import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { DatasourceInfo, DatasourceStructure } from "api/datasourceApi";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";
import { DatasourcePermissionInfo } from "../../../api/datasourcePermissionApi";
import {
  DeleteDatasourcePermissionPayload,
  FetchDatasourcePermissionsPayload,
  UpdateDatasourcePermissionPayload,
} from "../../reduxActions/datasourcePermissionActions";

export interface DatasourceDataState {
  data: DatasourceInfo[];
  structure: Record<string, DatasourceStructure[]>;
  permissionInfo: Record<string, DatasourcePermissionInfo>;
}

const initialState: DatasourceDataState = {
  data: [],
  structure: {},
  permissionInfo: {},
};

const datasourceReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_DATASOURCE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<DatasourceInfo[]>
  ): DatasourceDataState => {
    return {
      ...state,
      data: action.payload,
    };
  },

  [ReduxActionTypes.FETCH_DATASOURCE_STRUCTURE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<Record<string, DatasourceStructure[]>>
  ): DatasourceDataState => {
    return {
      ...state,
      structure: { ...state.structure, ...action.payload },
    };
  },

  [ReduxActionTypes.CREATE_DATASOURCE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<Datasource>
  ) => {
    return {
      ...state,
      loading: false,
      data: state.data.concat({ datasource: action.payload, edit: true }),
    };
  },

  [ReduxActionTypes.UPDATE_DATASOURCE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<Datasource>
  ): DatasourceDataState => {
    return {
      ...state,
      data: state.data.map((info) => {
        if (info.datasource.id === action.payload.id)
          return { datasource: action.payload, edit: true };
        return info;
      }),
    };
  },

  [ReduxActionTypes.DELETE_DATASOURCE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<any>
  ): DatasourceDataState => {
    return {
      ...state,
      data: state.data.filter((info) => info.datasource.id !== action.payload?.datasourceId),
    };
  },

  /* permission */
  [ReduxActionTypes.FETCH_DATASOURCE_PERMISSION_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<FetchDatasourcePermissionsPayload & { data: DatasourcePermissionInfo }>
  ) => {
    const permissions = state.permissionInfo;
    permissions[action.payload.datasourceId] = action.payload.data;
    return {
      ...state,
      permissionInfo: { ...permissions },
    };
  },

  [ReduxActionTypes.UPDATE_DATASOURCE_PERMISSION_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<UpdateDatasourcePermissionPayload>
  ): DatasourceDataState => {
    const info = state.permissionInfo[action.payload.datasourceId] ?? {};
    info.userPermissions = info.userPermissions.map((p) => {
      if (p.permissionId === action.payload.permissionId) {
        return { ...p, role: action.payload.role };
      }
      return p;
    });
    info.groupPermissions = info.groupPermissions.map((p) => {
      if (p.permissionId === action.payload.permissionId) {
        return { ...p, role: action.payload.role };
      }
      return p;
    });
    state.permissionInfo[action.payload.datasourceId] = info;

    return { ...state };
  },

  [ReduxActionTypes.DELETE_DATASOURCE_PERMISSION_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<DeleteDatasourcePermissionPayload>
  ): DatasourceDataState => {
    const info = state.permissionInfo[action.payload.datasourceId] ?? {};
    info.userPermissions = info.userPermissions.filter(
      (p) => p.permissionId !== action.payload.permissionId
    );
    info.groupPermissions = info.groupPermissions.filter(
      (p) => p.permissionId !== action.payload.permissionId
    );
    state.permissionInfo[action.payload.datasourceId] = info;

    return { ...state };
  },
});
export default datasourceReducer;
