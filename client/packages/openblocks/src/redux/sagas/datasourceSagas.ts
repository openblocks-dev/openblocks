import {
  EvaluationReduxAction,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";
import { GenericApiResponse } from "api/apiResponses";
import { all, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { DatasourceApi, DatasourceInfo, DatasourceStructure } from "api/datasourceApi";
import {
  FetchDataSourceByAppActionPayload,
  FetchDatasourcePayload,
} from "redux/reduxActions/datasourceActions";
import { validateResponse } from "api/apiUtils";
import log from "loglevel";
import { message } from "antd";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";

export function* fetchDatasourceSaga(action: EvaluationReduxAction<FetchDatasourcePayload>) {
  const { organizationId, onSuccess } = action.payload;
  try {
    const response: AxiosResponse<GenericApiResponse<DatasourceInfo[]>> =
      yield DatasourceApi.fetchDatasourceByOrg(organizationId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_DATASOURCE_SUCCESS,
        payload: response.data.data,
      });
      onSuccess?.(response.data.data);
    }
  } catch (error: any) {
    log.error("fetch datasource error: ", error);
    message.error(error.message);
  }
}

export function* fetchDatasourceByAppSaga(
  action: EvaluationReduxAction<FetchDataSourceByAppActionPayload>
) {
  const { applicationId, onSuccess } = action.payload;
  try {
    const response: AxiosResponse<GenericApiResponse<DatasourceInfo[]>> =
      yield DatasourceApi.fetchDatasourceByApp(applicationId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_DATASOURCE_SUCCESS,
        payload: response.data.data,
      });
      onSuccess?.(response.data.data);
    }
  } catch (error: any) {
    log.error("fetch datasource by app error: ", error);
  }
}

export function* fetchDatasourceStructureSaga(action: EvaluationReduxAction<any>) {
  const { datasourceId } = action.payload;
  try {
    const response: AxiosResponse<GenericApiResponse<{ tables: DatasourceStructure[] }>> =
      yield DatasourceApi.fetchDatasourceStructure(datasourceId, true);
    const isValidResponse: boolean = validateResponse(response);

    const result: { [key: string]: DatasourceStructure[] } = {};
    result[datasourceId] = response.data.data.tables;
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_DATASOURCE_STRUCTURE_SUCCESS,
        payload: result,
      });
    }
  } catch (error: any) {
    log.error("fetch datasource structure error: ", error);
    message.error(error.message);
  }
}

export function* createDatasourceSaga(action: ReduxActionWithCallbacks<Datasource, any, any>) {
  try {
    const datasource = action.payload;
    const response: AxiosResponse<GenericApiResponse<Datasource>> =
      yield DatasourceApi.createDatasource(datasource);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.CREATE_DATASOURCE_SUCCESS,
        payload: response.data.data,
      });

      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("create datasource error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* updateDatasourceSaga(action: ReduxActionWithCallbacks<Datasource, any, any>) {
  try {
    const datasource = action.payload;
    const response: AxiosResponse<GenericApiResponse<Datasource>> =
      yield DatasourceApi.updateDatasource(datasource, datasource.id);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.UPDATE_DATASOURCE_SUCCESS,
        payload: response.data.data,
      });

      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("update datasource error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* deleteDatasourceSaga(
  actionPayload: EvaluationReduxAction<{ datasourceId: string }>
) {
  try {
    const id = actionPayload.payload.datasourceId;
    const response: AxiosResponse<GenericApiResponse<Datasource>> =
      yield DatasourceApi.deleteDatasource(id);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_DATASOURCE_SUCCESS,
        payload: response.data.data ? { datasourceId: actionPayload.payload.datasourceId } : {},
      });
    }
  } catch (error: any) {
    log.error("delete datasource error: ", error);
    message.error(error.message);
  }
}

export function* datasourceSagas() {
  yield all([
    takeEvery(ReduxActionTypes.FETCH_DATASOURCE_INIT, fetchDatasourceSaga),
    takeEvery(ReduxActionTypes.FETCH_DATASOURCE_BY_APP_INIT, fetchDatasourceByAppSaga),
    takeEvery(ReduxActionTypes.FETCH_DATASOURCE_STRUCTURE_INIT, fetchDatasourceStructureSaga),
    takeEvery(ReduxActionTypes.CREATE_DATASOURCE_INIT, createDatasourceSaga),
    takeEvery(ReduxActionTypes.UPDATE_DATASOURCE_INIT, updateDatasourceSaga),
    takeEvery(ReduxActionTypes.DELETE_DATASOURCE_INIT, deleteDatasourceSaga),
  ]);
}
