import { EvaluationReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { GenericApiResponse } from "api/apiResponses";
import { all, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { DatasourceApi, DataSourceTypeInfo } from "api/datasourceApi";
import { validateResponse } from "api/apiUtils";
import log from "loglevel";
import { message } from "antd";
import { FetchDataSourceTypesActionPayload } from "redux/reduxActions/datasourceActions";

export function* fetchDataSourceTypesSaga(
  action: EvaluationReduxAction<FetchDataSourceTypesActionPayload>
) {
  const { organizationId, onSuccess } = action.payload;
  try {
    const response: AxiosResponse<GenericApiResponse<DataSourceTypeInfo[]>> =
      yield DatasourceApi.fetchDatasourceType(organizationId);

    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      onSuccess?.(response.data.data);
      yield put({
        type: ReduxActionTypes.FETCH_DATA_SOURCE_TYPES_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.error("fetch data source type error: ", error);
    message.error(error.message);
  }
}

export function* pluginSagas() {
  yield all([takeEvery(ReduxActionTypes.FETCH_DATA_SOURCE_TYPES, fetchDataSourceTypesSaga)]);
}
