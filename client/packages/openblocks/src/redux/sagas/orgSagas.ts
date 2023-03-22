import { message } from "antd";
import { ApiResponse, GenericApiResponse } from "api/apiResponses";
import OrgApi, { CreateOrgResponse, GroupUsersResponse, OrgUsersResponse } from "api/orgApi";
import { AxiosResponse } from "axios";
import { OrgGroup } from "constants/orgConstants";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import { BASE_URL } from "constants/routesURL";
import log from "loglevel";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  AddGroupUserPayload,
  DeleteOrgUserPayload,
  fetchGroupsAction,
  FetchUsersActionPayload,
  RemoveGroupUserPayload,
  UpdateGroupActionPayload,
  UpdateOrgPayload,
  updateOrgSuccess,
  UpdateUserGroupRolePayload,
  UpdateUserOrgRolePayload,
} from "redux/reduxActions/orgActions";
import { getUser } from "redux/selectors/usersSelectors";
import { validateResponse } from "api/apiUtils";
import { User } from "constants/userConstants";
import { getUserSaga } from "redux/sagas/userSagas";

export function* updateGroupSaga(action: ReduxAction<UpdateGroupActionPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      OrgApi.updateGroup,
      action.payload.groupId,
      action.payload.updates
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put(fetchGroupsAction(action.payload.orgId));
    }
  } catch (error) {
    log.error(error);
  }
}

export function* fetchGroupsSaga(action: ReduxAction<{ orgId: string }>) {
  try {
    const response: AxiosResponse<GenericApiResponse<OrgGroup[]>> = yield call(OrgApi.fetchGroup);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      const groups = response.data.data;
      yield put({
        type: ReduxActionTypes.FETCH_ORG_GROUPS_SUCCESS,
        payload: {
          orgGroups: groups,
        },
      });
    }
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.FETCH_ORG_GROUPS_ERROR,
    });
    log.error(error);
  }
}

export function* updateUserOrgRoleSaga(action: ReduxAction<UpdateUserOrgRolePayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      OrgApi.updateUserOrgRole,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      log.debug("update user role success", action.payload);
    }
  } catch (error) {
    log.error(error);
  }
}

export function* updateUserGroupRoleSaga(action: ReduxAction<UpdateUserGroupRolePayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      OrgApi.updateUserGroupRole,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      log.debug("update user role success", action.payload);
    }
  } catch (error) {
    log.error(error);
  }
}

export function* fetchOrgUsersSaga(action: ReduxAction<{ orgId: string }>) {
  try {
    const response: AxiosResponse<OrgUsersResponse> = yield call(
      OrgApi.fetchOrgUsers,
      action.payload.orgId
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_ORG_ALL_USERS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    log.error(error);
  }
}

export function* fetchGroupUsersSaga(action: ReduxAction<FetchUsersActionPayload>) {
  try {
    const response: AxiosResponse<GroupUsersResponse> = yield call(
      OrgApi.fetchGroupUsers,
      action.payload.groupId
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_GROUP_USERS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    log.error(error);
  }
}

export function* deleteGroupUserSaga(action: ReduxAction<RemoveGroupUserPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(OrgApi.deleteGroupUser, action.payload);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_GROUP_USER_SUCCESS,
        payload: action.payload,
      });
      log.debug("delete success:", action.payload);
    }
  } catch (error) {
    log.error(error);
  }
}

export function* addGroupUserSaga(action: ReduxAction<AddGroupUserPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(OrgApi.addGroupUser, action.payload);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      log.debug("add user success:", action.payload);
    }
  } catch (error) {
    log.error(error);
  }
}

export function* deleteOrgUserSaga(action: ReduxAction<DeleteOrgUserPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(OrgApi.deleteOrgUser, action.payload);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_ORG_USER_SUCCESS,
        payload: action.payload,
      });
      log.debug("delete success:", action.payload);
    }
  } catch (error) {
    log.error(error);
  }
}

export function* quitGroupSaga(action: ReduxAction<RemoveGroupUserPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      OrgApi.quitGroup,
      action.payload.groupId
    );
    const isValidResponse: boolean = validateResponse(response);
    const user: User = yield select(getUser);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.QUIT_GROUP_SUCCESS,
        payload: {
          ...action.payload,
          currentUser: user,
        },
      });
    }
  } catch (error: any) {
    message.error(error.message);
    log.error(error);
  }
}

export function* quitOrgSaga(action: ReduxAction<{ orgId: string }>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(OrgApi.quitOrg, action.payload.orgId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      // redirect
      window.location.href = BASE_URL;
    }
  } catch (error: any) {
    message.error(error.message);
    log.error(error);
  }
}

export function* switchOrgSaga(action: ReduxAction<{ orgId: string }>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(OrgApi.switchOrg, action.payload.orgId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      window.location.replace(BASE_URL);
    }
  } catch (error: any) {
    message.error(error.message);
    log.error(error);
  }
}

export function* createOrgSaga(action: ReduxAction<{ orgName: string }>) {
  try {
    const response: AxiosResponse<CreateOrgResponse> = yield call(
      OrgApi.createOrg,
      action.payload.orgName
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      // update org list
      yield call(getUserSaga);
      yield put({
        type: ReduxActionTypes.CREATE_ORG_SUCCESS,
      });
    }
  } catch (error: any) {
    yield put({
      type: ReduxActionErrorTypes.CREATE_ORG_ERROR,
    });
    message.error(error.message);
    log.error(error);
  }
}

export function* deleteOrgSaga(action: ReduxAction<{ orgId: string }>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(OrgApi.deleteOrg, action.payload.orgId);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.DELETE_ORG_SUCCESS,
        payload: {
          orgId: action.payload.orgId,
        },
      });
    }
  } catch (error: any) {
    message.error(error.message);
    log.error(error);
  }
}

export function* updateOrgSaga(action: ReduxAction<UpdateOrgPayload>) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(OrgApi.updateOrg, action.payload);
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put(updateOrgSuccess(action.payload));
    }
  } catch (error: any) {
    message.error(error.message);
    log.error(error);
  }
}

export default function* orgSagas() {
  yield all([
    takeLatest(ReduxActionTypes.UPDATE_GROUP_INFO, updateGroupSaga),
    takeLatest(ReduxActionTypes.FETCH_ORG_GROUPS, fetchGroupsSaga),
    takeLatest(ReduxActionTypes.FETCH_GROUP_USERS, fetchGroupUsersSaga),
    takeLatest(ReduxActionTypes.DELETE_GROUP_USER, deleteGroupUserSaga),
    takeLatest(ReduxActionTypes.ADD_GROUP_USER, addGroupUserSaga),
    takeLatest(ReduxActionTypes.UPDATE_USER_ORG_ROLE, updateUserOrgRoleSaga),
    takeLatest(ReduxActionTypes.UPDATE_USER_GROUP_ROLE, updateUserGroupRoleSaga),
    takeLatest(ReduxActionTypes.FETCH_ORG_ALL_USERS, fetchOrgUsersSaga),
    takeLatest(ReduxActionTypes.DELETE_ORG_USER, deleteOrgUserSaga),
    takeLatest(ReduxActionTypes.QUIT_GROUP, quitGroupSaga),
    takeLatest(ReduxActionTypes.QUIT_ORG, quitOrgSaga),
    takeLatest(ReduxActionTypes.SWITCH_ORG, switchOrgSaga),
    takeLatest(ReduxActionTypes.CREATE_ORG, createOrgSaga),
    takeLatest(ReduxActionTypes.DELETE_ORG, deleteOrgSaga),
    takeLatest(ReduxActionTypes.UPDATE_ORG, updateOrgSaga),
  ]);
}
