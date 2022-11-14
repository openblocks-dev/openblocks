import { EvaluationReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { GenericApiResponse } from "api/apiResponses";
import { all, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { DatasourceApi } from "api/datasourceApi";
import { validateResponse } from "api/apiUtils";
import log from "loglevel";
import { message } from "antd";

export function* fetchPluginSaga(action: EvaluationReduxAction<{ organizationId: string }>) {
  const { organizationId } = action.payload;
  try {
    const response: AxiosResponse<GenericApiResponse<Plugin[]>> =
      yield DatasourceApi.fetchDatasourceType(organizationId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_PLUGINS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.error("fetch datasource type error: ", error);
    message.error(error.message);
  }
}

export function* pluginSagas() {
  yield all([takeEvery(ReduxActionTypes.FETCH_PLUGINS_INIT, fetchPluginSaga)]);
}
