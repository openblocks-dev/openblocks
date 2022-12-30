import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import {
  DeleteApplicationPayload,
  DeleteAppPermissionPayload,
  RecycleApplicationPayload,
  RestoreApplicationPayload,
  UpdateAppMetaPayload,
  UpdateAppPermissionPayload,
} from "redux/reduxActions/applicationActions";
import { createReducer } from "util/reducerUtils";
import {
  ApplicationDetail,
  ApplicationMeta,
  AppPermissionInfo,
} from "constants/applicationConstants";
import { HomeData, HomeOrgMeta } from "api/applicationApi";
import { CommonSettingResponseData } from "api/commonSettingApi";

const initialState: ApplicationReduxState = {
  applicationList: [],
  modules: [],
  recycleList: [],
  loadingStatus: {
    isFetchingHomeData: false,
    fetchHomeDataFinished: false,
    isApplicationCreating: false,
    deletingApplication: false,
    fetchingAppDetail: false,
    applicationPublishing: false,
  },
};

const usersReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_HOME_DATA]: (state: ApplicationReduxState): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      isFetchingHomeData: true,
    },
  }),
  [ReduxActionTypes.FETCH_ALL_APPLICATIONS_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationMeta[]>
  ): ApplicationReduxState => ({
    ...state,
    applicationList: action.payload,
  }),
  [ReduxActionTypes.FETCH_ALL_MODULES_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationMeta[]>
  ): ApplicationReduxState => ({
    ...state,
    modules: action.payload,
  }),
  [ReduxActionTypes.SET_COMMON_SETTING_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<CommonSettingResponseData>
  ): ApplicationReduxState => ({
    ...state,
    homeOrg: state.homeOrg && {
      ...state.homeOrg,
      commonSettings: {
        ...state.homeOrg?.commonSettings,
        ...action.payload,
      },
    },
  }),
  [ReduxActionTypes.FETCH_HOME_DATA_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<HomeData>
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      isFetchingHomeData: false,
      fetchHomeDataFinished: true,
    },
    homeOrg: action.payload.organization,
  }),
  [ReduxActionErrorTypes.FETCH_HOME_DATA_ERROR]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      isFetchingHomeData: false,
      fetchHomeDataFinished: true,
    },
  }),
  [ReduxActionTypes.FETCH_APPLICATION_RECYCLE_LIST_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationMeta[]>
  ): ApplicationReduxState => ({
    ...state,
    recycleList: action.payload,
  }),
  [ReduxActionTypes.CREATE_APPLICATION_INIT]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      isApplicationCreating: true,
    },
  }),
  [ReduxActionErrorTypes.CREATE_APPLICATION_ERROR]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      isApplicationCreating: false,
    },
  }),
  [ReduxActionTypes.CREATE_APPLICATION_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationDetail>
  ): ApplicationReduxState => ({
    ...state,
    applicationList: [action.payload.applicationInfoView, ...state.applicationList],
    loadingStatus: {
      ...state.loadingStatus,
      isApplicationCreating: false,
    },
  }),
  [ReduxActionTypes.DELETE_APPLICATION_INIT]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      deletingApplication: true,
    },
  }),
  [ReduxActionTypes.DELETE_APPLICATION_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<DeleteApplicationPayload>
  ): ApplicationReduxState => ({
    ...state,
    recycleList: [
      ...state.recycleList.filter((e) => e.applicationId !== action.payload.applicationId),
    ],
    loadingStatus: {
      ...state.loadingStatus,
      deletingApplication: false,
    },
  }),
  [ReduxActionTypes.RECYCLE_APPLICATION_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<RecycleApplicationPayload>
  ): ApplicationReduxState => ({
    ...state,
    applicationList: [
      ...state.applicationList.filter((e) => e.applicationId !== action.payload.applicationId),
    ],
  }),
  [ReduxActionTypes.RESTORE_APPLICATION_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<RestoreApplicationPayload>
  ): ApplicationReduxState => ({
    ...state,
    recycleList: [
      ...state.recycleList.filter((e) => e.applicationId !== action.payload.applicationId),
    ],
  }),
  [ReduxActionErrorTypes.DELETE_APPLICATION_ERROR]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      deletingApplication: false,
    },
  }),
  [ReduxActionTypes.UPDATE_APPLICATION_META_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<UpdateAppMetaPayload>
  ): ApplicationReduxState => {
    return {
      ...state,
      applicationList: state.applicationList.map((e) => {
        if (!e.folder && e.applicationId === action.payload.applicationId) {
          return { ...e, ...action.payload };
        }
        return e;
      }),
      currentApplication: state.currentApplication && {
        ...state.currentApplication,
        ...action.payload,
      },
    };
  },
  [ReduxActionTypes.PUBLISH_APPLICATION]: (state: ApplicationReduxState): ApplicationReduxState => {
    return {
      ...state,
      loadingStatus: {
        ...state.loadingStatus,
        applicationPublishing: true,
      },
    };
  },
  [ReduxActionTypes.PUBLISH_APPLICATION_SUCCESS]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => {
    return {
      ...state,
      loadingStatus: {
        ...state.loadingStatus,
        applicationPublishing: false,
      },
    };
  },
  [ReduxActionErrorTypes.PUBLISH_APPLICATION_ERROR]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => {
    return {
      ...state,
      loadingStatus: {
        ...state.loadingStatus,
        applicationPublishing: false,
      },
    };
  },
  [ReduxActionTypes.FETCH_APP_PERMISSIONS_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<AppPermissionInfo>
  ): ApplicationReduxState => ({
    ...state,
    appPermissionInfo: {
      ...action.payload,
    },
  }),
  [ReduxActionTypes.UPDATE_APP_PERMISSION_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<UpdateAppPermissionPayload>
  ): ApplicationReduxState => {
    if (!state.appPermissionInfo) {
      return state;
    }
    return {
      ...state,
      appPermissionInfo: {
        ...state.appPermissionInfo,
        permissions: state.appPermissionInfo.permissions.map((p) => {
          if (p.permissionId === action.payload.permissionId) {
            return { ...p, role: action.payload.role };
          }
          return p;
        }),
      },
    };
  },
  [ReduxActionTypes.UPDATE_APP_PERMISSION_INFO]: (
    state: ApplicationReduxState,
    action: ReduxAction<Partial<AppPermissionInfo>>
  ): ApplicationReduxState => {
    if (!state.appPermissionInfo) {
      return state;
    }
    return {
      ...state,
      appPermissionInfo: {
        ...state.appPermissionInfo,
        ...action.payload,
      },
    };
  },
  [ReduxActionTypes.DELETE_APP_PERMISSION_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<DeleteAppPermissionPayload>
  ): ApplicationReduxState => {
    if (!state.appPermissionInfo) {
      return { ...state };
    }
    return {
      ...state,
      appPermissionInfo: {
        ...state.appPermissionInfo,
        permissions: state.appPermissionInfo.permissions.filter(
          (p) => p.permissionId !== action.payload.permissionId
        ),
      },
    };
  },
  [ReduxActionTypes.FETCH_APPLICATION_DETAIL]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      fetchingAppDetail: true,
    },
  }),
  [ReduxActionTypes.FETCH_APP_EDITING_DETAIL_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationDetail>
  ): ApplicationReduxState => {
    return {
      ...state,
      currentApplication: action.payload.applicationInfoView,
      loadingStatus: {
        ...state.loadingStatus,
        fetchingAppDetail: false,
      },
    };
  },
  [ReduxActionTypes.FETCH_APP_PUBLISH_DETAIL_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationDetail>
  ): ApplicationReduxState => ({
    ...state,
    currentApplication: action.payload.applicationInfoView,
    templateId: action.payload.templateId,
    loadingStatus: {
      ...state.loadingStatus,
      fetchingAppDetail: false,
    },
  }),
  [ReduxActionErrorTypes.FETCH_APPLICATION_DETAIL_ERROR]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      fetchingAppDetail: false,
    },
  }),
});

export interface ApplicationReduxState {
  homeOrg?: HomeOrgMeta;
  applicationList: ApplicationMeta[];
  modules: ApplicationMeta[];
  recycleList: ApplicationMeta[];
  appPermissionInfo?: AppPermissionInfo;
  currentApplication?: ApplicationMeta;
  templateId?: string;
  loadingStatus: {
    deletingApplication: boolean;
    isFetchingHomeData: boolean; // fetching app list
    fetchHomeDataFinished: boolean;
    isApplicationCreating: boolean;
    fetchingAppDetail: boolean; // dsl in detail
    applicationPublishing: boolean;
  };
}

export default usersReducer;
