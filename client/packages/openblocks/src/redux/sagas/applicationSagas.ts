import { ApiResponse, GenericApiResponse } from "api/apiResponses";
import ApplicationApi, {
  ApplicationResp,
  AppPermissionResponse,
  HomeDataResponse,
} from "api/applicationApi";
import { AxiosResponse } from "axios";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";
import log from "loglevel";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  CreateApplicationPayload,
  DeleteApplicationPayload,
  FetchAppInfoPayload,
  FetchAppPermissionPayload,
  HomeDataPayload,
  PublishApplicationPayload,
  RecycleApplicationPayload,
  RestoreApplicationPayload,
  UpdateApplicationPayload,
  UpdateAppMetaPayload,
  UpdateAppPermissionPayload,
} from "redux/reduxActions/applicationActions";
import { doValidResponse, validateResponse } from "api/apiUtils";
import { APPLICATION_VIEW_URL, BASE_URL } from "constants/routesURL";
import { message } from "antd";
import { SERVER_ERROR_CODES } from "constants/apiConstants";
import history from "util/history";
import { ApplicationMeta, AppTypeEnum } from "constants/applicationConstants";
import { trans } from "i18n";

export function* fetchHomeDataSaga(action: ReduxAction<HomeDataPayload>) {
  try {
    const response: AxiosResponse<HomeDataResponse> = yield call(
      ApplicationApi.fetchHomeData,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_HOME_DATA_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    log.debug("fetch home data error: ", error);
    yield put({
      type: ReduxActionErrorTypes.FETCH_HOME_DATA_ERROR,
    });
  }
}

export function* fetchAllApplicationSaga(action: ReduxAction<HomeDataPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<ApplicationMeta[]>> = yield call(
      ApplicationApi.fetchAllApplications,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_ALL_APPLICATIONS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.debug("fetch all application error: ", error);
    message.error(error.message);
  }
}

export function* fetchAllModulesSaga(action: ReduxAction<HomeDataPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<ApplicationMeta[]>> = yield call(
      ApplicationApi.fetchAllModules,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_ALL_MODULES_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.debug("fetch all modules error: ", error);
    message.error(error.message);
  }
}

export function* createApplicationSaga(action: ReduxAction<CreateApplicationPayload>) {
  try {
    const response: AxiosResponse<ApplicationResp> = yield call(
      ApplicationApi.createApplication,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.CREATE_APPLICATION_SUCCESS,
        payload: { ...response.data.data },
      });
      action.payload.onSuccess(response.data.data);
    }
  } catch (error: any) {
    log.error("fetch all application error: ", error);
    message.error(error.message);
    yield put({
      type: ReduxActionErrorTypes.CREATE_APPLICATION_ERROR,
    });
  }
}

export function* deleteApplicationSaga(
  action: ReduxActionWithCallbacks<DeleteApplicationPayload, any, any>
) {
  try {
    const response: AxiosResponse<HomeDataResponse> = yield call(
      ApplicationApi.deleteApplication,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_APPLICATION_SUCCESS,
        payload: action.payload,
      });
      action.onSuccessCallback && action.onSuccessCallback(response);
      // clear some app caches
      // yield call(deleteRecentAppEntities, request.applicationId);
    }
  } catch (error) {
    log.debug("delete application error: ", error);
    yield put({
      type: ReduxActionErrorTypes.DELETE_APPLICATION_ERROR,
      payload: error,
    });
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

export function* updateApplicationSaga(action: ReduxAction<UpdateApplicationPayload>) {
  try {
    const response: AxiosResponse<ApplicationResp> = yield call(
      ApplicationApi.updateApplication,
      action.payload
    );
    validateResponse(response);
  } catch (error) {
    log.error("update application error: ", error);
  }
}

export function* updateApplicationMetaSaga(action: ReduxAction<UpdateAppMetaPayload>) {
  try {
    const response: AxiosResponse<ApplicationResp> = yield call(
      ApplicationApi.updateApplication,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse && action.payload) {
      yield put({
        type: ReduxActionTypes.UPDATE_APPLICATION_META_SUCCESS,
        payload: action.payload,
      });
    }
  } catch (error) {
    log.error("update application meta error: ", error);
  }
}

export function* publishApplicationSaga(action: ReduxAction<PublishApplicationPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      ApplicationApi.publishApplication,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse && action.payload) {
      yield put({
        type: ReduxActionTypes.PUBLISH_APPLICATION_SUCCESS,
        payload: action.payload,
      });
      message.success(trans("api.publishSuccess"));
      window.open(APPLICATION_VIEW_URL(action.payload.applicationId, "view"));
    }
  } catch (error: any) {
    message.error(error.message);
    yield put({
      type: ReduxActionErrorTypes.PUBLISH_APPLICATION_ERROR,
      payload: action.payload,
    });
    log.error("publish application error: ", error);
  }
}

export function* fetchApplicationDetailSaga(action: ReduxAction<FetchAppInfoPayload>) {
  try {
    const response: AxiosResponse<ApplicationResp> = yield call(
      ApplicationApi.getApplicationDetail,
      action.payload
    );
    const isValidResponse: boolean = doValidResponse(response);
    if (isValidResponse && action.payload) {
      const {
        applicationDSL: dsl,
        applicationInfoView: info,
        moduleDSL: moduleDsl,
        orgCommonSettings,
      } = response.data.data;
      // update editor component
      if (action.payload.onSuccess) {
        action.payload.onSuccess({
          id: info.applicationId,
          appType: info.applicationType || AppTypeEnum.Module,
          dsl,
          moduleDsl,
          orgCommonSettings,
        });
      }
      if (orgCommonSettings) {
        yield put({
          type: ReduxActionTypes.FETCH_COMMON_SETTING_SUCCESS,
          payload: { data: orgCommonSettings },
        });
      }

      const type =
        action.payload.type === "editing"
          ? ReduxActionTypes.FETCH_APP_EDITING_DETAIL_SUCCESS
          : ReduxActionTypes.FETCH_APP_PUBLISH_DETAIL_SUCCESS;
      yield put({
        type: type,
        payload: response.data.data,
      });
      return;
    } else if (!isValidResponse) {
      if (response.data.code === SERVER_ERROR_CODES.NO_PERMISSION_TO_REQUEST_APP) {
        history.push(BASE_URL);
      }
      throw Error(response.data.message);
    }
  } catch (error: any) {
    message.error(error.message);
    yield put({
      type: ReduxActionErrorTypes.FETCH_APPLICATION_DETAIL_ERROR,
    });
  }
}

export function* fetchApplicationPermissions(action: ReduxAction<FetchAppPermissionPayload>) {
  try {
    const response: AxiosResponse<AppPermissionResponse> = yield call(
      ApplicationApi.getApplicationPermissions,
      action.payload.applicationId
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_APP_PERMISSIONS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    log.debug("fetch all application error: ", error);
  }
}

export function* updateApplicationPermission(action: ReduxAction<UpdateAppPermissionPayload>) {
  try {
    const response: AxiosResponse<AppPermissionResponse> = yield call(
      ApplicationApi.updateAppPermission,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.UPDATE_APP_PERMISSION_SUCCESS,
        payload: action.payload,
      });
    }
  } catch (error: any) {
    message.error(error.message);
  }
}

export function* deleteApplicationPermission(action: ReduxAction<UpdateAppPermissionPayload>) {
  try {
    const response: AxiosResponse<AppPermissionResponse> = yield call(
      ApplicationApi.deleteAppPermission,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_APP_PERMISSION_SUCCESS,
        payload: action.payload,
      });
    }
  } catch (error) {
    log.debug("fetch all application error: ", error);
  }
}

function* recycleApplicationSaga(
  action: ReduxActionWithCallbacks<RecycleApplicationPayload, any, any>
) {
  try {
    const response: AxiosResponse<GenericApiResponse<Boolean>> = yield call(
      ApplicationApi.recycleApplication,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.RECYCLE_APPLICATION_SUCCESS,
        payload: action.payload,
      });
      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    message.error(error.message);
    log.debug("recycle application error: ", error);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

function* restoreApplicationSaga(
  action: ReduxActionWithCallbacks<RestoreApplicationPayload, any, any>
) {
  try {
    const response: AxiosResponse<GenericApiResponse<Boolean>> = yield call(
      ApplicationApi.restoreApplication,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.RESTORE_APPLICATION_SUCCESS,
        payload: action.payload,
      });
      action.onSuccessCallback && action.onSuccessCallback(response);
    }
  } catch (error: any) {
    message.error(error.message);
    log.debug("restore application error: ", error);
    action.onErrorCallback && action.onErrorCallback(error);
  }
}

function* fetchApplicationRecycleListSaga() {
  try {
    const response: AxiosResponse<GenericApiResponse<ApplicationMeta[]>> = yield call(
      ApplicationApi.fetchRecycleList
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_APPLICATION_RECYCLE_LIST_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    message.error(error.message);
    log.debug("fetch application recycle list error: ", error);
  }
}

export default function* applicationSagas() {
  yield all([
    takeLatest(ReduxActionTypes.FETCH_HOME_DATA, fetchHomeDataSaga),
    takeLatest(ReduxActionTypes.CREATE_APPLICATION_INIT, createApplicationSaga),
    takeLatest(ReduxActionTypes.DELETE_APPLICATION_INIT, deleteApplicationSaga),
    takeLatest(ReduxActionTypes.UPDATE_APPLICATION, updateApplicationSaga),
    takeLatest(ReduxActionTypes.UPDATE_APPLICATION_META, updateApplicationMetaSaga),
    takeLatest(ReduxActionTypes.PUBLISH_APPLICATION, publishApplicationSaga),
    takeLatest(ReduxActionTypes.FETCH_APP_PERMISSIONS, fetchApplicationPermissions),
    takeLatest(ReduxActionTypes.UPDATE_APP_PERMISSION, updateApplicationPermission),
    takeLatest(ReduxActionTypes.DELETE_APP_PERMISSION, deleteApplicationPermission),
    takeLatest(ReduxActionTypes.FETCH_APPLICATION_DETAIL, fetchApplicationDetailSaga),
    takeLatest(ReduxActionTypes.FETCH_ALL_APPLICATIONS_INIT, fetchAllApplicationSaga),
    takeLatest(ReduxActionTypes.FETCH_ALL_MODULES_INIT, fetchAllModulesSaga),

    takeLatest(ReduxActionTypes.RECYCLE_APPLICATION_INIT, recycleApplicationSaga),
    takeLatest(ReduxActionTypes.RESTORE_APPLICATION_INIT, restoreApplicationSaga),
    takeLatest(
      ReduxActionTypes.FETCH_APPLICATION_RECYCLE_LIST_INIT,
      fetchApplicationRecycleListSaga
    ),
  ]);
}
