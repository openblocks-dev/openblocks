import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import { AxiosResponse } from "axios";
import { validateResponse } from "api/apiUtils";
import AppSnapshotApi, { AppSnapshotDslResp, AppSnapshotsResp } from "api/appSnapshotApi";
import {
  CreateSnapshotPayload,
  FetchSnapshotDslPayload,
  FetchSnapshotsPayload,
  RecoverSnapshotPayload,
} from "redux/reduxActions/appSnapshotActions";
import ApplicationApi, { ApplicationResp } from "api/applicationApi";
import { ApiResponse } from "api/apiResponses";
import { message } from "antd";
import { trans } from "i18n";

export function* createAppSnapshotSaga(action: ReduxAction<CreateSnapshotPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      AppSnapshotApi.createSnapshot,
      action.payload
    );
    if (validateResponse(response)) {
      yield put({
        type: ReduxActionTypes.CREATE_APP_SNAPSHOT_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.CREATE_APP_SNAPSHOT_ERROR,
    });
  }
}

export function* fetchAppSnapshotsSaga(action: ReduxAction<FetchSnapshotsPayload>) {
  try {
    const response: AxiosResponse<AppSnapshotsResp> = yield call(
      AppSnapshotApi.getSnapshots,
      action.payload.applicationId,
      { page: action.payload.page, size: action.payload.size }
    );
    if (validateResponse(response)) {
      action.payload.onSuccess && action.payload.onSuccess(response.data.data);
      yield put({
        type: ReduxActionTypes.FETCH_APP_SNAPSHOTS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.FETCH_APP_SNAPSHOTS_ERROR,
    });
  }
}

export function* fetchAppSnapshotDslSaga(action: ReduxAction<FetchSnapshotDslPayload>) {
  try {
    const response: AxiosResponse<AppSnapshotDslResp> = yield call(
      AppSnapshotApi.getSnapshotDsl,
      action.payload.applicationId,
      action.payload.snapshotId
    );
    if (validateResponse(response)) {
      // replace dsl
      action.payload.onSuccess(response.data.data);
      yield put({
        type: ReduxActionTypes.FETCH_APP_SNAPSHOT_DSL_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.FETCH_APP_SNAPSHOT_DSL_ERROR,
    });
  }
}

export function* recoverAppSnapshotSaga(action: ReduxAction<RecoverSnapshotPayload>) {
  try {
    const { applicationId, snapshotId, snapshotCreateTime } = action.payload;
    const response: AxiosResponse<AppSnapshotDslResp> = yield call(
      AppSnapshotApi.getSnapshotDsl,
      applicationId,
      snapshotId
    );
    if (validateResponse(response)) {
      // record history record
      yield call(AppSnapshotApi.createSnapshot, {
        applicationId: applicationId,
        dsl: response.data.data.applicationsDsl,
        context: {
          operations: [
            { compName: "rootComp", operation: "recover", snapshotCreateTime: snapshotCreateTime },
          ],
        },
      });

      // update dsl
      const updateResp: AxiosResponse<ApplicationResp> = yield call(
        ApplicationApi.updateApplication,
        {
          applicationId: applicationId,
          editingApplicationDSL: response.data.data.applicationsDsl as object,
        }
      );
      if (validateResponse(updateResp)) {
        window.location.reload();
      }
    }
  } catch (error) {
    message.error(trans("api.recoverFailed"));
  }
}

export default function* appSnapshotSagas() {
  yield all([
    takeLatest(ReduxActionTypes.CREATE_APP_SNAPSHOT, createAppSnapshotSaga),
    takeLatest(ReduxActionTypes.FETCH_APP_SNAPSHOTS, fetchAppSnapshotsSaga),
    takeLatest(ReduxActionTypes.FETCH_APP_SNAPSHOT_DSL, fetchAppSnapshotDslSaga),
    takeLatest(ReduxActionTypes.RECOVER_APP_SNAPSHOT, recoverAppSnapshotSaga),
  ]);
}
