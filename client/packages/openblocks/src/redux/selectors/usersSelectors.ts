import { CurrentUser, User } from "constants/userConstants";
import { AppState } from "redux/reducers";

export const getUser = (state: AppState): User => {
  return state.ui.users.user;
};

export const getCurrentUser = (state: AppState): CurrentUser => {
  return state.ui.users.currentUser;
};

export const getRawCurrentUser = (state: AppState): CurrentUser => {
  return state.ui.users.rawCurrentUser;
};

export const isFetchingUser = (state: AppState): boolean => {
  return (
    state.ui.users.loadingStates.fetchingUser ||
    state.ui.users.loadingStates.fetchCurrentUser === "fetching"
  );
};

export const isFetchUserFinished = (state: AppState): boolean => {
  return (
    state.ui.users.loadingStates.fetchUserFinished &&
    state.ui.users.loadingStates.fetchCurrentUser === "finished"
  );
};

export const isProfileUpdating = (state: AppState): boolean => {
  return state.ui.users.loadingStates.profileUpdating;
};

export const isProfileSettingModalVisible = (state: AppState) =>
  state.ui.users.profileSettingModalVisible;
