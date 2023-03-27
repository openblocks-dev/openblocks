import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { GenericApiResponse } from "api/apiResponses";
import { all, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { validateResponse } from "api/apiUtils";
import log from "loglevel";
import { message } from "antd";
import { JSLibraryApi, JSLibraryMeta, RecommendedJSLibraryMeta } from "api/jsLibraryApi";
import { FetchJSLibraryMetasPayload } from "redux/reduxActions/jsLibraryActions";

function* fetchMetas(action: ReduxAction<FetchJSLibraryMetasPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<JSLibraryMeta[]>> =
      yield JSLibraryApi.fetchMetas(action.payload);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_JS_LIB_METAS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.error("fetch js library metas error: ", error);
    message.error(error.message);
  }
}

function* fetchRecommends() {
  try {
    const response: AxiosResponse<GenericApiResponse<RecommendedJSLibraryMeta[]>> =
      yield JSLibraryApi.fetchRecommends();
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_JS_LIB_RECOMMENDS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.error("fetch js library recommends error: ", error);
    message.error(error.message);
  }
}

export function* jsLibrarySagas() {
  yield all([takeLatest(ReduxActionTypes.FETCH_JS_LIB_METAS, fetchMetas)]);
  yield all([takeLatest(ReduxActionTypes.FETCH_JS_LIB_RECOMMENDS, fetchRecommends)]);
}
