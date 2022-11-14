import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";
import { GenericApiResponse } from "api/apiResponses";
import { all, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { validateResponse } from "api/apiUtils";
import log from "loglevel";
import { message } from "antd";
import {
  CreateFolderPayload,
  DeleteFolderPayload,
  FetchFolderElementsPayload,
  MoveToFolderPayload,
  UpdateFolderPayload,
} from "../reduxActions/folderActions";
import { FolderApi } from "../../api/folderApi";
import { ApplicationMeta, FolderMeta } from "../../constants/applicationConstants";

export function* createFolderSaga(action: ReduxActionWithCallbacks<CreateFolderPayload, any, any>) {
  try {
    const response: AxiosResponse<GenericApiResponse<FolderMeta>> = yield FolderApi.createFolder(
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.CREATE_FOLDER_SUCCESS,
        payload: response.data.data,
      });
      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("create folder error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* updateFolderSaga(action: ReduxAction<UpdateFolderPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<FolderMeta>> = yield FolderApi.updateFolder(
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.UPDATE_FOLDER_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.error("update folder error: ", error);
    message.error(error.message);
  }
}

export function* deleteFolderSaga(action: ReduxActionWithCallbacks<DeleteFolderPayload, any, any>) {
  try {
    const response: AxiosResponse<GenericApiResponse<void>> = yield FolderApi.deleteFolder(
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_FOLDER_SUCCESS,
        payload: action.payload,
      });
      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("delete folder error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* moveToFolderSaga(action: ReduxActionWithCallbacks<MoveToFolderPayload, any, any>) {
  try {
    const response: AxiosResponse<GenericApiResponse<void>> = yield FolderApi.moveToFolder(
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.MOVE_TO_FOLDER_SUCCESS,
        payload: action.payload,
      });
      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    log.error("move to folder error: ", error);
    message.error(error.message);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* fetchFolderElementsSaga(action: ReduxAction<FetchFolderElementsPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<(ApplicationMeta | FolderMeta)[]>> =
      yield FolderApi.fetchFolderElements(action.payload);
    const isValidResponse: boolean = validateResponse(response);

    if (isValidResponse) {
      if (!action.payload.folderId) {
        // todo use new get all folders api
        yield put({
          type: ReduxActionTypes.FETCH_ALL_FOLDERS_SUCCESS,
          payload: response.data.data.filter((m) => m.folder),
        });
      }
      yield put({
        type: ReduxActionTypes.FETCH_FOLDER_ELEMENTS_SUCCESS,
        payload: { parentFolderId: action.payload.folderId, elements: response.data.data },
      });
    }
  } catch (error: any) {
    log.error("fetch folder elements error: ", error);
    message.error(error.message);
    yield put({
      type: ReduxActionErrorTypes.FETCH_FOLDER_ELEMENTS_ERROR,
    });
  }
}

export function* folderSagas() {
  yield all([
    takeLatest(ReduxActionTypes.CREATE_FOLDER_INIT, createFolderSaga),
    takeLatest(ReduxActionTypes.UPDATE_FOLDER_INIT, updateFolderSaga),
    takeLatest(ReduxActionTypes.DELETE_FOLDER_INIT, deleteFolderSaga),
    takeLatest(ReduxActionTypes.MOVE_TO_FOLDER_INIT, moveToFolderSaga),
    takeLatest(ReduxActionTypes.FETCH_FOLDER_ELEMENTS_INIT, fetchFolderElementsSaga),
  ]);
}
