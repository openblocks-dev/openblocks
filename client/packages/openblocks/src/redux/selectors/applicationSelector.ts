import { AppState } from "redux/reducers";
import { ApplicationMeta, AppPermissionInfo } from "constants/applicationConstants";

export const normalAppListSelector = (state: AppState): ApplicationMeta[] =>
  state.ui.application.applicationList.filter((app) => app.applicationStatus === "NORMAL");

export const modulesSelector = (state: AppState): ApplicationMeta[] => state.ui.application.modules;

export const recycleListSelector = (state: AppState) => state.ui.application.recycleList;

export const getHomeOrg = (state: AppState) => state.ui.application.homeOrg;

export const isFetchingHomeData = (state: AppState) =>
  state.ui.application.loadingStatus.isFetchingHomeData;

export const isFetchHomeDataFinished = (state: AppState) =>
  state.ui.application.loadingStatus.fetchHomeDataFinished;

export const isFetchingApplications = (state: AppState) =>
  state.ui.application.loadingStatus.isFetchingHomeData;

export const isApplicationCreating = (state: AppState) =>
  state.ui.application.loadingStatus.isApplicationCreating;

export const getAppPermissionInfo = (state: AppState): AppPermissionInfo | undefined => {
  return state.ui.application.appPermissionInfo;
};

export const currentApplication = (state: AppState): ApplicationMeta | undefined => {
  return state.ui.application.currentApplication;
};

export const isFetchingAppDetail = (state: AppState): boolean => {
  return state.ui.application.loadingStatus.fetchingAppDetail;
};

export const isApplicationPublishing = (state: AppState): boolean => {
  return state.ui.application.loadingStatus.applicationPublishing;
};

export const getTemplateId = (state: AppState): any => {
  return state.ui.application.templateId;
};
