import {
  ReduxAction,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";
import { GenericApiResponse } from "api/apiResponses";
import { all, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { validateResponse } from "api/apiUtils";
import log from "loglevel";
import { message } from "antd";
import { LibraryQuery } from "../../api/queryLibraryApi";
import {
  DeleteDatasourcePermissionPayload,
  FetchDatasourcePermissionsPayload,
  GrantDatasourcePermissionPayload,
  UpdateDatasourcePermissionPayload,
} from "../reduxActions/datasourcePermissionActions";
import { DatasourcePermissionApi } from "../../api/datasourcePermissionApi";

function* fetchPermissionsSaga(action: ReduxAction<FetchDatasourcePermissionsPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<LibraryQuery[]>> =
      yield DatasourcePermissionApi.fetchPermissions(action.payload.datasourceId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_DATASOURCE_PERMISSION_SUCCESS,
        payload: { ...action.payload, data: response.data.data },
      });
    }
  } catch (error: any) {
    log.error("fetch datasource permissions error: ", error);
    message.error(error.message);
  }
}

function* grantPermissionSaga(
  action: ReduxActionWithCallbacks<GrantDatasourcePermissionPayload, any, any>
) {
  try {
    const response: AxiosResponse<GenericApiResponse<boolean>> =
      yield DatasourcePermissionApi.grantPermission(action.payload);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_DATASOURCE_PERMISSION_INIT,
        payload: { datasourceId: action.payload.datasourceId },
      });

      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("grant datasource permission error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

function* updatePermissionSaga(action: ReduxAction<UpdateDatasourcePermissionPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<LibraryQuery>> =
      yield DatasourcePermissionApi.updatePermission(action.payload);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.UPDATE_QUERY_LIBRARY_SUCCESS,
        payload: action.payload,
      });
    }
  } catch (error: any) {
    log.error("update datasource permission error: ", error);
    message.error(error.message);
  }
}

function* deletePermissionSaga(action: ReduxAction<DeleteDatasourcePermissionPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<boolean>> =
      yield DatasourcePermissionApi.deletePermission(action.payload.permissionId);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_DATASOURCE_PERMISSION_SUCCESS,
        payload: action.payload,
      });
    }
  } catch (error: any) {
    log.error("delete datasource permission error: ", error);
    message.error(error.message);
  }
}

export function* datasourcePermissionSagas() {
  yield all([
    takeLatest(ReduxActionTypes.FETCH_DATASOURCE_PERMISSION_INIT, fetchPermissionsSaga),
    takeLatest(ReduxActionTypes.GRANT_DATASOURCE_PERMISSION_INIT, grantPermissionSaga),
    takeLatest(ReduxActionTypes.UPDATE_DATASOURCE_PERMISSION_INIT, updatePermissionSaga),
    takeLatest(ReduxActionTypes.DELETE_DATASOURCE_PERMISSION_INIT, deletePermissionSaga),
  ]);
}
