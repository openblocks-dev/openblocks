import { User } from "constants/userConstants";
import { AppState } from "redux/reducers";

export const getCurrentUser = (state: AppState): User => {
  return state.ui.users.currentUser;
};

export const isFetchingUser = (state: AppState): boolean => {
  return state.ui.users.loadingStates.fetchingUser;
};

export const isFetchUserFinished = (state: AppState): boolean => {
  return state.ui.users.loadingStates.fetchUserFinished;
};

export const isProfileUpdating = (state: AppState): boolean => {
  return state.ui.users.loadingStates.profileUpdating;
};

export const isProfileSettingModalVisible = (state: AppState) =>
  state.ui.users.profileSettingModalVisible;
