import { AppState } from "redux/reducers";

export const getOrgUsers = (state: AppState) => {
  return state.ui.org.orgUsers;
};

export const getOrgGroups = (state: AppState) => {
  return state.ui.org.orgGroups;
};

export const getFetchOrgGroupsFinished = (state: AppState) => {
  return state.ui.org.fetchOrgGroupsFinished;
};
