import { AppState } from "redux/reducers";

export const showAppSnapshotSelector = (state: AppState) => {
  return state.ui.appSnapshot.showAppSnapshot;
};

export const getSelectedAppSnapshot = (state: AppState) => {
  return state.ui.appSnapshot.appSnapshots.find(
    (s) => s.snapshotId === state.ui.appSnapshot.selectedSnapshotId
  );
};

export const appSnapshotsSelector = (state: AppState) => {
  return state.ui.appSnapshot.appSnapshots;
};

export const appSnapshotCountSelector = (state: AppState) => {
  return state.ui.appSnapshot.appSnapshotCount;
};

export const isAppSnapshotsFetching = (state: AppState) => {
  return state.ui.appSnapshot.snapshotsFetching;
};

export const isAppSnapshotDslFetching = (state: AppState) => {
  return state.ui.appSnapshot.snapshotDslFetching;
};
