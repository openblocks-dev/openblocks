import {
  EvaluationReduxAction,
  ReduxAction,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
  ReduxActionWithoutPayload,
} from "constants/reduxActionConstants";
import { GenericApiResponse } from "api/apiResponses";
import { all, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { validateResponse } from "api/apiUtils";
import log from "loglevel";
import { message } from "antd";
import {
  LibraryQuery,
  LibraryQueryDropdownInfo,
  LibraryQueryPublishRequest,
  LibraryQueryRecordMeta,
  QueryLibraryApi,
} from "../../api/queryLibraryApi";

function* fetchQueryLibrarySaga(action: ReduxActionWithoutPayload) {
  try {
    const response: AxiosResponse<GenericApiResponse<LibraryQuery[]>> =
      yield QueryLibraryApi.fetchQueryLibraryByOrg();
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_QUERY_LIBRARY_BY_ORG_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.error("fetch query library error: ", error);
    message.error(error.message);
  }
}

function* fetchQueryLibraryRecordDSLSaga(
  action: ReduxActionWithCallbacks<
    { libraryQueryId: string; libraryQueryRecordId: string },
    any,
    any
  >
) {
  const { libraryQueryId, libraryQueryRecordId } = action.payload;
  try {
    const response: AxiosResponse<GenericApiResponse<any>> =
      yield QueryLibraryApi.fetchQueryLibraryRecordDSL(libraryQueryId, libraryQueryRecordId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_QUERY_LIBRARY_RECORD_DSL_SUCCESS,
        payload: {
          libraryQueryId: libraryQueryId,
          libraryQueryRecordId: libraryQueryRecordId,
          dsl: response.data.data,
        },
      });
    }
  } catch (error: any) {
    log.error("fetch query library dsl by id error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

function* fetchQueryLibraryDropdownSaga() {
  try {
    const response: AxiosResponse<GenericApiResponse<LibraryQueryDropdownInfo[]>> =
      yield QueryLibraryApi.fetchQueryLibraryDropdown();
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_QUERY_LIBRARY_DROPDOWN_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.error("fetch query library dropdown error: ", error);
    message.error(error.message);
  }
}

export function* createQueryLibrarySaga(action: ReduxActionWithCallbacks<LibraryQuery, any, any>) {
  try {
    const libraryQuery = action.payload;
    const response: AxiosResponse<GenericApiResponse<LibraryQuery>> =
      yield QueryLibraryApi.createQueryLibrary(libraryQuery);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.CREATE_QUERY_LIBRARY_SUCCESS,
        payload: response.data.data,
      });

      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("create query library error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* updateQueryLibrarySaga(action: ReduxActionWithCallbacks<LibraryQuery, any, any>) {
  try {
    const libraryQuery = action.payload;
    const response: AxiosResponse<GenericApiResponse<LibraryQuery>> =
      yield QueryLibraryApi.updateQueryLibrary(libraryQuery.id, libraryQuery);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.UPDATE_QUERY_LIBRARY_SUCCESS,
        payload: libraryQuery,
      });

      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("update library query error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* deleteQueryLibrarySaga(
  actionPayload: EvaluationReduxAction<{ queryLibraryId: string }>
) {
  try {
    const id = actionPayload.payload.queryLibraryId;
    const response: AxiosResponse<GenericApiResponse<boolean>> =
      yield QueryLibraryApi.deleteQueryLibrary(id);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_QUERY_LIBRARY_SUCCESS,
        payload: response.data.data ? { queryLibraryId: actionPayload.payload.queryLibraryId } : {},
      });
    }
  } catch (error: any) {
    log.error("delete query library error: ", error);
    message.error(error.message);
  }
}

function* fetchQueryLibraryRecordSaga(action: ReduxAction<{ libraryQueryId: string }>) {
  const { libraryQueryId } = action.payload;
  try {
    const response: AxiosResponse<GenericApiResponse<LibraryQueryRecordMeta[]>> =
      yield QueryLibraryApi.fetchQueryLibraryRecords(libraryQueryId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_QUERY_LIBRARY_RECORD_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.error("fetch query library records by id error: ", error);
    message.error(error.message);
  }
}

export function* createQueryLibraryRecordSaga(
  action: ReduxActionWithCallbacks<
    { libraryQueryId: string; request: LibraryQueryPublishRequest },
    any,
    any
  >
) {
  try {
    const { libraryQueryId, request } = action.payload;
    const response: AxiosResponse<GenericApiResponse<LibraryQueryRecordMeta>> =
      yield QueryLibraryApi.publishQueryLibrary(libraryQueryId, request);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.CREATE_QUERY_LIBRARY_RECORD_SUCCESS,
        payload: response.data.data,
      });

      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("create query library record error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* queryLibrarySagas() {
  yield all([
    takeLatest(ReduxActionTypes.FETCH_QUERY_LIBRARY_BY_ORG_INIT, fetchQueryLibrarySaga),
    takeLatest(ReduxActionTypes.FETCH_QUERY_LIBRARY_DROPDOWN_INIT, fetchQueryLibraryDropdownSaga),
    takeLatest(ReduxActionTypes.CREATE_QUERY_LIBRARY_INIT, createQueryLibrarySaga),
    takeLatest(ReduxActionTypes.UPDATE_QUERY_LIBRARY_INIT, updateQueryLibrarySaga),
    takeLatest(ReduxActionTypes.DELETE_QUERY_LIBRARY_INIT, deleteQueryLibrarySaga),

    takeLatest(
      ReduxActionTypes.FETCH_QUERY_LIBRARY_RECORD_DSL_INIT,
      fetchQueryLibraryRecordDSLSaga
    ),
    takeLatest(ReduxActionTypes.FETCH_QUERY_LIBRARY_RECORD, fetchQueryLibraryRecordSaga),
    takeLatest(ReduxActionTypes.CREATE_QUERY_LIBRARY_RECORD, createQueryLibraryRecordSaga),
  ]);
}
