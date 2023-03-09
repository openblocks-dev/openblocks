import { ReduxActionTypes } from "constants/reduxActionConstants";
import {
  ApplicationDetail,
  ApplicationDSLType,
  ApplicationRoleType,
  AppPermissionInfo,
  AppTypeEnum,
} from "constants/applicationConstants";
import { JSONValue } from "util/jsonTypes";
import { CommonSettingResponseData } from "api/commonSettingApi";

export interface HomeDataPayload {
  applicationType?: AppTypeEnum;
}

export const fetchHomeData = (payload: HomeDataPayload) => ({
  type: ReduxActionTypes.FETCH_HOME_DATA,
  payload: {},
});

export const fetchAllApplications = (payload: HomeDataPayload) => ({
  type: ReduxActionTypes.FETCH_ALL_APPLICATIONS_INIT,
  payload: {},
});

export const fetchAllModules = (payload: HomeDataPayload) => ({
  type: ReduxActionTypes.FETCH_ALL_MODULES_INIT,
  payload: {},
});

export const fetchApplicationRecycleList = () => ({
  type: ReduxActionTypes.FETCH_APPLICATION_RECYCLE_LIST_INIT,
});

export type CreateApplicationPayload = {
  applicationName: string;
  applicationType: AppTypeEnum;
  orgId: string;
  dsl?: JSONValue;
  folderId?: string;
  onSuccess: (app: ApplicationDetail) => void;
};
export const createApplication = (payload: CreateApplicationPayload) => ({
  type: ReduxActionTypes.CREATE_APPLICATION_INIT,
  payload: payload,
});

export type RecycleApplicationPayload = {
  folderId: string;
  applicationId: string;
};
export const recycleApplication = (
  payload: RecycleApplicationPayload,
  onSuccessCallback: (response: any) => void,
  onErrorCallback: () => void
) => ({
  type: ReduxActionTypes.RECYCLE_APPLICATION_INIT,
  payload: payload,
  onSuccessCallback: onSuccessCallback,
  onErrorCallback: onErrorCallback,
});

export type RestoreApplicationPayload = {
  applicationId: string;
};
export const restoreApplication = (
  payload: RestoreApplicationPayload,
  onSuccessCallback: (response: any) => void,
  onErrorCallback?: () => void
) => ({
  type: ReduxActionTypes.RESTORE_APPLICATION_INIT,
  payload: payload,
  onSuccessCallback: onSuccessCallback,
  onErrorCallback: onErrorCallback,
});

export type DeleteApplicationPayload = {
  applicationId: string;
};
export const deleteApplication = (
  payload: DeleteApplicationPayload,
  onSuccessCallback?: (response: any) => void,
  onErrorCallback?: () => void
) => ({
  type: ReduxActionTypes.DELETE_APPLICATION_INIT,
  payload: payload,
  onSuccessCallback: onSuccessCallback,
  onErrorCallback: onErrorCallback,
});

export type UpdateApplicationPayload = {
  applicationId: string;
  publishedApplicationDSL?: object;
  editingApplicationDSL?: object;
};
export const updateApplication = (payload: UpdateApplicationPayload) => ({
  type: ReduxActionTypes.UPDATE_APPLICATION,
  payload: payload,
});

export type UpdateAppMetaPayload = {
  folderId?: string;
  applicationId: string;
  name: string;
};
export const updateAppMetaAction = (payload: UpdateAppMetaPayload) => ({
  type: ReduxActionTypes.UPDATE_APPLICATION_META,
  payload: payload,
});

export type PublishApplicationPayload = {
  applicationId: string;
};
export const publishApplication = (payload: PublishApplicationPayload) => ({
  type: ReduxActionTypes.PUBLISH_APPLICATION,
  payload: payload,
});

export interface AppSummaryInfo {
  id: string;
  dsl?: JSONValue;
  moduleDsl?: Record<string, any>;
  appType: AppTypeEnum;
  orgCommonSettings?: CommonSettingResponseData;
}

export type FetchAppInfoPayload = {
  applicationId: string;
  type: ApplicationDSLType;
  onSuccess?: (info: AppSummaryInfo) => void;
};
export const fetchApplicationInfo = (payload: FetchAppInfoPayload) => ({
  type: ReduxActionTypes.FETCH_APPLICATION_DETAIL,
  payload: payload,
});

export type FetchAppPermissionPayload = {
  applicationId: string;
};
export const fetchApplicationPermissions = (payload: FetchAppPermissionPayload) => ({
  type: ReduxActionTypes.FETCH_APP_PERMISSIONS,
  payload: payload,
});

export type UpdateAppPermissionPayload = {
  applicationId: string;
  role: ApplicationRoleType;
  permissionId: string;
};
export const updateAppPermission = (payload: UpdateAppPermissionPayload) => ({
  type: ReduxActionTypes.UPDATE_APP_PERMISSION,
  payload: payload,
});

export const updateAppPermissionInfo = (payload: Partial<AppPermissionInfo>) => ({
  type: ReduxActionTypes.UPDATE_APP_PERMISSION_INFO,
  payload: payload,
});

export type DeleteAppPermissionPayload = {
  applicationId: string;
  permissionId: string;
};
export const deleteAppPermission = (payload: DeleteAppPermissionPayload) => ({
  type: ReduxActionTypes.DELETE_APP_PERMISSION,
  payload: payload,
});
