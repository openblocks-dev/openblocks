import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import { CurrentUser, defaultCurrentUser, defaultUser, User } from "constants/userConstants";
import { UpdateOrgPayload } from "redux/reduxActions/orgActions";
import { MarkUserStatusPayload, UpdateUserPayload } from "redux/reduxActions/userActions";
import { createReducer } from "util/reducerUtils";

const initialState: UsersReduxState = {
  error: "",
  loadingStates: {
    fetchingUser: false,
    profileUpdating: false,
    fetchUserFinished: false,
    fetchCurrentUser: "init",
  },
  user: defaultUser,
  currentUser: defaultCurrentUser,
  rawCurrentUser: defaultCurrentUser,
  profileSettingModalVisible: false,
};

const usersReducer = createReducer(initialState, {
  [ReduxActionTypes.LOGOUT_USER_SUCCESS]: (state: UsersReduxState) => ({
    ...state,
    user: {
      ...defaultUser,
    },
    newCurrentUser: defaultCurrentUser,
    rawCurrentUser: defaultCurrentUser,
  }),
  [ReduxActionTypes.FETCH_USER_INIT]: (state: UsersReduxState): UsersReduxState => ({
    ...state,
    loadingStates: {
      ...state.loadingStates,
      fetchingUser: true,
      fetchCurrentUser: "fetching",
    },
  }),
  [ReduxActionTypes.FETCH_USER_DETAILS_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<User>
  ): UsersReduxState => {
    return {
      ...state,
      user: action.payload,
      loadingStates: {
        ...state.loadingStates,
        fetchingUser: false,
        fetchUserFinished: true,
      },
    };
  },
  [ReduxActionErrorTypes.FETCH_USER_DETAILS_ERROR]: (state: UsersReduxState): UsersReduxState => {
    return {
      ...state,
      loadingStates: {
        ...state.loadingStates,
        fetchingUser: false,
        fetchUserFinished: true,
      },
    };
  },
  [ReduxActionTypes.FETCH_CURRENT_USER_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<CurrentUser>
  ): UsersReduxState => ({
    ...state,
    currentUser: action.payload,
    loadingStates: {
      ...state.loadingStates,
      fetchCurrentUser: "finished",
    },
  }),
  [ReduxActionErrorTypes.FETCH_CURRENT_USER_ERROR]: (state: UsersReduxState): UsersReduxState => ({
    ...state,
    loadingStates: {
      ...state.loadingStates,
      fetchCurrentUser: "finished",
    },
  }),
  [ReduxActionTypes.FETCH_RAW_CURRENT_USER]: (state: UsersReduxState): UsersReduxState => ({
    ...state,
  }),
  [ReduxActionTypes.FETCH_RAW_CURRENT_USER_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<CurrentUser>
  ): UsersReduxState => ({
    ...state,
    rawCurrentUser: action.payload,
  }),
  [ReduxActionTypes.DELETE_ORG_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<{ orgId: string }>
  ): UsersReduxState => ({
    ...state,
    user: {
      ...state.user,
      orgs: state.user.orgs.filter((org) => org.id !== action.payload.orgId),
    },
  }),
  [ReduxActionTypes.UPDATE_ORG_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<UpdateOrgPayload>
  ): UsersReduxState => {
    const orgPayload = action.payload;
    return {
      ...state,
      user: {
        ...state.user,
        orgs: state.user.orgs.map((org) => {
          if (org.id === orgPayload.id) {
            return {
              ...org,
              ...(orgPayload.orgName && { name: orgPayload.orgName }),
              ...(orgPayload.logoUrl && { logoUrl: orgPayload.logoUrl }),
            };
          }
          return org;
        }),
      },
    };
  },
  [ReduxActionTypes.SET_USER_PROFILE_SETTING_MODAL_VISIBLE]: (
    state: UsersReduxState,
    action: ReduxAction<{ visible: boolean }>
  ): UsersReduxState => ({
    ...state,
    profileSettingModalVisible: action.payload.visible,
  }),
  [ReduxActionTypes.UPDATE_USER_PROFILE]: (state: UsersReduxState): UsersReduxState => {
    return {
      ...state,
      loadingStates: {
        ...state.loadingStates,
        profileUpdating: true,
      },
    };
  },
  [ReduxActionErrorTypes.UPDATE_USER_PROFILE_ERROR]: (state: UsersReduxState): UsersReduxState => {
    return {
      ...state,
      loadingStates: {
        ...state.loadingStates,
        profileUpdating: false,
      },
    };
  },
  [ReduxActionTypes.UPDATE_USER_PROFILE_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<UpdateUserPayload>
  ): UsersReduxState => {
    return {
      ...state,
      loadingStates: {
        ...state.loadingStates,
        profileUpdating: false,
      },
      user: {
        ...state.user,
        ...(action.payload.name && { username: action.payload.name }),
        ...(action.payload.avatarUrl && {
          avatarUrl: action.payload.avatarUrl,
        }),
      },
    };
  },
  [ReduxActionTypes.MARK_USER_STATUS]: (
    state: UsersReduxState,
    action: ReduxAction<MarkUserStatusPayload>
  ): UsersReduxState => {
    return {
      ...state,
      user: {
        ...state.user,
        userStatus: {
          ...state.user.userStatus,
          [action.payload.type]: action.payload.value,
        },
      },
    };
  },
});

export interface UsersReduxState {
  user: User;
  currentUser: CurrentUser;
  rawCurrentUser: CurrentUser;
  loadingStates: {
    fetchingUser: boolean;
    profileUpdating: boolean;
    fetchUserFinished: boolean;
    fetchCurrentUser: "init" | "fetching" | "finished";
  };
  error: string;
  profileSettingModalVisible: boolean;
}

export default usersReducer;
