import { createReducer } from "util/reducerUtils";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import { AppSnapshot, AppSnapshotList } from "constants/applicationConstants";

const initialState: AppSnapshotState = {
  snapshotCreating: false,
  snapshotsFetching: false,
  appSnapshots: [],
  appSnapshotCount: 0,
  showAppSnapshot: false,
  snapshotDslFetching: false,
  selectedSnapshotId: "",
};

const appSnapshotReducer = createReducer(initialState, {
  [ReduxActionTypes.SET_SHOW_APP_SNAPSHOT]: (
    state: AppSnapshotState,
    action: ReduxAction<{ show: boolean }>
  ): AppSnapshotState => {
    return {
      ...state,
      showAppSnapshot: action.payload.show,
    };
  },
  [ReduxActionTypes.SET_SELECT_SNAPSHOT_ID]: (
    state: AppSnapshotState,
    action: ReduxAction<{ snapshotId: string }>
  ): AppSnapshotState => {
    return {
      ...state,
      selectedSnapshotId: action.payload.snapshotId,
    };
  },
  [ReduxActionTypes.FETCH_APP_SNAPSHOT_DSL]: (state: AppSnapshotState): AppSnapshotState => {
    return {
      ...state,
      snapshotDslFetching: true,
    };
  },
  [ReduxActionTypes.FETCH_APP_SNAPSHOT_DSL_SUCCESS]: (
    state: AppSnapshotState
  ): AppSnapshotState => {
    return {
      ...state,
      snapshotDslFetching: false,
    };
  },
  [ReduxActionErrorTypes.FETCH_APP_SNAPSHOT_DSL_ERROR]: (
    state: AppSnapshotState
  ): AppSnapshotState => {
    return {
      ...state,
      snapshotCreating: false,
    };
  },
  [ReduxActionTypes.CREATE_APP_SNAPSHOT]: (state: AppSnapshotState): AppSnapshotState => {
    return {
      ...state,
      snapshotCreating: true,
    };
  },
  [ReduxActionTypes.CREATE_APP_SNAPSHOT_SUCCESS]: (state: AppSnapshotState): AppSnapshotState => {
    return {
      ...state,
      snapshotCreating: false,
    };
  },
  [ReduxActionErrorTypes.CREATE_APP_SNAPSHOT_ERROR]: (
    state: AppSnapshotState
  ): AppSnapshotState => {
    return {
      ...state,
      snapshotCreating: false,
    };
  },
  [ReduxActionTypes.FETCH_APP_SNAPSHOTS]: (
    state: AppSnapshotState,
    action: ReduxAction<AppSnapshot[]>
  ): AppSnapshotState => {
    return {
      ...state,
      snapshotsFetching: true,
    };
  },
  [ReduxActionTypes.FETCH_APP_SNAPSHOTS_SUCCESS]: (
    state: AppSnapshotState,
    action: ReduxAction<AppSnapshotList>
  ): AppSnapshotState => {
    return {
      ...state,
      appSnapshots: action.payload.list,
      appSnapshotCount: action.payload.count,
      snapshotsFetching: false,
    };
  },
  [ReduxActionErrorTypes.FETCH_APP_SNAPSHOTS_ERROR]: (
    state: AppSnapshotState
  ): AppSnapshotState => {
    return {
      ...state,
      snapshotsFetching: false,
    };
  },
});

export interface AppSnapshotState {
  snapshotCreating: boolean;
  snapshotsFetching: boolean;
  snapshotDslFetching: boolean;
  appSnapshots: AppSnapshot[];
  appSnapshotCount: number;
  showAppSnapshot: boolean;
  selectedSnapshotId: string;
}

export default appSnapshotReducer;
