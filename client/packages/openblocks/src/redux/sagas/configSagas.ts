import { all, call, put, takeLatest } from "redux-saga/effects";
import { ReduxActionErrorTypes, ReduxActionTypes } from "constants/reduxActionConstants";
import { AxiosResponse } from "axios";
import { validateResponse } from "api/apiUtils";
import log from "loglevel";
import ConfigApi, { ConfigResponse } from "api/configApi";
import { message } from "antd";
import { trans } from "i18n";
import { transToSystemConfig } from "@openblocks-ee/constants/configConstants";

export function* fetchConfigSaga() {
  try {
    const response: AxiosResponse<ConfigResponse> = yield call(ConfigApi.fetchConfig);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_SYS_CONFIG_SUCCESS,
        payload: transToSystemConfig(response.data.data),
      });

      response.data.data.needUpdate && message.error(trans("api.needUpdate"));
    }
  } catch (error) {
    log.error("fail to fetch config:", error);
    yield put({
      type: ReduxActionErrorTypes.FETCH_SYS_CONFIG_ERROR,
    });
  }
}

export default function* configSagas() {
  yield all([takeLatest(ReduxActionTypes.FETCH_SYS_CONFIG_INIT, fetchConfigSaga)]);
}
