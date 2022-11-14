import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import { DefaultCurrentUserDetails, User } from "constants/userConstants";
import { UpdateOrgPayload } from "redux/reduxActions/orgActions";
import { MarkUserStatusPayload, UpdateUserPayload } from "redux/reduxActions/userActions";
import { createReducer } from "util/reducerUtils";

const initialState: UsersReduxState = {
  error: "",
  loadingStates: {
    fetchingUser: false,
    profileUpdating: false,
    fetchUserFinished: false,
  },
  currentUser: DefaultCurrentUserDetails,
  profileSettingModalVisible: false,
};

const usersReducer = createReducer(initialState, {
  [ReduxActionTypes.LOGOUT_USER_SUCCESS]: (state: UsersReduxState) => ({
    ...state,
    currentUser: {
      ...DefaultCurrentUserDetails,
    },
  }),
  [ReduxActionTypes.FETCH_USER_INIT]: (state: UsersReduxState): UsersReduxState => ({
    ...state,
    loadingStates: {
      ...state.loadingStates,
      fetchingUser: true,
    },
  }),
  [ReduxActionTypes.FETCH_USER_DETAILS_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<User>
  ): UsersReduxState => {
    return {
      ...state,
      currentUser: action.payload,
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
  [ReduxActionTypes.DELETE_ORG_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<{ orgId: string }>
  ): UsersReduxState => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      orgs: state.currentUser.orgs.filter((org) => org.id !== action.payload.orgId),
    },
  }),
  [ReduxActionTypes.UPDATE_ORG_SUCCESS]: (
    state: UsersReduxState,
    action: ReduxAction<UpdateOrgPayload>
  ): UsersReduxState => {
    const orgPayload = action.payload;
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        orgs: state.currentUser.orgs.map((org) => {
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
      currentUser: {
        ...state.currentUser,
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
      currentUser: {
        ...state.currentUser,
        userStatus: {
          ...state.currentUser.userStatus,
          [action.payload.type]: action.payload.value,
        },
      },
    };
  },
});

export interface UsersReduxState {
  currentUser: User;
  loadingStates: {
    fetchingUser: boolean;
    profileUpdating: boolean;
    fetchUserFinished: boolean;
  };
  error: string;
  profileSettingModalVisible: boolean;
}

export default usersReducer;
